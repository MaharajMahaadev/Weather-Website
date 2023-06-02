// import axios from "axios";
import { apiKey } from "../_private/api-private.js";

// OPEN-METEO latitude , longitude & timezone ==> added dynamically
export async function getWeather(lat, lon, timezone) {
    let res = await axios.get('https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,pressure_msl,cloudcover,visibility,windspeed_10m,winddirection_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max&current_weather=true&windspeed_unit=ms&timeformat=unixtime', {
        params: {
            latitude: lat,
            longitude: lon,
            timezone,
        }
    });
    let data = await res.data;

    return data;
}

// OPEN-METEO latitude , longitude & timezone ==> added dynamically
export async function getAQI(lat, lon, timezone) {
    let res = await axios.get('https://air-quality-api.open-meteo.com/v1/air-quality?hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,european_aqi&timeformat=unixtime', {
        params: {
            latitude: lat,
            longitude: lon,
            timezone,
        }
    });
    let data = await res.data;

    return data;
}

// OPEN-METEO
// https://geocoding-api.open-meteo.com/v1/search?name=naples&count=10&language=en&format=json
export async function getGeolocation(searched) {
    // city | country | ZIP Code  (results appear from 2nd letter onward, no res on 1 letter)
    try {
        if (searched == '') return null; // prevents errors on faster input
        let res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${searched}&count=10&language=en&format=json`);
        let data = await res; // returns JSON straight away
        return data;
    } catch (error) { }
}


// BIG DATA CLOUD
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837&localityLanguage=en
export async function reverseGeolocation(lat, lon) {
    // lat | lon
    let res = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    let data = await res;

    return data;
}


// OPEN WEATHER
// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}
// mainly used for timezone at location
export async function getTimeZoneWeather(lat, lon) {
    // lat | lon
    let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    let data = await res;

    return data;
}