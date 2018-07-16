"use strict";

const { BIKE_DOMAIN } = require("../config/url");
const { bike_endpoints } = require("../config/endpoints");
const Service = require("./ServiceInterface");

const REST_METHOD = "GET"; 

/**
 * Set of services that let's know the actual state and availability
 * for all the bikes located in Madrid
 *
 * @param {string} clientId - client username to identify with
 * @param {string} passKey - password to validate the client autentification
 */
const Bike = function (clientId, passKey, category) {
	Service.call(this, clientId, passKey, REST_METHOD);
	this.category = category;

	this.glueURL = function (endpoint, params) {
		if (isNaN(params)) params = "";

		return `${BIKE_DOMAIN}/${
			this.category
			}/${endpoint}/${this.getClient()}/${this.getPassword()}}/${params}`;
	};
};

Bike.prototype = Object.create(Service.prototype); // inherits from service class

/**
 * Obtiene la relación de todas las bases de Bicimad y su estado
 * operacional.
 */
Bike.prototype.getStations = function () {
	return this.makeRequest(bike_endpoints.GET_STATIONS);
};
/**
 * Obtiene la información de una base
 */
Bike.prototype.getSingleStations = function (baseId) {
	return this.makeRequest(bike_endpoints.GET_SINGLE_STATION, baseId);
};

module.exports = Bike;
