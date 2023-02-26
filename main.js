"use strict"

const btn = document.querySelector(".action-btn")
const text = document.querySelector(".text")
const load = document.querySelector(".load")
const textQuote = document.querySelector(".quote")
let authorName = ""
let authorQuote = ""
let api_key = API_KEY

btn.addEventListener("click", getData)

function getData() {
    textQuote.textContent = ""
    text.textContent = ""
    loading()
    getQuote().then(getPersonality).then(results)
}

function results(data) {
    loading()
    textQuote.textContent = '"' + authorQuote + '"'
    text.textContent = authorName + " (" + data + ")"
}

function getPersonality(quote) {
    if(quote == undefined){
        return "Número de intentos agotados"
    }
    let x = 1
    let y = "es"
    const test2 = {"id": (x.toString()), "language": y, "text": quote}
    const test = [test2]
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            'X-RapidAPI-Key': `${api_key}`,
            'X-RapidAPI-Host': 'personality-traits.p.rapidapi.com'
        },
        body: JSON.stringify(test)
    }
    return fetch('https://personality-traits.p.rapidapi.com/personality', options)
	.then(res => {
        if (res.status != 200)
        {
            return undefined
        }
        return res.json()
    })
	.then(data => {
        if(data == undefined){
            return "Número de intentos agotados"
        }
        return data[0].predictions[0].prediction
    })
	.catch(error => console.error(error));
}

function getQuote() {
    const options2 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${api_key}`,
            'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
        }
    }
    return fetch('https://quotes15.p.rapidapi.com/quotes/random/?language_code=es', options2)
	.then(res => {
        if(res.status != 200){
            return undefined
        }
        return res.json()
    })
	.then(data => {
        if(data == undefined){
            authorQuote = "Número de intentos agotados"
            authorName = "Indefinido"
            return undefined
        }
        else{
            authorQuote = data.content
            authorName = data.originator.name
            return data.content
        }
    })
    .catch(error => console.error(error))
}

function loading() {
    if(load.classList.contains("hide")){
        load.classList.remove("hide")
    }
    else{
        load.classList.add("hide")
    }
}
