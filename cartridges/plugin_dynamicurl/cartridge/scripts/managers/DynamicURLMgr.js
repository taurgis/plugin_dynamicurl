'use strict';

var DYNAMIC_URL = 'DynamicUrl';
var { queryCustomObject, getAllCustomObjects } = require('dw/object/CustomObjectMgr');
var DynamicURL = require('../../models/DynamicURL');

/**
 * Fetches a Dynamic URL based on the configured source.
 *
 * @param {string} path - The source path.
 * @returns {Object} - The Dynamic URL Object
 */
function getDynamicURL(path) {
    var customObject = queryCustomObject(DYNAMIC_URL, 'custom.path = {0}', path);

    if (customObject) {
        return new DynamicURL(customObject);
    }

    return null;
}

/**
 * Fetches all configured Dynamic URLs
 * @returns {[Object]} - The list of Dynamic URLS
 */
function getAllDynamicURLs() {
    var dynamicUrls = [];
    var customObjects = getAllCustomObjects(DYNAMIC_URL);

    while (customObjects.hasNext()) {
        dynamicUrls.push(new DynamicURL(customObjects.next()));
    }

    return dynamicUrls;
}

module.exports = {
    getDynamicURL: getDynamicURL,
    getAllDynamicURLs: getAllDynamicURLs
};
