const express = require('express');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const PORT = 8081;

const app = express();
	app.use("/", express.static(__dirname + "/"));
	app.get('/', (req, res) => {
		res.sendFile(__dirname + "/index.html");
    });

ffmpeg('./input/test2.mp4')
    .output('./output/output.mp4')
    .noAudio()
    .seek('0:20')
    .on('error', function(err) {
        console.log('An error occurred: ' + err.message);
    })
    .on('end', function() {
        console.log('Processing finished !');
    })
    .run();

console.log('app working on', PORT);
app.listen(PORT)