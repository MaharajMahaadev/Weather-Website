import { html } from '../../node_modules/lit-html/lit-html.js';

let context = null;
export async function aboutPage(ctx) {
    context = ctx;
    ctx.render(aboutTemplate());
}

const aboutTemplate = () => html`
<section id="about-ctr">
    <article class="about-item">
        <span class="about-title">Author</span>
        <span class="about-sub">Miro Krastanov</span>
        <span class="about-desc">
            <a href="https://github.com/mirokrastanov" target="_blank">Github Profile</a>
            <a href="https://github.com/mirokrastanov/Responsive-Weather-Application"
                target="_blank">Project Repository</a>
        </span>

        <span class="about-title">Project Overview</span>
        <span class="about-desc">
            This is a non-commercial student project designed to showcase software development skills and
            provide a usable web application to users.
        </span>
        <span class="about-desc">
            The website was build from zero all the way to a fully functional website with dynamically
            generated pages and real-time information updates as part of a web-based Single Page
            Application.
        </span>
        <span class="about-title">Project Description</span>
        <span class="about-desc">All the work that went into this project was done solely by myself.</span>
        <span class="about-desc">I have used many front end design ideas, back end logic ideas, APIs,
            royalty free image assets, global weather
            & air quality information, geolocation and a lot more. To show appreciation to all
            of their respective creators / distributors I have compiled this page with a detailed
            information and contact details for all of them. If I have missed anything please feel free to
            let me know.</span>
        <span class="about-title">Thank You! Enjoy my App!</span>
    </article>

    <article class="about-item">
        <span class="about-sub">References:</span>
    </article>

    <article class="about-item">
        <span class="about-title">Website is mainly powered by</span>
        <span class="about-sub"><img src="/src/images/open-meteo.gif" width="200px" height="40px" loading="lazy"
               style="display:inline-block;" alt="Open-Meteo"></span> 
        <span class="about-desc">All of the weather data, Air Quality data & Geolocation data this website is using is coming from open-meteo. Huge gratitude to them! They do this for free! Amazing!</span>
        <span class="about-desc">
            <a href="https://open-meteo.com/" target="_blank">Website</a>
            <a href="https://open-meteo.com/en/docs" target="_blank">Weather API & API Docs</a>
            <a href="https://github.com/open-meteo/open-meteo" target="_blank">Github Repository</a>
            <a href="https://open-meteo.com/en/docs/air-quality-api" target="_blank">Air Quality API</a>
            <a href="https://open-meteo.com/en/docs/geocoding-api" target="_blank">Geolocation API</a>
        </span>
        <span class="about-desc">
            Open-Meteo combines local (1 km resolution) and global (11 km) weather models from national
            weather services. For every location on earth, the best forecast is available.

            National weather services include <a href="https://www.dwd.de/" target="_blank">Deutscher Wetter
                Dienst (DWD)</a>
            <a href="https://www.noaa.gov/" target="_blank"> National Oceanic and Atmospheric Administration
                (NOAA)</a>
            <a href="https://meteofrance.com/" target="_blank">Meteofrance</a> and
            <a href="https://weather.gc.ca/" target="_blank">Canadian Meteorological Center (CMC)</a>
        </span>
        <span class="about-title">In this project</span>
        <span class="about-desc">APIs used: Weather API, Air Quality API & Geolocation API</span>
        <span class="about-title">License Information</span>
        <span class="about-desc">API data is offered under <a
                href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Attribution 4.0
                International (CC BY 4.0)</a></span>
        <span class="about-desc">Read the
            <a href="https://open-meteo.com/en/features#terms" target="_blank">Terms & Privacy</a>
            and <a href="https://github.com/open-meteo/open-meteo/blob/main/LICENSE" target="_blank">Full
                License</a>
        </span>
    </article>

    <article class="about-item">
        <span class="about-title">Website is also powered by</span>
        <span class="about-sub"><img src="/src/images/bigDataCloud.svg" width="150px" height="30px" loading="lazy"
                style="display:inline;" alt="Open-Meteo"></span>
        <span class="about-desc">Thanks to them the website can use reverse geolocation to associate geographical coordinates with real addresses. Very grateful that they provide this service for free!</span>
        <span class="about-title">In this project</span>
        <span class="about-desc">APIs used: Reverse Geolocation API</span>
        <span class="about-desc">
            More information at: <a href="https://www.bigdatacloud.com/" target="_blank">Website</a>
            <a href="https://www.bigdatacloud.com/docs" target="_blank">All API Docs</a>
            <a href="https://www.bigdatacloud.com/docs/api/free-reverse-geocode-to-city-api" target="_blank">Reverse Geocoding API Docs</a>
        </span>
    </article>

    <article class="about-item">
        <span class="about-title">Website is also powered by</span>
        <span class="about-sub"><img src="/src/images/openweather.png" width="170px" height="35px" loading="lazy"
                style="display:inline;" alt="Open-Meteo"></span>
        <span class="about-desc">I have only used their weather API just to extract the timezone offsets for different locations, which I have used in my time conversion / parsing functions.</span>
        <span class="about-desc"> Open weather data is provided by
            <a href="https://www.noaa.gov/" target="_blank"> National Oceanic and Atmospheric Administration
                (NOAA)</a>
            <a href="https://www.metoffice.gov.uk/" target="_blank"> the Met Office</a>
            <a href="https://weather.gc.ca/" target="_blank"> Environment Canada</a> and
            <a href="https://www.ecmwf.int/" target="_blank"> ECMWF</a>
        </span>
        <span class="about-title">In this project</span>
        <span class="about-desc">APIs used: Weather API (used only for location timezone offsets) </span>
        <span class="about-desc">
            More information at: <a href="https://openweathermap.org/" target="_blank">Website</a>
            <a href="https://openweathermap.org/api" target="_blank">API Docs</a>
            <a href="https://openweathermap.org/guide" target="_blank">User Guide</a>
        </span>
    </article>

    <article class="about-item">
        <span class="about-title">Front & Back End Inspirations</span>
        <span class="about-sub">@WebDevSimplified</span>
        <span class="about-desc">
            <a href="https://www.youtube.com/@WebDevSimplified" target="_blank">YT channel</a>
            <a href="https://github.com/WebDevSimplified" target="_blank">Github</a>
        </span>
        <span class="about-desc">
            Parts of the front end design and a huge part of the back end design were inpired by Kyle from
            Web Dev Simplified.
        </span>
        <span class="about-desc">Some dynamic elements, cool animation effects, checkbox hacks & some
            advanced logic were also inspired by him and improved upon by me further in my project.</span>
        <span class="about-desc">His content is amazing and always helpful!</span>
        <span class="about-title">License information</span>
        <span class="about-desc">
            Link to License: <a
                href="https://github.com/WebDevSimplified/js-weather-app/blob/main/LICENSE"
                target="_blank">MIT License</a>
        </span>
    </article>

    <article class="about-item">
        <span class="about-title">Front End Inspiration</span>
        <span class="about-sub">@codewithsadee</span>
        <span class="about-desc">
            <a href="https://www.youtube.com/@codewithsadee" target="_blank">YT channel</a>
            <a href="https://github.com/codewithsadee" target="_blank">Github</a>
        </span>
        <span class="about-desc">Part of the initial static front end design
            was built based on some of his ideas and generic concepts. They laid the groundwork for this amazing project. I
            improved and re-iterated upon them extensively along the development of this project, but
            without them its start would have been much harder.</span>
        <span class="about-title">License information</span>
        <span class="about-desc">
            Link to License: <a
                href="https://github.com/codewithsadee/weatherio-starter/blob/master/LICENSE"
                target="_blank">MIT License</a>
        </span>
    </article>

    <article class="about-item">
        <span class="about-title">JavaScript Asset:</span>
        <span class="about-title">Lists of countries with ISO 3166 codes in various formats</span>
        <span class="about-sub">@incredimike</span>
        <span class="about-desc">
            <a href="https://gist.github.com/incredimike/1469814" target="_blank">Link to Asset</a>
            <a href="https://gist.github.com/incredimike" target="_blank">Creator's Github Profile</a>
            <a href="https://www.npmjs.com/package/iso3166-2-db" target="_blank">ISO 3166 (npm link)</a>
        </span>
        <span class="about-desc">
            This JavaScript asset was used in the back end logic of the website as part of the utility
            module in order to provide a country list in various formats in the form a JavaScript arrays &
            objects.
        </span>
        <span class="about-title">License Information</span>
        <span class="about-desc">
            Licesed under <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">CC0
                1.0 Universal</a>
        </span>
        <span class="about-desc">His content is amazing and always helpful! Thank You, Kyle!</span>
    </article>

    <article class="about-item">
        <span class="about-title">Air Quality Index</span>
        <span class="about-sub">AQI information sources</span>
        <span class="about-desc">
            <a href="https://www.eea.europa.eu/en" target="_blank">European Environment Agency</a>
            <a href="https://airindex.eea.europa.eu/Map/AQI/Viewer/" target="_blank">EEA Map Viewer + About
                info</a>
            <a href="https://www.eea.europa.eu/en/topics/in-depth/air-pollution" target="_blank">EEA Air
                Polution web page</a>
            <a href="https://www.who.int/europe/publications/i/item/9789240034433" target="_blank">WHO Air
                Quality Guidelines</a>
            <a href="https://eur-lex.europa.eu/legal-content/en/ALL/?uri=CELEX%3A32008L0050"
                target="_blank">EU Air Quality Directive</a>
            <a href="https://en.wikipedia.org/wiki/Air_quality_index" target="_blank">AQI Wiki page</a>
        </span>
    </article>

    <article class="about-item">
        <span class="about-title">Homepage images</span>
        <span class="about-sub">Pixabay royalty free images</span>
        <span class="about-desc">
            <a href="https://pixabay.com/" target="_blank">Website</a>
        </span>
        <span class="about-title">Images links</span>
        <span class="about-desc">
            <a href="https://pixabay.com/photos/shore-sunset-beach-dusk-twilight-914149/" target="_blank">1</a>
            <a href="https://pixabay.com/photos/hd-wallpaper-rainy-day-umbrella-3443977/" target="_blank">2</a>
            <a href="https://pixabay.com/photos/tree-dawn-morning-sun-sunrise-3189339/" target="_blank">3</a>
            <a href="https://pixabay.com/photos/clouds-sunset-fog-mountains-449822/" target="_blank">4</a>
            <a href="https://pixabay.com/photos/hd-wallpaper-sea-rainbow-rainfall-7039471/" target="_blank">5</a>
            <a href="https://pixabay.com/photos/lago-di-limides-dolomites-alps-3025780/" target="_blank">6</a>
            <a href="https://pixabay.com/photos/buildings-houses-street-city-rain-5528981/" target="_blank">7</a>
            <a href="https://pixabay.com/photos/sky-clouds-rays-weather-1365325/" target="_blank">8</a>
            <a href="https://pixabay.com/photos/leaf-rain-weather-rainy-weather-5298312/" target="_blank">9</a>
            <a href="https://pixabay.com/illustrations/weather-clipart-art-rain-sun-moon-2371967/" target="_blank">10</a>
            <a href="https://pixabay.com/photos/rainbow-cloud-evening-sun-rain-4047523/" target="_blank">11</a>
            <a href="https://pixabay.com/photos/landscape-nature-oilseed-rape-field-3369304/" target="_blank">12</a>
            <a href="https://pixabay.com/photos/clouds-sky-heaven-weather-nature-3353159/" target="_blank">13</a>
            <a href="https://pixabay.com/photos/desert-mountain-field-landscape-5371434/" target="_blank">14</a>
            <a href="https://pixabay.com/photos/pathway-mountain-grass-cliff-970705/" target="_blank">15</a>
        </span>
        <span class="about-title">License information</span>
        <span class="about-desc">Licensed under 
            <a href="https://pixabay.com/service/terms/" target="_blank">Content License</a>
        </span>
    </article>

    <article class="about-item">
        <span class="about-title">Weather Icons</span>
        <span class="about-sub">Openweathermap.org weather icons</span>
        <span class="about-desc">
            <a href="https://openweathermap.org/weather-conditions" target="_blank">Icon List</a>
        </span>
    </article>

    <article class="about-item">
        <span class="about-title">Project Font</span>
        <span class="about-sub">Nunito Sans</span>
        <span class="about-desc"> 
            <a href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600&display=swap" target="_blank">Link to font</a>
        </span>
    </article>

    <article class="about-item">
        <span class="about-title">Project Hosting</span>
        <span class="about-sub">replit.com</span>
        <span class="about-desc">
            Project is currently hosted on
            <a href="https://replit.com/" target="_blank">Repl It</a>
        </span>
    </article>

    <article class="about-item">
        <span class="about-title">Development</span>
        <span class="about-sub">Project Technologies</span>
        <span class="about-desc">
            IDE: <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a>
        </span>
        <span class="about-desc">Extensions:
            <a href="https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables"
                target="_blank">CSS Variable Autocomplete</a>
            <a href="https://marketplace.visualstudio.com/items?itemName=bierner.lit-html"
                target="_blank">lit-html</a>
            <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer"
                target="_blank">Live Server</a>
        </span>
        <span class="about-desc">Languages:
            <a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank">JavaScript</a>
            <a href="https://en.wikipedia.org/wiki/HTML" target="_blank">HTML</a>
            <a href="https://en.wikipedia.org/wiki/CSS" target="_blank">CSS</a>
        </span>
        <span class="about-desc">Libraries:
            <a href="https://lit.dev/docs/v1/lit-html/introduction/"
                target="_blank">lit-html</a>
            <a href="https://www.npmjs.com/package/page" target="_blank">Page</a>
            <a href="https://axios-http.com/docs/intro" target="_blank">Axios</a>
        </span>
        <span class="about-desc">Frameworks: No frameworks were used.</span>
        <br />
    </article>
</section>

<footer class="footer" id="about-footer">
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
`;


//  <div><a href="https://github.com/mirokrastanov" target="_blank">Author</a></div>