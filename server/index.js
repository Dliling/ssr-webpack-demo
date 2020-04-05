/**
 * @file server
 * @author
 */
if (typeof window === 'undefined') {
    global.window = {};
}
const fs = require('fs');
const path = require('path');
const express = require('express');
const {renderToString} = require('react-dom/server');
const SSR = require('../dist/main-server');
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
const data = require('./data.json');

const renderMarkup = str => {
    // return `<!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Document</title>
    //     </head>
    //     <body>
    //         <div id="root">${str}</div>
    //     </body>
    //     </html>`;
    const dataStr = JSON.stringify(data);
    return template.replace('<!--HTML_PLACEHOLDER-->', str)
        .replace('<!--INITIAL_DATA-->', `<script>window._initial_data=${dataStr}</script>`);
};

const server = port => {
    const app = express();

    app.use(express.static('dist'));

    app.get('/search', (req, res) => {
        const html = renderMarkup(renderToString(SSR));
        res.status(200).send(html);
    });

    app.listen(port, () => {
        console.log('server is runing');
    });
};

server(process.env.PORT || 3000);
