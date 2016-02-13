CREATE DATABASE `bitacora_ici_uct` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;

CREATE TABLE `bitacora_ici_uct`.`usuario` (
  `gapi_uid` CHAR(21) NOT NULL,
  `usua_nombres` VARCHAR(100) NULL,
  `usua_apellidos` VARCHAR(100) NULL,
  `usua_email` VARCHAR(255) NULL,
  PRIMARY KEY (`gapi_uid`));

CREATE TABLE `bitacora_ici_uct`.`bitacora` (
  `gapi_uid` CHAR(21) NOT NULL,
  `bita_fecha` DATE NOT NULL,
  `bita_actividades` VARCHAR(1000) NULL,
  `bita_conclusiones` VARCHAR(1000) NULL,
  PRIMARY KEY (`gapi_uid`, `bita_fecha`),
  CONSTRAINT `fk_bitacora_usuario`
    FOREIGN KEY (`gapi_uid`)
    REFERENCES `bitacora_ici_uct`.`usuario` (`gapi_uid`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);
