import { countryListAllIsoData } from "./countrieslibrary.js";


export const navElements = [
    document.querySelector('#page-logo'),
    document.querySelector('header nav a:nth-of-type(2)'),
    document.querySelector('header nav a:nth-of-type(3)'),
    document.querySelector('header nav a:nth-of-type(4)')
];

export const daysFull = {
    1: 'Monday', 2: 'Tuesday', 3: 'Wednesday',
    4: 'Thursday', 5: 'Friday', 6: 'Saturday', 0: 'Sunday',
};

export const daysShort = {
    1: 'Mon', 2: 'Tue', 3: 'Wed',
    4: 'Thu', 5: 'Fri', 6: 'Sat', 0: 'Sun',
};

export const monthsFull = {
    0: 'January', 1: 'February', 2: 'March', 3: 'April',
    4: 'May', 5: 'June', 6: 'July', 7: 'August',
    8: 'September', 9: 'October', 10: 'November', 11: 'December',
};

export const monthsShort = {
    0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun',
    6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'
};

export const aqiParser = {
    1: {
        level: 'Good',
        messageGeneralPop: 'The air quality is good. Enjoy your usual outdoor activities.',
        messageSensitivePop: 'The air quality is good. Enjoy your usual outdoor activities.',
        rangeEAQI: [0, 20],
        range_pm2_5: [0, 10],
        range_pm10: [0, 20],
        range_no2: [0, 40],
        range_o3: [0, 50],
        range_so2: [0, 100],
    },
    2: {
        level: 'Fair',
        messageGeneralPop: 'Enjoy your usual outdoor activities.',
        messageSensitivePop: 'Enjoy your usual outdoor activities.',
        rangeEAQI: [20, 40],
        range_pm2_5: [10, 20],
        range_pm10: [20, 40],
        range_no2: [40, 90],
        range_o3: [50, 100],
        range_so2: [100, 200],
    },
    3: {
        level: 'Moderate',
        messageGeneralPop: 'Enjoy your usual outdoor activities',
        messageSensitivePop: 'Consider reducing intense outdoor activities, if you experience symptoms.',
        rangeEAQI: [40, 60],
        range_pm2_5: [20, 25],
        range_pm10: [40, 50],
        range_no2: [90, 120],
        range_o3: [100, 130],
        range_so2: [200, 350],
    },
    4: {
        level: 'Poor',
        messageGeneralPop: 'Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.',
        messageSensitivePop: 'Consider reducing physical activities, particularly outdoors, especially if you experience symptoms.',
        rangeEAQI: [60, 80],
        range_pm2_5: [25, 50],
        range_pm10: [50, 100],
        range_no2: [120, 230],
        range_o3: [130, 240],
        range_so2: [350, 500],
    },
    5: {
        level: 'Very poor',
        messageGeneralPop: 'Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.',
        messageSensitivePop: 'Reduce physical activities, particularly outdoors, especially if you experience symptoms.',
        rangeEAQI: [80, 100],
        range_pm2_5: [50, 75],
        range_pm10: [100, 150],
        range_no2: [230, 340],
        range_o3: [240, 380],
        range_so2: [500, 750],
    },
    6: {
        level: 'Extremely poor',
        messageGeneralPop: 'Reduce physical activities outdoor.',
        messageSensitivePop: 'Avoid physical activities outdoors.',
        rangeEAQI: [100, 1000],
        range_pm2_5: [75, 800],
        range_pm10: [150, 1200],
        range_no2: [340, 1000],
        range_o3: [380, 800],
        range_so2: [750, 1250],
    },
}

export const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
};

export const weatherImgRoutesDAY = {
    0: '/src/images/weather-icons/01d.png',
    1: '/src/images/weather-icons/02d.png',
    2: '/src/images/weather-icons/03d.png',
    3: '/src/images/weather-icons/04d.png',
    45: '/src/images/weather-icons/50d.png',
    48: '/src/images/weather-icons/50d.png',
    51: '/src/images/weather-icons/09d.png',
    53: '/src/images/weather-icons/09d.png',
    55: '/src/images/weather-icons/09d.png',
    56: '/src/images/weather-icons/09d.png',
    57: '/src/images/weather-icons/09d.png',
    61: '/src/images/weather-icons/09d.png',
    63: '/src/images/weather-icons/09d.png',
    65: '/src/images/weather-icons/09d.png',
    66: '/src/images/weather-icons/09d.png',
    67: '/src/images/weather-icons/09d.png',
    71: '/src/images/weather-icons/13d.png',
    73: '/src/images/weather-icons/13d.png',
    75: '/src/images/weather-icons/13d.png',
    77: '/src/images/weather-icons/13d.png',
    80: '/src/images/weather-icons/10d.png',
    81: '/src/images/weather-icons/10d.png',
    82: '/src/images/weather-icons/10d.png',
    85: '/src/images/weather-icons/13d.png',
    86: '/src/images/weather-icons/13d.png',
    95: '/src/images/weather-icons/11d.png',
    96: '/src/images/weather-icons/11d.png',
    99: '/src/images/weather-icons/11d.png',
};

export const weatherImgRoutesNIGHT = {
    0: '/src/images/weather-icons/01n.png',
    1: '/src/images/weather-icons/02n.png',
    2: '/src/images/weather-icons/03n.png',
    3: '/src/images/weather-icons/04n.png',
    45: '/src/images/weather-icons/50n.png',
    48: '/src/images/weather-icons/50n.png',
    51: '/src/images/weather-icons/09n.png',
    53: '/src/images/weather-icons/09n.png',
    55: '/src/images/weather-icons/09n.png',
    56: '/src/images/weather-icons/09n.png',
    57: '/src/images/weather-icons/09n.png',
    61: '/src/images/weather-icons/09n.png',
    63: '/src/images/weather-icons/09n.png',
    65: '/src/images/weather-icons/09n.png',
    66: '/src/images/weather-icons/09n.png',
    67: '/src/images/weather-icons/09n.png',
    71: '/src/images/weather-icons/13n.png',
    73: '/src/images/weather-icons/13n.png',
    75: '/src/images/weather-icons/13n.png',
    77: '/src/images/weather-icons/13n.png',
    80: '/src/images/weather-icons/10n.png',
    81: '/src/images/weather-icons/10n.png',
    82: '/src/images/weather-icons/10n.png',
    85: '/src/images/weather-icons/13n.png',
    86: '/src/images/weather-icons/13n.png',
    95: '/src/images/weather-icons/11n.png',
    96: '/src/images/weather-icons/11n.png',
    99: '/src/images/weather-icons/11n.png',
};

export const timeParser = {
    hours24: (x = new Date()) => {
        let h = x.getHours();
        return h > 12 ? [h % 12, 'PM'] : (h == 12 ? [h, 'PM'] : [h, 'AM']);
    },
    min: (x = new Date()) => x.getMinutes() < 10 ? `0${x.getMinutes()}` : x.getMinutes(),
    sec: (x = new Date()) => x.getSeconds(),
    raw: (x = new Date()) => x,
    dateSumHours: (date, hours) => date.setHours(date.getHours() + hours),
    dateSumMins: (date, mins) => new Date(date.setMinutes(date.getMinutes() + mins)),
    yourOffset: (x) => x > 0 ? - Math.abs(x) : Math.abs(x),
    offsetDiff: (o1, o2) => {
        if (o1 > 0 && o2 > 0) {
            return o1 > o2 ? o1 - o2 : o2 - o1;
        } else if (o1 < 0 && o2 < 0) {
            return o1 > o2 ? Math.abs(o2 - o1) : Math.abs(o1 - o2);
        } else return Math.abs(o1) + Math.abs(o2);
    },
    getLocationTime: (offset, behind, d = new Date()) => {
        if (behind) d = d.getTime() - offset * 60000;
        else d = d.getTime() + offset * 60000;
        let r = new Date(d);
        return [timeParser.hours24(r)[0], timeParser.min(r), timeParser.hours24(r)[1]];
    },
};

export const valueParser = {
    visibility: (x) => x > 1000 ? [(x / 1000), 'km'] : [x, 'm']

};

export const arrayParser = {
    arr3parser: (arr) => {
        let slider = arr.slice(0, 30).filter((x, i) => (i - 1) % 3 == 0 ? x : null);
        slider.length % 2 == 0 ? null : slider.pop();
        return slider;
    },
    addressParser: (str, name) => {
        let arr = str.split(', ');
        let country = arr[arr.length - 1];
        if (country.length >= 3) {
            countryListAllIsoData.find(x => x.name == country ? country = x.code : null);
        }
        return [name, country].join(', ');
    },

}

export const elements = {
    // get it each time -> invoke on reuse
    main: () => document.querySelector('#main #main-ctr main'),
    mainCtr: () => document.querySelector('#main-ctr'),
    body: () => document.querySelector('body'),
    dotHeader: () => document.querySelector('.header'),
    headerActions: () => document.querySelector('.header-actions'),
    loading: () => document.querySelector('[data-loading]'),
};

export function addEventOnElements(elements, eventType, callback) {
    for (const el of elements) el.addEventListener(eventType, callback);
}

export const searchUtility = {
    toggleSearch: () => {
        dashboardElements.searchView().classList.toggle('active');
        let arr2 = [dashboardElements.lastUpdated()[0], dashboardElements.lastUpdated()[1]];
        arr2[0] ? arr2[0].classList.toggle('hidden-el') : null;
        arr2[1] ? arr2[1].classList.toggle('hidden-el') : null;
    },

}

export const stateAbbreviationsUSA = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO',
    'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
    'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
    'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR',
    'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const dashboardElements = {
    lastUpdated: () => [document.querySelector('#last-updated'), document.querySelector('#last-updated-hourly')],
    degToggler: () => document.querySelector('#deg-toggle-ctr #toggler input[type=checkbox].toggle#check'),

    currentImg: () => document.querySelector('.current-weather .weapper img'),
    currentTemp: () => document.querySelector('.current-weather .weapper .heading'),
    currentText: () => document.querySelector('.current-weather .body-3'),
    currentDateDay: () => document.querySelector('.current-weather .meta-list .meta-item:nth-of-type(1) .meta-text'),
    currentLocation: () => document.querySelector('.current-weather .meta-list .meta-item:nth-of-type(2) .meta-text'),

    dailyImg: () => document.querySelectorAll('.forecast .card-item .icon-wrapper img'),
    dailyTemp: () => document.querySelectorAll('.forecast .card-item .icon-wrapper .title-2'),
    dailyDateMonth: () => document.querySelectorAll('.forecast .card-item > p:nth-of-type(1)'),
    dailyDay: () => document.querySelectorAll('.forecast .card-item > p:nth-of-type(2)'),

    highAQIstate: () => document.querySelector('.card.card-sm.highlight-card.one span.badge.aqi-1.label-1'),
    highAQIlabel1: () => document.querySelector('.card.card-sm.highlight-card.one .wrapper .card-list li:nth-of-type(1).card-item .label-1'),
    highAQItitle1: () => document.querySelector('.card.card-sm.highlight-card.one .wrapper .card-list li:nth-of-type(1).card-item .title-1'),
    highAQIlabel2: () => document.querySelector('.card.card-sm.highlight-card.one .wrapper .card-list li:nth-of-type(2).card-item .label-1'),
    highAQItitle2: () => document.querySelector('.card.card-sm.highlight-card.one .wrapper .card-list li:nth-of-type(2).card-item .title-1'),
    highAQIlabel3: () => document.querySelector('.card.card-sm.highlight-card.one .wrapper .card-list li:nth-of-type(3).card-item .label-1'),
    highAQItitle3: () => document.querySelector('.card.card-sm.highlight-card.one .wrapper .card-list li:nth-of-type(3).card-item .title-1'),
    highAQIlabel4: () => document.querySelector('.card.card-sm.highlight-card.one .wrapper .card-list li:nth-of-type(4).card-item .label-1'),
    highAQItitle4: () => document.querySelector('.card.card-sm.highlight-card.one .wrapper .card-list li:nth-of-type(4).card-item .title-1'),

    highTimeNow: () => document.querySelector('div.card.card-sm.highlight-card.two div:nth-of-type(1).card-list .card-item:nth-of-type(1) .title-1'),
    highTimeSunrise: () => document.querySelector('div.card.card-sm.highlight-card.two div:nth-of-type(1).card-list .card-item:nth-of-type(2) .title-1'),
    highTimeSunset: () => document.querySelector('div.card.card-sm.highlight-card.two div:nth-of-type(1).card-list .card-item:nth-of-type(3) .title-1'),
    highYourTime: () => document.querySelector('div.card.card-sm.highlight-card.two div:nth-of-type(2).card-list .card-item:nth-of-type(1) .title-1'),
    highTimeDiff: () => document.querySelector('div.card.card-sm.highlight-card.two div:nth-of-type(2).card-list .card-item:nth-of-type(2) .title-1'),
    highTimeDiffLabel: () => document.querySelector('div.card.card-sm.highlight-card.two div:nth-of-type(2).card-list .card-item:nth-of-type(2) .label-1'),
    highTimeDiffIcon: () => document.querySelector('div.card.card-sm.highlight-card.two div:nth-of-type(2).card-list .card-item:nth-of-type(2) .m-icon'),

    highFeelsLike: () => document.querySelector('.highlight-list div:nth-of-type(3).card-sm.highlight-card .wrapper .title-1'),
    highWind: () => document.querySelector('.highlight-list div:nth-of-type(4).card-sm.highlight-card .wrapper .title-1'),
    highHumidity: () => document.querySelector('.highlight-list div:nth-of-type(5).card-sm.highlight-card .wrapper .title-1'),
    highPrecip: () => document.querySelector('.highlight-list div:nth-of-type(6).card-sm.highlight-card .wrapper .title-1'),
    highVisibility: () => document.querySelector('.highlight-list div:nth-of-type(7).card-sm.highlight-card .wrapper .title-1'),
    highPressure: () => document.querySelector('.highlight-list div:nth-of-type(8).card-sm.highlight-card .wrapper .title-1'),

    dashHSlider1: () => document.querySelector('.slider-container ul:nth-of-type(1).slider-list'),
    dashHSlider2: () => document.querySelector('.slider-container ul:nth-of-type(2).slider-list'),

    searchView: () => document.querySelector('[data-search-view]'),
    searchTogglers: () => document.querySelectorAll('[data-search-toggler]'),

    searchField: () => document.querySelector('[data-search-field]'),
    searchResult: () => document.querySelector('[data-search-result]'),
    searchList: () => document.querySelector('[data-search-list]'),

    sliderCtr: () => document.querySelector('.slider-container'),
    sliderWrapper: () => document.querySelector('#slider-wrapper'),
    sliderList1: () => document.querySelector('.slider-container ul:nth-of-type(1).slider-list'),
    sliderList2: () => document.querySelector('.slider-container ul:nth-of-type(2).slider-list'),
};

export const hourlyElements = {
    hourSection: () => document.querySelector('table.hour-section'),
    root: () => document.querySelector('body #main #main-ctr'),
    articleCtr: () => document.querySelector('body #main #main-ctr main article.container'),

};

export const aqiElements = {
    aqiCtr: () => document.querySelector('#aqi-ctr'),
    aqiWrapper: () => document.querySelector('#aqi-wrapper'),
    aqiFlexGrid: () => document.querySelector('#aqi-flex'),
    aqiLocation: () => document.querySelector('#aqi-location .title-3.meta-text'),
    aqiSTATE: () => document.querySelector('.aqi-box:nth-of-type(1) .aqi-content'),
    aqiSTATEmessage: () => document.querySelector('.aqi-box:nth-of-type(1) #state-message'),
    aqiBoxEAQI: () => document.querySelector('div:nth-of-type(1).aqi-box'),
    aqiBoxEAQIdetails: () => document.querySelector('.aqi-box:nth-of-type(1) .aqi-box-details'),
    aqiToggle1: () => document.querySelector('#toggle-1'),
    aqiRed: () => document.querySelector('article#aqi-red'),

    aqiBox2: () => document.querySelector('.aqi-box:nth-of-type(2)'),
    aqiBox3: () => document.querySelector('.aqi-box:nth-of-type(3)'),
    aqiBox4: () => document.querySelector('.aqi-box:nth-of-type(4)'),
    aqiBox5: () => document.querySelector('.aqi-box:nth-of-type(5)'),
    aqiBox6: () => document.querySelector('.aqi-box:nth-of-type(6)'),
    aqiBox7: () => document.querySelector('.aqi-box:nth-of-type(7)'),
    aqiBox8: () => document.querySelector('.aqi-box:nth-of-type(8)'),

    btnHourly1: () => document.querySelector('button:nth-of-type(1).render-hourly'),
    aqiBoxDisplay: () => document.querySelector('div.aqi-row-all'),
    aqiBoxToggle1: () => document.querySelector('input[type=checkbox]:nth-of-type(1)'),

    aqiDynamicRows: () => document.querySelectorAll('.aqi-row-all'),
    aqiElInfo: () => document.querySelectorAll('.aqi-el-info'),
    aqiBoxBtn: () => document.querySelector('.aqi-box-btn'),

};