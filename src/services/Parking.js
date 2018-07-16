'use strict';

const { PARKING_DOMAIN } = require('../config/url');
const { parking_endpoints } = require('../config/endpoints');
const Service = require('./ServiceInterface');

const REST_METHOD = 'POST'; 

/**
 * Set of services that let's know the actual state and availability
 * for all the bikes located in Madrid
 *
 * @param {string} clientId - client username to identify with
 * @param {string} passKey - password to validate the client autentification
 */
const Parking = function(clientId, passKey) {
  Service.call(this, clientId, passKey, REST_METHOD);

  this.glueURL = function(endpoint, params) {
    let newURL = `${PARKING_DOMAIN}${endpoint}/${this.getClient()},${this.getPassword()}`;
    for (param in params) {
      newURL += `,${param}`;
    }
    console.log(newURL)
    return newURL;
  };
};

Parking.prototype = Object.create(Service.prototype); // inherits from service class

/**
 * Obtiene la información detallada de un aparcamiento concreto: Información sobre sus
 * accesos, horarios, tarifas, servicios que ofrece y cifras de ocupación.
 */
Parking.prototype.detailParking = function() {
  return this.makeRequest(parking_endpoints.DETAIL_PARKING);
};
/**
 * Obtiene la información detallada de un POI concreto (o de todos ellos), con id, código de
 * familia, nombre estándar, nombre traducido, descripción, web, horario, servicios de pago,
 * así como sus imágenes asociadas con nombre, ruta y descripción.
 */
Parking.prototype.detailPOI = function() {
  return this.makeRequest(parking_endpoints.DETAIL_POI);
};
/**
 * Obtiene una lista de todos los elementos (características de aparcamientos, categorías de
 * POIs,…) que tienen un icono asociado, con nombre, descripción si se dispone de ella, grupo al
 * que pertenece y ruta del icono que la representa.
 */
Parking.prototype.iconDescription = function() {
  return this.makeRequest(parking_endpoints.ICON_DESCRIPTION);
};
/**
 * Obtiene información genérica de POIs y aparcamientos, independiente del idioma (dirección,
 * coordenadas, códigos de familia, tipo y categoría,…).
 */
Parking.prototype.infoParkingPoi = function() {
  return this.makeRequest(parking_endpoints.INFO_PARKING_POI);
};
/**
 * Obtiene una lista de las características activas de los aparcamientos, con nombre, código y
 * grupo de la característica, descripción si se dispone de ella y ruta del icono que la representa.
 */
Parking.prototype.listFeatures = function() {
  return this.makeRequest(parking_endpoints.LIST_FEATURES);
};
/**
 * Obtiene una lista de todos los aparcamientos activos, con su id, familia, nombre, categoría,
 * tipo, dirección completa y coordenadas.
 * @param {*} language
 */
Parking.prototype.listParking = function(language) {
  const body = { language };
  return this.makeRequest(parking_endpoints.LIST_PARKING, body);
};
/**
 * Obtiene una lista de direcciones y POIs (aparcamientos incluidos) que coincidan total o
 * parcialmente, con un texto pasado como parámetro.
 * @param {*} address
 * @param {*} language
 */
Parking.prototype.listStreetPoisParking = function(address, language) {
  const body = { address, language };
  return this.makeRequest(
    parking_endpoints.LIST_STREET_POIS_PARKING,
    address,
    body
  );
};
/**
 * Obtiene una lista de las familias, tipos y categorías de POIs activos en el sistema.
 * @param {*} language
 */
Parking.prototype.listTypesPOIs = function(language) {
  const body = { language };
  return this.makeRequest(parking_endpoints.LIST_TYPES_POIS, body);
};

module.exports = Parking;
