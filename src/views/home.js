import { html } from '../../node_modules/lit-html/lit-html.js';

let context = null;
export async function homePage(ctx) {
    context = ctx;
    ctx.render(homeTemplate());
    slideshow(ctx);
    window.addEventListener("keydown", (e) => {
        if (e.code == 'F5') {
            e.preventDefault(); // prevents issues on REPLIT, as it doesn't support SPAs that well
            alert(`            > REFRESH is not allowed on this website.
            > You can use BACK, FORWARD or the NAVIGATION.
            > If you need to Launch the app again go to the main page.`);
        }
    });
}

let myIndex = 0;
function slideshow() {
    try {
        let mySlides = document.querySelectorAll(".mySlides");
        for (let i = 0; i < mySlides.length; i++) {
            mySlides[i].style.display = "none";
        }
        myIndex++;
        if (myIndex > mySlides.length) {
            myIndex = 1;
        }
        mySlides[myIndex - 1].style.display = "block";
        // console.log(context.pathname);
        if (context.pathname != '/' && context.pathname != '/home'
            && context.pathname != '/index.html') return;
        setTimeout(slideshow, 7000);
    } catch (error) { }
}

const homeTemplate = () => html`
<div class="overlay-home"><a href="/dashboard">Weather &#10149;</a></div>
<div class="slideshow-section">
  <img class="mySlides animate-fading" src="/src/images/home/1.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/2.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/3.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/4.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/5.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/6.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/7.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/8.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/9.jpg">
</div>
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