const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// test
messageOne.textContent = 'Loading....'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.placeName
            messageTwo.textContent = `The current weather is ${data.forecastData.weathDesc}.  The current tempature is ${data.forecastData.currentTemp} and it feels like ${data.forecastData.feelslike}.`
        }
    })
})
})
