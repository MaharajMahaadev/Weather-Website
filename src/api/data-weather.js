import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { touchSlider } from '../util/slider.js';
import {
    aqiElements,
    arrayParser, dashboardElements, daysFull, daysShort,
    elements, hourlyElements, monthsShort, timeParser, valueParser, weatherCodes, weatherImgRoutesDAY, weatherImgRoutesNIGHT
} from "../util/util.js";
import { dashboardHourlyCardLower, dashboardHourlyCardUpper, dynamicHourlyTemplate } from '../views/dashboard.js';
import { getTimeZoneWeather, getWeather, reverseGeolocation } from "./api.js";

export function applyBlur(element) {
    if (element) element.classList.add('blurred');
}

export function removeBlur(element) {
    if (element) element.classList.remove('blurred');
}

export function createErrorOverlay(message) {
    let errorOverlay = document.createElement('a');
    errorOverlay.classList.add('error-overlay');
    errorOverlay.textContent = message;
    return errorOverlay;
}

export function renderErrorOverlay(message) {
    removeErrorOverlay();
    if (elements.dotHeader()) elements.dotHeader().appendChild(createErrorOverlay(message));
    // if (aqiElements.aqiWrapper()) aqiElements.aqiWrapper().appendChild(createErrorOverlay(message));
}

export function removeErrorOverlay() {
    while (document.querySelector('.error-overlay')) {
        document.querySelector('.error-overlay').remove();
    }
}

export function createNotificationOverlay() {
    let message = 'Information updated';
    let errorOverlay = document.createElement('a');
    errorOverlay.classList.add('notif-overlay');
    errorOverlay.textContent = message;
    return errorOverlay;
}

export function renderNotificationOverlay() {
    setTimeout(() => {
        removeNotificationOverlay();
        elements.dotHeader().appendChild(createNotificationOverlay());
        setTimeout(() => {
            removeNotificationOverlay();
        }, 2000);
    }, 500); // execute the whole render after 1 sec (for loading to clear out)
}

export function removeNotificationOverlay() {
    if (document.querySelector('.notif-overlay')) {
        document.querySelector('.notif-overlay').remove();
    }
}

export function getCurrentTimeZone() {
    // console.log(new Date().getMonth());
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export async function getCurrentLocationCoords() {
    let getPosition = async function () {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
    let res;
    try {
        res = await getPosition();
        // console.log(res);
        return [res.coords.latitude, res.coords.longitude];
    } catch (error) {
        return ['no access', error.message];
    }
}

export function returnDayLONG() {
    return new Intl.DateTimeFormat(undefined, { weekday: 'long' }); // has .format func
}

export function returnDaySHORT() {
    return new Intl.DateTimeFormat(undefined, { weekday: 'short' }); // has .format func
}

export function returnHour() {
    return new Intl.DateTimeFormat(undefined, { hour: 'numeric' }); // has .format func
}

function parseCurrentWeather(data) {
    let { current_weather, daily, hourly } = data;

    return {
        currentTemp: Math.round(current_weather.temperature),
        weatherCode: current_weather.weathercode,
        weatherText: weatherCodes[current_weather.weathercode],
        weatherImage: generateImage(current_weather.is_day, current_weather.weathercode),
        feelsLikeTemp: Math.round(hourly.apparent_temperature[0]),
        windSpeed: current_weather.windspeed,
        windDirection: current_weather.winddirection,
        humidity: hourly.relativehumidity_2m[0],
        precip: Math.round(hourly.precipitation[0] * 100) / 100,
        precipProbability: Math.round(hourly.precipitation_probability[0]),
        visibility: Math.round(hourly.visibility[0] * 100) / 100,
        pressure: Math.round(hourly.pressure_msl[0]),
        timeNow: current_weather.time * 1000,
        sunrise: daily.sunrise[0] * 1000,
        sunset: daily.sunset[0] * 1000,
        dayLong: returnDayLONG().format(current_weather.time * 1000),
        dayShort: returnDaySHORT().format(current_weather.time * 1000),
    }
}

function parseDailyWeather(data) {
    let { current_weather, daily } = data;

    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            weatherCode: daily.weathercode[index],
            weatherText: weatherCodes[daily.weathercode[index]],
            weatherImage: generateImage(current_weather.is_day, daily.weathercode[index]),
            temp: Math.round(daily.apparent_temperature_max[index]),
        }
    });

}

function parseHourlyWeather(data) {
    let { hourly, current_weather } = data;

    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            is_day: hourly.is_day[index],
            weatherCode: hourly.weathercode[index],
            weatherText: weatherCodes[hourly.weathercode[index]],
            weatherImage: generateImage(hourly.is_day[index], hourly.weathercode[index]),
            temp: Math.round(hourly.temperature_2m[index]),
            feelsLikeTemp: Math.round(hourly.apparent_temperature[index]),
            precip: Math.round(hourly.precipitation[index] * 100) / 100,
            precipProbability: Math.round(hourly.precipitation_probability[index]),
            windSpeed: hourly.windspeed_10m[index],
            windDirection: hourly.winddirection_10m[index],
            humidity: hourly.relativehumidity_2m[index],
            pressure: Math.round(hourly.pressure_msl[index]),
            visibility: Math.round(hourly.visibility[index] * 100) / 100,
            cloudCover: hourly.cloudcover[index],
            hour: returnHour().format(time * 1000),
            dayLong: returnDayLONG().format(time * 1000),
            date: new Date(time * 1000).getDate(),
            monthShort: monthsShort[new Date(time * 1000).getMonth()],
        }
    }).filter(({ timestamp }) => timestamp >= current_weather.time * 1000);
    // filter only the hours from current hour to after 7 days
}

function generateImage(isDay, weatherCode) {
    return isDay == 1
        ? weatherImgRoutesDAY[weatherCode]
        : weatherImgRoutesNIGHT[weatherCode]
}

export async function getParsedWeatherData(coords) {
    // let testRaw = await getWeather(42.7, 23.32, getCurrentTimeZone());
    let data = await getWeather(coords[0], coords[1], getCurrentTimeZone());
    let extraData = await getTimeZoneWeather(coords[0], coords[1]);
    let locationTimeZone = extraData.data.timezone;
    let result = {
        raw: data,
        current: parseCurrentWeather(data),
        daily: parseDailyWeather(data),
        hourly: parseHourlyWeather(data),
    };
    result.current.is_day = result.hourly[0].is_day;
    result.current.timeZoneGMTdiff = locationTimeZone;
    return result;
}

export function applyLoading() {
    elements.loading().style.display = 'grid';
}

export function removeLoading() {
    elements.loading().style.display = 'none';
}

// invoked every 10m by updateWeatherInfo()
let degreeState = 'C';
export function renderWeather(page, { current, daily, hourly }, flag = true, deg = false) {
    if (deg) degreeState = deg;
    else if (localStorage.getItem('deg')) degreeState = localStorage.getItem('deg');
    else if (degreeState != 'C' && degreeState != 'F') degreeState = 'C';
    localStorage.setItem('deg', degreeState);

    renderCurrentWeather(page, current);
    renderDailyWeather(page, daily);
    renderHourlyWeather(page, hourly, flag);
    dashboardElements.lastUpdated().forEach(x => {
        setValue(x, `Last updated: ${timeParser.hours24()[0]}:${timeParser.min()} ${timeParser.hours24()[1]}`);
    });
    if (flag) {
        applyBlur(elements.main());
        applyLoading();
        renderNotificationOverlay();
        setTimeout(() => {
            removeBlur(elements.main());
            removeLoading();
        }, 500);
    }
}





// intervals for:
// [0]: updateWeatherInfo()
// [1]: updateDashboardTimeNow()
let prevIntervals = [null, null];
// invokes renderWeather() every 10m
export function updateWeatherInfo(page, { current, daily, hourly }) {
    if (prevIntervals[0]) {
        clearInterval(prevIntervals[0]);
        prevIntervals[0] = null;
    }
    let interval = setInterval(function () {
        renderWeather(page, { current, daily, hourly }, false);
    }, 600000);
    prevIntervals[0] = interval;
}

export function setValue(element, value, addin = false, attributes = []) {
    if (!element) return; // prevents errors - continuous func
    if (addin) {
        // temp element is needed to prevent lit-html bug when re-rendering on top of
        // already rendered element without reloading the page - couldn't find another fix
        let temp = document.createElement('div');
        temp.textContent = value;
        render(addin, temp);
        element.innerHTML = temp.innerHTML; // prevents addins missing on nth re-render
    } else {
        element.textContent = value;
    }
    if (attributes.length > 0) {
        for (const [atr, val] of attributes) {
            element.setAttribute(atr, val);
        }
    }
}

export function setImage(element, path) {
    if (!element) return; // prevents errors - continuous func
    element.setAttribute('src', path);
}

function updateDashboardTimeNow(current) { // updates timeNow every second
    if (prevIntervals[1]) {
        clearInterval(prevIntervals[1]);
        prevIntervals[1] = null;
    }
    let interval = setInterval(function () {
        let yourOffset = timeParser.yourOffset(new Date().getTimezoneOffset());
        let locOffset = current.timeZoneGMTdiff / 60;
        let offsetDiff = timeParser.offsetDiff(yourOffset, locOffset);
        let locBehind = yourOffset > locOffset;
        let myTime = timeParser.getLocationTime(0, locBehind);
        let locTime = timeParser.getLocationTime(offsetDiff, locBehind);
        let sec = new Date().getSeconds();
        let secParsed = sec > 9 ? sec : `0${sec}`;
        // console.log(myTime, locTime);

        if (dashboardElements.highTimeNow()) {
            // LOCATION TIME
            setValue(dashboardElements.highTimeNow(), `${locTime[0]}:${locTime[1]} ${locTime[2]}`);
            // MY TIME
            setValue(dashboardElements.highYourTime(), `${myTime[0]}:${myTime[1]}:${secParsed} ${myTime[2]}`);
        }

    }, 1000);
    prevIntervals[1] = interval;
}

// degreeState
async function renderCurrentWeather(page, current) {
    if (page == 'dashboard') {
        // CURRENT CARD
        setImage(dashboardElements.currentImg(), current.weatherImage);
        setValue(dashboardElements.currentTemp(), getTemp(current.currentTemp),
            html`&deg;<sup>${degreeState}</sup>`);
        setValue(dashboardElements.currentText(), current.weatherText);
        setValue(dashboardElements.currentDateDay(), `${current.
            dayLong} ${new Date().getDate()}, ${monthsShort[new Date().getMonth()]}`);
        // Location (current card)
        let lat = localStorage.getItem('lat');
        let lon = localStorage.getItem('lon');
        if (lat && lon) {
            let revGeoL = await reverseGeolocation(lat, lon);
            // console.log(revGeoL.data);
            let x = revGeoL.data;
            let nameString = x.city && x.city != '' ? x.city : x.locality;
            let fullString = nameString + ', ';
            nameString = x.principalSubdivision && x.principalSubdivision != '' ?
                `${nameString}, ${x.principalSubdivision}` : nameString;
            nameString = x.countryCode && x.countryCode != '' ?
                `${nameString}, ${x.countryCode}` : nameString;
            localStorage.setItem('address', nameString);
            let adminArr = (x.localityInfo.administrative)
                .sort((a, b) => b.adminLevel - a.adminLevel || b.order - a.order);
            adminArr.forEach(x => fullString += `${x.name}, `);
            fullString += x.continent;
            fullString = fullString.split(', ').filter((v, i, arr) => arr.indexOf(v) == i)
                .join(', ');
            setValue(dashboardElements.currentLocation(), nameString,
                html`<span class="tooltip-text">${fullString}</span>`);
        }


        // TODAYS HIGHLIGHTS
        let yourOffset = timeParser.yourOffset(new Date().getTimezoneOffset());
        let locOffset = current.timeZoneGMTdiff / 60;
        let offsetDiff = timeParser.offsetDiff(yourOffset, locOffset);
        let locBehind = yourOffset > locOffset;
        let [hoursDiff, diffIcon] = [null, null];
        if (yourOffset == locOffset) {
            hoursDiff = 'same timezone';
            diffIcon = 'nest_clock_farsight_analog';
        } else {
            hoursDiff = !locBehind ? `${offsetDiff / 60}h behind`
                : `${offsetDiff / 60}h ahead`;
            diffIcon = !locBehind ? 'history' : 'update';
        }
        let myTime = timeParser.getLocationTime(0, locBehind);
        let locTime = timeParser.getLocationTime(offsetDiff, locBehind);
        let locRise = timeParser.getLocationTime(offsetDiff, locBehind, new Date(current.sunrise));
        let locSet = timeParser.getLocationTime(offsetDiff, locBehind, new Date(current.sunset));
        // console.log(myTime, locTime, locRise, locSet);

        // LOCATION TIMES
        setValue(dashboardElements.highTimeNow(), `${locTime[0]}:${locTime[1]} ${locTime[2]}`); // UP*
        setValue(dashboardElements.highTimeSunrise(), `${locRise[0]}:${locRise[1]} ${locRise[2]}`);
        setValue(dashboardElements.highTimeSunset(), `${locSet[0]}:${locSet[1]} ${locSet[2]}`);
        // MY TIME & time difference
        setValue(dashboardElements.highYourTime(), `${myTime[0]}:${myTime[1]} ${myTime[2]}`); // UP*
        setValue(dashboardElements.highTimeDiffIcon(), diffIcon);
        if (yourOffset != locOffset) {
            setValue(dashboardElements.highTimeDiffLabel(), 'You are');
            setValue(dashboardElements.highTimeDiff(), hoursDiff);
        } else {
            setValue(dashboardElements.highTimeDiffLabel(), 'You are in the');
            setValue(dashboardElements.highTimeDiff(), hoursDiff);
        }
        // UP* ==> these lines are being updated each second from the function below
        updateDashboardTimeNow(current);

        setValue(dashboardElements.highFeelsLike(), getTemp(current.feelsLikeTemp),
            html`&deg;<sup>${degreeState}</sup>`);
        setValue(dashboardElements.highWind(), current.windSpeed, html` <sub>m/s</sub>`);
        setValue(dashboardElements.highHumidity(), current.humidity, html` <sub>%</sub>`);
        setValue(dashboardElements.highPrecip(), current.precip, html` <sub>mm</sub>`);
        let visSmart = valueParser.visibility(current.visibility);
        setValue(dashboardElements.highVisibility(), visSmart[0], html` <sub>${visSmart[1]}</sub>`);
        setValue(dashboardElements.highPressure(), current.pressure, html` <sub>hPa</sub>`);
    } else if (page == 'hourly') {
        // remains in case its needed at a later point
    }
}

function renderDailyWeather(page, daily) {
    if (page == 'dashboard') {
        // DAILY FORECAST - 7 days
        dashboardElements.dailyImg().forEach((el, i) => {
            setImage(el, daily[i].weatherImage);
        });
        dashboardElements.dailyTemp().forEach((el, i) => {
            setValue(el, getTemp(daily[i].temp), html`&deg;<sup>${degreeState}</sup>`);
        });
        dashboardElements.dailyDateMonth().forEach((el, i) => {
            let dateRaw = new Date(daily[i].timestamp);
            let [date, month, day] =
                [dateRaw.getDate(), dateRaw.getMonth(), dateRaw.getDay()];
            setValue(el, `${daysShort[day]} ${date}, ${monthsShort[month]}`);
        });
        dashboardElements.dailyDay().forEach(el => {
            el.parentElement.removeChild(el);
        });
    } else if (page == 'hourly') {
        // remains in case its needed at a later point
    }
}

function renderHourlyWeather(page, hourly, flag) {
    if (page == 'dashboard') {
        if (flag) {
            let sliders = arrayParser.arr3parser(hourly.slice());
            dashboardElements.dashHSlider1().replaceChildren();
            dashboardElements.dashHSlider2().replaceChildren();
            sliders.forEach((x, i) => {
                let t = timeParser.hours24(new Date(x.timestamp));
                let upperCard = dashboardHourlyCardUpper(`${t[0]} ${t[1]}`, x.weatherImage,
                    getTemp(x.temp), degreeState);
                let lowerCard = dashboardHourlyCardLower(`${t[0]} ${t[1]}`, '/src/images/weather-icons/direction.png', x.windSpeed, x.windDirection);
                let li1 = document.createElement('li');
                li1.classList.add('slider-item');
                li1.setAttribute('data-info-upper', i);
                render(upperCard, li1);
                dashboardElements.dashHSlider1().appendChild(li1);
                let li2 = document.createElement('li');
                li2.classList.add('slider-item');
                li2.setAttribute('data-info-lower', i);
                render(lowerCard, li2);
                dashboardElements.dashHSlider2().appendChild(li2);
            });
        }
    } else if (page == 'hourly') {
        let root = hourlyElements.articleCtr();
        let temp = document.createElement('div');
        root.setAttribute('id', 'hourly-render');
        root.replaceChildren();
        render(dynamicHourlyTemplate(hourly, degreeState), temp);
        root.innerHTML = temp.innerHTML;
    }
}


export function getTemp(num) {
    if (degreeState == 'C') return num;
    else if (degreeState == 'F') return Math.round((num * 9 / 5) + 32);
}