const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars views and eng. location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Edward Redding'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Edward Redding'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Call me for help.',
        name: 'Edward Redding',
        title: 'Help Page'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    geocode(address, (error, {lat, log, placeName} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(lat, log, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            return res.send({
                placeName,
                forecastData,
                address
            })
          })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Call me for help.',
        name: 'Edward Redding',
        title: 'Help Page',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Call me for help.',
        name: 'Edward Redding',
        title: 'Help Page',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`The server is up on port ${port}.`)
})