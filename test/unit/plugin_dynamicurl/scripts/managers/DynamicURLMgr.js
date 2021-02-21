'use strict';

const expect = require('chai').expect;
const set = require('lodash/set');
const sinon = require('sinon');

require('dw-api-mock/demandware-globals');
require('app-module-path').addPath(process.cwd() + '/cartridges');

const CustomObjectMgr = require('dw/object/CustomObjectMgr');
CustomObjectMgr.queryCustomObject = sinon.stub();

const DynamicURLMgr = require('plugin_dynamicurl/cartridge/scripts/managers/DynamicURLMgr');

describe('DynamicURLMgr', () =>{
    describe('getDynamicURL', () => {
        beforeEach(() => {
            CustomObjectMgr.queryCustomObject.reset();
        });

        it('Should return null if no Dynamic URL is found for the given URL.', () => {
            CustomObjectMgr.queryCustomObject.returns(null);

            const result = DynamicURLMgr.getDynamicURL('non-existent-path');

            expect(result).to.be.null;
        });

        it('Should return a Dynamic URL model when the path given exists.', () => {
            const dummyObject = {};
            set(dummyObject, 'custom.type.value', null);

            CustomObjectMgr.queryCustomObject.returns(dummyObject);

            const result = DynamicURLMgr.getDynamicURL('existing-path');

            expect(result).to.not.be.null;
        });
    });
});
