const express = require('express');
const { spawn, exec } = require('child_process');

const PORT = 8081;
const app = express();

app.use("/", express.static(__dirname + "/"));
app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

exec(
	'ffmpeg -i ./input/img004.png ./input/img004.jpg',
	(err) => {
		console.log(err)
		exec(
			'ffmpeg -start_number_range 100 -r 1/2 -i ./input/img%03d.jpg -vf scale=720:-1 -r 30 -vframes 500 -pix_fmt yuv420p ./output/test73.mp4 && ffplay ./output/test73.mp4', 
			(err) => 
			err
			? console.error(err.message)
			: console.log('video processing finished')
		)
	}
)

// exec(
// 	'ffmpeg -start_number_range 100 -r 1/2 -i ./input/img%03d.jpg -c:v libx264 -r 30 -vframes 500 -pix_fmt yuv420p ./output/test.mp4', 
// 	(err) => 
// 	err
// 	? console.error(err.message)
// 	: console.log('video processing finished')
// )


app.listen(
	PORT, 
	() => console.log('app working on', PORT)
);