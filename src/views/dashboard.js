import { html } from '../../node_modules/lit-html/lit-html.js';
import { getParsedAQIData, renderAQI } from '../api/data-aqi.js';
import { searchOnTyping, onSearchClick } from '../api/data-search.js';
import {
    applyBlur, getCurrentLocationCoords, getParsedWeatherData,
    getTemp,
    removeErrorOverlay, renderErrorOverlay, renderWeather, updateWeatherInfo
} from '../api/data-weather.js';
import { addEventOnElements, dashboardElements, elements, searchUtility, valueParser } from '../util/util.js';


let context = null;
let defaultCoords = [];
export async function dashboardPage(ctx) {
    context = ctx;
    ctx.render(dashboardTemplate());
    document.querySelector('article.container').style.display = 'grid';
    addEventOnElements(dashboardElements.searchTogglers(), 'click', searchUtility.toggleSearch);
    dashboardElements.searchField().addEventListener('input', searchOnTyping);
    dashboardElements.degToggler().removeEventListener('change', degreeSwitcher);
    if (localStorage.getItem('deg')) { // keeps state of toggle
        if (localStorage.getItem('deg') == 'C') dashboardElements.degToggler().checked = false;
        else if (localStorage.getItem('deg') == 'F') dashboardElements.degToggler().checked = true;
    }
    dashboardElements.degToggler().addEventListener('change', degreeSwitcher);
    applyBlur(elements.main());
    try {
        if (localStorage.getItem('lat') && localStorage.getItem('lon')) {
            defaultCoords = [localStorage.getItem('lat'), localStorage.getItem('lon')];
        } else {
            let currentCoords = await getCurrentLocationCoords();
            if (currentCoords[0] == 'no access') {
                let message = `Please allow us to use your Geolocation
                or Search for another location above.`;
                renderErrorOverlay(message);
                return;
            } else {
                localStorage.setItem('lat', currentCoords[0]);
                localStorage.setItem('lon', currentCoords[1]);
                defaultCoords = [currentCoords[0], currentCoords[1]];
            }
        }
        let weatherInfo = await getParsedWeatherData(defaultCoords);
        let aqiInfo = await getParsedAQIData(defaultCoords);
        renderAQI('dashboard', aqiInfo);
        renderWeather('dashboard', weatherInfo); // dynamic data is fed to DOM elems
        updateWeatherInfo('dashboard', weatherInfo); // updates everything every 10 min
        removeErrorOverlay();
        // console.log(weatherInfo);
        // console.log(aqiInfo);
    } catch (error) {
        let message = 'Error getting weather data!';
        console.log('Error details: ', { ...error, 'stack': error.stack });
        alert(message);
        renderErrorOverlay(message);
        applyBlur(elements.main());
    }
}

async function hourlyDetails(e) {
    e.preventDefault();
    context.render(hourlyTemplate());
    document.querySelector('article.container').style.display = 'block';
    applyBlur(elements.main());
    try {
        if (localStorage.getItem('lat') && localStorage.getItem('lon')) {
            defaultCoords = [localStorage.getItem('lat'), localStorage.getItem('lon')];
        } else {
            let currentCoords = await getCurrentLocationCoords();
            if (currentCoords[0] == 'no access') {
                let message = `Please allow us to use your Geolocation
                or Search for another location above.`;
                renderErrorOverlay(message);
                return;
            } else {
                localStorage.setItem('lat', currentCoords[0]);
                localStorage.setItem('lon', currentCoords[1]);
                defaultCoords = [currentCoords[0], currentCoords[1]];
            }
        }
        let weatherInfo = await getParsedWeatherData(defaultCoords);
        renderWeather('hourly', weatherInfo); // dynamic data is fed to DOM elems
        updateWeatherInfo('hourly', weatherInfo); // updates everything every 10 min
        removeErrorOverlay();
        // console.log(weatherInfo);
    } catch (error) {
        let message = 'Error getting weather data!';
        console.log('Error details: ', { ...error, 'stack': error.stack });
        alert(message);
        renderErrorOverlay(message);
        applyBlur(elements.main());
    }
}

async function onCurrentLocationClick(e) {
    e.preventDefault();
    try {
        let currentCoords = await getCurrentLocationCoords();
        if (currentCoords[0] == 'no access') {
            let message = `Please allow us to use your Geolocation
            or Search for another location above.`;
            renderErrorOverlay(message);
            return;
        } else {
            localStorage.setItem('lat', currentCoords[0]);
            localStorage.setItem('lon', currentCoords[1]);
            defaultCoords = [currentCoords[0], currentCoords[1]];
        }
        // location.href = '/dashboard';
        let weatherInfo = await getParsedWeatherData(defaultCoords);
        let aqiInfo = await getParsedAQIData(defaultCoords);
        renderAQI('dashboard', aqiInfo);
        renderWeather('dashboard', weatherInfo); // dynamic data is fed to DOM elems
        updateWeatherInfo('dashboard', weatherInfo); // updates everything every 10 min
        removeErrorOverlay();
        // console.log(weatherInfo);
        // console.log(aqiInfo);
    } catch (error) {
        let message = 'User denied Geolocation. Please allow us to use your Geolocation.';
        console.log('Error details: ', { ...error, 'stack': error.stack });
        alert(message);
        renderErrorOverlay(message);
        applyBlur(elements.main());
    }
}

async function degreeSwitcher(e) {
    // false = Celsius | true = Fahrenheit
    let state = e.target.checked;
    // console.log(state);
    if (state) localStorage.setItem('deg', 'F');
    else localStorage.setItem('deg', 'C');
    try {
        defaultCoords = [localStorage.getItem('lat'), localStorage.getItem('lon')];
        let weatherInfo = await getParsedWeatherData(defaultCoords);
        renderWeather('dashboard', weatherInfo); // dynamic data is fed to DOM elems
        removeErrorOverlay();
    } catch (error) { }
}



const dashboardTemplate = (items = {}) => html`
<div class="header">
    <div class="container">

        <a href="javascript:void(0)" class="logo"
        title="Powered by: open-meteo.com & openweathermap.org">
            <img src="/src/images/logo.gif" alt="logo" width="364" height="58">
        </a>

        <div class="search-view" data-search-view> <!-- toggle .active for testing -->
            <div class="search-wrapper">
                <input type="search" name="search" placeholder="Search city ..." 
                autocomplete="off" class="search-field" data-search-field>
                <span class="m-icon leading-icon">search</span>
                <button class="icon-btn leading-icon has-state" aria-label="close search" 
                data-search-toggler>
                    <span class="m-icon">arrow_back</span>
                </button>
            </div> <!-- search-wrapper ends here -->

            <div class="search-result" data-search-result> <!-- toggle .active for testing -->
                <ul class="view-list" data-search-list>
                    <li class="view-item">
                        <span class="m-icon">location_on</span>
                        <div>
                            <p class="item-title">London</p>
                            <p class="label-2 item-subtitle">State of London, GB</p>
                        </div>
                        <a @click=${onSearchClick} class="item-link has-state"
                        data-search-toggler></a>
                    </li>
                </ul>
            </div> <!-- search-result ends here -->
        </div> <!-- search-view ends here -->

        <div class="header-actions">
            <button class="icon-btn has-state" aria-label="open search" data-search-toggler>
                <span class="m-icon icon">search</span>
            </button>

            <!-- below target = (#/current-location) -->
            <a @click=${onCurrentLocationClick} class="btn-primary has-state" data-current-location-btn>
                <span class="m-icon">my_location</span>

                <span class="span">Current Location</span>
            </a>
        </div>

    </div> <!-- div.container ends here -->
    <div class="loading" data-loading></div>

</div> <!-- div.header ends here -->

<main>
    <article class="container">
        <div class="content-left">
            <!-- CURRENT WEATHER -->
            <section class="section current-weather" aria-label="current weather"
                data-current-weather>
                <div class="card card-lg current-weather-card">
                
                    <div id="deg-toggle-ctr">
                    <div id="toggler">
                        <input type="checkbox" class="toggle" id="check">
                        <label for="check"></label>
                    </div>
                    </div>
                    <h2 class="title-2 card-title">Now</h2>
                    <h4 id="last-updated">Last updated: 12:17 AM</h4>

                    <div class="weapper">
                        <p class="heading">25&deg;<sup>c</sup></p>

                        <img src="/src/images/weather-icons/01d.png" width="60px"
                        height="60px" alt="Overcast Clouds" class="weather-icon">
                    </div>

                    <p class="body-3">Overcast Clouds</p>
                    
                    <ul class="meta-list">
                        <li class="meta-item">
                            <span class="m-icon">calendar_today</span>
                            <p class="title-3 meta-text">Thursday 16, Feb</p>
                        </li>
                        <li class="meta-item">
                            <span class="m-icon">location_on</span>
                            <p class="title-3 meta-text">London, GB</p>
                        </li>

                    </ul>
                </div> 
            </section> <!-- current weather ends here -->
            
            <!-- FORECAST -->
            <section class="section forecast" aria-labelledby="forecast-label" data-5-day-forecast>
                <h2 class="title-2" id="forecast-label">Daily Forecast</h2>

                <div class="card card-lg forecast-card">
                    <ul>
                        <li class="card-item"> <!-- li 1 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>
                        <li class="card-item"> <!-- li 2 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>
                        <li class="card-item"> <!-- li 3 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>
                        <li class="card-item"> <!-- li 4 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>
                        <li class="card-item"> <!-- li 5 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>
                        <li class="card-item"> <!-- li 6 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>
                        <li class="card-item"> <!-- li 7 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>

                    </ul>
                </div> <!-- div.card.card-lg.forecast-card ends here -->
            </section>
        </div> <!-- div.content-left ends here -->

        <div class="content-right">
            
            <!-- HIGHLIGHTS -->
            <section class="section highlights" aria-labelledby="highlights-label" data-highlights>
                <div class="card card-lg">

                    <h2 class="title-2" id="highlights-label">Todays Highlights</h2>

                    <div class="highlight-list">

                        <div class="card card-sm highlight-card one">
                            
                            <h3 class="title-3">Air Quality Index</h3>
                            
                            <div class="wrapper">

                                <span class="m-icon">air</span>

                                <ul class="card-list">

                                    <li class="card-item">μg/m³
                                        <p class="title-1">23.3</p>

                                        <p class="label-1">PM<sub>2.5</sub></p>
                                        
                                    </li>

                                    <li class="card-item">μg/m³
                                        <p class="title-1">23.3</p>
                                        
                                        <p class="label-1">PM<sub>2.5</sub></p>
                                    </li>

                                    <li class="card-item">μg/m³
                                        <p class="title-1">23.3</p>
                                        
                                        <p class="label-1">PM<sub>2.5</sub></p>
                                    </li>

                                    <li class="card-item">μg/m³
                                        <p class="title-1">23.3</p>
                                        
                                        <p class="label-1">PM<sub>2.5</sub></p>
                                    </li>

                                </ul>
                            </div>

                            <a href="/air-quality" id="aqi-link" title="aqi more info">More Info ➥</a>
                            <span class="badge aqi-1 label-1" title="aqi message">Good</span>

                        </div>

                        <div class="card card-sm highlight-card two">
                            
                            <h3 class="title-3">Sunrise & Sunset</h3>
                            <h3 class="title-3">Location Time</h3>

                            <div class="card-list">
                                <div class="card-item">
                                    <span class="m-icon">nest_clock_farsight_analog</span>

                                    <div>
                                        <p class="label-1">Now</p>
                                        
                                        <p class="title-1">12:30 PM</p>
                                    </div>
                                </div>

                                <div class="card-item">
                                    <span class="m-icon">clear_day</span>

                                    <div>
                                        <p class="label-1">Sunrise</p>
                                        
                                        <p class="title-1">6:30 AM</p>
                                    </div>
                                </div>

                                <div class="card-item">
                                    <span class="m-icon">clear_night</span>

                                    <div>
                                        <p class="label-1">Sunset</p>
                                        
                                        <p class="title-1">5:54 PM</p>
                                    </div>
                                </div>
                            </div>

                            <br />
                            <h3 class="title-3">Your Time</h3>

                            <div class="card-list">
                                <div class="card-item">
                                    <span class="m-icon">nest_clock_farsight_analog</span>

                                    <div>
                                        <p class="label-1">Now</p>
                                        
                                        <p class="title-1">9:30 AM</p>
                                    </div>
                                </div>
                                <div class="card-item">
                                    <span class="m-icon">update</span> <!-- or history -->

                                    <div>
                                        <p class="label-1">You are</p>
                                        
                                        <p class="title-1">+ 5h</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    
                        <div class="card card-sm highlight-card">

                            <h3 class="title-3">Feels Like</h3>

                            <div class="wrapper">
                                <span class="m-icon">thermostat</span>
                                
                                <p class="title-1">25&deg;<sup>c</sup></p>
                            </div>
                        </div>

                        <div class="card card-sm highlight-card">

                            <h3 class="title-3">Wind</h3>

                            <div class="wrapper">
                                <span class="m-icon">wind_power</span>
                                
                                <p class="title-1">12 <sub>m/s</sub></p>
                            </div>
                        </div>

                        <div class="card card-sm highlight-card">

                            <h3 class="title-3">Humidity</h3>

                            <div class="wrapper">
                                <span class="m-icon">humidity_percentage</span>
                                
                                <p class="title-1">35 <sub>%</sub></p>
                            </div>
                        </div>

                         <div class="card card-sm highlight-card">

                            <h3 class="title-3">Precipitation</h3>

                            <div class="wrapper">
                                <span class="m-icon">cloudy_snowing</span>
                                
                                <p class="title-1">0.04 <sub>mm</sub></p>
                            </div>
                        </div>
                                            
                        <div class="card card-sm highlight-card">
                            
                            <h3 class="title-3">Visibility</h3>
                            
                            <div class="wrapper">
                                <span class="m-icon">visibility</span>
                                
                                <p class="title-1">10 <sub>km</sub></p>
                            </div>
                        </div>
                        
                        <div class="card card-sm highlight-card">

                            <h3 class="title-3">Pressure</h3>

                            <div class="wrapper">
                                <span class="m-icon">airwave</span>
                                
                                <p class="title-1">1052 <sub>hPa</sub></p>
                            </div>
                        </div>
                    
                    </div> <!-- div.highlight-list ends here -->

                </div>
            </section> <!-- section.section.highlights ends here -->

            <!-- HOURLY -->
            <section class="section hourly-forecast" aria-label="hourly forecast"
                data-hourly-forecast>
                
                <div id="h2s">
                    <h2 class="title-2">Hourly Forecast</h2>
                    <h2 @click=${hourlyDetails} class="title-2" id="h-info">Detailed Hourly Info ➥</h2>
                </div>
                
                <div class="slider-container">
                    <ul class="slider-list" data-temp>

                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>

                    </ul>

                    <ul class="slider-list" data-wind>

                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>

                    </ul>
                </div>

            </section> <!-- div.section.hourly-forecast ends here -->

            <footer class="footer">
                <p class="body-3">
                    Author: <a href="https://github.com/mirokrastanov" target="_blank"
                    style="display:inline;margin-right:10px;">Miro Krastanov.</a>
                </p>

                <p class="body-3">
                    Powered By <a href="https://open-meteo.com/" title="Weather, Air Quality & Geolocation API" target="_blank"
                    style="display:inline;">
                        <img src="/src/images/open-meteo.gif" width="150px" height="30px" loading="lazy"
                            alt="Open-Meteo">
                    </a> <a href="https://www.bigdatacloud.com/" title="Reverse Geolocation API" target="_blank"
                    style="display:inline;margin-right:10px;">
                        <img src="/src/images/bigDataCloud.svg" width="80px" height="30px" loading="lazy"
                            alt="Open-Meteo">
                    </a> <a href="https://openweathermap.org/" title="Weather API (only used timezone offsets)" target="_blank"
                    style="display:inline;margin-right:10px;">
                        <img src="/src/images/openweather.png" width="120px" height="30px" loading="lazy"
                            alt="Open-Meteo">
                    </a>
                </p>
            </footer>
        </div> <!-- div.content-right ends here -->

        
    </article> <!-- article.container ends here -->
</main>
`;

// mockup hourly - for initial render or if no dynamic data is present
const hourlyTemplate = () => html`
<div class="header">
    <div class="container">

        <a href="javascript:void(0)" class="logo"
        title="Powered by: open-meteo.com & openweathermap.org">
            <img src="/src/images/logo.gif" alt="logo" width="364" height="58">
        </a>

        <div class="h-forecast-title">Hourly Forecast</div>

        <div class="header-actions">
            <a href="/dashboard" id="h-forecast-btn">Back to Dashboard</a>
        </div>

    </div> <!-- div.container ends here -->
    <div class="loading" data-loading></div>
</div> <!-- div.header ends here -->

<main>
    <article class="container">
        <div class="content-middle">
            <div class="blurred">
                <table class="hour-section">
                    <tbody data-hour-section>
                        <h4 id="last-updated-hourly">Last updated: 12:17 AM</h4>
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                    </tbody>
                </table>

                <footer class="footer">
                    <p class="body-3">
                        Author: Miro Krastanov. Extra credits in the About section.
                    </p>
                    <p class="body-3">
                        Powered By <a href="https://open-meteo.com/" title="Free Weather API"
                        target="_blank" rel="noopener">
                            <img src="/src/images/open-meteo.gif" width="150px" height="30px"
                            loading="lazy" alt="Open-Meteo">
                        </a> and <a href="https://openweathermap.org/" title="Weather & Geo API"
                        target="_blank" rel="noopener">
                            <img src="/src/images/openweather.png" width="150px" height="30px"
                            loading="lazy" alt="Open-Meteo"></a>
                    </p>
                </footer>
            </div>
        </div>
    </article>
</main>
`;

export const dynamicHourlyTemplate = (items = [], degreeState, mock = [1, 1, 1, 1, 1, 1, 1]) => html`
    <div class="content-middle">
        <div>
            <table class="hour-section">
                <tbody data-hour-section>
                    <h4 id="last-updated-hourly">Last updated: 12:17 AM</h4>
    ${items.length == 0
        ? mock.map(x => html`${hourRowTemplate()}`)
        : items.map(item => html`${hourRowTemplate(item, degreeState)}`)}
                </tbody>
            </table>
            <footer class="footer">
                <p class="body-3">
                    Author: Miro Krastanov. Extra credits in the About section.
                </p>
                <p class="body-3">
                    Powered By <a href="https://open-meteo.com/" title="Free Weather API"
                    target="_blank" rel="noopener">
                        <img src="/src/images/open-meteo.gif" width="150px" height="30px"
                        loading="lazy" alt="Open-Meteo">
                    </a> and <a href="https://openweathermap.org/" title="Weather & Geo API"
                    target="_blank" rel="noopener">
                        <img src="/src/images/openweather.png" width="150px" height="30px"
                        loading="lazy" alt="Open-Meteo"></a>
                </p>
            </footer>
        </div>
    </div>
`;

// used in both the initial and the dynamically filled templates (can work with dynamic data)
const hourRowTemplate = (item = { test: true }, degreeState = 'C') => html`
<tr class="hour-row">
    <td>
        <div class="info-group">
            <div class="label">${item.test ? 'Thursday, May 17' : `${item.dayLong}, ${item.monthShort} ${item.date}`}</div>
            <div>${item.test ? '3 PM' : item.hour}</div>
        </div>
    </td>
    <td>
        <img src=${item.test ? "/src/images/weather-icons/09n.png" : item.weatherImage} class="weather-icon"
        height="60px" width="60px" />
    </td>
    <td>
        <div class="info-group">
            <div class="label">Precip</div>
            <div>${item.test ? '02' : item.precip} mm</div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">Wind</div>
            <div>${item.test ? '26' : item.windSpeed} m/s</div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">Humidity</div>
            <div>${item.test ? '84' : item.humidity} %</div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">Visibility</div>
            <div>${item.test ? '14 km' : `${valueParser.visibility(item.visibility)[0]
        } ${valueParser.visibility(item.visibility)[1]}`}</div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">Temp</div>
            <div>${item.test ? '31' : getTemp(item.temp)}&deg;<sup>${degreeState}</sup></div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">FL Temp</div>
            <div>${item.test ? '25' : getTemp(item.feelsLikeTemp)}&deg;<sup>${degreeState}</sup></div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">Precip %</div>
            <div>${item.test ? '25' : item.precipProbability} %</div>
        </div>
    </td>
    <td>
        <img src="/src/images/weather-icons/direction.png" class="weather-icon"
        height="40px" width="40px" style="transform: rotate(
        ${item.test ? '0' : (item.windDirection - 180)}deg)" />
    </td>
    <td>
        <div class="info-group">
            <div class="label">Pressure</div>
            <div>${item.test ? '1011' : item.pressure} hPa</div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">Cloud cover</div>
            <div>${item.test ? '65' : item.cloudCover} %</div>
        </div>
    </td>
</tr>
`;

export const dashboardHourlyCardUpper = (time, img, temp, degreeState) => html`
<div class="card card-sm slider-card">
    <p class="body-3">${time}</p>

    <img src="${img}" width="48" height="48"
    loading="lazy" alt="hourly-forecast-img" class="weather-icon" title="">

    <p class="body-3">${temp}&deg;<sup>${degreeState}</sup></p>
</div>
`;

export const dashboardHourlyCardLower = (time, img, windSpeed, windDirection) => html`
<div class="card card-sm slider-card">
    <p class="body-3">${time}</p>

    <img src="${img}" width="48" height="48"
    loading="lazy" alt="" class="weather-icon" title="wind-direction"
    style="transform: rotate(${windDirection - 180}deg)">

    <p class="body-3">${windSpeed} m/s</p>
</div>
`;

