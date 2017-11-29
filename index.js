'use strict';

const request = require('request-promise');
const {
	BUS_DOMAIN,
	BIKE_DOMAIN,
	PARKING_DOMAIN
} = require('./config/url');
const {
	BUS,
	GEO,
	MULTIMEDIA
} = require('./config/category');
const {
	bus_endpoints,
	geo_endpoints,
	media_endpoints
} = require('./config/endpoints');

/**
 * Factory function that will return the different accesible methods as long as u
 * return a preselected category
 * @param {string} clientId - Client username to identify with
 * @param {string} passKey - Password to validate the client autentification
 * @param {string} category - It can either be bus or geo
 */
module.exports = function emtService(clientId, passKey) {
	return function typeService(category) {
		if (category === 'bus') return new Bus(clientId, passKey, BUS);
		if (category === 'geo') return new Geo(clientId, passKey, GEO);
		if (category === 'media') return new Geo(clientId, passKey, MULTIMEDIA);
		if (category === 'bike') return;
		if (category === 'parking') return;
	};
};

/**
 * Superclass Service that holds the common features across the different service requests
 * @param {string} clientId - Client username to identify with
 * @param {string} passKey - Password to validate the client autentification
 * @param {string} category - It can either be bus or geo
 */
const Service = function (clientId, passKey, category) {
	var client = clientId; // private attribute
	var pass = passKey; // private attribute
	this.category = category;

	/** 
	 * Getters & Setters
	 */
	this.getClient = function () {
		return client;
	};

	this.setClient = function (client) {
		this.client = client;
	};

	this.getPassword = function () {
		return pass;
	};

	this.setPassword = function (pass) {
		this.pass = pass;
	};
	/**
	 * Forms the entire domain for the desired request
	 */
	this.glueURL = function () {
		return BUS_DOMAIN + this.category;
	};
	/**
	 * Forms the authentication credentials so it can be added to
	 * the body of the request and so, the user can succesfully 
	 * have permission to it.
	 */
	this.glueAuth = function () {
		const auth = {};
		auth['idClient'] = this.getClient();
		auth['passKey'] = this.getPassword();

		return auth;
	};

};

/**
 * Handles the request as it glues up all the parts needed to
 * fit the body
 * @param {string} endpoint The Web service endpoint 
 * @param {object} body The data that will be sent to the ws 
 * @returns {promise} 
 */
Service.prototype.makeRequest = function (endpoint, body = {}) {
	/*
	   Creates an object that will embed 
	   the cliendId and the password into 
	   itself
    */
	Object.assign(body, this.glueAuth());

	return request({
		'method': 'POST',
		'uri': this.glueURL() + '/' + endpoint + '.php',
		'form': body,
		'gzip': true,
		'strictSSL': false // Spain goverment sign their own SSL certificates, ಠ.ಠ
	})
		.then(function (response) {
			return JSON.parse(response);
		});
};

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
};

Bus.prototype = Object.create(Service.prototype); // inherits from service class

/**
 * Get EMT Calendar for all days and line schedules for a range of dates
 * @param {string} SelectDateBegin
 * @param {string} SelectDateEnd
 * @returns {promise}
 */
Bus.prototype.getCalendar = function (SelectDateBegin,SelectDateEnd) {
	const body = {SelectDateBegin, SelectDateEnd}
	return this.makeRequest(bus_endpoints.GET_CALENDAR, body);
};
/**
 * Returns every line type and their details
 * @returns {promise}
 */
Bus.prototype.getGroups = function () {
	return this.makeRequest(bus_endpoints.GET_GROUPS);
};
/**
 * Returns lines with description and group
 * @param {string} SelectDate
 * @param {string} Lines
 * @returns {promise}
 */
Bus.prototype.getListLines = function (SelectDate, Lines) {
	const body = {SelectDate, Lines}
	return this.makeRequest(bus_endpoints.GET_LIST_LINES, body);
};
/**
 * Returns all stop identifiers and his coordinate, name, 
 * lines and directions
 * @param {string} Nodes
 * @returns {promise}
 */
Bus.prototype.getNodesLines = function (Nodes) {
	const body = {Nodes};
	return this.makeRequest(bus_endpoints.GET_NODES_LINES, body);
};
/**
 * Returns a line/s route with the vertex info to build the route and 
 * coordinates for stops and axes
 * @param {string} SelectDate
 * @param {string} Lines
 * @returns {promise}
 */
Bus.prototype.getRouteLines = function (SelectDate, Lines) {
	const body = {SelectDate, Lines};
	return this.makeRequest(bus_endpoints.GET_ROUTE_LINES, body);
};
/**
 * Get line route with vertex info to build map and coordinates for Stops
 * @param {string} SelectDate
 * @param {string} Lines
 * @returns {promise}
 */
Bus.prototype.getRouteLinesRoute = function (SelectDate, Lines) {
	const body = {SelectDate, Lines}
	return this.makeRequest(bus_endpoints.GET_ROUTE_LINES_ROUTE, body);
};
/**
 * Provices information about the requested line at travel details
 * @param {string} SelectDate
 * @param {string} Lines
 * @returns {promise}
 */
Bus.prototype.getTimeTableLines = function (SelectDate, Lines) {
	const body = {SelectDate, Lines}
	return this.makeRequest(bus_endpoints.GET_TIME_TABLE_LINES, body);
};
/**
 * Returns current schedules for the requested lines
 * @param {string} SelectDate
 * @param {string} Lines
 * @returns {promise}
 */
Bus.prototype.getTimesLines = function (SelectDate, Lines) {
	const body = {SelectDate, Lines}
	return this.makeRequest(bus_endpoints.GET_TIMES_LINES, body);
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
};

Geo.prototype = Object.create(Service.prototype); // inherits from service class

/**
 * Gets bus arrive info to a target stop
 */
Geo.prototype.getArriveStop = function (params) {
	return this.makeRequest(geo_endpoints.GET_ARRIVE_STOP, params);
};
/**
 * Return a list of groups
 */
Geo.prototype.getGroups = function (params) {
	return this.makeRequest(geo_endpoints.GET_GROUPS, params);
};
/**
 * Returns line info in a target date
 */
Geo.prototype.getInfoLine = function (params) {
	return this.makeRequest(geo_endpoints.GET_INFO_LINE, params);
};
/**
 * Returns line info in a target date
 */
Geo.prototype.getInfoLineExtend = function (params) {
	return this.makeRequest(geo_endpoints.GET_INFO_LINE_EXTEND, params);
};
/**
 * Returns a list of Points of Interest from a coordinate center with a target radius
 */
Geo.prototype.getPointsOfInterest = function (params) {
	return this.makeRequest(geo_endpoints.GET_POINTS_OF_INTEREST, params);
};
/**
 * Returns a list of Point of interest types
 */
Geo.prototype.getPointsOfInterestTypes = function (params) {
	return this.makeRequest(geo_endpoints.GET_POINTS_OF_INTEREST_TYPES, params);
};
/**
 * Returns a list of stops from a target stop with a target radius and the lines arriving to those stops.
 */
Geo.prototype.getStopsFromStop = function (params) {
	return this.makeRequest(geo_endpoints.GET_STOPS_FROM_STOP, params);
};
/**
 * Returns a list of stops from a coordinate with a radius and the lines arriving to those stops
 */
Geo.prototype.getStopsFromXY = function (params) {
	return this.makeRequest(geo_endpoints.GET_STOPS_FROM_XY, params);
};
/**
 * Provices information about the requested line at travel time
 */
Geo.prototype.getStopsLine = function (params) {
	return this.makeRequest(geo_endpoints.GET_STOPS_LINE, params);
};
/**
 * Returns a list of EMT nodes related to a location. All EMT locations are a group of stops 
 * within a target radius and the lines related to each stop in the list
 */
Geo.prototype.getStreet = function (params) {
	return this.makeRequest(geo_endpoints.GET_STREET, params);
};
/**
 * Returns a list of stops from a target coordinate
 */
Geo.prototype.getStreetFromXY = function (params) {
	return this.makeRequest(geo_endpoints.GET_STREET_FROM_XY, params);
};

/**
 * Multimedia service that holds all it's methods to make accesible request and return a response 
 * in JSON
 * @param {string} clientId - client username to identify with
 * @param {string} passKey - password to validate the client autentification
 * @param {string} category - It can either be bus or geo
 */
const Multimedia = function (clientId, passKey, category) {
	Service.call(this, clientId, passKey, category);
};

Multimedia.prototype = Object.create(Service.prototype); // inherits from service class

Multimedia.prototype.getEstimatesIncident = function (params) {
	return this.makeRequest(media_endpoints.getEstimatesIncident, params);
};

Multimedia.prototype.getEstimatesIncident = function (params) {
	return this.makeRequest(media_endpoints.GET_ESTIMATES_INCIDENT, params);
};

Multimedia.prototype.getRouteWithAlarm = function (params) {
	return this.makeRequest(media_endpoints.GET_ROUTE_WITH_ALARM, params);
};

Multimedia.prototype.getRouteWithAlarmResponse = function (params) {
	return this.makeRequest(media_endpoints.GET_ROUTE_WITH_ALARM_RESPONSE, params);
};

Multimedia.prototype.getRoute = function (params) {
	return this.makeRequest(media_endpoints.GET_ROUTE, params);
};

Multimedia.prototype.getRouteResponse = function (params) {
	return this.makeRequest(media_endpoints.GET_ROUTE_RESPONSE, params);
};

// Posible ws code responses
const responses = {
	0: 'PassKey OK and authorized for period',
	1: 'No PassKey necesary',
	2: 'PassKey distinct than the current Passkey',
	3: 'PassKey expired',
	4: 'Client unauthorized',
	5: 'Client deactivate',
	6: 'Client locked',
	9: 'Attemp to Auth Failed'
};