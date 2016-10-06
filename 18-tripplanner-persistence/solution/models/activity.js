/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');
var Place = require('./place');

var Activity = db.define('activity', {
  name: Sequelize.STRING,
  age_range: Sequelize.STRING
}, {
  getterMethods: {
    type: function () {
      return this.Model.name;
    }
  },
  defaultScope: {
    include: [Place]
  }
});

module.exports = Activity
