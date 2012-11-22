define([

  'sandbox',

  'text!./templates/base.html'

],

function(sandbox, baseTemplate) {

  var Module = {};

  Module.Model = sandbox.mvc.Model({

  	idAttribute: "_id",

    url: '/api/users'

  });

  Module.Collection = sandbox.mvc.Collection({

  	model: Module.Model,

  	url: '/api/users'

  });

  Module.View = sandbox.mvc.View({

		template: baseTemplate

  });

  return Module;

});
