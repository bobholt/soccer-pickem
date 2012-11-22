define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'showresults', function(position) {


		var results = new module.Collection();
		var showResults;


		results.on('reset', function(){

	    showResults = new module.View({

				el: sandbox.dom.find('.result-show-container'),
				collection: results

	    }).render();

		});

		results.fetch();

    sandbox.sub('postResult', function(){

    	showResults.$el.empty();

    	results.fetch();

    });

	});

});