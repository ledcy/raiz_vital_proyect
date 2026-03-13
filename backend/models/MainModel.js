import { db } from "../db.js";

const model = {
    select: async(tabla, columnas, condicion) => {
        const sqlSelect = `SELECT ${columnas.join(", ")} FROM ${tabla}`;

        console.log(sqlSelect)
        const sqlWhere = condicion ? `WHERE ${condicion.condicion} = ?` : ""
        const sql = `${sqlSelect} ${sqlWhere}`;

        return new Promise((resolve, reject) => {
            db.query(sql, condicion ? condicion.valor : [], (err, result) => {
                if (err) {
                    return reject(err)
                }

                resolve(result)
            });
        });
    },

    select_join: async(tabla, columnas, join = [], condicion = null) => {
        const sqlSelect =`SELECT ${columnas.join(", ")} FROM ${tabla}`;
        const sqlJoins = join.map(j => 
            `${j.tipo} JOIN ${j.tabla} ON ${j.on}`
        ).join(" ");

        const sqlWhere = condicion ? `WHERE ${condicion.condicion} = ?` : "";

        const sql = `${sqlSelect} ${sqlJoins} ${sqlWhere}`;

        return new Promise((resolve, reject) => {
            db.query(sql, condicion ? condicion.valor : [], (err, result) => {
                if(err){
                    return reject(err);
                }

                resolve(result);
            });
        });
    },

    insert: async(tabla, data) => {
        const campos = data.map(d => d.campo_nombre);
        const valores = data.map(d => d.campo_valor);

        const sql = `INSERT INTO ${tabla}(${campos.join(", ")}) VALUES (${campos.map(() => "?").join(", ")})`;

        return new Promise((resolve, reject) => {
            db.query(sql, valores, (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    },
};

export default model;