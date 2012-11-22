define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'leaguestable', function(position) {

		var leagues = new module.Collection();
		var showLeagues;


		leagues.on('reset', function(){

	    showLeagues = new module.View({

				el: sandbox.dom.find('.league-table-container'),
				collection: leagues

	    }).render();

		});

		leagues.fetch();

	});

});