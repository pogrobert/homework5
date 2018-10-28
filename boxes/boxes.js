const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

const rand = function(num) {
  return Math.floor(Math.random() * num) + 1
}

const createBoxes = function(count, canvasWidth, canvasHeight) {
  canvas.width = canvasWidth
  canvas.height = canvasHeight

  const colorArray = ["red", "blue", "orange", "green", "gray", "yellow", "aqua", "arown", "darkblue"]
  let array = []
  for(let i = 0; count>i; i++) { 
    array[i] = {
      x: rand(canvasWidth-30),
      y: rand(canvasHeight-30),
      width: 30,
      height: 30,
      xDelta: 3, 
      yDelta: 3, 
      color: colorArray[rand(9)-1],
      draw: function() {
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)
      },
      update: function() {
        this.x += this.xDelta
        this.y += this.yDelta

        if (this.x + this.width >= canvas.width) {
          this.xDelta = -3
          this.color = colorArray[rand(9)-1]
        } else if (this.x < 0) {
            this.xDelta = 3
            this.color = colorArray[rand(9)-1]
        }
        if (this.y + this.height >= canvas.height) {
          this.yDelta = -3
          this.color = colorArray[rand(9)-1]
        } else if (this.y < 0) {
          this.yDelta = 3
          this.color = colorArray[rand(9)-1]
        }

      }


    }

  }

  return array
}
	
const boxes = createBoxes(5, 500, 500)

const draw = function(boxes) {
  for(let i = 0; boxes.length>i; i++) {
  boxes[i].draw()
 	}
}

const update = function(boxes) {
  for (let i = 0; boxes.length>i; i++) {
    boxes[i].update()
  }
}


const loop = function() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  draw(boxes)
  update(boxes)
  requestAnimationFrame(loop)
}

loop()

















