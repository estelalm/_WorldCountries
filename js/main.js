'use strict'

//continents 
const prevButton = document.getElementById("prev-arrow")
const nextButton = document.getElementById("next-arrow")
const continent = document.querySelectorAll('.continent')

let currentContinent = 0;

function hideContinent(){
  
  continent.forEach(function (mn){
    mn.classList.remove('active')
  })
}

function showContinent(){
  let mn = continent[currentContinent]
    function addContinent (){
    mn.classList.add('active')
  }
 
  addContinent()
}

function nextContinent(){
  hideContinent()
  if(currentContinent == continent.length -1){
    currentContinent = 0
  }else{
    currentContinent++
  }
  showContinent()
}

function prevContinent(){
  hideContinent()
  if(currentContinent == 0){
    currentContinent = continent.length-1
  }else{
    currentContinent--
  }
  showContinent()
}

nextButton.addEventListener('click', nextContinent )
prevButton.addEventListener('click', prevContinent )

//more
const moreButton = document.getElementById('more')
const moreInfo = document.getElementById('more-links')
function showMore(){
  moreInfo.classList.toggle('on')
}

moreButton.addEventListener('click', showMore)