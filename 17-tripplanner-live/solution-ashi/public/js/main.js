$(function initializeMap (){

  var graceHopperAcademy = new google.maps.LatLng(40.705086, -74.009151);
  
  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: graceHopperAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: 'http://emojipedia-us.s3.amazonaws.com/cache/eb/27/eb27b8b469e4efe3c0e4285e1dda868c.png',
    restaurant: 'http://emojipedia-us.s3.amazonaws.com/cache/d8/c4/d8c4e0fef51326b5cf8b6bb4010eba05.png',
    activity: 'http://emojipedia-us.s3.amazonaws.com/cache/f9/18/f9189ad583289452445a5ec2488bffca.png'
  }

  function drawMarker (type, coords) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(coords[0], coords[1]),
      icon: {
        url: iconURLs[type],
        scaledSize: new google.maps.Size(32, 32),
      },
      map: currentMap,
      animation: google.maps.Animation.DROP,
    })
  }

  function makeOptions(attractionType) {
    var select = $(`#${attractionType}-choices`)
    
    attractions[attractionType].forEach(function(attraction) {
      var option = $(`<option value="${attraction.id}">${attraction.name}</option>`)[0]
      option.attraction = attraction
      option.attraction.place.type = attractionType
      select.append(option)
    })
  }

  makeOptions('hotel');
  makeOptions('restaurant');
  makeOptions('activity');
 
  var dayTemplate = `
          <section class="day">
            <div>
              <h4>My Hotel</h4>
              <ul class="list-group trip-day-hotels" data-max-length=1>
              </ul>
            </div>
            <div>
              <h4>My Restaurants</h4>
              <ul class="list-group trip-day-restaurants" data-max-length=3>
              </ul>
            </div>
            <div>
              <h4>My Activities</h4>
              <ul class="list-group trip-day-activities">
              </ul>
            </div>            
          </section>
    `
  $('#day-add').click(function addDay() {
    // Find the index of the last day section
    var lastIndex = +$('section.day').last().data('index')

    var ourIndex = (Number.isInteger(lastIndex) ? lastIndex : 0) + 1
    
    // 1. Create a new day section based off dayTemplate
    var day = $(dayTemplate)

    // Set the index on the section we're adding
    day[0].dataset.index = ourIndex
    
    // 2. Append it to the #itinerary
    $('#itinerary').append(day)
    
    // 3. Unselect all days
    $('.day').removeClass('selected')

    // 3a. select the one we just appended.
    $('#itinerary > .day').last().addClass('selected')

    // Create a button with the right number
    var button = $(`<button class="btn btn-circle day-btn current-day" data-day=${ourIndex}>${ourIndex}</button>`)

    // Put it before the adder button
    $(this).before(button)
    
    // Click it. This will select the new day.
    button.click()
  })

  $('#day-del').click(function deleteDay(event) {    
    // Remove the day
    $('.day.selected').remove()

    // Grab the button for the day
    const button = $('.day-btn.current-day')

    // Grab the next button, or null if we're the last button.
    const afterIDieGoto = (sel => sel.length ? sel : null)(button.next('.day-btn'))
    
    // Remove the button for the day
    $('.day-btn.current-day').remove()

    // Reindex the days
    $('.day').each((i, day) => day.dataset.index = i + 1)

    // Reindex the buttons
    $('.day-btn').each((i, btn) => btn.textContent = btn.dataset.day = i + 1)
      
    // Click the button for the day we want to go to now
    // This will either be our next sibling if we have one,
    // or the last surviving button.
    afterIDieGoto ? afterIDieGoto.click() : $('.day-btn').last().click()
  })

  $('.day-buttons').on('click', 'button[data-day]', function(event) {
    // Deselect all buttons
    $('.day-buttons > button').removeClass('current-day')

    // Select the button that was clicked
    $(this).addClass('current-day')

    // Deselect all days
    $('.day')
      .removeClass('selected')
      .find('li').each(function(i, {marker}) {
        marker.setMap(null)
      })
    
    // Select the day for the button that was clicked
    const bounds = new google.maps.LatLngBounds
    let didUpdateBounds = false
    $(`.day[data-index="${this.dataset.day}"]`)
      .addClass('selected')
      .find('li')
      .each(function(i, {marker}) {
        marker.setMap(currentMap)
        bounds.extend(marker.position)
        didUpdateBounds = true
      })
    if (didUpdateBounds) currentMap.fitBounds(bounds)
    
    // Update the index display
    $('#day-title-index').text(this.dataset.day)

    // Reconcile the add attraction buttons to the current day
    enableOrDisableAddAttractionButtons()
  })
  
  $(document.body).on('click', 'button[data-action="addSelectionToTrip"]', function(event) {
    var dst = $(this.dataset.destinationList)
    
    Array.from(
      // Get all selected options (usually just one, but why not support many?)
      $(this.dataset.sourceSelect)[0].selectedOptions)
      .forEach(option => {
        // Don't add duplicates for the same day
        const dup = $(`li[data-attraction-id="${option.value}"]`, dst)
        if (dup.length) return

        // Enforce the destination list's max length
        const maxLen = +dst[0].dataset.maxLength
        if (Number.isInteger(maxLen) && $(`li`, dst).length >= maxLen)
          return
        
        // Create a new list item with a delete button
        var li = $(`<li class=itinerary-item data-attraction-id=${option.value}>
                     ${option.textContent}
                     <button data-action="deleteFromTrip" class="btn btn-xs btn-danger remove btn-circle">x</button>
                   </li>`)[0]
        
        // Add to the destination list
        dst.append(li)

        enableOrDisableAddAttractionButtons()
        
        // Draw a marker on the map and attach it to the list item.
        li.marker = drawMarker(option.attraction.place.type,
                               option.attraction.place.location)
    });
  });

  $(document.body).on('click', 'button[data-action="deleteFromTrip"]', function(event) {
    // jQuery's closest function ascends the DOM tree to find the nearest ancestor matching
    // the selector.
    $(this).closest('li.itinerary-item')
      .remove()  // Remove the item
      .each((i, {marker}) => marker.setMap(null))  // Remove its marker
    enableOrDisableAddAttractionButtons()
  })
});

function enableOrDisableAddAttractionButtons() {
  $('button[data-action="addSelectionToTrip"]').each((i, button) => {
    var dst = $(button.dataset.destinationList)
    const maxLen = +dst[0].dataset.maxLength
    
    // Disable this button if we the list is full
    if (Number.isInteger(maxLen) && $(`li`, dst).length >= maxLen) {
      button.disabled = true
    } else {
      button.disabled = false
    }
  })
}
