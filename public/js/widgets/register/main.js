define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'register', function(position) {

	    showCountries = new module.View({

				el: sandbox.dom.find('.register-container')

	    }).render();

	});

});