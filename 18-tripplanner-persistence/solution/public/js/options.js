'use strict';
/* global $ tripModule attractionsModule utilsModule */

/**
 * This module fills the `select` tags with `option`s.
 * It runs immediately upon document ready (not called by other modules).
 * Each `option` displays the name of an attraction and is has a value of
 * that attraction's id. Selecting an option looks up the attraction by id,
 * then tells the trip module to add the attraction.
 */

$(function(){

  // jQuery selects
  var $optionsPanel = $('#options-panel');
  var $hotelSelect = $optionsPanel.find('#hotel-choices');
  var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
  var $activitySelect = $optionsPanel.find('#activity-choices');

  $.get('/api/attractions')
  .then(function (db) {
    // make all the option tags (second arg of `forEach` is a `this` binding)
    db.hotels.forEach(makeOption, $hotelSelect);
    db.restaurants.forEach(makeOption, $restaurantSelect);
    db.activities.forEach(makeOption, $activitySelect);
  })
  .catch(utilsModule.logErr);

  // make a single `option` tag & associate it with an attraction object
  function makeOption (databaseAttraction) {
    var $option = $('<option></option>') // makes a new option tag
      .text(databaseAttraction.name)
      .val(databaseAttraction.id);
    this.append($option); // add the option to the specific select
  }

  // what to do when the `+` button next to a `select` is clicked
  $optionsPanel.on('click', 'button[data-action="add"]', function () {
    var $select = $(this).siblings('select');
    var type = $select.data('type'); // from HTML data-type attribute
    var id = $select.find(':selected').val();
    // get associated attraction and add it to the current day in the trip
    attractionsModule.getByTypeAndId(type, id)
    .then(function (attraction) {
      tripModule.addToCurrent(attraction);
    })
    .catch(utilsModule.logErr)
  });

});
