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
        
        if (service === SERVICE_CATEGORY.BUS) 
            return new Bus(clientId, passKey, SERVICE_CATEGORY.BUS);

        if (service === SERVICE_CATEGORY.GEO) 
            return new Geo(clientId, passKey, SERVICE_CATEGORY.GEO);

        if (service === 'media') 
            return new Multimedia(clientId, passKey, SERVICE_CATEGORY.MULTIMEDIA);

        if (service === 'bike') 
            return new Bike(clientId, passKey, SERVICE_CATEGORY.BIKE);

        if (service === 'park') 
            return new Parking(clientId, passKey);
    };
};