define([

  'sandbox',

  'text!./templates/edit.html'

],

function(sandbox, editTemplate) {

  var Module = {};

  Module.Model = sandbox.mvc.Model({

  	idAttribute: "_id",

    url: function(){
    	return '/api/leagues/' + this.id
    }

  });

  Module.Collection = sandbox.mvc.Collection({

    model: Module.Model,

    url: '/api/leagues'

  });

  Module.View = sandbox.mvc.View({

		template: editTemplate,

		events: {
			'change .leagueSelect': 'changeModel',
			'click .edit-league': 'editLeague',
			'keydown #leagueNameEdit': 'key'
		},

		changeModel: function(e){
			var leagueName = e.target.value;
			this.model = this.collection.where({name: leagueName})[0];
			this.$el.find('#leagueNameEdit').val(this.model.get('name'));
			this.$el.find('#leagueTierEdit').val(this.model.get('tier'));
			this.$el.find('.countrySelect').val(this.model.get('country_code'));
			this.$el.find('#leaguePlayableEdit').val((+this.model.get('playable')).toString());
		},

		key: function(e) {
			if (e.which === 13) {
				this.postLeague();
			}
		},

		editLeague: function() {
			var leagueView = this;

			var league = this.model;

			console.log(leagueView.$el.find('.countrySelect').val());

			league.save({
				tier: parseInt(leagueView.$el.find('#leagueTierEdit').val(), 10),
				name: leagueView.$el.find('#leagueNameEdit').val(),
				country_code: leagueView.$el.find('.countrySelect').val(),
				playable: !!parseInt(leagueView.$el.find('#leaguePlayableEdit').val())
			}, {
				success: function(){
					leagueView.$el.find('input').each(function(){
						leagueView.$el.find(this).val('');
					});
					leagueView.$el.find('#leagueNameEdit').focus();
					sandbox.pub('postLeague');
				}
			})
		}

  });

  return Module;

});
