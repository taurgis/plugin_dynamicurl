# plugin_dynamicurl: Storefront Reference Architecture (SFRA)

This is the repository for the plugin_dynamicurl plugin. This plugin enhances the allowing full freedom inn content URLs, including the following capabilities:

* Give full control to content URLs
* No longer need for the ID in the URL

_Note: This is a POC project, so it is not finished and will not work for every project out of the box. It is simply a starting point._

# Demo
TO DO

# Cartridge Path Considerations
The plugin_dynamicurl plugin requires the app\_storefront\_base cartridge. In your cartridge path, include the cartridges in the following order:

```
plugin_dynamicurl:app_storefront_base
```

# Custom Object
This solution makes use of a Custom Object Type called "DynamicUrl". Import this in the business manager.

1. Upload file ```metadata/dynamic-url-object.xml``` in Admin > Site Development > Import & Export > Upload
2. Import the file using Meta Data
3. Create a new Dynamic URL by going to "Merchant Tools" > "Custom Objects" > "Custom Object Editor"
4. Select the type "DynamicUrl"
5. Click "New"
6. Fill in the desired path in the "Path" field (e.g. /my-desired-url)
7. Select the type of content (currently type doesn't matter)
8. Fill in the ID of the Content Asset or the Page Designer Page ID in the Content ID field
9. Try it out!

# Getting Started

1. Clone this repository. (The name of the top-level folder is plugin\_commercepayments.)
2. In the top-level plugin_dynamicurl folder, enter the following command: `npm install`. (This command installs all of the package dependencies required for this plugin.)
3. In the top-level plugin_dynamicurl folder, edit the paths.base property in the package.json file. This property should contain a relative path to the local directory containing the Storefront Reference Architecture repository. For example:
```
"paths": {
    "base": "../storefront-reference-architecture/cartridges/app_storefront_base/"
}
```
4. In the top-level plugin_filternavigation folder, enter the following command: `npm run compile:js && npm run compile:scss`
5. In the top-level plugin_filternavigation folder, enter the following command: `npm run uploadCartridge`

For information on Getting Started with SFRA, see [Get Started with SFRA](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fsfra%2Fb2c_sfra_setup.html).

# NPM scripts
Use the provided NPM scripts to compile and upload changes to your sandbox.

## Compiling your application

* `npm run compile:js` - Compiles all js files and aggregates them.

**Note:** The plugin cartridge must be compiled after compiling storefront-reference-architecture (SFRA base) cartridge.

## Linting your code

`npm run lint` - Execute linting for all JavaScript and SCSS files in the project.

## Watching for changes and uploading

`npm run watch` - Watches everything and recompiles (if necessary) and uploads to the sandbox. Requires a valid dw.json file at the root that is configured for the sandbox to upload.
