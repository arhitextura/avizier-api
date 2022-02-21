import { Connection, MysqlError } from "mysql";
import pool from "../sqlconnection";

export function GetRestanteUtilizatorPromise(user_id: string) {
    return new Promise((resolve, reject) => {
        const selectUserById = `SELECT id_index, id_consumator, index_citit, data_citire_index, tip_consum 
    FROM
    index_lunar WHERE id_consumator = ${pool.escape(user_id)}
    ORDER BY data_citire_index ASC
    `;

        pool.getConnection((err: MysqlError, connection: Connection) => {
            if (err) return reject(err);
            try {
                connection.query(
                    selectUserById,
                    (err: MysqlError, usersByIdResults: any) => {
                        if (err) reject(err);
                        resolve(usersByIdResults);
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    });
}
