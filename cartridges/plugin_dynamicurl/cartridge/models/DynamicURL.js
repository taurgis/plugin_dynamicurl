'use strict';

/**
 * The model representing a Dynamic URL custom object.
 *
 * @param {dw.object.CustomObject} dynamicURL - The custom object representing a Dynamic URL.
 *
 * @constructor
 */
function DynamicURL(dynamicURL) {
    if (!dynamicURL || !dynamicURL.custom) {
        return;
    }

    this.path = dynamicURL.custom.path || null;
    this.contentID = dynamicURL.custom.contentID || null;
    this.type = dynamicURL.custom.type ? dynamicURL.custom.type.value : null;
}

module.exports = DynamicURL;
