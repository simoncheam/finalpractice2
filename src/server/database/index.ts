import * as mysql from 'mysql';
import { database_config } from '../config';
import { MySQL_Default_Response } from '../types';

// pool = connection to mysql; needs config file
const pool = mysql.createPool(database_config);

export const Query = <T = MySQL_Default_Response>(
    sql_string: string, values?: unknown[]) => {

        return new Promise<T>((resolve, reject) =>{

            //formatted sql +console log
            const formatted_sql = mysql.format(sql_string, values);
                console.log({formatted_sql});

            // pool query
            pool.query(formatted_sql, (err, results) =>{

                if (err) {
                    reject(err)
                    
                } else {
                    resolve(results)
                    
                }
            })
        })

    }