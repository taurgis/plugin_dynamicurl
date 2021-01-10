'use strict';

var DYNAMIC_URL = 'DynamicUrl';
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var DynamicURL = require('*/cartridge/models/DynamicURL');

/**
 * Fetches a Dynamic URL based on the configured source.
 *
 * @param {string} path - The source path.
 * @returns {Object} - The Dynamic URL Object
 */
function getDynamicURL(path) {
    var customObject = CustomObjectMgr.queryCustomObject(DYNAMIC_URL, 'custom.path = {0}', path);

    if (customObject) {
        return new DynamicURL(customObject);
    }

    return null;
}

module.exports = {
    getDynamicURL: getDynamicURL
};
