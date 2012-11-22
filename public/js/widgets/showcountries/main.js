define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'showcountries', function(position) {


		var countries = new module.Collection();
		var showCountries;


		countries.on('reset', function(){

	    showCountries = new module.View({

				el: sandbox.dom.find('.country-show-container'),
				collection: countries

	    }).render();

		});

		countries.fetch();

    sandbox.sub('postCountry', function(){

    	showCountries.$el.empty();

    	countries.fetch();

    });

	});

});