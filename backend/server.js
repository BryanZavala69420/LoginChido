//dependencias para que pueda correr la madre esta
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
// encriptar
const Encriptar = require('bcryptjs');

//para enviar email
const nodemailer = require('nodemailer');

//json web token, llamen a Dios
const jwt = require('jsonwebtoken');

//cositas par
const app = express();
app.use(cors());
app.use(express.json());

//puerto
const port = 8081;

//base de datos, conexion
const BaseDatos = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "Prueba"
});
//clave secreta para firmar los tokens
const Clave = "ñiñiñiñi, sexo sexo sexo, ñiñiñiñi"

//transportar el email

const transportar = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
})


//rutas

app.get('/sus', (req, res) => {
    const sql = "SELECT * FROM usuarios";
    BaseDatos.query(sql, (err,) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json();
        }
    });
});
//ruta para registrar
app.post('/registrar', (req, res) => {
    console.log("Datos recibidos:", req.body);

    const { usuario, fecha_nac, correo, constrasena } = req.body;

    Encriptar.hash(constrasena, 10)
        .then(hash => {
            const consulta = "INSERT INTO usuarios (usuario, fecha_nac, correo, contrasena) VALUES (?, ?, ?, ?)";
            const valores = [usuario, fecha_nac, correo, hash];

            BaseDatos.query(consulta, valores, (err, data) => {
                if (err) {
                    console.error("ERROR, LLAMEN A DIOS:", err);
                    return res.status(500).json({ mensaje: "Error en MySQL", error: err.message });
                }
                return res.status(200).json("exito, yay!");
            });
        })
        .catch(err => {
            console.error("error al encriptar por alguna razon...");
            return res.status(500).json({ mensaje: "fallo algo, no se" });
        });
});


app.post('/sesiones', (req, res) => {

    const { id_usuario } = req.body;

    if (!id_usuario) {
        return res.status(400).send("Falta id_usuario en el cuerpo de la solicitud.");
    }

    const Consulta = 'INSERT INTO sesion (fecha_sesion, hora_sesion, id_usuario) VALUES (CURDATE(), CURTIME(), ?);'

    BaseDatos.query(Consulta, [id_usuario], (err, resultado) => {
        if (err) {
            console.error(' Error al guardar sesión, puta madre: ', err);
            res.status(500).send('error al guardar');
        } else {

            res.status(200).send('Todo god');
        }
    });
});


//ruta para acceder 
app.post('/acceder', (req, res) => {
    const { correo, contrasena } = req.body;

    const Consulta = "SELECT * FROM usuarios WHERE correo = ?"

    BaseDatos.query(Consulta, [correo], (err, data) => {

        if (err) {
            console.error("Error en el login", err);
            return res.status(500).json("error interno en el server");
        }

        if (data.length > 0) {
            const bcrypt = require("bcryptjs");
            bcrypt.compare(contrasena, data[0].contrasena, (err, result) => {
                if (result) {
                    return res.status(200).json({
                        status: "ok",
                        mensaje: "Exito, yay!",
                        usuario: data[0].usuario,
                        rol: data[0].rol,
                        id_usuario: data[0].id
                    });
                } else {
                    return res.status(401).json({ status: "fail", mensaje: "Contraseña incorrecta" });
                }
            });


        } else {
            return res.status(401).json({ status: "fail", mensaje: "Correo no encontrado" });

        }
    });
});



//ruta para enviar el email y cambiar la contrasenia
app.post('/cambiarcontrasenia', (req, res) => {
    const { correo } = req.body;

    const Consulta = "SELECT * FROM usuarios WHERE correo = ?";

    BaseDatos.query(Consulta, [correo], (err, data) => {
        if (err) {
            console.error("Error de verificacion");
            return res.status(500).json({ mensaje: "Error en la base de datos" })
        }

        if (data.length === 0) {
            return res.status(404).json({ mensaje: "Correo no encontrado" });

        }


        //crea el token temporal
        const token = jwt.sign({ correo }, Clave, { expiresIn: '60m' });


        //enlace del frotnend
        const enlace = `http://localhost:3001/reset?token=${token}`;


        //enviar el correo
        const EnviarCorreo = {
            from: '"Soporte de mi app" <bt.zavala23@info.uas.edu.mx>',
            to: correo,
            subjet: "Restablecer contrasenia",

            html: ` <p>Has solicitado restablecer tu contraseña.</p>
                <p>Haz clic en el siguiente enlace para cambiarla (válido por 60 minutos):</p>
                <a href="${enlace}">${enlace}</a>`
        };

        transportar.sendMail(EnviarCorreo, (error, info) => {
            if (error) {
                console.error("error al enviar el correo", error);
                return res.status(500).json({ mensaje: "Error al enviar el correo" });
            }

            return res.status(200).json({ mensaje: "Correo de recuperación enviado" });
        });
    });
});

//ruta donde por fin puedes cambiar la contrasenia
app.post('/NuevaContrasenia', async (req, res) => {

    const { token, nuevaContrasena } = req.body;

    if (!token || !nuevaContrasena) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }

    try {
        const decoded = jwt.verify(token, Clave);
        const correo = decoded.correo;

        const hash = await Encriptar.hash(nuevaContrasena, 10);

        const sql = "UPDATE usuarios SET contrasena = ? WHERE correo = ?";
        BaseDatos.query(sql, [hash, correo], (err, result) => {
            if (err) {
                console.error("Error al actualizar contraseña:", err);
                return res.status(500).json({ mensaje: "Error al actualizar la contraseña" });
            }

            if (result.affectedRows > 0) {
                return res.status(200).json({ mensaje: "Contraseña actualizada correctamente" });
            } else {
                return res.status(404).json({ mensaje: "Correo no encontrado" });
            }
        });

    } catch (error) {
        console.error("Token inválido o expirado:", error);
        return res.status(400).json({ mensaje: "Token inválido o expirado" });
    }

});


app.listen(port, () => {
    console.log('conectandose en el puerto 8081, y en el puerto 3001');
});
