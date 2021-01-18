const request = require('request')

const forecast = (lat, log, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c6ae6c6f8d7c249a553ef23a30670dc4&query=${log},${lat}&units=f`

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const weathDesc = body.current.weather_descriptions[0].toLowerCase()
            const currentTemp = body.current.temperature
            const feelslike = body.current.feelslike
            callback(undefined, {
                weathDesc,
                currentTemp,
                feelslike
            })
        }
    })
}

module.exports = forecast