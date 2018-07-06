"use strict";

const { media_endpoints } = require("../config/endpoints");
const Service = require("./ServiceInterface");

const REST_METHOD = "POST"; 

/**
 * Multimedia service that holds all it's methods to make accesible request and return a response
 * in JSON
 * @param {string} clientId - client username to identify with
 * @param {string} passKey - password to validate the client autentification
 * @param {string} category - It can either be bus or geo
 */
const Multimedia = function (clientId, passKey, category) {
	Service.call(this, clientId, passKey, REST_METHOD);
	this.category = category;
};

Multimedia.prototype = Object.create(Service.prototype); // inherits from service class

/**
 * Get estimate arrival time to stop and its related issues
 */
Multimedia.prototype.getEstimatesIncident = function (params) {
	return this.makeRequest(media_endpoints.GET_ESTIMATES_INCIDENT, params);
};
/**
 * Request up to three optimal routes from one place to another using bus or walking,
 * source and destination must be in a format known for the system, which means that
 * should have been validated by a GetStreet call
 */
Multimedia.prototype.getStreetRoute = function (params) {
	return this.makeRequest(media_endpoints.GET_STREET_ROUTE, params);
};

/**
 *
 */
Multimedia.prototype.getRouteWithAlarm = function (params) {
	return this.makeRequest(media_endpoints.GET_ROUTE_WITH_ALARM, params);
};
/**
 *
 */
Multimedia.prototype.getRouteWithAlarmResponse = function (params) {
	return this.makeRequest(
		media_endpoints.GET_ROUTE_WITH_ALARM_RESPONSE,
		params
	);
};
/**
 *
 */
Multimedia.prototype.getRoute = function (params) {
	return this.makeRequest(media_endpoints.GET_ROUTE, params);
};
/**
 *
 */
Multimedia.prototype.getRouteResponse = function (params) {
	return this.makeRequest(media_endpoints.GET_ROUTE_RESPONSE, params);
};

module.exports = Multimedia;
