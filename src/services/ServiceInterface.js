"use strict";

const request = require("request-promise");
const { BUS_DOMAIN } = require("../config/url");
const { BIKE } = require("../config/category");

/**
 * Superclass Service that holds the common features across the different service requests
 * @param {string} clientId - Client username to identify with
 * @param {string} passKey - Password to validate the client autentification
 */
const ServiceInterface = function (clientId, passKey, rest_method) {
  let client = clientId; // private attribute
  let pass = passKey; // private attribute
  this.rest_method = rest_method;

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
  this.glueURL = function (endpoint, params) {
    return `${BUS_DOMAIN}${this.category}/${endpoint}.php`;
  };
  /**
   * Forms the authentication credentials so it can be added to
   * the request body, therefore the user can succesfully
   * have permission to it.
   */
  this.glueBody = function (params) {
    if (this.category === BIKE) return;
    const auth = {};
    auth["idClient"] = this.getClient();
    auth["passKey"] = this.getPassword();

    Object.assign(params, auth);
    return params;
  };
};

/**
 * Handles the request as it glues up all the parts needed to
 * fit the body
 * @param {string} endpoint The Web service endpoint
 * @param {object} body The data that will be sent to the ws
 * @returns {promise}
 */
ServiceInterface.prototype.makeRequest = function (endpoint, params = {}) {
  const url = this.glueURL(endpoint, params);
  const body = this.glueBody(params);

  return new Promise((resolve, reject) => {
    request({
      method: this.rest_method,
      uri: url,
      form: body,
      gzip: true,
      strictSSL: false // Spain goverment sign their own SSL certificates, ಠ.ಠ
    })
      .then(response => {
        const result = JSON.parse(response);

        if (Number(result.ReturnCode) === 1) return reject("No PassKey necesary");
        if (Number(result.ReturnCode) === 2) return reject("PassKey distinct than the current Passkey");
        if (Number(result.ReturnCode) === 3) return reject("PassKey expired");
        if (Number(result.ReturnCode) === 4) return reject("Client unauthorized");
        if (Number(result.ReturnCode) === 5) return reject("Client deactivate");
        if (Number(result.ReturnCode) === 6) return reject("Client locked");
        if (Number(result.ReturnCode) === 9) return reject("Attemp to Auth Failed");

        return resolve(result);
      })
      .catch(error => {
        return reject("The request failed: ", error);
      });
  });
};

module.exports = ServiceInterface;
