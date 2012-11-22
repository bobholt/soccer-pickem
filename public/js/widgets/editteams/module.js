define([

  'sandbox',

  'text!./templates/edit.html'

],

function(sandbox, editTemplate) {

  var Module = {};

  Module.Model = sandbox.mvc.Model({

  	idAttribute: "_id",

    url: function(){
    	return '/api/teams/' + this.id
    }

  });

  Module.Collection = sandbox.mvc.Collection({

    model: Module.Model,

    url: '/api/teams'

  });

  Module.View = sandbox.mvc.View({

		template: editTemplate,

		events: {
			'change .teamSelect': 'changeModel',
			'click .edit-team': 'editTeam',
			'keydown #teamNameEdit': 'key'
		},

		changeModel: function(e){
			var teamId = e.target.value;
			this.model = this.collection.where({_id: teamId})[0];
			this.$el.find('#teamNameEdit').val(this.model.get('name'));
		},

		key: function(e) {
			if (e.which === 13) {
				this.editTeam();
			}
		},

		editTeam: function() {
			var teamView = this;

			var team = this.model;

			team.save({
				name: teamView.$el.find('#teamNameEdit').val()
			}, {
				success: function(){
					teamView.$el.find('input').each(function(){
						teamView.$el.find(this).val('');
					});
					teamView.$el.find('#teamNameEdit').focus();
					sandbox.pub('postTeam');
				}
			})
		}

  });

  return Module;

});
