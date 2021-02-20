'use strict';

/**
 * @namespace RedirectURL
 */

var server = require('server');
var base = module.superModule;

/**
 * This regex matches the standard 404 URL pattern configured in the Business Manager. Adapt
 * this to your own project URL to keep this working.
 *
 * @type {RegExp}
 */
var REGEX_404 = /\/404/g;

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

        if (!location || (location.match(REGEX_404).length > 0)) {
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
