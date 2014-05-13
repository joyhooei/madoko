/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/
if (typeof define !== 'function') { var define = require('amdefine')(module) }
define([],function() {

  var Map = (function() {
    function Map() { };

    Map.prototype.clear = function() {
      var self = this;
      self.forEach( function(name,value) {
        self.remove(name);
      });      
    }

    Map.prototype.persist = function() {
      return this;
    };

    Map.prototype.copy = function() {
      var self = this;
      var map = new Map();
      self.forEach( function(name,value) {
        map.set(name,value);
      });
      return map;
    }

    Map.prototype.set = function( name, value ) {
      this["/" + name] = value;
    }

    Map.prototype.get = function( name ) {
      return this["/" + name];
    }

    Map.prototype.getOrCreate = function( name, def ) {
      var self = this;
      if (!self.contains(name)) self.set(name,def);
      return self.get(name);
    }

    Map.prototype.contains = function( name ) {
      return (this.get(name) !== undefined);
    }

    Map.prototype.remove = function( name ) {
      delete this["/" + name];
    }

    // apply action to each element. breaks early if action returns "false".
    Map.prototype.forEach = function( action ) {
      var self = this;
      for (var key in self) {
        if (key.substr(0,1) === "/") {  
          var res = action(key.substr(1), self[key]);
          if (res===false) return;
        }        
      };
    }

    Map.prototype.elems = function() {
      var self = this;
      var res = [];
      self.forEach( function(name,elem) {
        res.push(elem);
      });
      return res;
    }

    return Map;
  })();

  return Map;
});