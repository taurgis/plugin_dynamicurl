'use strict';

var Status = require('dw/system/Status');
var SitemapMgr = require('dw/sitemap/SitemapMgr');
var File = require('dw/io/File');

/**
 * Add custome sitemap to the host sitemaps.
 *
 * @param {dw.util.HashMap} args - The job arguments
 * @returns {dw.system.Status} - The result status
 */
function addCustomSitemap(args) {
    if (empty(args.hostName) || empty(args.sourceDirectory) || empty(args.filePattern)) {
        return new Status(Status.ERROR, 'ERROR');
    }

    var sourceDirectory = new File(File.IMPEX + File.SEPARATOR + args.sourceDirectory);

    if (!sourceDirectory.exists()) {
        sourceDirectory.mkdirs();
    }

    if (sourceDirectory.isDirectory()) {
        var fileList = sourceDirectory.listFiles().iterator();
        var filePatternRegex = new RegExp(args.filePattern);
        while (fileList.hasNext()) {
            var file = fileList.next();

            if (filePatternRegex.test(file.name)) {
                var Transaction = require('dw/system/Transaction');

                // eslint-disable-next-line no-loop-func
                Transaction.wrap(function () {
                    SitemapMgr.addCustomSitemapFile(args.hostName, file);
                });
            }
        }
    } else {
        return new Status(Status.ERROR, 'Directory configured appears to be a file.');
    }

    return new Status(Status.OK, 'OK');
}

module.exports.addCustomSitemap = addCustomSitemap;
