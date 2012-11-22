define([

  'sandbox',

  'text!./templates/add.html'

],

function(sandbox, addTemplate) {

  var Module = {};

  Module.Model = sandbox.mvc.Model({

  	idAttribute: "_id",

    url: '/api/results'

  });

  Module.View = sandbox.mvc.View({

		template: addTemplate,

		events: {
			'click .post-result': 'postResult'//,
			// 'keydown #countryCode': 'key'
		},

		key: function(e) {
			if (e.which === 13) {
				this.postResult();
			}
		},

		postResult: function() {
			console.log('post');
			var resultView = this;

			var result = new Module.Model();

			result.save({
				league_id: this.$el.find('.leagueSelect').val(),
				league: this.$el.find('.leagueSelect option:selected').text(),
				team_id: this.$el.find('.teamSelect').val(),
				team: this.$el.find('.teamSelect option:selected').text(),
				season: $('#resultSeasonAdd').val(),
				matchesPlayed: $('#resultMatchesPlayedAdd').val(),
				wins: $('#resultWinsAdd').val(),
				draws: $('#resultDrawsAdd').val(),
				losses: $('#resultLossesAdd').val(),
				goalsFor: $('#resultGoalsForAdd').val(),
				goalsAgainst: $('#resultGoalsAgainstAdd').val()
			}, {
				success: function(){
					sandbox.dom.find('input').each(function(){
						sandbox.dom.find(this).val('');
					});
					sandbox.dom.find('#resultSeasonAdd').focus();
					sandbox.pub('postResult');
				}

			})

		}

  });

  return Module;

});
