'use strict';

var Status = require('dw/system/Status');
var File = require('dw/io/File');
var DynamicURLMgr = require('plugin_dynamicurl/cartridge/scripts/managers/DynamicURLMgr');
var Site = require('dw/system/Site');
var StringUtils = require('dw/util/StringUtils');
var Calendar = require('dw/util/Calendar');

var currentSite = Site.getCurrent();

/**
 * Writes a URL element to the sitemap.
 * @param {dw.io.XMLIndentingStreamWriter} xmlWriter - The writer
 * @param {string} id - The element id
 * @param {string} value - The element value
 */
function writeSitemapURLElement(xmlWriter, id, value) {
    xmlWriter.writeStartElement(id);
    xmlWriter.writeCharacters(value);
    xmlWriter.writeEndElement();
}

/**
 * Generate SiteMap URL element
 * @param {dw.io.XMLIndentingStreamWriter} xmlWriter - The XML writer
 * @param {string} loc - The URL
 * @param {string} changefreq - The change frequency
 * @param {string} priority - The priority
 */
function writeSiteMapUrlElement(xmlWriter, loc, changefreq, priority) {
    var lastMod = StringUtils.formatCalendar(new Calendar(), 'yyyy-MM-dd');

    xmlWriter.writeStartElement('url');

    writeSitemapURLElement(xmlWriter, 'loc', loc);
    writeSitemapURLElement(xmlWriter, 'lastmod', lastMod);
    writeSitemapURLElement(xmlWriter, 'changefreq', changefreq);
    writeSitemapURLElement(xmlWriter, 'priority', priority);

    xmlWriter.writeEndElement();
}

/**
 * Write the found Dynamic URLs to a Sitemap compatible file.
 * @param {File} fileToSave - The Sitemap file
 * @param {[Object]} dynamicURLs - The Dynamic URLs
 *
 * @returns {boolean} Wether or not the writing of the XML succeeded
 */
function writeXML(fileToSave, dynamicURLs) {
    try {
        var FileWriter = require('dw/io/FileWriter');
        var XMLIndentingStreamWriter = require('dw/io/XMLIndentingStreamWriter');

        var locales = currentSite.allowedLocales.iterator();
        var fileWriter = new FileWriter(fileToSave, 'UTF-8');
        var xmlWriter = new XMLIndentingStreamWriter(fileWriter);

        xmlWriter.writeStartDocument('UTF-8', '1.0');
        xmlWriter.writeStartElement('urlset');
        xmlWriter.writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

        while (locales.hasNext()) {
            var currentLocale = locales.next();

            // eslint-disable-next-line no-undef
            request.setLocale(currentLocale);

            dynamicURLs.forEach(function (dynamicURL) {
                writeSiteMapUrlElement(xmlWriter, 'https://' + currentSite.getHttpsHostName() + dynamicURL.path, 'weekly', '0.5');
            });
        }

        xmlWriter.writeEndElement();

        fileWriter.flush();
        xmlWriter.close();
        fileWriter.close();

        return true;
    } catch (e) {
        var Logger = require('dw/system/Logger');
        Logger.error(e);
        return false;
    }
}

/**
 * Generates the Dynamic URL sitemap.
 *
 * @param {dw.util.HashMap} args - The job arguments
 * @returns {dw.system.Status} - The result status
 */
function generateSitemap(args) {
    var directoryToSaveIn = new File(File.IMPEX + File.SEPARATOR + args.directory);
    var dynamicURLs = DynamicURLMgr.getAllDynamicURLs();

    if (!directoryToSaveIn.exists()) {
        directoryToSaveIn.mkdirs();
    }

    var fileToSave = new File(directoryToSaveIn, currentSite.name + '-' + args.fileName);

    if (!writeXML(fileToSave, dynamicURLs)) {
        return new Status(Status.ERROR, 'ERROR');
    }

    return new Status(Status.OK, 'OK');
}

module.exports.generateSitemap = generateSitemap;
