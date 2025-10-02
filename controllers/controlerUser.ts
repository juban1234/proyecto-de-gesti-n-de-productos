import { Request, Response } from "express";
import dotenv from "dotenv";
import { items } from "../Dto/User";
import productos from "../repositories/repoProductos";

dotenv.config();

class metodosProductos {

  static async createProduct(req: Request, res: Response) {
    const { nombre, precio, stock } = req.body;
    try {    
      const result = await productos.createProduct(new items(nombre, precio, stock));

      res.status(200).json({
        message: "Producto creado correctamente",
        result
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el producto",
        error
      });
    }
  }

  static async GetProductos(req: Request, res: Response) {  

    try {
      const result = await productos.verProductos();

      res.status(200).json({
        message: "Productos obtenidos correctamente",
        result
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los productos",
        error
      });
    }
  }

  static async compraProducto(req: Request, res: Response) {
    const { nombreProducto, cantidad } = req.body;
    
    try{
      
      const result = await productos.comprarProducto(nombreProducto, cantidad);
      return res.status(200).json({
      message: "Producto comprado correctamente",
      result
    });
    }catch (error: any) {

        if (error.code === 'ER_SIGNAL_EXCEPTION' && error.sqlMessage === 'No hay suficiente stock para realizar esta venta') {
          return res.status(400).json({
              message: error.sqlMessage, 
              error: error.message         
          });
        }
        
        console.error("Error al procesar la compra:", error); 
        return res.status(500).json({
            message: "Hubo un problema al procesar la compra.",
            error: error.message || 'Error desconocido'
        });
    }
  }

  static async ventas(req: Request, res: Response) {
    try {
      const result = await productos.ventasTotales();

      res.status(200).json({
        message: `Ventas totales obtenidas corresonde a ${result[0].totalVentas}`,
      });}
    catch (error) {
      res.status(500).json({
        message: "Error al obtener las ventas totales",
        error
      });
    }
  }

}

export default metodosProductos;


