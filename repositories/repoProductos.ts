import db from "../configs/config";

class productos {
    static async createProduct(datos:any) {
        const sql = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';
        const params = [datos.nombre, datos.precio, datos.stock];
        const [rows]: any = await db.execute(sql, params);
        return rows;
    }

    static async verProductos() {
        const sql = 'SELECT * FROM productos';
        const [rows]: any = await db.execute(sql);
        return rows;
    }

    static async comprarProducto(nombreProducto: string, cantidad: number) {
        const sql = 'call compraProducto(?, ?)';
        const values = [nombreProducto, cantidad];
        const [rows]: any = await db.execute(sql, values);
        return rows;
    }

    static async ventasTotales() {
        const sql = 'SELECT SUM(pago) AS totalVentas FROM ventas';
        const [rows]: any = await db.execute(sql);
        return rows;
    }

}

export default productos;