define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'login', function(position) {

	    showCountries = new module.View({

				el: sandbox.dom.find('.login-container')

	    }).render();

	});

});