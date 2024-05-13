/*matomo code */
	
angular.module('matomoAnalytics', []);
angular.module('matomoAnalytics').run(function ($rootScope, $interval, analyticsOptions) {
	if(analyticsOptions.hasOwnProperty("enabled") && analyticsOptions.enabled) {
		if(analyticsOptions.hasOwnProperty("siteId") && analyticsOptions.siteId != '' && analyticsOptions.hasOwnProperty("siteUrl") && analyticsOptions.siteUrl != '') {
			if(typeof _paq === 'undefined') {
				window['_paq'] = [];
				/* add all the domains you are tracking as cross domain linking for your site, for example
				_paq.push(["setDomains", ["*.library.upstate.edu","*.guides.upstate.edu""]]);
				*/
				_paq.push(["setDomains", ["domain","domain"]]);
				_paq.push(["enableCrossDomainLinking"]);
				_paq.push(['setCookieSameSite', "None"]);
				_paq.push(['enableLinkTracking']);
				/* the following line tracks the View It section links as outlinks */
				_paq.push(['setLinkClasses', "item-title md-primoExplore-theme"]);
				_paq.push(["setDoNotTrack", true]);
				(function() {
					_paq.push(['setTrackerUrl', analyticsOptions.siteUrl+'matomo.php']);
					_paq.push(['setSiteId', analyticsOptions.siteId]);
					var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
					g.type='text/javascript'; g.async=true; g.defer=true; g.src=analyticsOptions.siteUrl+'matomo.js'; s.parentNode.insertBefore(g,s);
				})();
			}
		}
		$rootScope.$on('$locationChangeSuccess', function (event, toState, fromState) {
			if(analyticsOptions.hasOwnProperty("defaultTitle")) {
				var documentTitle = analyticsOptions.defaultTitle;
				var timerStart = Date.now();
				var interval = $interval(function () {
					if(document.title !== '') documentTitle = document.title;
					if (window.location.pathname.indexOf('openurl') !== -1 || window.location.pathname.indexOf('fulldisplay') !== -1)
						if (angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).length === 0) return;
						/* the following line adds the word Discovery in front of the item title, change if you want a different work or remove for no additional words */
						else documentTitle = 'Discovery'+angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).text();
					  
					if(typeof _paq !== 'undefined') {
						if(fromState != toState) _paq.push(['setReferrerUrl', fromState]);
						_paq.push(['setCustomUrl', toState]);
						_paq.push(['setDocumentTitle', documentTitle]);
						_paq.push(['enableHeartBeatTimer']);
						_paq.push(['trackPageView']);
					}
					$interval.cancel(interval);
				}, 0);
			}
		});
	}
});

/* custom siteId, siteUrl from matomo and a default page title */
angular.module('matomoAnalytics').value('analyticsOptions', {
    enabled: true,
	siteId: '1',
	siteUrl: '//hsl.upstate.edu/analytics/',
	defaultTitle: 'Upstate Library Discovery Search'
});	
	/*end matomo code */
