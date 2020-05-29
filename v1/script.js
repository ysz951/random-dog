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
  // if the input value is invalid, show an alert
  if (!checkInput(newItemName)){
    alert('Please input a number between 1 and 50');
    return
  }
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

function displayResults(responseJson) {
  // show the responseJon in console
  console.log(responseJson)
}

// inspect form action
function watchForm() {
  $('button').on('click', event => {
    event.preventDefault();
    // reset result-group section, clear all images
    $('.result-group').html('');
    const newItemName = $('input').val();
    // clear input value
    $('input').val('');
    getDogImage(newItemName);
  });
}

// main function
$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});