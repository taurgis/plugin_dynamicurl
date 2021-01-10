'use strict';

/**
 * @namespace RedirectURL
 */

var server = require('server');
var base = module.superModule;

server.extend(base);

/**
 * First checks if there is a Dynamic URL available before redirecting to the default behaviour. If a
 * URL is configured, it will be shown.
 */
server.prepend('Start', function (req, res, next) {
    var ISML = require('dw/template/ISML');
    var RedirectMgr = require('dw/web/URLRedirectMgr');
    var DynamicURLMgr = require('*/cartridge/scripts/managers/DynamicURLMgr');
    var location = RedirectMgr.getRedirectOrigin();
    var dynamicURL = DynamicURLMgr.getDynamicURL(location);

    if (dynamicURL) {
        ISML.renderTemplate('dynamicurl/render', {
            dynamicURL: dynamicURL
        });
    } else {
        next();
    }
});

module.exports = server.exports();
