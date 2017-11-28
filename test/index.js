'use strict';

var assert = require('assert');
var emt = require('../');

require('dotenv').config();

describe('EMT TDD', function () {
    let EMT;
    before(function () {
        EMT = emt(process.env.CLIENT_ID, process.env.PASS_KEY);
    });
    describe('Bus API method requests', function (done) {
        let bus;

        before(function () {
            bus = EMT('bus');
        });

        it('/getCalendar ', function (done) {
            bus.getCalendar({ SelectDateBegin: '09/09/2016', SelectDateEnd: '09/09/2017' })
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                    done();
                });
        });

        it('/getGroups ', function (done) {
            bus.getGroups()
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                    done();
                });
        });

        it('/getListLines ', function (done) {
            bus.getListLines({ SelectDate: '09/09/2016', Lines: '121' })
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                    done();
                });
        });

        it('/getNodesLines ', function (done) {
            bus.getNodesLines({ Nodes: '111' })
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                    done();
                });
        });

        it('/getRouteLines ', function (done) {
            bus.getRouteLines({ SelectDate: '09/09/2015', Lines: '123' })
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                    done();
                });
        });

        it('/getRouteLinesRoute ', function (done) {
            bus.getRouteLinesRoute({ SelectDate: '09/09/2015', Lines: '123' })
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                    done();
                });
        });

        it('/getTimeTableLines ', function (done) {
            bus.getTimeTableLines({ SelectDate: '09/09/2015', Lines: '123' })
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                    done();
                });
        });

        it('/getTimesLines ', function (done) {
            bus.getTimesLines({ SelectDate: '09/09/2015', Lines: '123' })
                .then(function (res) {
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta");
                    done();
                });
        });

    });

});