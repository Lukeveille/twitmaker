// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
document.addEventListener('DOMContentLoaded', function() {
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  console.log('JS up and running');

  var myForm = document.querySelector('#new_tweet'),
  tweets = document.querySelector('.tweets');
  
  document.addEventListener('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(myForm);
    
    axios({
      url: myForm.getAttribute('action'),
      method: myForm.getAttribute('method'),
      data: formData,
    }).then(function(response) {
      var div = document.createElement('div');
      div.innerHTML = response.data;
      tweets.insertBefore(div.firstChild, tweets.firstChild);
      myForm.reset();
    });
  });
});
