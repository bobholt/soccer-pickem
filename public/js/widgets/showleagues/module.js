define([

  'sandbox',

  'text!./templates/show.html'

],

function(sandbox, showTemplate) {

  var Module = {};

  Module.Model = sandbox.mvc.Model({

  	idAttribute: "_id",

    url: '/api/leagues'

  });

  Module.Collection = sandbox.mvc.Collection({

  	model: Module.Model,

  	url: '/api/leagues'

  });

  Module.View = sandbox.mvc.View({

		template: showTemplate

  });

  return Module;

});
