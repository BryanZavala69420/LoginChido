//dependencias para que pueda correr la madre esta
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
// encriptar
const Encriptar = require('bcryptjs'); 

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
                        rol: data[0].rol
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


app.listen(port, () => {
    console.log('conectandose en el puerto 8081, y en el puerto 3001');
});
