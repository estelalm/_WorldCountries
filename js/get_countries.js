async function getCountries(){
    const endPoint = "https://restcountries.com/v3.1/all"
    const response = await fetch(endPoint)
    const countries = await response.json()
    return countries
} 
async function getEurope(){
    const endPoint = "https://restcountries.com/v3.1/region/europe"
    const response = await fetch(endPoint)
    const countries = await response.json()
    return countries
} 
async function getOceania(){
    const endPoint = "https://restcountries.com/v3.1/region/oceania"
    const response = await fetch(endPoint)
    const countries = await response.json()
    return countries
} 

async function getAsia(){
    const endPoint = "https://restcountries.com/v3.1/region/asia"
    const response = await fetch(endPoint)
    const countries = await response.json()
    return countries
} 

async function getAmerica(){
    const endPoint = "https://restcountries.com/v3.1/region/america"
    const response = await fetch(endPoint)
    const countries = await response.json()
    return countries
} 
async function getAfrica(){
    const endPoint = "https://restcountries.com/v3.1/region/africa"
    const response = await fetch(endPoint)
    const countries = await response.json()
    return countries
} 

const getEuropeCountries = getEurope()
console.log(getEuropeCountries)
localStorage.setItem('getEurope', getEuropeCountries)
localStorage.setItem('getOceania', getOceania())
localStorage.setItem('getAsia', getAsia())
localStorage.setItem('getAmerica', getAmerica())
localStorage.setItem('getAsia', getAsia())