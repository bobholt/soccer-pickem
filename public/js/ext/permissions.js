/**
 * @fileOverview Extend the aura-core permissions
 */
define(["aura_perms"], function (permissions) {

    permissions.extend({
			addcountries: {bootstrap:true},
			editcountries: {bootstrap:true},
			showcountries: {bootstrap:true},
			addleagues: {bootstrap:true},
			editleagues: {bootstrap:true},
			showleagues: {bootstrap:true},
			addresults: {bootstrap:true},
			editresults: {bootstrap:true},
			showresults: {bootstrap:true},
			addteams: {bootstrap:true},
			editteams: {bootstrap:true},
			showteams: {bootstrap:true},
			login: {bootstrap:true},
			register: {bootstrap:true},
			showcountry: {bootstrap:true},
			showuser: {bootstrap:true},
			leaguestable: {bootstrap:true}
    });

    return permissions;
});