// Listen for changes on each input checkbox tag
let amenities = {};
$('document').ready(function () {
  //let amenities = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('.amenities H4').text(Object.values(amenities).join(', '));
  });
});

// check for status of the API for OK and add  or remove the class
// available to the div#api_status
$('document').ready(apiStatus);
  function apiStatus () {
  const api = 'http://' + window.location.hostname;
  const API_URL = api + ':5001/api/v1/status/';
  $.get(API_URL, (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}

// Request http://0.0.0.0:5001/api/v1/places_search/
// Loop into the result of the request and create an article tag
// representing a Place in the section.places
$(document).ready(function () {
  $('BUTTON').on('click', function () {
    const api = 'http://' + window.location.hostname;
    $.ajax({
      url: api + ':5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({ 'amenities': Object.keys(amenities) }),
      contentType: 'application/json',
      dataType: 'json',
      success: placeAmenity
    });
  });
});

function placeAmenity(data) {
    $('SECTION.places').empty();
    $('SECTION.places').append(data.map(place => {
        return `<ARTICLE>
                  <DIV class="title">
                    <H2>${place.name}</H2>
                    <DIV class="price_by_night">
                      ${place.price_by_night}
                    </DIV>
                  </DIV>
                  <DIV class="information">
                    <DIV class="max_guest">
                      <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.max_guest} Guests
                    </DIV>
                    <DIV class="number_rooms">
                      <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.number_rooms} Bedrooms
                    </DIV>
                    <DIV class="number_bathrooms">
                      <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.number_bathrooms} Bathrooms
                    </DIV>
                  </DIV>
                  <DIV class="description">
                    ${place.description}
                  </DIV>
                </ARTICLE>`;
    }));
}
