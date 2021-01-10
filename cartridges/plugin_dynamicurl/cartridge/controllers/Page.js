'use strict';

/**
 * @namespace RedirectURL
 */

var server = require('server');
var base = module.superModule;

server.extend(base);

var pageShowChain = server.getRoute('Show').chain;

/**
 * Set a new endpoint to show Dynamic URLs. This is because URL rewritten URLs can't be used as an include.
 * Set the first middleware of the Page-Show controller in order to create the new endpoint.
 */
server.get('ShowDynamicURL', pageShowChain[0]);

/**
 * Attach all remaining middleware that are on Page-Show to the new Dynamic URL endpoint.
 */
pageShowChain.forEach(function (chainItem, index) {
    // Ignore the first middleware, since it is already attached
    if (index > 0) {
        server.append('ShowDynamicURL', chainItem);
    }
});

module.exports = server.exports();
