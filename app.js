// include dependencies
const express = require('express');

const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.static('dist'));

app.use("/", createProxyMiddleware(
    ["/api"],
    {
        target: "https://my-grocery-list-app.herokuapp.com",
        secure: false,
        changeOrigin: true
    }
));

const port = process.env.PORT || 80;

app.listen(port);