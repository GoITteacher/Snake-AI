class Snake {
  constructor() {
    this.body = [{ x: 0, y: 0 }];
    this.direction = "right";
    this.length = 1;
    this.fruit = { x: 0, y: 0 };
    this.score = 0;
    this.speed = 5;
    this.boxSize = 20;
    this.boxWidth = 500;
    this.boxHeight = 400;
  }

  update() {
    classifyVideo();
    this.changeDirection(label);

    let head;
    let newHead;
    try {
      head = this.body[this.body.length - 1];
      newHead = { x: head.x, y: head.y };
    } catch (err) {
      console.log(err);
    }

    switch (this.direction) {
      case "up":
        newHead.y -= this.speed;
        break;
      case "down":
        newHead.y += this.speed;
        break;
      case "left":
        newHead.x -= this.speed;
        break;
      case "right":
        newHead.x += this.speed;
        break;
    }

    this.body.shift();
    this.body.push(newHead);

    if (this.checkCollision()) {
      this.reset();
    }

    if (this.checkFruitCollision()) {
      this.length++;
      this.score++;
      this.generateFruit();
    }
  }

  draw() {
    fill(0);
    rect(0, 0, this.boxWidth, this.boxHeight);
    this.drawScore();
    this.drawFruit();
    this.drawSnake();
  }

  drawSnake() {
    fill(255);
    for (let i = 0; i < this.body.length; i++) {
      try {
        rect(this.body[i].x, this.body[i].y, this.boxSize, this.boxSize);
      } catch {
        console.log("Error 58 - ", i);
      }
    }
  }

  drawFruit() {
    fill(255, 0, 0);
    rect(this.fruit.x, this.fruit.y, this.boxSize, this.boxSize);
  }

  drawScore() {
    fill(0, 0, 255);
    textSize(20);
    text(`Score: ${this.score}`, 50, 30);
  }

  checkCollision() {
    let head = this.body[this.body.length - 1];

    if (head.x < 1) head.x += this.boxWidth;
    if (head.y < 1) head.y += this.boxHeight;
    if (head.x > this.boxWidth - this.boxSize) head.x -= this.boxWidth;
    if (head.y > this.boxHeight - this.boxSize) head.y -= this.boxHeight;

    for (let i = 0; i < this.body.length - 1; i++) {
      if (this.body[i].x === head.x && this.body[i].y === head.y) {
        return true;
      }
    }

    return false;
  }

  generateFruit() {
    let x =
      Math.floor(Math.random() * (this.boxWidth / this.boxSize)) * this.boxSize;
    let y =
      Math.floor(Math.random() * (this.boxHeight / this.boxSize)) *
      this.boxSize;
    this.fruit = { x: x, y: y };
  }

  checkFruitCollision() {
    let head = this.body[this.body.length - 1];

    if (
      head.x + this.boxSize / 2 >= this.fruit.x &&
      head.y + this.boxSize / 2 >= this.fruit.y &&
      head.x + this.boxSize / 2 <= this.fruit.x + this.boxSize &&
      head.y + this.boxSize / 2 <= this.fruit.y + this.boxSize
    ) {
      return true;
    }

    return false;
  }

  reset() {
    this.body = [{ x: 0, y: 0 }];
    this.direction = "right";
    this.length = 1;
    this.fruit = { x: 0, y: 0 };
    this.score = 0;
  }

  changeDirection(direction) {
    direction = direction.toLowerCase();
    this.direction = direction;
    // if (direction === "up" && this.direction !== "down") {
    //   this.direction = "up";
    // } else if (direction === "down" && this.direction !== "up") {
    //   this.direction = "down";
    // } else if (direction === "left" && this.direction !== "right") {
    //   this.direction = "left";
    // } else if (direction === "right" && this.direction !== "left") {
    //   this.direction = "right";
    // }
  }
}
