'use strict';

const util = require('util');
const request = require('request-promise');
const SERVER_URL = require('./config/url');
const { BUS, GEO } = require('./config/category');
const { bus_endpoints, geo_endpoints } = require('./config/endpoints');

/**
 * Factory function that will return the different accesible methods as long as u
 * return a preselected category
 * @param {string} clientId - client username to identify with
 * @param {string} passKey - Password to validate the client autentification
 * @param {string} category - It can either be bus or geo
 */
module.exports = function emtService(clientId, passKey, category) {
    if (category === "bus") return new Bus(clientId, passKey, BUS);
    if (category === "geo") return new Geo(clientId, passKey, GEO);
}

/**
 * Superclass Service that holds the common features across the different service requests
 * @param {string} clientId - client username to identify with
 * @param {string} passKey - Password to validate the client autentification
 * @param {string} category - It can either be bus or geo
 */
const Service = function (clientId, passKey, category) {
    var client = clientId; // private attribute
    var pass = passKey; // private attribute
    this.category = category;

    this.getClient = function () {
        return client;
    }

    this.getPassword = function () {
        return pass;
    }

    this.glueURL = function () {
        return SERVER_URL + this.category;
    }

    this.glueAuth = function () {
        const auth = {};
        auth['idClient'] = this.getClient();
        auth['passKey'] = this.getPassword();

        return auth;
    }

}

Service.prototype.makeRequest = function (endpoint, body = {}) {
    /*
       Creates an object that will take all the <key, values>
       taken from the body after iterating it and end up
       embeding the cliendId and the password into it
    */
    for (var property in body) {
        if (body.hasOwnProperty(property)) {
            body.property = body.property;
        }
    }

    Object.assign(body, this.glueAuth());

    return request({
        'method': 'POST',
        'uri': this.glueURL() + '/' + endpoint + '.php',
        'form': body,
        'gzip': true,
        'strictSSL': false // Spain's goverment signs their own SSL certificates, ಠ.ಠ
    })
        .then(function (response) {
            return JSON.parse(response);
        });
}

/**
 * Bus service that holds all it's methods to make accesible request and return a response 
 * in JSON
 * 
 * @param {string} clientId - client username to identify with
 * @param {string} passKey - password to validate the client autentification
 * @param {string} category - It can either be bus or geo
 */
const Bus = function (clientId, passKey, category) {
    Service.call(this, clientId, passKey, category);
}

Bus.prototype = Object.create(Service.prototype); // inherits from service class

/**
 * Get EMT Calendar for all days and line schedules for a range of dates
 */
Bus.prototype.getCalendar = function (params) {
    return this.makeRequest(bus_endpoints.GET_CALENDAR, params);
};
/**
 * Returns every line type and their details
 */
Bus.prototype.getGroups = function () {
    return this.makeRequest(bus_endpoints.GET_GROUPS);
};
/**
 * Returns lines with description and group
 */
Bus.prototype.getListLines = function (params) {
    return this.makeRequest(bus_endpoints.GET_LIST_LINES, params);
};
/**
 * Returns all stop identifiers and his coordinate, name, 
 * lines and directions
 */
Bus.prototype.getNodesLines = function (params) {
    return this.makeRequest(bus_endpoints.GET_NODES_LINES, params);
};
/**
 * Returns a line/s route with the vertex info to build the route and 
 * coordinates for stops and axes
 */
Bus.prototype.getRouteLines = function (params) {
    return this.makeRequest(bus_endpoints.GET_ROUTE_LINES, params);
};
/**
 * Get line route with vertex info to build map and coordinates for Stops
 */
Bus.prototype.getRouteLinesRoute = function (params) {
    return this.makeRequest(bus_endpoints.GET_ROUTE_LINES_ROUTE, params);
};
/**
 * Provices information about the requested line at travel details
 */
Bus.prototype.getTimeTableLines = function (params) {
    return this.makeRequest(bus_endpoints.GET_TIME_TABLE_LINES, params);
};
/**
 * Returns current schedules for the requested lines
 */
Bus.prototype.getTimesLines = function (params) {
    return this.makeRequest(bus_endpoints.GET_TIMES_LINES, params);
};

/**
 * Geo service that holds all it's methods to make accesible request and return a response 
 * in JSON
 * 
 * @param {string} clientId - client username to identify with
 * @param {string} passKey - password to validate the client autentification
 * @param {string} category - It can either be bus or geo
 */
const Geo = function (clientId, passKey, category) {
    Service.call(this, clientId, passKey, category);
}

Geo.prototype = Object.create(Service.prototype); // inherits from service class

/**
 * Gets bus arrive info to a target stop
 */
Geo.prototype.getArriveStop = function () {
    return this.makeRequest(geo_endpoints.GET_ARRIVE_STOP, params);
};
/**
 * Return a list of groups
 */
Geo.prototype.getGroups = function () {
    return this.makeRequest(geo_endpoints.GET_GROUPS, params);
};
/**
 * Returns line info in a target date
 */
Geo.prototype.getInfoLine = function () {
    return this.makeRequest(geo_endpoints.GET_INFO_LINE, params);
};
/**
 * Returns line info in a target date
 */
Geo.prototype.getInfoLineExtend = function () {
    return this.makeRequest(geo_endpoints.GET_INFO_LINE_EXTEND, params);
};
/**
 * Returns a list of Points of Interest from a coordinate center with a target radius
 */
Geo.prototype.getPointsOfInterest = function () {
    return this.makeRequest(geo_endpoints.GET_POINTS_OF_INTEREST, params);
};
/**
 * Returns a list of Point of interest types
 */
Geo.prototype.getPointsOfInterestTypes = function () {
    return this.makeRequest(geo_endpoints.GET_POINTS_OF_INTEREST_TYPES, params);
};
/**
 * Returns a list of stops from a target stop with a target radius and the lines arriving to those stops.
 */
Geo.prototype.getStopsFromStop = function () {
    return this.makeRequest(geo_endpoints.GET_STOPS_FROM_STOP, params);
};
/**
 * Returns a list of stops from a coordinate with a radius and the lines arriving to those stops
 */
Geo.prototype.getStopsFromXY = function () {
    return this.makeRequest(geo_endpoints.GET_STOPS_FROM_XY, params);
};
/**
 * Provices information about the requested line at travel details
 */
Geo.prototype.getStopsLine = function () {
    return this.makeRequest(geo_endpoints.GET_STOPS_LINE, params);
};
/**
 * Returns a list of EMT nodes related to a location. All EMT locations are a group of stops 
 * within a target radius and the lines related to each stop in the list
 */
Geo.prototype.getStreet = function () {
    return this.makeRequest(geo_endpoints.GET_STREET, params);
};
/**
 * Returns a list of stops from a target coordinate
 */
Geo.prototype.getStreetFromXY = function () {
    return this.makeRequest(geo_endpoints.GET_STREET_FROM_XY, params);
};
