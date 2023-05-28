import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getParsedAQIData, renderAQI } from '../api/data-aqi.js';
import { applyBlur, getParsedWeatherData, removeErrorOverlay, renderErrorOverlay, setValue } from '../api/data-weather.js';
import { aqiElements } from '../util/util.js';
// import from api

let context = null;
let defaultCoords = [];
let currentAQIinfo = {};
export async function airQualityPage(ctx) {
    context = ctx;
    ctx.render(initialTemplate());
    aqiElements.aqiElInfo().forEach(x => x.addEventListener('click', infoRender));
    aqiElements.aqiToggle1().addEventListener('change', showHideAqiRed);
    applyBlur(aqiElements.aqiWrapper());
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
        currentAQIinfo = {};
        currentAQIinfo = { ...aqiInfo };
        renderAQI('air-quality', aqiInfo);
        updateOverviewBoxes();
        removeErrorOverlay();
        // console.log(weatherInfo);
        // console.log(aqiInfo);
        aqiElements.btnHourly1().addEventListener('click', onHourlyBtnClick);
    } catch (error) {
        let message = 'Error getting Air Quality data!';
        console.log('Error details: ', { ...error, 'stack': error.stack });
        alert(message);
        renderErrorOverlay(message);
        applyBlur(aqiElements.aqiWrapper());
    }
}


function onHourlyBtnClick(e) {
    e.preventDefault();
    let btn = e.target;
    if (btn.textContent == 'Hourly Forecast') {
        hideAqiBoxes();

        currentAQIinfo.hourly.forEach((x, i) => {
            // if (i == 0) console.log(x);
            generateRow(x);
        });

    } else if (btn.textContent == 'Back to AQI Overview') {
        showAqiBoxes();
        if (aqiElements.aqiDynamicRows()) {
            aqiElements.aqiDynamicRows().forEach(x => x.remove());
        }
    }

}


function hideAqiBoxes() {
    aqiElements.aqiBoxToggle1().checked = false;
    document.querySelectorAll('.aqi-box').forEach(x => {
        if (x != aqiElements.aqiBoxEAQI()) {
            x.style.display = 'none';
        }
    });
    aqiElements.btnHourly1().textContent = 'Back to AQI Overview';
}

function showAqiBoxes() {
    aqiElements.aqiBoxToggle1().checked = false;
    document.querySelectorAll('.aqi-box').forEach(x => {
        if (x != aqiElements.aqiBoxEAQI()) {
            x.style.display = 'flex';
        }
    });
    updateOverviewBoxes();
    aqiElements.btnHourly1().textContent = 'Hourly Forecast';
}

function generateRow(item = { test: true }) {
    let div = document.createElement('div');
    div.classList.add('aqi-row-all');
    render(aqiBoxRowTemplate(item), div);
    aqiElements.aqiFlexGrid().appendChild(div);
}

const aqiBoxRowTemplate = (item) => html`
    <div class="aqi-cell" style="background-color:var(${item.eAQI[3].bg});color:var(${item.eAQI[3].color});">
        <p class="aqi-title">${item.test ? 'Apr 17' : `${item.monthShort} ${item.date}`}</p>
        <p class="aqi-content">${item.test ? '3 PM' : item.hour} 
        <sub>${item.test ? 'Good' : item.eAQI[2]}</sub></p>
    </div>
    <div class="aqi-cell" style="background-color:var(${item.pm2_5[3].bg});color:var(${item.pm2_5[3].color});">
        <p class="aqi-title" title="Particles less than 2.5 µm (PM2.5)">
            PM<sub>2.5</sub></p>
        <p class="aqi-content" title="Particles less than 2.5 µm (PM2.5)">
            ${item.test ? '23' : item.pm2_5[0]} <sub>μg/m³</sub></p>
    </div>
    <div class="aqi-cell" style="background-color:var(${item.pm10[3].bg});color:var(${item.pm10[3].color});">
        <p class="aqi-title" title="Particles less than 10 µm (PM10)">
            PM<sub>10</sub></p>
        <p class="aqi-content" title="Particles less than 10 µm (PM10)">
        ${item.test ? '23' : item.pm10[0]} <sub>μg/m³</sub></p>
    </div>
    <div class="aqi-cell" style="background-color:var(${item.no2[3].bg});color:var(${item.no2[3].color});">
        <p class="aqi-title" title="Nitrogen dioxide (NO2)">
            NO<sub>2</sub></p>
        <p class="aqi-content" title="Nitrogen dioxide (NO2)">
        ${item.test ? '23' : item.no2[0]} <sub>μg/m³</sub></p>
    </div>
    <div class="aqi-cell" style="background-color:var(${item.o3[3].bg});color:var(${item.o3[3].color});">
        <p class="aqi-title" title="Ozone (O3)">
            O<sub>3</sub></p>
        <p class="aqi-content" title="Ozone (O3)">
        ${item.test ? '23' : item.o3[0]} <sub>μg/m³</sub></p>
    </div>
    <div class="aqi-cell" style="background-color:var(${item.so2[3].bg});color:var(${item.so2[3].color});">
        <p class="aqi-title" title="Sulphur dioxide (SO2)">
            SO<sub>2</sub></p>
        <p class="aqi-content" title="Sulphur dioxide (SO2)">
        ${item.test ? '23' : item.so2[0]} <sub>μg/m³</sub></p>
    </div>
    <div class="aqi-cell">
        <p class="aqi-title" title="Carbon Monoxide (10m above ground)">
            CO</p>
        <p class="aqi-content" title="Carbon Monoxide (10m above ground)">
        ${item.test ? '23' : item.co[0]} <sub>μg/m³</sub><p class="special-abs">*</p></p>
    </div>
    <div class="aqi-cell">
        <p class="aqi-title" title="Dust particles (10m above ground)">
            Dust</p>
        <p class="aqi-content" title="Dust particles (10m above ground)">
        ${item.test ? '23' : item.dust[0]} <sub>μg/m³</sub><p class="special-abs">*</p></p>
    </div>
`;

// uses currentAQIinfo (page's scope)
function updateOverviewBoxes() {
    if (currentAQIinfo != {}) {
        let boxes = [aqiElements.aqiBox2(), aqiElements.aqiBox3(),
        aqiElements.aqiBox4(), aqiElements.aqiBox5(), aqiElements.aqiBox6()];
        let el = { 0: 'pm2_5', 1: 'pm10', 2: 'no2', 3: 'o3', 4: 'so2' };
        let data = currentAQIinfo.hourly[0];
        boxes.forEach((x, i) => {
            let temp = document.createElement('div');
            render(html`${data[el[i]][0]} <sub>μg/m³</sub>`, temp);
            x.querySelector('.aqi-content').innerHTML = temp.innerHTML;
            x.style.backgroundColor = `var(${data[el[i]][3].bg})`;
            x.style.color = `var(${data[el[i]][3].color})`;
        });
        console.log(currentAQIinfo);
        setValue(aqiElements.aqiBox7().querySelector('.aqi-content'),
            currentAQIinfo.hourly[0].co[0], html`<sub>μg/m³</sub>`);
        setValue(aqiElements.aqiBox8().querySelector('.aqi-content'),
            currentAQIinfo.hourly[0].dust[0], html`<sub>μg/m³</sub>`);
    }
}


const initialTemplate = () => html`
<div class="header" id="aqi-top">
    <div id="aqi-header-ctr">
        <div>
            <h1 id="aqi-h-title">Air Quality Details</h1>
        </div>
        <div>
            <p class="body-3">
                Author: Miro Krastanov.
            </p>
        </div>
        <div>
            <div id="flex-row">Powered By 
                <a href="https://open-meteo.com/" title="Weather, Air Quality & Geolocation API" target="_blank"
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
            </div>
        </div>
    </div>
    <div class="loading" data-loading></div>
</div>


<div id="aqi-ctr">
    <div id="aqi-wrapper">
        <section id="aqi-flex">

            <div class="aqi-box">
                <p class="aqi-title">European Air Quality Index</p>
                <li class="meta-item" id="aqi-location">
                    <span class="m-icon">location_on</span>
                    <p class="title-3 meta-text">Greater London, England, GB</p>
                </li>
                <p class="aqi-content">Good</p>
                <div id="state-message"></div>
                <button class="render-hourly">Hourly Forecast</button>
                <label class="aqi-box-btn" for="toggle-1">Details</label>
                <input type="checkbox" id="toggle-1">
                <article id="aqi-red" class="red">* CO & Dust are not colored, 
                    because they are not part of the combined EU AQI. 
                    Click <label id="red-details" for="toggle-1">Details</label> to read more.</article>
                <div class="aqi-box-text">
                    <span>European Air Quality Index (AQI) calculated for different
                        particulate matter and gases individually. The consolidated european_aqi returns the
                        maximum of all individual indices. Ranges from 0-20 <p>good</p>, 20-40 <p>fair</p>, 40-60
                        <p>moderate</p>, 60-80 <p>poor</p>, 80-100 <p>very_poor</p> and exceeds 100 for <p>extremely_poor</p>
                        conditions.</span>
                    
                    <span>The Index is based on concentration values for up to five key pollutants, including:</span>
                    <div>Particulate matter (PM<sub>10</sub>), 
                    Fine particulate matter - (PM<sub>2.5</sub>),
                    Ozone (O<sub>3</sub>), 
                    Nitrogen dioxide (NO<sub>2</sub>),
                    Sulphur dioxide (SO<sub>2</sub>). </div>

                    <span>Pollutants outside of the combined European Air Quality Index:</span>
                    <div class="red">* Carbon Monoxide - CO:  
                    <a class="info-link-inline" 
                    href="https://www.eea.europa.eu/data-and-maps/figures/carbon-monoxide-8-hour-mean-limit-value-for-the-protection-of-human-health-5#:~:text=In%20the%20air%20quality%20directive,metre%20(mg%2Fm3)."
                    target="_blank">EEA Recommendation</a>
                    <a class="info-link-inline" 
                    href="https://www.transportpolicy.net/standard/eu-air-quality-standards/"
                    target="_blank">EU Standard (short)</a>
                    <a class="info-link-inline" 
                    href="https://www.concawe.eu/wp-content/uploads/2017/01/rpt_97-51-2004-01704-01-e.pdf"
                    target="_blank">Documentation</a>
                    </div>
                    <div class="red">* Dust Particles - Dust: 
                    <a class="info-link-inline" 
                    href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32014L0034"
                    target="_blank">EU Directive</a>
                    <a class="info-link-inline" 
                    href="https://acp.copernicus.org/articles/23/3629/2023/"
                    target="_blank">Impact on Air Quality</a>
                    </div>
                    

                    <br />
                    <span>More information here: <a class="info-link-inline"
                            href="https://airindex.eea.europa.eu/Map/AQI/Viewer/" target="_blank">EEA</a>
                        <a class="info-link-inline" href="https://en.wikipedia.org/wiki/Air_quality_index"
                            target="_blank">Wiki</a></span>
                    <br />
                </div>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Particles less than 2.5 µm (PM2.5)">
                    PM<sub>2.5</sub></p>
                <p class="aqi-content" title="Particles less than 2.5 µm (PM2.5)">
                    23 <sub>μg/m³</sub></p>
                <div class='aqi-el-details'>
                    <span class="aqi-el-info" data-info="pm2.5">Wiki</span>
                </div>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Particles less than 10 µm (PM10)">
                    PM<sub>10</sub></p>
                <p class="aqi-content" title="Particles less than 10 µm (PM10)">
                    16 <sub>μg/m³</sub></p>
                <div class='aqi-el-details'>
                    <span class="aqi-el-info" data-info="pm10">Wiki</span>
                </div>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Nitrogen dioxide (NO2)">
                    NO<sub>2</sub></p>
                <p class="aqi-content" title="Nitrogen dioxide (NO2)">
                    90 <sub>μg/m³</sub></p>
                <div class='aqi-el-details'>
                    <span class="aqi-el-info" data-info="no2">Wiki</span>
                </div>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Ozone (O3)">
                    O<sub>3</sub></p>
                <p class="aqi-content" title="Ozone (O3)">
                    41 <sub>μg/m³</sub></p>
                <div class='aqi-el-details'>
                    <span class="aqi-el-info" data-info="o3">Wiki</span>
                </div>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Sulphur dioxide (SO2)">
                    SO<sub>2</sub></p>
                <p class="aqi-content" title="Sulphur dioxide (SO2)">
                    75 <sub>μg/m³</sub></p>
                <div class='aqi-el-details'>
                    <span class="aqi-el-info" data-info="so2">Wiki</span>
                </div>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Carbon Monoxide (10m above ground)">
                    CO</p>
                <p class="aqi-content" title="Carbon Monoxide (10m above ground)">
                    23 <sub>μg/m³</sub></p>
                <div class='aqi-el-details'>
                    <span class="aqi-el-info" data-info="co">Wiki</span>
                    <p class="special-abs">*</p>
                </div>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Dust particles (10m above ground)">
                    Dust</p>
                <p class="aqi-content" title="Dust particles (10m above ground)">
                    23 <sub>μg/m³</sub></p>
                <div class='aqi-el-details'>
                    <span class="aqi-el-info" data-info="dust">Wiki</span>
                    <p class="special-abs">*</p>
                </div>
            </div>

        </section>
    </div>
</div>
`;


function showHideAqiRed(e) {
    if (aqiElements.aqiToggle1().checked) {
        aqiElements.aqiRed().style.display = 'none';
        aqiElements.aqiBoxBtn().textContent = 'Hide Details';
    } else {
        aqiElements.aqiRed().style.display = 'block';
        aqiElements.aqiBoxBtn().textContent = 'Details';
    }
}

function infoRender(e) {
    let target = e.target.dataset.info;
    switch (target) {
        case 'pm2.5': window.open("https://en.wikipedia.org/wiki/Particulates", "_blank"); break;
        case 'pm10': window.open("https://en.wikipedia.org/wiki/Particulates", "_blank"); break;
        case 'no2': window.open("https://en.wikipedia.org/wiki/Nitrogen_dioxide", "_blank"); break;
        case 'o3': window.open("https://en.wikipedia.org/wiki/Ozone", "_blank"); break;
        case 'so2': window.open("https://en.wikipedia.org/wiki/Sulfur_dioxide", "_blank"); break;
        case 'co': window.open("https://en.wikipedia.org/wiki/Carbon_monoxide", "_blank"); break;
        case 'dust': window.open("https://en.wikipedia.org/wiki/Dust", "_blank"); break;
    }
}

