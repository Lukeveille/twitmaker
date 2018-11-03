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
      console.log(response.data);
      let li = document.createElement('li'),
      p = document.createElement('p'),
      time = document.createElement('time');

      li.setAttribute("class", "tweet")
      p.innerHTML = response.data.message;
      
      const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
      dateTime = new Date(response.data.created_at);
      dateString = monthNames[dateTime.getMonth()] + ' ' + dateTime.getDate() + ', ' + (dateTime.getHours() % 12) + ':' + dateTime.getMinutes() + (dateTime.getHours() > 12 ? ' PM' : ' AM');
      time.innerHTML = dateString;
      
      li.append(p);
      li.append(time);

      tweets.insertBefore(li, tweets.firstChild);
      myForm.reset();
    });
  });
});
