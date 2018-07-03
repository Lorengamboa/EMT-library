"use strict";

const { bus_endpoints } = require("../config/endpoints");
const Service = require("./ServiceInterface");

/**
 * Bus service that holds all it's methods to make accesible request and return a response
 * in JSON
 *
 * @param {string} clientId - client username to identify with
 * @param {string} passKey - password to validate the client autentification
 * @param {string} category - It can either be bus or geo
 */
const Bus = function(clientId, passKey, category, rest_method) {
  Service.call(this, clientId, passKey, rest_method);
  this.category = category;
};

Bus.prototype = Object.create(Service.prototype); // inherits from service class

/**
 * Get EMT Calendar for all days and line schedules for a range of dates
 * @param {string} SelectDateBegin
 * @param {string} SelectDateEnd
 * @returns {promise}
 */
Bus.prototype.getCalendar = function(SelectDateBegin, SelectDateEnd) {
  const body = { SelectDateBegin, SelectDateEnd };
  return this.makeRequest(bus_endpoints.GET_CALENDAR, body);
};
/**
 * Returns every line type and their details
 * @returns {promise}
 */
Bus.prototype.getGroups = function() {
  return this.makeRequest(bus_endpoints.GET_GROUPS);
};
/**
 * Returns lines with description and group
 * @param {string} SelectDate
 * @param {string} Lines
 * @returns {promise}
 */
Bus.prototype.getListLines = function(SelectDate, Lines) {
  const body = { SelectDate, Lines };
  return this.makeRequest(bus_endpoints.GET_LIST_LINES, body);
};
/**
 * Returns all stop identifiers and his coordinate, name,
 * lines and directions
 * @param {string} Nodes
 * @returns {promise}
 */
Bus.prototype.getNodesLines = function(Nodes) {
  const body = { Nodes };
  return this.makeRequest(bus_endpoints.GET_NODES_LINES, body);
};
/**
 * Returns a line/s route with the vertex info to build the route and
 * coordinates for stops and axes
 * @param {string} SelectDate
 * @param {string} Lines
 * @returns {promise}
 */
Bus.prototype.getRouteLines = function(SelectDate, Lines) {
  const body = { SelectDate, Lines };
  return this.makeRequest(bus_endpoints.GET_ROUTE_LINES, body);
};
/**
 * Get line route with vertex info to build map and coordinates for Stops
 * @param {string} SelectDate
 * @param {string} Lines
 * @returns {promise}
 */
Bus.prototype.getRouteLinesRoute = function(SelectDate, Lines) {
  const body = { SelectDate, Lines };
  return this.makeRequest(bus_endpoints.GET_ROUTE_LINES_ROUTE, body);
};
/**
 * Provices information about the requested line at travel details
 * @param {string} SelectDate
 * @param {string} Lines
 * @returns {promise}
 */
Bus.prototype.getTimeTableLines = function(SelectDate, Lines) {
  const body = { SelectDate, Lines };
  return this.makeRequest(bus_endpoints.GET_TIME_TABLE_LINES, body);
};
/**
 * Returns current schedules for the requested lines
 * @param {string} SelectDate
 * @param {string} Lines
 * @returns {promise}
 */
Bus.prototype.getTimesLines = function(SelectDate, Lines) {
  const body = { SelectDate, Lines };
  return this.makeRequest(bus_endpoints.GET_TIMES_LINES, body);
};

module.exports = Bus;
