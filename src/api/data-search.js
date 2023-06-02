import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { arrayParser, dashboardElements, elements, searchUtility } from '../util/util.js';
import { getGeolocation } from './api.js';
import { getParsedAQIData, renderAQI } from './data-aqi.js';
import {
    getParsedWeatherData, removeBlur, removeErrorOverlay, renderNotificationOverlay,
    renderWeather, updateWeatherInfo
} from './data-weather.js';


let searchTimeout = null;
const searchTimeoutDuration = 500;

export function searchOnTyping(e) {
    // runs on each input letter
    searchTimeout ?? clearTimeout(searchTimeout);

    if (!dashboardElements.searchField().value) {
        dashboardElements.searchField().classList.remove('searching');
        dashboardElements.searchResult().classList.remove('active');
        dashboardElements.searchResult().replaceChildren();
    } else {
        dashboardElements.searchField().classList.add('searching');
    }

    if (dashboardElements.searchField().value) {
        searchTimeout = setTimeout(async () => {
            try {
                let geoL = await getGeolocation(dashboardElements.searchField().value);
                if (!geoL) {
                    console.log('No response!');
                    return;
                }
                dashboardElements.searchField().classList.remove('searching');
                dashboardElements.searchResult().classList.add('active');
                dashboardElements.searchResult().replaceChildren();

                let items = geoL.data.results;
                if (!items) items = [];

                let ul = document.createElement('ul');
                ul.classList.add('view-list');
                ul.setAttribute('data-search-list', '');
                render(searchItemsTemplate(items), ul);
                dashboardElements.searchResult().appendChild(ul);
            } catch (error) {
                console.log(error);
            }
        }, searchTimeoutDuration);
    }
}

const searchItemsTemplate = (items) => html`
    ${items.length != 0 ?
        items.map(x => {
            let nameString = x.name;
            nameString = x.admin1 && x.admin1 != '' ? `${nameString}, ${x.admin1}` : nameString;
            let fullString = nameString;
            fullString = x.admin2 && x.admin2 != '' ? `${fullString}, ${x.admin2}` : fullString;
            fullString = x.admin3 && x.admin3 != '' ? `${fullString}, ${x.admin3}` : fullString;
            fullString = x.admin4 && x.admin4 != '' ? `${fullString}, ${x.admin4}` : fullString;
            nameString = x.country_code && x.country_code != '' ?
                `${nameString}, ${x.country_code}` : nameString;
            fullString = x.country && x.country != '' ?
                `${fullString}, ${x.country}` : fullString;

            return searchItemTemplate(x.name, nameString, x.latitude, x.longitude, fullString);
        })
        : noItemsTemplate()
    }
`;

const noItemsTemplate = () => html`
<li class="view-item">
    <span class="m-icon">location_on</span>
    <div>
        <p class="item-title">No Results.</p>
        <p class="label-2 item-subtitle">...</p>
    </div>
</li>
`;

const searchItemTemplate = (name, nameString, lat, lon, fullString) => html`
<li class="view-item" data-lat=${lat} data-lon=${lon} title=${fullString}>
    <span class="m-icon">location_on</span>
    <div>
        <p class="item-title">${name}</p>
        <p class="label-2 item-subtitle">${nameString}</p>
    </div>
    <a @click=${onSearchClick} class="item-link has-state" data-search-toggler></a>
</li>
`;



export async function onSearchClick(e) {
    e.preventDefault();
    let isValid = true;
    let [lat, lon] = [e.target.parentElement.dataset.lat, e.target.parentElement.dataset.lon];
    if (!lat || !lon) isValid = false;
    if (!isValid) { // the default London list item coords
        lat = 51.50853;
        lon = -0.12574;
    }
    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', lon);
    // location.href = '/dashboard';
    let weatherInfo = await getParsedWeatherData([lat, lon]);
    let aqiInfo = await getParsedAQIData([lat, lon]);
    renderWeather('dashboard', weatherInfo); // dynamic data is fed to DOM elems
    renderAQI('dashboard', aqiInfo);
    updateWeatherInfo('dashboard', weatherInfo); // updates everything every 10 min    
    if (isValid) searchUtility.toggleSearch();
    removeErrorOverlay();
    renderNotificationOverlay();
    // console.log(weatherInfo);
    // console.log(aqiInfo);
}