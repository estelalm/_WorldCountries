'use strict'

const continentTitle = document.getElementById('continentName')
let continentName = continentTitle.innerHTML.toLowerCase()

async function getCountries(){
    const endPoint = "https://restcountries.com/v3.1/region/" + continentName
    const response = await fetch(endPoint)
    const countries = await response.json()
    return countries
} 

function createCountryCard(country){

        const infoContainer = document.getElementById('info-container')

        const firstRow = document.createElement('div')
        firstRow.classList.add('first-row')
        const ofcName = document.createElement('h3')
        ofcName.textContent = country.name.official 
        const line = document.createElement('hr')
        const info = document.createElement('div')
        info.classList.add('info')
        const footer = document.createElement('div')
        footer.classList.add('info-footer')
    
        infoContainer.replaceChildren(firstRow, ofcName, line, info, footer)
    
        let flagImg = document.createElement('img')
        flagImg.src= country.flags.png
        flagImg.alt = country.flags.alt
    
        let title = document.createElement('h2')
        title.textContent = `${country.name.common} (${country.cca2})`
    
        let titleName = `${country.name.common} (${country.cca2})`
        let titleCount = titleName.length
        if(titleCount > 20)
        title.classList.add('smaller')
    
        firstRow.replaceChildren(title, flagImg)
    
        let capital = document.createElement('p')
        capital.textContent = "Capital: " + country.capital
    
        let area = document.createElement('p')
        area.textContent = "Area: " + country.area + " km²"
    
        let population = document.createElement('p')
        population.textContent = "Population: " + country.population
    
        let gentilic = document.createElement('p')
        gentilic.textContent = "Gentilic: " + country.demonyms.eng.m
    
        let currencies = document.createElement('p')
        let currency = country.currencies
        let showCurrencies
        for(let prop in currency){
            let currencyName = currency[prop]
            if(currencyName.symbol != undefined)
            showCurrencies = `${currencyName.name} (${currencyName.symbol})`
            else
            showCurrencies = currencyName.name
        }
        currencies.textContent = "Currency: " + showCurrencies
    
        let languages = document.createElement('p')
        let language = country.languages
        let showLanguages = []
        for(let prop in language){
            let languageItem = language[prop]
            showLanguages.push(languageItem)
        }
    
        languages.textContent = "Languages: " + showLanguages.join(', ')
    
        info.replaceChildren(capital, area, population, gentilic, currencies, languages)
    
        let borderButton = document.createElement('div')
        borderButton.textContent = 'Borders'
        let borderCard = document.createElement ('p')
        let borderValues = country.borders
        console.log(borderValues)
        try {
            borderCard.textContent = borderValues.join(', ')  
           } catch (e) {
               borderCard.textContent = "No borders to this country"
           }
    
        borderButton.appendChild(borderCard)
    
        let maps = document.createElement('a')
        maps.textContent = "View Maps"
        let mapsIcon = document.createElement('img')
        mapsIcon.src = '/img/maps.svg'
        maps.appendChild(mapsIcon)
        maps.href = "https://google.com/maps/place/" + country.name.common.replace('', '+')
    
        footer.replaceChildren(borderButton, maps)
    
}

function createCountry(country){

    const container = document.getElementById('countries-container')
    const flagContainer = document.createElement('div')
    flagContainer.classList.add('country')
    const flag = document.createElement('img')
    flag.src= country.flags.png
    flag.alt = country.name.common + " Flag"
    container.appendChild(flagContainer)
    flagContainer.appendChild(flag)

    const infoContainer = document.getElementById('info-container')

    // flagContainer.addEventListener('click', createCountryCard(country))
    flagContainer.addEventListener('click', () =>{
        console.log('País clicado')
        createCountryCard(country)
    })

}


// 

function search(countries){

    const searchInput = document.getElementById('search-bar')
    const resultsBox = document.getElementById('search-result')

    let countriesNameArray = []
    countries.forEach(function(country){
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
         displayResult(results)
      }

      function displayResult(results){

        let content = results.map((list) => {
            //criar os itens da pesquisa e chamar a função que faz o nome clicado preencher a barra de pesquisa
            return `<li class="country-search">${list}</li>`
        })
  
        resultsBox.innerHTML = `<ul>${content.join('')}</ul>`
  
        //clicar e pegar o nome do país, que vai pra pagina e carrega as coisas lá
        const countryList = document.querySelectorAll('.country-search')
        countryList.forEach(function(countryListed){
          countryListed.addEventListener('click', function(){
            countryListed.classList.add('clicked')
            searchInput.value = ""
              const countryLink = document.querySelector('.clicked')

            countries.forEach((countrySelected) =>{

                 if(countrySelected.name.official == countryLink.textContent || countrySelected.name.common == countryLink.textContent ){
                    createCountryCard(countrySelected)
                 }
            })

            if(countryListed.classList == 'clicked')
                countryListed.classList.remove('clicked')

                resultsBox.classList.remove('shown')
                resultsBox.classList.add('off')
          })


        })
    }
}


async function loadCountries(){
    const countries = await getCountries()
    countries.forEach(createCountry)
    search(countries)
}

loadCountries()
console.log(await getCountries())