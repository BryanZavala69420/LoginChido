require('dotenv').config();
//dependencias para que pueda correr la madre esta
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
// encriptar
const Encriptar = require('bcryptjs');
//para enviar email
const nodemailer = require('nodemailer');
//para que pueda enviar archivos a la base de datos
const multer = require('multer');
const path = require('path');
//json web token, llamen a Dios
const jwt = require('jsonwebtoken');

//cositas par
const app = express();
app.use(cors({
    origin:'*',
    credentials: true
}));
app.use(express.json());

//puerto 
const port = process.env.PORT || 8080;
//base de datos
const BaseDatos = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});
//clave secreta para firmar los tokens
const Clave = "ñiñiñiñi, sexo sexo sexo, ñiñiñiñi"

//transportar el email

const transportar = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

// carpeta donde se guardarán las imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./imagenes/"); 
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const perfiles = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./perfiles/");
    },
    filename:(req, file, cb)=>{
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);     
    }
});


const upload = multer({ storage: storage });


const upload_Perfiles = multer ({storage: perfiles});

// servir carpeta de imágenes
app.use("/imagenes", express.static("imagenes"));

//servir para carpeta de perfiles
app.use("/perfiles", express.static("perfiles"));


//rutas

app.get('/sus', (req, res) => {
    const sql = "SELECT * FROM usuarios";
    BaseDatos.query(sql, (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(result);
        }
    });
});
//ruta para registrar
app.post('/registrar', upload_Perfiles.single("perfil"), (req, res) => {
    console.log("Datos recibidos:", req.body);

    const { usuario, fecha_nac, correo, constrasena } = req.body;

    let rutaImagen = null;
    if (req.file) {
        rutaImagen = "./perfiles/" + req.file.filename;
    }

    Encriptar.hash(constrasena, 10)
        .then(hash => {
            const consulta = `
                INSERT INTO usuarios (usuario, fecha_nac, correo, contrasena, perfil)
                VALUES (?, ?, ?, ?, ?)
            `;

            const valores = [usuario, fecha_nac, correo, hash, rutaImagen];

            BaseDatos.query(consulta, valores, (err, data) => {
                if (err) {
                    console.error("ERROR, LLAMEN A DIOS:", err);
                    return res.status(500).json({ mensaje: "Error en MySQL", error: err });
                }
                return res.status(200).json({ mensaje: "Registro exitoso", id_usuario: data.insertId });
            });
        })
        .catch(err => {
            console.error("Error al encriptar:", err);
            return res.status(500).json({ mensaje: "Error inesperado" });
        });
});


//ruta para registrar la sesion
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


// Ruta para eliminar usuario
app.delete('/borrarUsuario/:id', (req, res) => {

    const id_usuario = req.params.id;   

    const Consulta = 'DELETE FROM usuarios WHERE id = ?';

    BaseDatos.query(Consulta, [id_usuario], (err, result) => {

        if (err) {
            console.error("Error al borrar el usuario:", err);
            return res.status(500).json({ error: "Error al borrar el usuario" });
        }

        // Si no se borró nada (id no existe)
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.json({ mensaje: "Usuario borrado correctamente" });
    });
});



//ruta para enviar la noticia desde el frontend

app.post('/NuevaNoticia', upload.single("imagen"), (req, res) => {
    const { titulo, noticia, id_periodista, nombre_periodista } = req.body;

    // Si hay una imagen, se guarda la ruta
    let rutaImagen = null;
    if (req.file) {
        rutaImagen = "./imagenes/" + req.file.filename;
    }

    const consulta = `
        INSERT INTO Noticias 
        (titulo, noticia, id_periodista, nombre_periodista, imagen, fecha_de_publicacion, hora_de_publicacion) 
        VALUES (?, ?, ?, ?, ?, CURDATE(), CURTIME())
    `;

    BaseDatos.query(
        consulta,
        [titulo, noticia, id_periodista, nombre_periodista, rutaImagen],
        (err, result) => {
            if (err) {
                console.error("Error al insertar la noticia:", err);
                return res.status(500).json({ error: "Error al insertar" });
            }

            return res.json({ mensaje: "Noticia registrada", id_noticia: result.insertId });
        }
    );
});

//ruta para encontrar las noticias en la pagina principal sexosexo

app.get('/TodasLasNoticias', (req, res) => {
    const Consulta = 'SELECT * FROM Noticias ORDER BY id_noticia DESC';
    BaseDatos.query(Consulta, (err, result) => {
        if (err) {
            console.error("ERROR SQL:", err);  // muestra el error verdadero
            return res.status(500).json({ error: 'Error al obtener noticias' });
        }
        return res.json(result);
    });
});




//ruta para encontrar UNA sola noticia

app.get('/IdNoticia/:id_noticia', (req, res) => {
    const id_noticias = req.params.id_noticia;

    const Consulta = 'SELECT id_noticia, titulo, noticia, nombre_periodista, imagen from Noticias WHERE id_noticia = ?';

    BaseDatos.query(Consulta, [id_noticias], (err, result) => {
        if (err) {
            console.error("NO SE PUDO ENCONTRAR", err);
            return res.status(500).json({ error: "no se encontro" });

        }
        return res.json(result[0]);
    });

});

//ruta para los comentarios
app.get('/comentario/:id_comentario', (req, res) => {
    const id_comentario = req.params.id_comentario;

   const Consulta = `
        SELECT c.*, u.perfil 
        FROM comentarios c
        INNER JOIN usuarios u ON c.id_usuario = u.id
        WHERE c.id_noticia = ?
        ORDER BY c.id_comentario DESC;
    `;

    BaseDatos.query(Consulta, [id_comentario], (err, result) => {
        if (err) {
            console.error("no se pudo encontrar na");
            return res.status(500).json({ error: "llamen a cristo" })
        }
        return res.json(result)
    });

})
//ruta para que se pueda hacer un nuevo comentario
app.post('/NuevoComentario', async (req, res) => {
    const { comentario, usuario, id_usuario, id_noticia } = req.body;

    const consulta = `INSERT INTO comentarios (comentario, usuario, id_usuario, id_noticia, fecha_de_comentario, hora_de_comentario) VALUES (?, ?, ?, ?, CURDATE(), CURTIME())`;

    BaseDatos.query(consulta, [comentario, usuario, id_usuario, id_noticia], (err, result) => {
        if (err) {
            console.error("error al insertar el comentario", err);
            return res.status(500).json({ error: "error al insertar" });
        }
        return res.json("comentario registrado, yay");
    });
});

//ruta para borrar el comentario
app.delete('/BorrarComentario/:id_comentario/:id_usuario', (req, res) => {
    const { id_comentario, id_usuario } = req.params;

    const Consulta = `
        DELETE FROM comentarios 
        WHERE id_comentario = ? AND id_usuario = ?
    `;

    BaseDatos.query(Consulta, [id_comentario, id_usuario], (err, result) => {
        if (err) {
            console.error("Error al borrar comentario:", err);
            return res.status(500).json({ error: "Error al borrar" });
        }

        return res.json({ mensaje: "Comentario borrado correctamente" });
    });
});

//ruta para borrar la noticia

app.delete('/Borrar/Noticia/:id_noticia', (req, res) => {
    const id_noticia = req.params.id_noticia;
    const Consulta = 'DELETE FROM Noticias WHERE id_noticia = ?';

    BaseDatos.query(Consulta, [id_noticia], (err, result) => {
        if (err) {
            console.error("Error al borrar la noticia", err);
            return res.status(500).json({ error: "Error al borrar" });
        }

        return res.json({ mensaje: "Noticia borrada correctamente" });
    });
});








//ruta para encontrar las noticias en el log de noticias
app.get('/Log', (req, res) => {

    const Consulta = 'SELECT * FROM Noticias ORDER BY fecha_de_publicacion DESC;';

    BaseDatos.query(Consulta, (err, result) => {

        if (err) {
            console.error("Error al encontrar las noticias", err);
            return res.status(500).json({ error: 'Error al encontrar las noticias' });
        }

        // Formatear fechas para quitar la zona horaria y el formato ISO
        const noticias = result.map(noticia => ({
            ...noticia,
            fecha_de_publicacion: noticia.fecha_de_publicacion
                ? noticia.fecha_de_publicacion.toISOString().split('T')[0]  // → "YYYY-MM-DD"
                : null
        }));

        return res.json(noticias);
    });

});

//ruta para el perfil del usuario
app.get('/usuario/:id_usuario', (req, res) => {
    const id_usuario = req.params.id_usuario;

    const Consulta = 'SELECT id, usuario, fecha_nac, perfil, sobre_mi FROM usuarios WHERE id = ?;';

    BaseDatos.query(Consulta, [id_usuario], (err, result) => {

        if (err) {
            console.error("no se pudo enconrtrar");
            return res.status(500).json({ error: "No se encontro usuario" });

        }

        return res.json(result[0]);
    })

})

//ruta para  cambiar cosas en el perfil del usuario
app.post('/usuario/:id', upload_Perfiles.single("perfil"), (req, res) => {
    const id = req.params.id;
    const { usuario, sobre_mi } = req.body;

    const cambios = [];
    const valores = [];

    if (usuario) {
        cambios.push("usuario = ?");
        valores.push(usuario);
    }

    if (sobre_mi) {
        cambios.push("sobre_mi = ?");
        valores.push(sobre_mi);
    }

    if (req.file) {
        const rutaImagen = "./perfiles/" + req.file.filename;
        cambios.push("perfil = ?");
        valores.push(rutaImagen);
    }

    if (cambios.length === 0) {
        return res.status(400).json({ error: "No se recibió nada para actualizar" });
    }

    valores.push(id);

    const sql = `UPDATE usuarios SET ${cambios.join(", ")} WHERE id = ?`;

    BaseDatos.query(sql, valores, (err) => {
        if (err) {
            console.error("Error al actualizar el perfil:", err);
            return res.status(500).json({ error: "No se pudo actualizar el perfil" });
        }
        res.json({ mensaje: "Perfil actualizado correctamente" });
    });
});


app.listen(port, () => {
    console.log(`conectandose en el puerto ${port}, y en el puerto 3001`);
});
