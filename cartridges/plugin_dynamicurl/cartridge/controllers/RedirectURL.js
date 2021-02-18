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
    var { renderTemplate } = require('dw/template/ISML');
    var { getRedirectOrigin, getRedirect } = require('dw/web/URLRedirectMgr');
    var { getDynamicURL } = require('*/cartridge/scripts/managers/DynamicURLMgr');

    var redirectOrigin = getRedirectOrigin();
    var dynamicURL = getDynamicURL(redirectOrigin);

    if (dynamicURL) {
        renderTemplate('dynamicurl/render', {
            dynamicURL: dynamicURL,
            action: 'Page-ShowDynamicURL'
        });
    } else {
        var redirect = getRedirect();
        var location = redirect ? redirect.location : null;

        if (!location) {
            res.setStatusCode(404);
            renderTemplate('dynamicurl/render', {
                action: 'Home-ErrorNotFoundInclude'
            });
        } else {
            next();
        }
    }
});

module.exports = server.exports();
