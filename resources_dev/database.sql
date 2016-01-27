CREATE DATABASE `bitacora_ici_uct` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;

CREATE TABLE `bitacora_ici_uct`.`usuario` (
  `usua_id` INT NOT NULL AUTO_INCREMENT,
  `usua_rut` VARCHAR(45) NULL,
  `usua_dv` VARCHAR(45) NULL,
  `usua_nombres` VARCHAR(100) NULL,
  `usua_apellidop` VARCHAR(100) NULL,
  `usua_apellidom` VARCHAR(100) NULL,
  `usua_tipo` TINYINT(1) NULL,
  PRIMARY KEY (`usua_id`),
  UNIQUE INDEX `usua_rut_UNIQUE` (`usua_rut` ASC));

CREATE TABLE `bitacora_ici_uct`.`bitacora` (
  `usua_id` INT NOT NULL,
  `bita_fecha` DATE NOT NULL,
  `bita_actividades` VARCHAR(1000) NULL,
  `bita_conclusiones` VARCHAR(1000) NULL,
  PRIMARY KEY (`usua_id`, `bita_fecha`),
  CONSTRAINT `fk_bitacora_usuario`
    FOREIGN KEY (`usua_id`)
    REFERENCES `bitacora_ici_uct`.`usuario` (`usua_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);
