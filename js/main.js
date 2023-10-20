'use strict'

async function getCountries(){
  const endPoint = "https://restcountries.com/v3.1/all"
  const response = await fetch(endPoint)
  const countries = await response.json()
  console.log(countries)
  return countries
}

function search(countries){

  const searchInput = document.getElementById('search-bar')
  const resultsBox = document.getElementById('search-result')


  console.log(typeof(countries))
  let countriesNameArray = []
  countries.forEach(function(country){
    console.log(country)
       let countriesNames = Object.values(country.name)
       let common = countriesNames[0]
       let ofc = countriesNames[1]
       countriesNames[2] = " "
       countriesNameArray.push(common, ofc)
  })

  searchInput.onkeyup = function(){
  let results = []
  let input = searchInput.value
  console.log(input)
   if(input.length){
        resultsBox.classList.add('shown')
        resultsBox.classList.remove('off')
        results = countriesNameArray.filter((keyword) =>{
        return keyword.toLowerCase().includes(input.toLowerCase())
       })
   }else{
    resultsBox.classList.add('off')
    resultsBox.classList.remove('shown')
   }
   console.log(results)
   displayResult(results)
}

  

  //função pra colocar o valor clicado na barra de pesquisa //nofunciona
  function selectInput(){
      searchInput.value = list.innerHTML
  }

  function displayResult(results){

      let content = results.map((list) => {
          //criar os itens da pesquisa e chamar a função que faz o nome clicado preencher a barra de pesquisa
          return `<li class="country-search"><a href="/html/country.html">${list}</a></li>`
      })

      //event listener pra clicar e pegar o nome do país, que vai pra pagina do país

      //lista dentro da caixa de resultados
      resultsBox.innerHTML = `<ul>${content.join('')}</ul>`
  }
}

async function loadSearchItems(){
  const countries = await getCountries()
  search(countries)
}

loadSearchItems()




//continents display 
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


//botão de mostrar os links
const moreButton = document.getElementById('more')
const moreInfo = document.getElementById('more-links')
function showMore(){
  moreInfo.classList.toggle('on')
}
moreButton.addEventListener('click', showMore)
