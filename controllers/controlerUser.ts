import { Request, Response } from "express";
import dotenv from "dotenv";
import { items } from "../Dto/User";
import productos from "../repositories/repoProductos";

dotenv.config();

class metodosProductos{
    
  static async createProduct(req: Request, res: Response){
    const { nombre,precio,stock } = req.body;

    const result = await productos.createProduct(new items(nombre,precio,stock));
    
    res.status(200).json({
      message:"Producto creado correctamente",
      result
    });
  }

  static async GetProductos(req: Request, res: Response){
    const result = await productos.verProductos();
    
    res.status(200).json({
      message:"Productos obtenidos correctamente",
      result
    });
  }

  static async compraProducto(req: Request, res: Response){
    const { nombreProducto, cantidad } = req.body;

    const result = await productos.comprarProducto(nombreProducto, cantidad);
    
    res.status(200).json({
      message:"Producto comprado correctamente",
      result
    });

  }

  static async ventas(req: Request, res: Response){
    const result = await productos.ventasTotales();

    res.status(200).json({
      message: `Ventas totales obtenidas corresonde a ${result[0].totalVentas}`,
    });
  }

}

export default metodosProductos;


