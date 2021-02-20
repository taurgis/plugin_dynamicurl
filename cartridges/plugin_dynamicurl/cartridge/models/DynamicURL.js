'use strict';

/**
 * The model representing a Dynamic URL custom object.
 *
 * @param {dw.object.CustomObject} dynamicURL - The custom object representing a Dynamic URL.
 *
 * @constructor
 */
function DynamicURL(dynamicURL) {
    if (!dynamicURL) {
        return;
    }

    this.path = dynamicURL.custom.path;
    this.contentID = dynamicURL.custom.contentID;
    this.type = dynamicURL.custom.type.value;
}

module.exports = DynamicURL;
