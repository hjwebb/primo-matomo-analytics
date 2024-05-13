# primo-matomo-analytics

## Features / Overview
The attached js code is a code snippet that you can insert into Primo VE to collect website analytics through Matomo. It tracks every url change as a pageview. It's a fork of a 2018 repo https://github.com/csudhlib/primo-explore-matomo-analytics

Due to the nature of how Primo updates the page title, a couple alternatives have been implemented for better tracking. The `defaultTitle` config option is used whenever an empty document.title is identified. If the page being loaded is an openurl services page or a fulldisplay record page, the code will attempt to find the title of the record and provide it instead of `document.title`. This forked code includes text 'Discovery' in front of the item title. In all other instances such as Collection Discovery, Journal Search, Citation Match, the `document.title` will be provided as the page title.

The code includes directives for samesite cookies set as none and cross domain linking across multiple library websites/domains.

The code also tracks Primo VE's View It section links as external outlinks.

## Install
1. Copy the contents of `matomoAnalytics.module.js` into your package's `custom.js` file in the top function.

## Usage
Once this module is installed, add `matomoAnalytics` as a dependency for your custom module definition (most likely at the top of your custom.js file) then edit some configuration (below)

```js
var app = angular.module('viewCustom', ['angularLoad', 'matomoAnalytics']);
```

### Configuration
| name           | type         | usage                                                                                                          |
|----------------|--------------|----------------------------------------------------------------------------------------------------------------|
| `enabled`      | string       | Provided for consortium implementations. Single institutions should leave this `true`                          |
| `siteId`       | string       | The Site ID provided in your Matomo Analytics Suite admin settings                                             |
| `siteUrl`      | string (url) | The URL where the matomo code files live on your library website (or the DNS alternate name (if that applies)) |
| `defaultTitle` | string       | The default page title to use when `document.title` returns an empty string                                    |

Additionally, add your own domains into the following parameter
```
_paq.push(["setDomains", ["domain","domain"]]);
```

#### Example Config
```js
app.value('analyticsOptions', {
    enabled: true,
    siteId: '0',
    siteUrl: '//my.library.edu/analytics/',
    defaultTitle: 'Discovery Search'
});
```

#### Example domain config
```js
_paq.push(["setDomains", ["*.library.upstate.edu","*.guides.upstate.edu""]]);
```
