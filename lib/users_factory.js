/* jshint browser:true */
/* global require, module */

/**
 * @fileOverview
 *
 * This file contains the Users factory, responsible for creating and returning
 * instances of a users key model.
 */

'use strict';

var UsersModel = require('./users_model');
var Args = require('./util/args');

/**
 * usersFactory
 * @public
 * @param {Object} $usersSync - Responsible for synchronizing an Angular model,
 * with a .users GoInstant key.
 * @param {Object} $conn - GoInstant connection service
 * @returns {Function} option validation & instance creation
 */
module.exports = function usersFactory($goUser, $usersSync, $conn) {

  /**
   * @public
   * @param {Object} room - GoInstant room
   */
  return function $users() {
    var a = new Args([
      { room: Args.STRING | Args.Optional },
    ], arguments);

    var key = $conn.$key('.users', a.room);
    var sync = $usersSync(key);

    return new UsersModel($conn, key, sync, $goUser);
  };
};