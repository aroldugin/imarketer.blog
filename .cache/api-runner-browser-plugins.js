module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-source-wordpress/gatsby-browser.js'),
      options: {"plugins":[],"url":"https://back.imarketer.blog/graphql","schema":{"typePrefix":"Wp","queryDepth":15,"circularQueryLimit":5,"timeout":30000,"perPage":100,"requestConcurrency":15,"previewRequestConcurrency":5},"develop":{"hardCacheMediaFiles":true,"nodeUpdateInterval":5000,"hardCacheData":false},"type":{"Post":{"limit":5000},"RootQuery":"{ excludeFieldNames: ['viewer', 'node', 'schemaMd5'], },"},"verbose":true},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"/","background_color":"#663399","display":"minimal-ui","icon":"src/images/gatsby-icon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"4a9773549091c227cd2eb82ccd9c5e3a"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby/dist/internal-plugins/partytown/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
