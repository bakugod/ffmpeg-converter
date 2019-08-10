const express = require('express');
const { spawn, exec } = require('child_process');

const PORT = 8081;

const app = express();

app.use("/", express.static(__dirname + "/"));
app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

exec('ffmpeg -r 1/5 -i ./input/img%03d.jpg -c:v libx264 -r 30 -pix_fmt yuv420p ./output/test.mp4',() => console.log('done'))

console.log('app working on', PORT);
app.listen(PORT)