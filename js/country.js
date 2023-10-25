'use strict'

async function getCountry(){
    const countryName = localStorage.getItem('country-name')
    const endPoint = "https://restcountries.com/v3.1/name/" + countryName
    const response = await fetch(endPoint)
    const country = await response.json()
    return country
  }

function createCountryCard(country){
 
    const continent = document.getElementById('continent-name')
    continent.textContent = country.continents.join('/')

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
    console.log(typeof(borderValues))
    console.log(borderValues)
       try {
        // borderCard.textContent = borderValues.join(', ')  
        borderValues.forEach(function(border){
            let count
            if(count == borderValues.length -1)
            borderCard.innerHTML = `<a href="/html/country.html" class="border-link">${border}</a>`
            else
            borderCard.innerHTML = `<a href="/html/country.html" class="border-link">${border}</a>, `
            count++
        })

        const borderList = document.querySelectorAll('border-link')
        borderList.forEach(function(borderListed){
            borderListed.addEventListener('click', function(){
              borderListed.classList.add('clicked')
                const borderLink = document.querySelector('.clicked .border-link')
                borderLink.classList.add('teste')
              const clickedBorder = borderLink.textContent
              //  //mandar o nome do pais que foi clicado.......................................................
              localStorage.setItem('country-name', clickedBorder)
              console.log(localStorage.getItem('country-name'))
            })
          })


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

async function loadCountry(){
    const country = await getCountry()
    console.log(country)
    country.forEach(createCountryCard)
    // createCountryCard(country)
}

loadCountry()