import fs from "node:fs";
import model from "../models/MainModel.js";

const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ#¡!".,;$%&0-9 ]+$/; 

const campaña = {
    create: async(req, res) => {
        try { 
            const { nombreCampaña, descripcionCampaña, ubicacionCampaña, categoriaCampaña, subcategoriaCampaña } = req.body;
            const usuario = req.user;

            if (!nombreCampaña || !descripcionCampaña || !ubicacionCampaña || !categoriaCampaña || !subcategoriaCampaña) {
                throw new Error("Todos los campos son requeridos");
            }

            if (!regex.test(nombreCampaña)){
                throw new Error("El nombre no cumple con el formato solicitado");
            }

            if (!regex.test(descripcionCampaña)){
                throw new Error("La descripción no cumple con el formato solicitado");
            }

            if (!regex.test(ubicacionCampaña)){
                throw new Error("La ubicación no cumple con el formato solicitado");
            }

            const data_campaign = [
                {
                    campo_nombre: "id_usuario",
                    campo_valor: usuario.id
                },
                {
                    campo_nombre: "nombre",
                    campo_valor: nombreCampaña
                },
                {
                    campo_nombre: "descripcion",
                    campo_valor: descripcionCampaña
                },
                {
                    campo_nombre: "ubicacion",
                    campo_valor: ubicacionCampaña
                },
                {
                    campo_nombre: "categoria",
                    campo_valor: categoriaCampaña
                },
                {
                    campo_nombre: "subcategoria",
                    campo_valor: subcategoriaCampaña
                }
            ];
            
            model.insert("campaña", data_campaign);

            return res.status(201).json({
                message: "Campaña creada correctamente"
            });

        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    },

    retrieve: async(req, res) => {
        try{
            const {userId, userType } = req.query;
            var columnas = ["*"];
            var tabla = "campaña";

            var condicion = null;
            var campañas = [];

            if(userId && userType && userType == "institucion"){
                condicion = [
                    {
                        condicion: "id_usuario",
                        valor: userId
                    }
                ];
                campañas = await model.select(tabla, columnas, condicion);
            }

            if(userId &&userType && userType == "usuario"){
                tabla =  "campaña c";
                columnas = ["c.*", "i.id_inscripcion"];
                const joins = [
                    {
                        tipo: "LEFT",
                        tabla: "inscripcion i",
                        on: "c.id_campaña = i.id_campaña"
                    }
                ];

                const condicion = {
                    condicion: "i.id_usuario",
                    valor: userId                    
                }
                ;

                campañas = await model.select_join(tabla, columnas, joins, condicion);
            }

            if(!userId){
                campañas = await model.select(tabla, columnas, condicion);
            }

            res.json(campañas);
            
        } catch(error){
            console.log(error);
            return res.status(500).json({ error: "Error al obtener campañas" });
        }
    },

    delete: async(req, res) => {
        try{
            const {field, value} = req.query;

            const data = {
                campo: field,
                valor: value
            };

            model.delete("campaña", data);

            return res.status(200).json({message: "Eliminado correctamente"});
        } catch(error){
            res.status(500).json({error: "Error al eliminar proyecto"});
        }
    },

    create_registration: async(req, res) => {
        try {
            const { id_campaña } = req.body;
            const user = req.user;

            const columnas = ["id_inscripcion"];
            const condicion = [
                {
                    condicion: "id_campaña",
                    valor: id_campaña
                },
                {
                    condicion: "id_usuario",
                    valor: user.id
                }
            ];

            const verifyRegistration = await model.select("inscripcion", columnas, condicion);

            if(verifyRegistration.length > 0){
                return res.status(400).json({error: "Ya está registrado a esta campaña"});
            }

            const data_registration = [
                {
                    campo_nombre: "id_campaña",
                    campo_valor: id_campaña
                },
                {
                    campo_nombre: "id_usuario",
                    campo_valor: user.id
                },
                {
                    campo_nombre: "estado",
                    campo_valor: "activo"
                }
            ];

            model.insert("inscripcion", data_registration);

            return res.status(200).json({message: "Inscripcion satisfactoria"});
        } catch (error) {
            console.log(error);
            res.status(500).json({error: "Error al inscribirse a campaña"});
        }
    },

    delete_registration: async(req, res) => {
        try {
            const { idInscripcion} = req.query;
            
            const data = {
                campo: "id_inscripcion",
                valor: idInscripcion
            };

            model.delete("inscripcion", data);

            return res.status(200).json({message: "Inscripcion cancelada"});
        } catch (error) {
            return res.status(500).json({error: "Error al cancelar inscripcion"});
        }
    },
};

export default campaña;