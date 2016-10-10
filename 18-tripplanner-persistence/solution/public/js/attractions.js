'use strict';
/* global $ attractionModule */

/**
 * This module holds collection of enhanced attraction objects which can be
 * easily looked up by type and id. It is primarily used when someone clicks
 * to add an attraction in the `options` module.
 */

var attractionsModule = (function () {

  // application state

  var enhanced = {}

  var gotAttractions = $.get('/api/attractions')
  .then(function (db) {
    enhanced.hotels = db.hotels.map(attractionModule.create);
    enhanced.restaurants = db.restaurants.map(attractionModule.create);
    enhanced.activities = db.activities.map(attractionModule.create);
  })
  .catch(utilsModule.logErr)

  // private helper methods (only available inside the module)

  function findById (collection, id) {
    return gotAttractions
    .then(function () {
      return enhanced[collection].find(function (el) {
        return +el.id === +id;
      });
    })
  }

  // globally accessible module methods (available to other modules)

  var publicAPI = {

    getByTypeAndId: function (type, id) {
      if (type === 'hotel') return findById('hotels', id);
      else if (type === 'restaurant') return findById('restaurants', id);
      else if (type === 'activity') return findById('activities', id);
      else throw Error('Unknown attraction type');
    }

  };

  return publicAPI;

}());
