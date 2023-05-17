let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/a61jTLvDH/";
// let imageModelURL = "https://teachablemachine.withgoogle.com/models/rXAKooUnb/";
let video;
let flippedVideo;
let label = "WAITING";
let snake;
let FPS = 10;
let counter = 0;

function preload() {
  console.log(imageModelURL + "model.json");
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(1000, 400);
  video = createCapture(VIDEO);
  video.size(500, 400);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  snake = new Snake();
}

function draw() {
  counter++;
  if (counter % FPS === 0) {
    background(0);

    snake.update();
    snake.draw();
  }
  image(flippedVideo, 500, 0);
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
}
