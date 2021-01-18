const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZXJlZGRpbmciLCJhIjoiY2tqc2t6dG85N24zcTJzbnBrM25vMDN0byJ9.6sdMSk3mfQMQ6-rg4V08Cg&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to latlog service.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the lat or log.', undefined)
        } else {
            const current_latlog = body.features[0]
            const lat = current_latlog.center[0]
            const log = current_latlog.center[1]
            const placeName = current_latlog.place_name
            callback(undefined, {
                lat,
                log,
                placeName
            })
        }
    })
}

module.exports = geocode