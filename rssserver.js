const express = require('express');

const app = express();

app = express();

app.use(express.static('./rss'));

app.listen(process.env.PORT || 8080);
