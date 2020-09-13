const express = require('express');

let app = express();
let PORT = 3000;

app = express();

app.use('/rss', express.static('rss'));

app.listen(PORT, () => {
	console.log(`RSS server listening at http://localhost:${PORT}`)
});
