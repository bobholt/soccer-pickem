define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'editcountries', function(position) {

		var countries = new module.Collection();

		countries.on('reset', function(){

	    var editCountry = new module.View({

				el: sandbox.dom.find('.country-edit-container'),
				collection: countries

	    }).render();

		});

		countries.fetch();

	});

});