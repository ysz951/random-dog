'use strict';


function getDogImage(newItemName) {
  if (isNaN(newItemName) || newItemName < 1 || newItemName > 50){
    alert('Please input a number between 1 and 50');
    return
  }
  let fetchAddress;
  if (!newItemName){
    fetchAddress = 'https://dog.ceo/api/breeds/image/random/3';
  }
  else{
    fetchAddress = `https://dog.ceo/api/breeds/image/random/${newItemName}`;
  }
  fetch(fetchAddress)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}



function renderList(responseMessage){
  const n = responseMessage.length;
  const subgroupNumber = ~~(n/2) + n%2;
  for(let i = 0; i < n; i++ ){
    if (i%2 === 0){
      $('.result-group').append(`<div class="subgroup_${~~(i/2)+1} group"></div>`);
    }
    $(`.subgroup_${~~(i/2)+1}`).append(`<div class="item_${i+1} item"></div>`)
    $(`.item_${i+1}`).html(`<img src='${responseMessage[i]}' alt='${i+1}'>`)
  }
}

function displayResults(responseJson) {
  console.log(responseJson)
  // renderList(responseJson.message)
}

function watchForm() {
  $('button').on('click', event => {
    event.preventDefault();
    $('.result-group').html('');
    const newItemName = $('input').val();
    $('input').val('');
    getDogImage(newItemName);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});