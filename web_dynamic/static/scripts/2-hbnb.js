// Listen for changes on each input checkbox tag
$('document').ready(apiStatus);

function apiStatus () {
  const API_URL = 'http://localhost:5001/api/v1/status/';
  $.get(API_URL, (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}
