define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'editleagues', function(position) {

		var leagues = new module.Collection();

		leagues.on('reset', function(){

	    var editLeague = new module.View({

				el: sandbox.dom.find('.league-edit-container'),
				collection: leagues

	    }).render();

		});

		leagues.fetch();

	});

});