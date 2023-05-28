import { html } from '../../node_modules/lit-html/lit-html.js';

let context = null;
export async function errorPage(ctx) {
    // console.log(ctx);
    context = ctx;
    ctx.render(errorTemplate());
}

const errorTemplate = () => html`
<section class="error-content" data-error-content>
    <h2 class="heading">404</h2>
    <p class="body-1">Page not found!</p>
    <a href="/" class="btn-primary">
        <span class="span">Go to Homepage</span>
    </a>
</section>
`; 