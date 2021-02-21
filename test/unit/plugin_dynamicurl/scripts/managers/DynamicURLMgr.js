'use strict';

const expect = require('chai').expect;
const set = require('lodash/set');
const sinon = require('sinon');

require('dw-api-mock/demandware-globals');
require('app-module-path').addPath(process.cwd() + '/cartridges');

const CustomObjectMgr = require('dw/object/CustomObjectMgr');

CustomObjectMgr.queryCustomObject = sinon.stub();
CustomObjectMgr.getAllCustomObjects = sinon.stub();

const dummyCustomObject = {};
set(dummyCustomObject, 'custom.type.value', null);

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
            CustomObjectMgr.queryCustomObject.returns(dummyCustomObject);

            const result = DynamicURLMgr.getDynamicURL('existing-path');

            expect(result).to.not.be.null;
        });
    });

    describe('getAllDynamicURLs', () => {
        it('should return an empty array if there are no Dynamic URLs', () =>{
            CustomObjectMgr.getAllCustomObjects.returns({
                hasNext: () => false
            });

            const result = DynamicURLMgr.getAllDynamicURLs();

            expect(result).to.be.length(0);
        });

        it('should return an array with all Dynamic URLs', () => {
            const hasNextStub = sinon.stub();

            CustomObjectMgr.getAllCustomObjects.returns({
                hasNext: hasNextStub,
                next: () => dummyCustomObject
            });

            hasNextStub.onCall(0).returns(true);
            hasNextStub.onCall(1).returns(true);
            hasNextStub.onCall(2).returns(false);

            const result = DynamicURLMgr.getAllDynamicURLs();

            expect(result).to.be.length(2);
        });
    });
});
