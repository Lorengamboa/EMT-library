'use strict';

var assert = require('assert');
var emt = require('../src');

require('dotenv').config();

describe('EMT TDD', function () {
    let EMT;
    before(function () {
        EMT = emt(process.env.CLIENT_ID, process.env.PASS_KEY);
    });
    describe('Bus API service', function (done) {
        let bus;

        before(function () {
            bus = EMT('bus');
        });

        it('/getCalendar', function () {
            return bus.getCalendar('09/09/2016', '09/09/2017')
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                });
        });

        it('/getGroups ', function () {
            return bus.getGroups()
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                });
        });

        it('/getListLines ', function () {
            return bus.getListLines('09/09/2016', '121')
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                });
        });

        it('/getNodesLines ', function () {
            return bus.getNodesLines('111')
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                });
        });

        it('/getRouteLines', function () {
            return bus.getRouteLines('09/09/2017', '121')
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                });
        });

        it('/getRouteLinesRoute', function () {
            return bus.getRouteLinesRoute('09/09/2015', '123')
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                });
        });

        it('/getTimeTableLines ', function () {
            return bus.getTimeTableLines('09/09/2016', '121')
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                });
        });

        it('/getTimesLines ', function () {
            return bus.getTimesLines('09/09/2016', '121')
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                });
        });

    });

    describe('Bike API service', function (done) {
        let bike;

        before(function () {
            bike = EMT('bike');
        });

        it('/getStations', function () {
            return bike.getStations()
                .then(function (res) {
                    assert.equal(res["code"], "0");
                });
        });

        it('/getSingleStations', function () {
            return bike.getSingleStations("1")
                .then(function (res) {
                    assert.equal(res["code"], "0");
                });
        });

    });
});