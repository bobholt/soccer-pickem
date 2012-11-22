define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'showcountry', function(position) {

		var name = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
		var country = new module.Model({
			name: name
		});

		country.fetch({

			success: function(){

				console.log(country);

		    var showCountry = new module.View({

					el: sandbox.dom.find('.country-container'),
					model: country

		    }).render();

			}

		});

	});

});