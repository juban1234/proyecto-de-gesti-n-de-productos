import db from "../configs/config";

class productos {
    static async createProduct(datos:any) {
        const sql = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';
        const params = [datos.nombre, datos.precio, datos.stock];
        const [rows]: any = await db.execute(sql, params);
        return rows;
    }
}

export default productos;