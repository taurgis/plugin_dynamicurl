'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var base = module.superModule;

server.extend(base);

var errorNotFoundChain = server.getRoute('ErrorNotFound').chain;

/**
 * Create a new endpoint that is the duplicate of the Home-ErrorNotFound endpoint.
 */
server.get('ErrorNotFoundInclude', errorNotFoundChain[0]);

/**
 * Attach all remaining middleware that are on Home-ErrorNotFound to the new endpoint.
 *
 * Note: This is done to prevent automatic URL rewriting as <isinclude> does not work for those.
 */
errorNotFoundChain.forEach(function (chainItem, index) {
    // Ignore the first middleware, since it is already attached
    if (index > 0) {
        server.append('ErrorNotFoundInclude', chainItem, function (req, res, next) {
            // Set status code to 200 as you are not allowed to include an URL that returns 404
            res.setStatusCode(200);

            next();
        });
    }
});

module.exports = server.exports();
