define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'editresults', function(position) {

		var results = new module.Collection();

		results.on('reset', function(){

	    var editResult = new module.View({

				el: sandbox.dom.find('.result-edit-container'),
				collection: results

	    }).render();

		});

		results.fetch();

	});

});