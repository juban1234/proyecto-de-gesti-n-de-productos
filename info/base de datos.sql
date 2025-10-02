create database gestorProduct;
use gestorProduct;

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,  
    nombre VARCHAR(255) NOT NULL,               
    precio DECIMAL(10, 2) NOT NULL,            
    stock INT NOT NULL   
);

CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT, 
    cantidad INT NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pago DECIMAL(10, 2),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) 
);

INSERT INTO productos (nombre, precio, stock) 
VALUES 
('Producto D', 10.50, 1),
('Producto E', 15.30, 5),
('Producto F', 8.00, 2);

DELIMITER $$

CREATE TRIGGER antes_de_venta
BEFORE INSERT ON ventas
FOR EACH ROW
BEGIN
    -- Verificar si la cantidad solicitada es mayor que el stock disponible
    DECLARE stock_actual INT;

    -- Obtener el stock actual del producto que se va a vender
    SELECT stock INTO stock_actual
    FROM productos
    WHERE id_producto = NEW.id_producto;

    -- Si la cantidad solicitada es mayor que el stock disponible, lanzar un error
    IF NEW.cantidad > stock_actual THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No hay suficiente stock para realizar esta venta';
    ELSE
        -- Si hay stock suficiente, reducir la cantidad de stock en la tabla productos
        UPDATE productos
        SET stock = stock - NEW.cantidad
        WHERE id_producto = NEW.id_producto;
    END IF;
END $$

DELIMITER ;

delimiter //
create procedure compraProducto(in nombreProducto varchar(30), in cantidad int)
begin
	declare producto int;
    declare precios decimal(10,2);
    declare total decimal(10,2);
    
    SELECT id_producto, precio
    INTO producto, precios
    FROM productos
    WHERE nombre = nombreProducto
    LIMIT 1;
    
    SET total = precios * cantidad;
    
	INSERT INTO ventas (id_producto, cantidad, pago) VALUES (producto , cantidad, total);
end //

DELIMITER ;

select * from productos; 




