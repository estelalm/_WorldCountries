'use strict'

async function getCountries(){
  const endPoint = "https://restcountries.com/v3.1/all"
  const response = await fetch(endPoint)
  const countries = await response.json()
  return countries
}

 function search(countries){

  const searchInput = document.getElementById('search-bar')
  const resultsBox = document.getElementById('search-result')

  let countriesNameArray = []
  countries.forEach(function(country){
       let countriesNames = Object.values(country.name)
       let common = countriesNames[0]
       let ofc = countriesNames[1]
       countriesNames[2] = " "
       countriesNameArray.push(common)
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
   displayResult(results)
}


function displayResult(results){

      let content = results.map((list) => {
          //criar os itens da pesquisa e chamar a função que faz o nome clicado preencher a barra de pesquisa
          return `<li class="country-search"><a class="country-link" href="./html/country.html">${list}</a></li>`
      })

      console.log(content)
      resultsBox.innerHTML = `<ul>${content.join('')}</ul>`

      //clicar e pegar o nome do país, que vai pra pagina e carrega as coisas lá
      const countryList = document.querySelectorAll('.country-search')
      countryList.forEach(function(countryListed){
        countryListed.addEventListener('click', function(){
          countryListed.classList.add('clicked')
            const countryLink = document.querySelector('.clicked .country-link')
            countryLink.classList.add('teste')
          const clickedCountryName = countryLink.textContent
          //  //mandar o nome do pais que foi clicado.......................................................
          localStorage.setItem('country-name', clickedCountryName)
          console.log(localStorage.getItem('country-name'))
        })
      })
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

