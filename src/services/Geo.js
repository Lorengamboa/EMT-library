"use strict";

const { geo_endpoints } = require("../config/endpoints");
const Service = require("./ServiceInterface");

const REST_METHOD = "POST";

/**
 * Geo service that holds all it's methods to make accesible request and return a response
 * in JSON
 *
 * @param {string} clientId - client username to identify with
 * @param {string} passKey - password to validate the client autentification
 * @param {string} category - It can either be bus or geo
 */
const Geo = function(clientId, passKey, category) {
  Service.call(this, clientId, passKey, REST_METHOD);
  this.category = category;
};

Geo.prototype = Object.create(Service.prototype); // inherits from service class

/**
 * Gets bus arrive info to a target stop
 */
Geo.prototype.getArriveStop = function(params) {
  return this.makeRequest(geo_endpoints.GET_ARRIVE_STOP, params);
};
/**
 * Return a list of groups
 */
Geo.prototype.getGroups = function(params) {
  return this.makeRequest(geo_endpoints.GET_GROUPS, params);
};
/**
 * Returns line info in a target date
 */
Geo.prototype.getInfoLine = function(params) {
  return this.makeRequest(geo_endpoints.GET_INFO_LINE, params);
};
/**
 * Returns line info in a target date
 */
Geo.prototype.getInfoLineExtend = function(params) {
  return this.makeRequest(geo_endpoints.GET_INFO_LINE_EXTEND, params);
};
/**
 * Returns a list of Points of Interest from a coordinate center with a target radius
 */
Geo.prototype.getPointsOfInterest = function(params) {
  return this.makeRequest(geo_endpoints.GET_POINTS_OF_INTEREST, params);
};
/**
 * Returns a list of Point of interest types
 */
Geo.prototype.getPointsOfInterestTypes = function(params) {
  return this.makeRequest(geo_endpoints.GET_POINTS_OF_INTEREST_TYPES, params);
};
/**
 * Returns a list of Point of interest types
 */
Geo.prototype.getRouteLineRoute = function(params) {
  return this.makeRequest(geo_endpoints.GET_ROUTE_LINES_ROUTE, params);
};
/**
 * Returns a list of stops from a target stop with a target radius and the lines arriving to those stops.
 */
Geo.prototype.getStopsFromStop = function(params) {
  return this.makeRequest(geo_endpoints.GET_STOPS_FROM_STOP, params);
};
/**
 * Returns a list of stops from a coordinate with a radius and the lines arriving to those stops
 */
Geo.prototype.getStopsFromXY = function(params) {
  return this.makeRequest(geo_endpoints.GET_STOPS_FROM_XY, params);
};
/**
 * Provices information about the requested line at travel time
 */
Geo.prototype.getStopsLine = function(params) {
  return this.makeRequest(geo_endpoints.GET_STOPS_LINE, params);
};
/**
 * Returns a list of EMT nodes related to a location. All EMT locations are a group of stops
 * within a target radius and the lines related to each stop in the list
 */
Geo.prototype.getStreet = function(params) {
  return this.makeRequest(geo_endpoints.GET_STREET, params);
};
/**
 * Returns a list of stops from a target coordinate
 */
Geo.prototype.getStreetFromXY = function(params) {
  return this.makeRequest(geo_endpoints.GET_STREET_FROM_XY, params);
};

module.exports = Geo;
