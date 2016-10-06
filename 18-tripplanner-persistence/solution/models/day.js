var Sequelize = require('sequelize');
var Promise = require('bluebird');
var db = require('./_db');

var Day = db.define('day', {
  number: {type: Sequelize.INTEGER, allowNull: false}
});

Day.beforeValidate('assignNumber', function (instance) {
  if (typeof instance.number === 'number') return;
  return this.count()
  .then(function (total) {
    instance.number = total + 1;
  });
});

Day.beforeDestroy('incrementLatter', function (instance) {
  return this.findAll({
    where: {number: { $gt: instance.number }}
  })
  .then(function (higherDays) {
    var modifiedDays = higherDays.map(function (day) {
      day.number--;
      return day.save();
    });
    return Promise.all(modifiedDays);
  });
});


module.exports = Day;
