cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/nl.x-services.plugins.socialsharing/www/SocialSharing.js",
        "id": "nl.x-services.plugins.socialsharing.SocialSharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "file": "plugins/com.byhook.cordova.chromelauncher/www/ChromeLauncher.js",
        "id": "com.byhook.cordova.chromelauncher.ChromeLauncher",
        "clobbers": [
            "window.ChromeLauncher"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "nl.x-services.plugins.socialsharing": "4.3.10",
    "com.byhook.cordova.chromelauncher": "0.0.2"
}
// BOTTOM OF METADATA
});