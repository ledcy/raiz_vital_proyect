import msql from 'mysql2';

export const db = msql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'raiz_vital'
})  ;