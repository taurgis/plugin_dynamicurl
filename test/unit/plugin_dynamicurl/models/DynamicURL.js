'use strict';

const expect = require('chai').expect;
const set = require('lodash/set');

require('app-module-path').addPath(process.cwd() + '/cartridges');

// const DynamicURL = require('../../../../cartridges/plugin_dynamicurl/cartridge/models/DynamicURL');
const DynamicURL = require('plugin_dynamicurl/cartridge/models/DynamicURL');
/*
const dynamicURLMock = {
    custom: {
        path: 'my_path',
        contentID: 'my_content_id',
        type: {
            value: 'my_type'
        }
    }
};
*/

const dynamicURLMock = {};

set(dynamicURLMock, 'custom.path', 'my_path');
set(dynamicURLMock, 'custom.contentID', 'my_content_id');
set(dynamicURLMock, 'custom.type.value', 'my_type');

describe('DynamicURL Model', () => {
    it('Should create an empty object if no Dynamic URL custom object is passed', () => {
        const dynamicURL = new DynamicURL(null);

        expect(dynamicURL).to.be.empty;
    });

    it('Should have the required properties, based on the given DynamicURL Custom Object.', () => {
        const dynamicURL = new DynamicURL(dynamicURLMock);

        expect(dynamicURL.path).to.not.be.undefined;
        expect(dynamicURL.path).to.equal(dynamicURLMock.custom.path);

        expect(dynamicURL.contentID).to.not.be.undefined;
        expect(dynamicURL.contentID).to.equal(dynamicURLMock.custom.contentID);

        expect(dynamicURL.type).to.not.be.undefined;
        expect(dynamicURL.type).to.equal(dynamicURLMock.custom.type.value);
    });
});
