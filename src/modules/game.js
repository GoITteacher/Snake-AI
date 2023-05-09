let classifier;
let imageModelURL = "./my_model/";
let video;
let flippedVideo;
let label = "WAITING";
let snake;

function preload() {
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
  background(0);

  image(flippedVideo, 500, 0);
  snake.update();
  snake.draw();

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
