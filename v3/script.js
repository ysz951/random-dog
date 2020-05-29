'use strict';

// check the input value
function checkInput(newNumber){
  if (isNaN(newNumber)  || newNumber < 1 || newNumber > 50 ){
    return false
  }
  else{
    return true
  }
}

function getDogImage(newNumber, newBreedName) {
  
  const fetchAddress = `https://dog.ceo/api/breed/${newBreedName}/images/random/${newNumber}`;
  console.log(fetchAddress)
  // fetch message from dog api
  fetch(fetchAddress)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson)) 
    .catch(error => alert('Something went wrong. Try again later.'));
}



function renderList(responseMessage){
  const n = responseMessage.length;
  for(let i = 0; i < n; i++ ){
    // every two images are in the same subgroup
    if (i%2 === 0){
      $('.result-group').append(`<div class="subgroup_${~~(i/2)+1} group"></div>`);
    }
    $(`.subgroup_${~~(i/2)+1}`).append(`<div class="item_${i+1} item"></div>`);
    $(`.item_${i+1}`).html(`<img src='${responseMessage[i]}' alt='No.${i+1}'>`);
  }
}

function displayResults(responseJson) {
  // show the responseJon in console
  console.log(responseJson);
  // if breed name is invalid
  if (responseJson.status === 'error'){
    alert('Please input a valid breed, like "African"');
    return
  }
  renderList(responseJson.message);
}

// inspect form action
function watchForm() {
  $('button').on('click', event => {
    event.preventDefault();
    let newNumber = $('.js-random-dog-entry').val();
    let newBreedName = $('.js-breed-entry').val().toLowerCase();
    if (!newNumber){
      newNumber = 3;
    }
    if (!newBreedName){
      newBreedName = 'akita';
    }

    // if the input value is invalid, show an alert
    if (!checkInput(newNumber)){
      alert('Please input a number between 1 and 50');
      return
    }
    // reset result-group section, clear all images
    $('.result-group').html('');
    // clear input value
    // $('.js-random-dog-entry').val('');
    getDogImage(newNumber, newBreedName);
  });
}

// main function
$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});