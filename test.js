'use strict';

var assert = require('assert');
var emt = require('./');

describe('EMT TDD', function () {

    describe('Bus API method requests', function () {

        it('/getListLines ', function () {
            const bus = emt('WEB.SERV.lorenzogamboagarcia@gmail.com', '744FDBE6-0C89-43EF-8114-536BF14C6E51', 'bus');
            bus.getListLines({ Lines: '', SelectDate: '09/09/1993' })
                .then(function (res) {
                    assert.equal(res['resultCode'], 0);
                    assert.equal(res['resultDescription'], "Resultado de la operacion Correcta")
                });
        });

    });

});