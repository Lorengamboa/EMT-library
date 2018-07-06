"use strict";

var assert = require("assert");
var emt = require("../src");

require("dotenv").config();

describe("EMT TDD", function () {
    let EMT;
    before(function () {
        EMT = emt(process.env.CLIENT_ID, process.env.PASS_KEY);
    });
    describe("Bus API service", function (done) {
        let bus;

        before(function () {
            bus = EMT("bus");
        });

        it("/getCalendar", function (done) {
            return bus
                .getCalendar("09/09/2016", "09/09/2017")
                .then(function (res) {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    done(new Error(err));
                });
        });

        it("/getGroups", function (done) {
            return bus
                .getGroups()
                .then(function (res) {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    done(new Error(err));
                });
        });

        it("/getListLines ", function (done) {
            return bus
                .getListLines("09/09/2016", "121")
                .then(function (res) {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    done(new Error(err));
                });
        });

        it("/getNodesLines ", function (done) {
            return bus
                .getNodesLines("111")
                .then(function (res) {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    done(new Error(err));
                });
        });

        it("/getRouteLines", function (done) {
            return bus
                .getRouteLines("09/09/2017", "121")
                .then(function (res) {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    done(new Error(err));
                });
        });

        it("/getRouteLinesRoute", function (done) {
            return bus
                .getRouteLinesRoute("09/09/2015", "123")
                .then(function (res) {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    done(new Error(err));
                });
        });

        it("/getTimeTableLines ", function (done) {
            return bus
                .getTimeTableLines("09/09/2016", "121")
                .then(function (res) {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    done(new Error(err));
                });
        });

        it("/getTimesLines ", function (done) {
            return bus
                .getTimesLines("09/09/2016", "121")
                .then(function (res) {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    done(new Error(err));
                });
        });
    });
});
