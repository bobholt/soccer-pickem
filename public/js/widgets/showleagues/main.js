define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'showleagues', function(position) {


		var leagues = new module.Collection();
		var showLeagues;


		leagues.on('reset', function(){

	    showLeagues = new module.View({

				el: sandbox.dom.find('.league-show-container'),
				collection: leagues

	    }).render();

		});

		leagues.fetch();

    sandbox.sub('postLeague', function(){

    	showLeagues.$el.empty();

    	leagues.fetch();

    });

	});

});