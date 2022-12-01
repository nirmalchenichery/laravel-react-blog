const mix = require("laravel-mix");

mix.styles(
    [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "resources/css/app.css",
    ],
    "public/css/app.css"
).version();

mix.js(
    [
        "resources/js/app.jsx"
    ],
    "public/js/app.jsx"
).version();

// mix.js(
//     [
//         "resources/js/app.js",
//         "resources/js/dashboard.js"
//     ],
//     "public/js/dashboard.js"
// ).version(); 