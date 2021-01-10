'use strict';

var Status = require('dw/system/Status');
var SitemapMgr = require('dw/sitemap/SitemapMgr');
var File = require('dw/io/File');

/**
 * Register generated sitemap xml so the platform can index them
 *
 * @param {dw.util.HashMap} args
 * @param {dw.job.JobStepExecution} jobStepExecution
 * @returns {dw.system.Status}
 */
function addCustomSitemap(args) {
    if (empty(args.hostName) || empty(args.sourceDirectory) || empty(args.filePattern)) {
        return new Status(Status.ERROR, 'ERROR');
    }

    var sourceDirectory = new File(args.sourceDirectory);

    if (!sourceDirectory.exists()) {
        sourceDirectory.mkdirs();
    }

    if(sourceDirectory.isDirectory()) {
        var fileList = sourceDirectory.listFiles().iterator();
        var filePatternRegex = new RegExp(args.filePattern);
        while (fileList.hasNext()) {
            var file = fileList.next();

            if (filePatternRegex.test(file.name)) {
                SitemapMgr.addCustomSitemapFile(args.hostName, file);
            }
        }
    } else {
        return new Status(Status.ERROR, 'Directory configured appears to be a file.');
    }

    return new Status(Status.OK, 'OK');
}

module.exports.addCustomSitemap = addCustomSitemap;
