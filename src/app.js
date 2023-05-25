import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { homePage } from './views/home.js';
import { dashboardPage } from './views/dashboard.js';
import { aboutPage } from './views/about.js';
import { airQualityPage } from './views/air-quality.js';
import { errorPage } from './views/error.js';
import { navElements } from './util/util.js';

const root = document.querySelector('body #main #main-ctr');

page(mainMiddleware);
page('/', homePage);
page('/home', homePage);
page('/index.html', homePage);
page('/dashboard', dashboardPage);
page('/air-quality', airQualityPage);
page('/about', aboutPage);
page('*', errorPage);
page.start();

function updateNav(path) {
    let pathCopy = '';
    if (path == '/home' || path == '/index.html') pathCopy = '/';
    else pathCopy = path;
    navElements.forEach(x => {
        let el = x;
        if (pathCopy == el.pathname) x.classList.add('nav-active');
        else x.classList.remove('nav-active');
    })
}

function mainMiddleware(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav(ctx.path);
    next();
}
