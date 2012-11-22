/**
 * @fileOverview Extend the aura-core mediator
 */
/*jslint sloppy:true*/
/*global define*/
define(["aura_core", "backbone", "superview", "supercollection"],
    function (core, Backbone, superview) {
        var mediator = Object.create(core);
        // mediator.data.Store = Store;
        mediator.mvc = Backbone;
        return mediator;
     });
