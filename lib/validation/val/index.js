// Generated by IcedCoffeeScript 1.8.0-c
(function() {
  var validation, _deepExtend,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _deepExtend = function(target, source) {

    /*
    recursively extend an object.
    does not recurse into arrays
     */
    var k, sv, tv;
    for (k in source) {
      sv = source[k];
      tv = target[k];
      if (tv instanceof Array) {
        target[k] = sv;
      } else if (typeof tv === 'object' && typeof sv === 'object') {
        target[k] = _deepExtend(tv, sv);
      } else {
        target[k] = sv;
      }
    }
    return target;
  };

  validation = function(validation) {
    var auth;
    auth = validation.auth;
    validation.validation = {
      _deepExtend: _deepExtend,
      add_team: function(team) {},
      remove_team: function(team) {},
      add_team_asset: function(team, resource, asset) {
        var _ref;
        if (((_ref = validation.validation[resource]) != null ? _ref.add_team_asset : void 0) == null) {
          throw 'resource, ' + resource + ', does not support adding assets';
        }
        return validation.validation[resource].add_team_asset(team, asset);
      },
      remove_team_asset: function(team, resource, asset) {
        var _ref;
        if (((_ref = validation.validation[resource]) != null ? _ref.remove_team_asset : void 0) == null) {
          throw 'resource, ' + resource + ', does not support removing assets';
        }
        return validation.validation[resource].remove_team_asset(team, asset);
      },
      add_team_member: function(team, user, role) {
        if (__indexOf.call(auth.roles.team_admin, role) < 0 && __indexOf.call(auth.roles.team, role) < 0) {
          throw 'invalid role: ' + role;
        }
      },
      remove_team_member: function(team, user, role) {},
      add_user: function(user) {},
      remove_user: function(user) {},
      add_resource_role: function(user, resource, role) {
        if (!auth.is_active_user(user)) {
          throw 'invalid user: ' + user.name;
        }
        if (__indexOf.call(auth.roles.resource[resource] || [], role) < 0) {
          throw 'invalid role: ' + role;
        }
      },
      remove_resource_role: function(user, resource, role) {},
      add_user_data: function(actor, old_user, new_user) {
        var form, form_type, merged_validated_new_data, merged_validated_old_data, new_data, old_data, validated_data;
        old_data = old_user.data;
        new_data = new_user.data;
        if (auth.is_system_user(actor)) {
          form_type = 'system';
        } else if (auth.is_same_user(actor, old_user)) {
          form_type = 'self';
        } else {
          throw "invalid authorization";
        }
        form = validation.schema.user_data[form_type]({
          value: new_data
        });
        validated_data = form.getClean();
        merged_validated_old_data = _deepExtend(old_data, validated_data);
        merged_validated_new_data = _deepExtend(new_data, validated_data);
        if (JSON.stringify(merged_validated_new_data) !== JSON.stringify(merged_validated_old_data)) {
          throw 'Modifications not allowed by schema';
        }
      }
    };
    return require('./gh')(validation.validation);
  };

  module.exports = validation;

}).call(this);