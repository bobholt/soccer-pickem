define([

  'sandbox',

  'text!./templates/add.html'

],

function(sandbox, addTemplate) {

  var Module = {};

  Module.Model = sandbox.mvc.Model({

  	idAttribute: "_id",

    url: '/api/teams'

  });

  Module.View = sandbox.mvc.View({

		template: addTemplate,

		events: {
			'click .post-team': 'postTeam',
			'keydown #teamName': 'key'
		},

		key: function(e) {
			if (e.which === 13) {
				this.postTeam();
			}
		},

		postTeam: function() {
			var teamView = this;

			var team = new Module.Model();

			team.save({
				name: $('#teamName').val()
			}, {
				success: function(){
					teamView.$el.find('input').each(function(){
						teamView.$el.find(this).val('');
					});
					sandbox.dom.find('#teamName').focus();
					sandbox.pub('postTeam');
				}

			})

		}

  });

  return Module;

});
