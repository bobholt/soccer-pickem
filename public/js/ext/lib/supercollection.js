/*!
 * Inspired by Rebecca Murphey's SuperView
 *
 * sync() based on Tim Branyen's cached collection: https://gist.github.com/2866702
 */

define([
  "backbone",
  "underscore",
  "jquery"
], function(Backbone, _, $) {

  // This is a collection base class built on top of the default Backbone.Collection; it
  // provides a set of methods that tend to be useful in Backbone applications.
  //
  // To use this SuperCollection, you should call its `extend` method just like you
  // would extend the normal `Backbone.Collection`.
  var SuperCollection = Backbone.SuperCollection = Backbone.Collection.extend({

    // ### `sync`
    //
    // This overrides the sync command to automatically cache the resulting collection.
    // T
    sync : function(method, collection, options) {

    	var sessionStorage = window.sessionStorage || {};
			// Get the correct URL.
		  var url = _.isFunction(collection.url) ? collection.url() : collection.url;

		  // Check for cache property and if an existing cache exists.
		  if (collCache[url]) {

		    // Extract from sessionStroage and place into memory.
		    if (_.isString(collCache[url])) {
		      collCache[url] = JSON.parse(collCache[url]);
		    }

		    // Trigger the success with the correct data.
		    options.success.apply(this, collCache[url]);

		    // Emulate the jqXHR.
		    return $.Deferred().resolve();
		  }

		  // Call out to default implementation.
		  var jqXHR = Backbone.sync.apply(this, arguments);

		  // Wait until complete and if successful, cache!
		  jqXHR.then(function() {
		    collCache[url] = _.toArray(arguments);
		    sessionStorage[url] = JSON.stringify([arguments[0], "success", {}]);
		  });

		  // Emulate normal Sync.
		  return jqXHR;
    },



    //
  });

  // ## Internals

  var PREM = window.PREM || {};

  // Global template cache
  var collCache = PREM.collCache = {};

  return SuperCollection;

});