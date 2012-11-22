/*global require, requirejs*/
// Require.js allows us to configure shortcut alias

require.config({
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'cookie': {
					deps: ['jquery'],
					exports: 'cookie'
        },
        'leaflet': {
					exports: 'L'
        },
        'pubsub': {
					deps: ['jquery'],
					exports: 'pubsub'
        },
        'wax': {
					deps: ['leaflet'],
					exports: 'wax'
        }
    },

    paths: {
        core: 'ext/mediator',
        perms: 'ext/permissions',
        sandbox: 'ext/facade',

        aura_core: 'aura/mediator',
        aura_perms: 'aura/permissions',
        aura_sandbox: 'aura/facade',

        backbone: 'ext/lib/backbone',
        superview: 'ext/lib/superview',
        supercollection: 'ext/lib/supercollection',
        jquery: 'aura/lib/jquery.min',
        underscore: 'aura/lib/lodash.min',
        jquery_ui: 'ext/lib/jquery-ui.min',
        common: 'ext/lib/common',
        cookie: 'ext/lib/jquery.cookie',
        pubsub: 'ext/lib/jquery.tinypubsub.min'
    }
});



if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}


// Starts main modules
requirejs(['sandbox'], function (sandbox) {

	var socket = io.connect('/');
	socket.on('onconnected', function(data){

		console.log( 'Connected successfully to the socket.io server. My server side ID is ' + data.id );

		socket.emit('my other event', { my: data });

	});

		// sandbox.baseUrl = "/sites/all/themes/mitreap";

		// TODO: Move this to routing

		// if ($('body').hasClass('front')) {
			if (window.location.pathname === "/admin") {
				sandbox.publish('addleagues');
				sandbox.publish('addcountries');
				sandbox.publish('addteams');
				sandbox.publish('addresults');

				sandbox.publish('editleagues');
				sandbox.publish('editcountries');
				sandbox.publish('editteams');
				sandbox.publish('editresults');

				sandbox.publish('showcountries');
				sandbox.publish('showleagues');
				sandbox.publish('showteams');
				sandbox.publish('showresults');
			}

			if (window.location.pathname === "/login") {
				sandbox.publish('login');
			}

			if (window.location.pathname === "/register") {
				sandbox.publish('register');
			}
			if (window.location.pathname.indexOf("/user") >= 0) {
				sandbox.publish('showuser');
			}
			if (window.location.pathname.indexOf("/country") >= 0) {
				sandbox.publish('showcountry');
				sandbox.publish('leaguestable');
			}
			if (window.location.pathname.indexOf("/team") >= 0) {

			}
			if (window.location.pathname.indexOf("/league") >= 0) {

			}
			if (window.location.pathname.indexOf("/user-league") >= 0) {

			}

});