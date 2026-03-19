import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import model from "../models/MainModel.js";

dotenv.config();

const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const usuario = {
    login: async(req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Todos los campos son requeridos" });
            }

            if (!regexEmail.test(email)) {
                return res
                    .status(400)
                    .json({
                    error: "El correo electrónico no cumple con el formato solicitado",
                    });
            }

            if (!regexPassword.test(password)) {
                return res
                    .status(400)
                    .json({ error: "La contraseña no cumple con el formato solicitado" });
            }

            const columnas = ["id_usuario", "nombre", "password"];
            const condicion = {
                condicion: "email",
                valor: email
            };

            const user = await model.select("usuario", columnas, condicion);

            if (!user || user.length === 0) {
                return res
                .status(404)
                .json({ error: "Usuario no encontrado, revise el correo" });
            }


            bcrypt.compare(password, user[0].password, function (err, result) {
                if (err) {
                return res
                    .status(500)
                    .json({ error: err });
                }

                if (!result) {
                return res.status(401).json({ error: "Contraseña incorrecta" });
                }

                const token = jwt.sign(
                {
                    id: user[0].id_usuario,
                    nombre: user[0].nombre,
                    email: user[0].email,
                },
                process.env.JWT_SECRET,
                { expiresIn: "2h" },
                );

                res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 2 * 60 * 60 * 1000,
                });

                res.json({ id: user[0].id_usuario, nombre: user[0].nombre });
            });
            
        } catch (error) {
            res.status(500).json({ error: "Error al iniciar sesión" });
        }
    },

    create: async(req, res) => {
        try {
            const { nombre, email, password } = req.body;

            if (!nombre || !email || !password) {
                return res.status(400).json({ error: "Todos los campos son requeridos" });
            }

            if (!regexNombre.test(nombre)) {
                return res
                .status(400)
                .json({ error: "El nombre no cumple con el formato solicitado" });
            }

            if (!regexEmail.test(email)) {
                return res
                .status(400)
                .json({
                    error: "El correo electrónico no cumple con el formato solicitado",
                });
            }

            if (!regexPassword.test(password)) {
                return res
                .status(400)
                .json({ error: "La contraseña no cumple con el formato solicitado" });
            }

            //VERIFICAR EXISTENCIA DE REGISTRO
            const columnas = ["*"];
            const condicion = {
                condicion: "email",
                valor: email
            };

            const verify_user = await model.select("usuario", columnas, condicion);

            if (verify_user.length > 0) {
            return res
                .status(400)
                .json({ error: "El correo electrónico ya está registrado" });
            }

            const saltRounds = 10;

            const hash = await bcrypt.hash(password, saltRounds);
            
            const data = [
                {
                    campo_nombre: "nombre",
                    campo_valor: nombre
                },
                {
                    campo_nombre: "email",
                    campo_valor: email
                },
                {
                    campo_nombre: "password",
                    campo_valor: hash
                },
                {
                    campo_nombre: "tipo_usuario",
                    campo_valor: "usuario"
                }
            ];

            const usuario = await model.insert("usuario", data);

            res.status(201).json({
                id: usuario.insertId,
                nombre,
                email,
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Error al registrar usuario"});
        }
    },

    logout: async(req, res) => {
        res.clearCookie("token");
        res.json({ message: "Sesión cerrada" });
    },

    retrieve_users: async(req, res) => {
        try{
            const columnas = ["id_usuario", "nombre", "email"];
            
            const users = await model.select("usuario", columnas);

            return res.json(users);

        } catch(error){
            return res.status(500).json({ error: "Error al obtener usuarios" });
        }
    },

    retrieve_profile: async(req, res) => {
        try{
            const userId = req.user.id;
            const columnas = ["id_usuario", "nombre", "email"];
            const condicion = {
                condicion: "id_usuario",
                valor: userId
            };

            const user = await model.select("usuario", columnas, condicion);
            
            if(user.length === 0) {
                res.status(404).json({ error: "Usuario no encontrado" });
            }

            res.json(user[0]);
            
        } catch(error){
            return res.status(500).json({ error: "Error al obtener el perfil" });
        }
    },

    create_password_reset: async(req, res) => {
        try {
            const {email, resetToken, expiresAt} = req;

            const data = [
                {
                    campo_nombre: "email",
                    campo_valor: email
                },
                {
                    campo_nombre: "token",
                    campo_valor: resetToken
                },
                {
                    campo_nombre: "expires_at",
                    campo_valor: expiresAt
                }
            ];

            model.insert("password_resets", data);

            return res.status(200).json({message: "Reset password creado"});
        } catch (error) {
            return res.status(500).json({error: "Error del servidor"});
        }
    },

    update_password: async(req, res) => {
        try {
            const {resetToken, newPassword, confirmPassword} = req.body;
            const columnas = ["email", "expires_at"];
            const condicionReset = {
                condicion: "token",
                valor: resetToken
            };

            const dataToken = await model.select("password_resets", columnas, condicionReset);

            if(dataToken.length == 0 || new Date(dataToken[0].expires_at) < new Date){
                return res.status(400).json({error: "Token inválido o expirado"})
            }

            const email = dataToken[0].email;

            if (!regexPassword.test(newPassword) || !regexPassword.test(confirmPassword)) {
                return res
                .status(400)
                .json({ error: "La contraseña no cumple con el formato solicitado" });
            }

            if(newPassword !== confirmPassword){
                return res.status(400).json({error: "Las contraseñas no coinciden"});
            }

            const saltRounds = 10;

            const hash = await bcrypt.hash(newPassword, saltRounds);

            const data = [
                {
                    campo_nombre: "password",
                    campo_valor: hash
                }
            ];

            const condicion = {
                condicion: "email",
                valor: email
            };

            model.update("usuario", data, condicion);

            return res.status(200).json({message: "Contraseña reestablecida correctamente"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Error al actualizar contraseña"});
        }
    },
};

export default usuario;