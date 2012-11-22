define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'showuser', function(position) {

		var displayname = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
		var user = new module.Model({
			displayname: displayname
		});

		user.fetch({

			success: function(){

		    var showUser = new module.View({

					el: sandbox.dom.find('.user-container'),
					model: user

		    }).render();

			}

		});

	});

});