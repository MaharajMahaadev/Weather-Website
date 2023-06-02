import { html } from '../../node_modules/lit-html/lit-html.js';
import { aqiElements, aqiParser, dashboardElements, monthsShort } from "../util/util.js";
import { getAQI, getTimeZoneWeather } from "./api.js";
import {
    applyBlur, applyLoading, getCurrentTimeZone, removeBlur, removeLoading,
    returnDayLONG, returnHour, setValue
} from './data-weather.js';


function generateTitleAndColor(text = 'Good') {
    let obj = {
        'Good': 1,
        'Fair': 2,
        'Moderate': 3,
        'Poor': 4,
        'Very poor': 5,
        'Extremely poor': 6
    };
    let colorObj = {
        c1: '--color-bg-aqi-1',
        c1hover: '--color-bg-aqi-1-hover',
        c1text: '--color-bg-aqi-1-text',
        c2: '--color-bg-aqi-2',
        c2hover: '--color-bg-aqi-2-hover',
        c2text: '--color-bg-aqi-2-text',
        c3: '--color-bg-aqi-3',
        c3hover: '--color-bg-aqi-3-hover',
        c3text: '--color-bg-aqi-3-text',
        c4: '--color-bg-aqi-4',
        c4hover: '--color-bg-aqi-4-hover',
        c4text: '--color-bg-aqi-4-text',
        c5: '--color-bg-aqi-5',
        c5hover: '--color-bg-aqi-5-hover',
        c5text: '--color-bg-aqi-5-text',
        c6: '--color-bg-aqi-6',
        c6hover: '--color-bg-aqi-6-hover',
        c6text: '--color-bg-aqi-6-text',
    };

    let level = aqiParser[obj[text]];
    let title = 'General Population:\n' + level.messageGeneralPop +
        '\n\nSensitive Population:\n' + level.messageSensitivePop;
    let [bg, hover, color] = [
        colorObj[`c${obj[text]}`],
        colorObj[`c${obj[text]}hover`],
        colorObj[`c${obj[text]}text`],
    ];


    return [title, bg, hover, color];
}

function parseAQIData(data) {
    let { hourly } = data;
    // console.log(data);
    let result = hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            hour: returnHour().format(time * 1000),
            dayLong: returnDayLONG().format(time * 1000),
            date: new Date(time * 1000).getDate(),
            monthShort: monthsShort[new Date(time * 1000).getMonth()],
            co: [hourly.carbon_monoxide[index], "μg/m³"],
            dust: [hourly.dust[index], "μg/m³"],
            eAQI: [hourly.european_aqi[index], "EAQI"],
            no2: [hourly.nitrogen_dioxide[index], "μg/m³"],
            o3: [hourly.ozone[index], "μg/m³"],
            pm2_5: [hourly.pm2_5[index], "μg/m³"],
            pm10: [hourly.pm10[index], "μg/m³"],
            so2: [hourly.sulphur_dioxide[index], "μg/m³"],
        }
    }).filter(({ timestamp }) => timestamp >= new Date().getTime());
    // filters only the hours from the current hour to after 6 days

    result.forEach(hourObject => {
        Object.values(aqiParser).forEach(level => {
            let aqiMAIN = hourObject.eAQI;
            let pm2_5 = hourObject.pm2_5;
            let pm10 = hourObject.pm10;
            let no2 = hourObject.no2;
            let o3 = hourObject.o3;
            let so2 = hourObject.so2;
            if (aqiMAIN[0] >= level.rangeEAQI[0] && aqiMAIN[0] < level.rangeEAQI[1]) {
                hourObject.eAQI.push(level.level);
            }
            if (pm2_5[0] >= level.range_pm2_5[0] && pm2_5[0] < level.range_pm2_5[1]) {
                hourObject.pm2_5.push(level.level);
            }
            if (pm10[0] >= level.range_pm10[0] && pm10[0] < level.range_pm10[1]) {
                hourObject.pm10.push(level.level);
            }
            if (no2[0] >= level.range_no2[0] && no2[0] < level.range_no2[1]) {
                hourObject.no2.push(level.level);
            }
            if (o3[0] >= level.range_o3[0] && o3[0] < level.range_o3[1]) {
                hourObject.o3.push(level.level);
            }
            if (so2[0] >= level.range_so2[0] && so2[0] < level.range_so2[1]) {
                hourObject.so2.push(level.level);
            }
        });
    });

    result.forEach(hourObject => {
        let res = {
            main: generateTitleAndColor(hourObject.eAQI[2]),
            pm2_5: generateTitleAndColor(hourObject.pm2_5[2]),
            pm10: generateTitleAndColor(hourObject.pm10[2]),
            no2: generateTitleAndColor(hourObject.no2[2]),
            o3: generateTitleAndColor(hourObject.o3[2]),
            so2: generateTitleAndColor(hourObject.so2[2]),
        };
        let aqi = {
            eAQI: { title: res.main[0], bg: res.main[1], hover: res.main[2], color: res.main[3], },
            pm2_5: { title: res.pm2_5[0], bg: res.pm2_5[1], hover: res.pm2_5[2], color: res.pm2_5[3], },
            pm10: { title: res.pm10[0], bg: res.pm10[1], hover: res.pm10[2], color: res.pm10[3], },
            no2: { title: res.no2[0], bg: res.no2[1], hover: res.no2[2], color: res.no2[3], },
            o3: { title: res.o3[0], bg: res.o3[1], hover: res.o3[2], color: res.o3[3], },
            so2: { title: res.so2[0], bg: res.so2[1], hover: res.so2[2], color: res.so2[3], },
        };
        Object.entries(aqi).forEach(x => hourObject[x[0]].push(x[1]));
    });
    return result;
}


export async function getParsedAQIData(coords) {
    let data = await getAQI(coords[0], coords[1], getCurrentTimeZone());
    let parsedData = parseAQIData(data);
    let extraData = await getTimeZoneWeather(coords[0], coords[1]);
    let result = {
        raw: data,
        hourly: parsedData,
        units: data.hourly_units,
        timeZoneGMTdiff: extraData.data.timezone,
    };
    return result;
}


export function renderAQI(page, data, flag = true) {
    const { hourly, units } = data;
    let [pm_2, no2, o3, so2] = [hourly[0].pm2_5, hourly[0].no2, hourly[0].o3, hourly[0].so2];
    let aqiState = hourly[0].eAQI[3];
    if (page == 'dashboard') {
        setValue(dashboardElements.highAQIstate(),
            hourly[0].eAQI[2], false, [['title', `${aqiState.title}\n\nAll values are in: ${no2[1]}`],
            ['style', `background-color:var(${aqiState.bg});color:var(${aqiState.color});`],
            ['data-hover', aqiState.hover]]);
        setValue(dashboardElements.highAQIlabel1(), 'PM', html`<sub>2.5</sub>`);
        setValue(dashboardElements.highAQItitle1(), pm_2[0]);
        setValue(dashboardElements.highAQIlabel2(), 'NO', html`<sub>2</sub>`);
        setValue(dashboardElements.highAQItitle2(), no2[0]);
        setValue(dashboardElements.highAQIlabel3(), 'O', html`<sub>3</sub>`);
        setValue(dashboardElements.highAQItitle3(), o3[0]);
        setValue(dashboardElements.highAQIlabel4(), 'SO', html`<sub>2</sub>`);
        setValue(dashboardElements.highAQItitle4(), so2[0]);


    } else if (page == 'air-quality') {
        if (localStorage.getItem('address')) setValue(aqiElements.aqiLocation(), localStorage.getItem('address'));
        setValue(aqiElements.aqiSTATE(), hourly[0].eAQI[2], false, [['title', `${aqiState.title}\n\nAll values are in: ${no2[1]}`],
        ['style', `background-color:var(${aqiState.bg});color:var(${aqiState.color});`],
        ['data-hover', aqiState.hover]]);
        let stateMessage = aqiState.title.split('\n');
        stateMessage.map(x => x.trim()).forEach(x => {
            if (x.trim() != '') {
                let p = document.createElement('p');
                p.textContent = x;
                if (aqiElements.aqiSTATEmessage()) aqiElements.aqiSTATEmessage().appendChild(p);
            }
        });
        if (flag) {
            applyBlur(aqiElements.aqiWrapper());
            applyLoading();
            setTimeout(() => {
                removeBlur(aqiElements.aqiWrapper());
                removeLoading();
            }, 500);
        }
    }
}