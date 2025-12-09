-- Database Schema for Los Almeydas
-- Generated based on codebase analysis

SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Table `USUARIOS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `USUARIOS`;
CREATE TABLE IF NOT EXISTS `USUARIOS` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('admin', 'cliente') DEFAULT 'cliente',
  `telefono` VARCHAR(20),
  `direccion` VARCHAR(255),
  `fecha_registro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`)
);

-- -----------------------------------------------------
-- Table `CATEGORIAS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CATEGORIAS`;
CREATE TABLE IF NOT EXISTS `CATEGORIAS` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nombre_categoria` VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (`id_categoria`)
);

-- -----------------------------------------------------
-- Table `PRODUCTOS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PRODUCTOS`;
CREATE TABLE IF NOT EXISTS `PRODUCTOS` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  `precio` DECIMAL(10, 2) NOT NULL,
  `stock` INT NOT NULL,
  `imagen_url` VARCHAR(255),
  `unidad` VARCHAR(20) DEFAULT 'lb',
  `id_categoria` INT,
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_producto`),
  FOREIGN KEY (`id_categoria`) REFERENCES `CATEGORIAS`(`id_categoria`) ON DELETE SET NULL
);

-- -----------------------------------------------------
-- Table `PEDIDOS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PEDIDOS`;
CREATE TABLE IF NOT EXISTS `PEDIDOS` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `fecha_pedido` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `estado` ENUM('Pendiente', 'Confirmado', 'Enviado', 'Entregado', 'Cancelado') DEFAULT 'Pendiente',
  `costo_envio` DECIMAL(10, 2) DEFAULT 0.00,
  PRIMARY KEY (`id_pedido`),
  FOREIGN KEY (`id_usuario`) REFERENCES `USUARIOS`(`id_usuario`) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `DETALLE_PEDIDO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DETALLE_PEDIDO`;
CREATE TABLE IF NOT EXISTS `DETALLE_PEDIDO` (
  `id_detalle` INT NOT NULL AUTO_INCREMENT,
  `id_pedido` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio_unitario` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`id_detalle`),
  FOREIGN KEY (`id_pedido`) REFERENCES `PEDIDOS`(`id_pedido`) ON DELETE CASCADE,
  FOREIGN KEY (`id_producto`) REFERENCES `PRODUCTOS`(`id_producto`)
);

-- -----------------------------------------------------
-- Table `RECETAS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `RECETAS`;
CREATE TABLE IF NOT EXISTS `RECETAS` (
  `id_receta` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(150) NOT NULL,
  `descripcion` TEXT,
  `ingredientes` TEXT NOT NULL,
  `instrucciones` TEXT NOT NULL,
  `imagen_url` VARCHAR(255),
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_receta`)
);

-- -----------------------------------------------------
-- Table `SERVICIOS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SERVICIOS`;
CREATE TABLE IF NOT EXISTS `SERVICIOS` (
  `id_servicio` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  `precio` DECIMAL(10, 2) NOT NULL,
  `imagen_url` VARCHAR(255),
  PRIMARY KEY (`id_servicio`)
);

SET FOREIGN_KEY_CHECKS = 1;

-- -----------------------------------------------------
-- Data Initialization (Optional)
-- -----------------------------------------------------
INSERT IGNORE INTO `CATEGORIAS` (nombre_categoria) VALUES 
('Cerdo'),
('Res'),
('Aves'),
('Del Mar'),
('Embutidos'),
('Servicios');
