// Generated by CoffeeScript 1.6.3
(function() {
  var VoilaPlugin;

  module.exports = function(game, opts) {
    return new VoilaPlugin(game, opts);
  };

  module.exports.pluginInfo = {
    loadAfter: ['voxel-highlight', 'voxel-registry', 'voxel-registry']
  };

  VoilaPlugin = (function() {
    function VoilaPlugin(game, opts) {
      var _ref, _ref1;
      this.game = game;
      this.hl = (function() {
        var _ref1;
        if ((_ref = (_ref1 = this.game.plugins) != null ? _ref1.get('voxel-highlight') : void 0) != null) {
          return _ref;
        } else {
          throw 'voxel-voila requires voxel-highlight plugin';
        }
      }).call(this);
      this.registry = (function() {
        var _ref2;
        if ((_ref1 = (_ref2 = this.game.plugins) != null ? _ref2.get('voxel-registry') : void 0) != null) {
          return _ref1;
        } else {
          throw 'voxel-voila requires voxel-registry plugin';
        }
      }).call(this);
      if (this.registry.getItemDisplayName == null) {
        throw 'voxel-voila requires voxel-registry >=0.2.0 with getItemDisplayName';
      }
      this.createNode();
      this.enable();
    }

    VoilaPlugin.prototype.createNode = function() {
      this.node = document.createElement('div');
      this.node.setAttribute('id', 'voxel-voila');
      this.node.setAttribute('style', '\
border: 1px solid black;\
background-image: linear-gradient(rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 100%);\
position: absolute;\
visibility: hidden;\
top: 0px;\
left: 50%;\
color: white;\
font-size: 18pt;\
');
      this.node.textContent = '';
      return document.body.appendChild(this.node);
    };

    VoilaPlugin.prototype.enable = function() {
      var _this = this;
      this.node.style.visibility = '';
      this.hl.on('highlight', this.onHighlight = function(pos) {
        var displayName, id, name;
        id = _this.game.getBlock(pos);
        name = _this.registry.getBlockName(id);
        displayName = _this.registry.getItemDisplayName(name);
        return _this.node.textContent = "" + displayName + " (" + name + "/" + id + ")";
      });
      return this.hl.on('remove', this.onRemove = function() {
        return _this.node.textContent = '';
      });
    };

    VoilaPlugin.prototype.disable = function() {
      this.hl.removeListener('highlight', this.onHighlight);
      this.hl.removeListener('remove', this.onRemove);
      return this.node.style.visibility = 'hidden';
    };

    return VoilaPlugin;

  })();

}).call(this);
