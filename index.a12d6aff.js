var classifier,video,flippedVideo,snake,imageModelURL="./my_model/",label="WAITING";function preload(){classifier=ml5.imageClassifier(imageModelURL+"model.json")}function setup(){createCanvas(1e3,400),(video=createCapture(VIDEO)).size(500,400),video.hide(),flippedVideo=ml5.flipImage(video),snake=new Snake}function draw(){background(0),image(flippedVideo,500,0),snake.update(),snake.draw(),fill(255),textSize(16),textAlign(CENTER),text(label,width/2,height-4)}function classifyVideo(){flippedVideo=ml5.flipImage(video),classifier.classify(flippedVideo,gotResult),flippedVideo.remove()}function gotResult(e,i){e?console.error(e):label=i[0].label}
//# sourceMappingURL=index.a12d6aff.js.map
