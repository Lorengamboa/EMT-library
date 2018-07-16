"use strict";

var assert = require("assert");
var emt = require("../src");

require("dotenv").config();

describe("EMT TDD", function () {
    let EMT;
    before(function () {
        EMT = emt(process.env.CLIENT_ID, process.env.PASS_KEY);
    });
    describe("Bus API service", function () {
        let bus;

        before(function () {
            bus = EMT("bus");
        });

        it("/getCalendar", function () {
            return bus
                .getCalendar("09/09/2016", "09/09/2017")
                .then(res => {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    return new Error(err);
                });
        });

        it("/getGroups", function () {
            return bus
                .getGroups()
                .then(res => {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                    done();
                })
                .catch(err => {
                    return new Error(err);
                });
        });

        it("/getListLines ", function () {
            return bus
                .getListLines("09/09/2016", "121")
                .then(res => {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                    done();
                })
                .catch(err => {
                    return new Error(err);
                });
        });

        it("/getNodesLines ", function () {
            return bus
                .getNodesLines("111")
                .then(res => {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                    done();
                })
                .catch(err => {
                    return new Error(err);
                });
        });

        it("/getRouteLines", function () {
            return bus
                .getRouteLines("09/09/2017", "121")
                .then(res => {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    return new Error(err);
                });
        });

        it("/getRouteLinesRoute", function () {
            return bus
                .getRouteLinesRoute("09/09/2015", "123")
                .then(res => {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    return new Error(err);
                });
        });

        it("/getTimeTableLines ", function () {
            return bus
                .getTimeTableLines("09/09/2016", "121")
                .then(res => {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    return new Error(err);
                });
        });

        it("/getTimesLines ", function () {
            return bus
                .getTimesLines("09/09/2016", "121")
                .then(res => {
                    assert.equal(
                        res["resultDescription"],
                        "Resultado de la operacion Correcta"
                    );
                })
                .catch(err => {
                    return new Error(err);
                });
        });
    });

    describe("InfoParking API service", function () {
        let park;

        before(function () {
            park = EMT("park");
        });

        it("/getStations", function () {
            return park
                .detailParking()
                .then(res => {
                    
                })
                .catch(err => {
                    throw new Error(err);
                });
        });
        
    });

    describe("Media API service", function () {
        let media;

        before(function () {
            media = EMT("media");
        });

        it("/getEstimatesIncident", function () {
            return media
                .getRouteWithAlarmResponse(10)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                    throw new Error(err);
                });
        });
        
    });

    describe("Bike API service", function () {
        let bike;

        before(function () {
            bike = EMT("bike");
        });

        it("/getStations", function () {
            return bike
                .getStations()
                .then(res => {
                    expect(res.code).to.equal(1);
                })
                .catch(err => {
                    return new Error(err);
                });
        });

        it("/getSingleStations", function () {
            return bike
                .getSingleStations(0)
                .then(res => {
                    expect(res.code).to.equal(1);
                })
                .catch(err => {
                    return new Error(err);
                });
        });
        
    });
});
