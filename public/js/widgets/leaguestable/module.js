define([

  'sandbox',

  'text!./templates/base.html'

],

function(sandbox, baseTemplate) {

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

		template: baseTemplate

  });

  return Module;

});
