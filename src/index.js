'use strict';

const { Bike, Bus, Geo, Multimedia, Parking } = require('./services');
const SERVICE_CATEGORY = require('./config/category');

/**
 * Factory function that will return the different accesible methods as long as u
 * return a preselected category
 * @param {string} clientId - Client username to identify with
 * @param {string} passKey - Password to validate the client autentification
 * @param {string} category - It can either be bus or geo
 */
module.exports = function emtService(clientId, passKey) {
    return function typeService(service) {
        if (service === 'bus') return new Bus(clientId, passKey, SERVICE_CATEGORY.BUS, 'POST');
        if (service === 'geo') return new Geo(clientId, passKey, SERVICE_CATEGORY.GEO, 'POST');
        if (service === 'media') return new Multimedia(clientId, passKey, SERVICE_CATEGORY.MULTIMEDIA, 'POST');
        if (service === 'bike') return new Bike(clientId, passKey, SERVICE_CATEGORY.BIKE, 'GET');
        if (service === 'parking') return new Parking(clientId, passKey, 'POST');
    };
};