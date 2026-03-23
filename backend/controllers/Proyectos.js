import fs from "node:fs";
import model from "../models/MainModel.js";

const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ#¡!".,;$%&0-9 ]+$/; 

const proyecto = {
    create: async(req, res) => {
        try { 
            const { nombre, fecha, descripcion, ubicacion, categoria, subcategoria, objetivo} = req.body;
            const usuario = req.user;

            if(!req.file){
                throw new Error("La imagen es requerida");
            }

            const nombreImagen = req.file.filename;

            if (!nombre || !fecha || !descripcion || !ubicacion || !categoria || !subcategoria || !objetivo) {
                throw new Error("Todos los campos son requeridos");
            }

            if (!regex.test(nombre)){
                throw new Error("El nombre no cumple con el formato solicitado");
            }

            if (!regex.test(descripcion)){
                throw new Error("La descripción no cumple con el formato solicitado");
            }

            if (!regex.test(ubicacion)){
                throw new Error("La ubicación no cumple con el formato solicitado");
            }

            const data_project = [
                {
                    campo_nombre: "id_usuario",
                    campo_valor: usuario.id
                },
                {
                    campo_nombre: "nombre",
                    campo_valor: nombre
                },
                {
                    campo_nombre: "fecha",
                    campo_valor: fecha
                },
                {
                    campo_nombre: "descripcion",
                    campo_valor: descripcion
                },
                {
                    campo_nombre: "ubicacion",
                    campo_valor: ubicacion
                },
                {
                    campo_nombre: "categoria",
                    campo_valor: categoria
                },
                {
                    campo_nombre: "subcategoria",
                    campo_valor: subcategoria
                },
                {
                    campo_nombre: "objetivo",
                    campo_valor: objetivo
                }
            ];
            
            const proyecto = await model.insert("proyecto", data_project);

            const idProyecto = proyecto.insertId;

            const data_image = [
                {
                    campo_nombre: "id_proyecto",
                    campo_valor: idProyecto
                },
                {
                    campo_nombre: "nombre_archivo",
                    campo_valor: nombreImagen
                },
                {
                    campo_nombre: "tipo",
                    campo_valor: "portada"
                }
            ];

            model.insert("imagenes_proyecto", data_image);

            return res.status(201).json({
                message: "Proyecto creado correctamente"
            });

        } catch (error) {
            // eliminar archivo si hubo error
            if (req.file) {
                fs.unlink(req.file.path, () => {});
            }

            return res.status(400).json({
                error: error.message
            });
        }
    },

    retrieve: async(req, res) => {
        const {userId} = req.query;

        var condicion = null;

        if(userId){
            condicion = {
                condicion: "id_usuario",
                valor: userId
            };
        }

        try{
            const columnas = [
                "p.id_proyecto",
                "p.nombre",
                "p.ubicacion",
                "p.objetivo",
                "p.categoria",
                "p.financiamiento_actual",
                "i.nombre_archivo AS portada",
                "ROUND((p.financiamiento_actual / p.objetivo) * 100, 2) AS porcentaje"
            ];

            const joins = [
                {
                    tipo: "LEFT",
                    tabla: "imagenes_proyecto i",
                    on: "p.id_proyecto = i.id_proyecto AND i.tipo = 'portada'"
                }
            ];

            const proyectos = await model.select_join("proyecto p", columnas, joins, condicion);

            res.json(proyectos);
        } catch(error){
            res.status(500).json({error: "Error al obtener proyectos"});
        }
    },

    delete: async(req, res) => {
        try{
            const {field, value, portada} = req.query;
            const file_path = "uploads/"+ portada;

            const data = {
                campo: field,
                valor: value
            };

            model.delete("proyecto", data);

            fs.unlink(file_path, () => {});

            return res.status(200).json({message: "Eliminado correctamente"});
        } catch(error){
            res.status(500).json({error: "Error al eliminar proyecto"});
        }
    },

};

export default proyecto;