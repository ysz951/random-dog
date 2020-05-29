'use strict';

// check the input value
function checkInput(newItemName){
  if ((isNaN(newItemName)  || newItemName < 1 || newItemName > 50) && (newItemName.length !== 0)){
    return false
  }
  else{
    return true
  }
}

function getDogImage(newItemName) {
  
  let fetchAddress;
  if (!newItemName){
    // default input value is 3
    fetchAddress = 'https://dog.ceo/api/breeds/image/random/3';
  }
  else{
    fetchAddress = `https://dog.ceo/api/breeds/image/random/${newItemName}`;
  }
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
  renderList(responseJson.message);
}

// inspect form action
function watchForm() {
  $('button').on('click', event => {
    event.preventDefault();
    const newItemName = $('.js-random-dog-entry').val();
    // if the input value is invalid, show an alert
    if (!checkInput(newItemName)){
      alert('Please input a number between 1 and 50');
      return
    }
    // reset result-group section, clear all images
    $('.result-group').html('');
    // clear input value
    // $('.js-random-dog-entry').val('');
    getDogImage(newItemName);
  });
}

// main function
$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});