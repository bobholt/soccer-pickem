define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'addcountries', function(position) {

    var addCountry = new module.View({

			el: sandbox.dom.find('.country-add-container')

    }).render();


	});

});