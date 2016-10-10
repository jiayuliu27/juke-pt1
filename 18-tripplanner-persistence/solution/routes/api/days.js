var router = require('express').Router();
var Promise = require('bluebird');

var Day = require('../../models/day');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');

// days

router.get('/', function (req, res, next) {
  Day.findAll({
    include: [Hotel, Restaurant, Activity],
    order: 'number ASC'
  })
  .then(function (days) {
    res.json(days);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  Day.create(req.body)
  .then(function (day) {
    res.status(201).json(day);
  })
  .catch(next);
});

router.delete('/', function (req, res, next) {
  Day.destroy()
  .then(function () {
    res.sendStatus(204);
  })
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  Day.findById(req.params.id)
  .then(function (day) {
    return day.destroy(); // triggers beforeDestroy hook
  })
  .then(function () {
    res.sendStatus(204);
  })
  .catch(next);
});

// adding attractions

router.put('/:id/hotel', function (req, res, next) {
  Promise.all([
    Day.findById(req.params.id),
    Hotel.findById(req.body.id)
  ])
  .spread(function (day, hotel) {
    return day.setHotel(hotel);
  })
  .then(function () {
    res.sendStatus(204);
  })
  .catch(next);
});

router.post('/:id/restaurants', function (req, res, next) {
  Promise.all([
    Day.findById(req.params.id),
    Restaurant.findById(req.body.id)
  ])
  .spread(function (day, restaurant) {
    return day.addRestaurant(restaurant);
  })
  .then(function () {
    res.sendStatus(204);
  })
  .catch(next);
});

router.post('/:id/activities', function (req, res, next) {
  Promise.all([
    Day.findById(req.params.id),
    Activity.findById(req.body.id)
  ])
  .spread(function (day, activity) {
    return day.addActivity(activity);
  })
  .then(function () {
    res.sendStatus(204);
  })
  .catch(next);
});

// removing attractions

router.delete('/:id/hotel', function (req, res, next) {
  Day.findById(req.params.id)
  .then(function (day) {
    return day.setHotel(null);
  })
  .then(function () {
    res.sendStatus(204);
  })
  .catch(next);
});

router.delete('/:dayId/restaurants/:restId', function (req, res, next) {
  Promise.all([
    Day.findById(req.params.dayId),
    Restaurant.findById(req.params.restId)
  ])
  .spread(function (day, restaurant) {
    return day.removeRestaurant(restaurant);
  })
  .then(function () {
    res.sendStatus(204);
  })
  .catch(next);
});

router.delete('/:dayId/activities/:actId', function (req, res, next) {
  Promise.all([
    Day.findById(req.params.dayId),
    Activity.findById(req.params.actId)
  ])
  .spread(function (day, activity) {
    return day.removeActivity(activity);
  })
  .then(function () {
    res.sendStatus(204);
  })
  .catch(next);
});

module.exports = router;
