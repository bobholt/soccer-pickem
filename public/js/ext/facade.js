/**
 * @fileOverview Extend the aura-core facade
 */
/*global define*/
define(["aura_sandbox", "core", "perms"],
    function (sandbox, core, perms) {

        var facade = Object.create(sandbox);

        facade.data.Store = core.data.Store;
        facade.mvc = {};

        facade.widgets = {};
        facade.mvc.View = function (view) {
            // using Rebecca Murphey's SuperView instead of base Backbone View
            return core.mvc.SuperView.extend(view);
        };
        facade.mvc.Model = function (model) {
            return core.mvc.Model.extend(model);
        };
        facade.mvc.Collection = function (collection) {
            return core.mvc.SuperCollection.extend(collection);
        };

        facade.widgets.stop = function(channel, el){
            return sandbox.stop.apply(this, arguments);
        };

        facade.widgets.start = function(channel, el){
            return sandbox.start.apply(this, arguments);
        };


        return facade;
});
