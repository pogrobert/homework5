
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};

const goodGuyImg = new Image();
goodGuyImg.src = 'https://www.sideshowtoy.com/wp-content/uploads/2017/07/dc-comics-justice-league-batman-tactical-batsuit-version-sixth-scale-hot-toys-silo-903119-1.png';

const badGuyImg = new Image();
badGuyImg.src = 'https://vignette.wikia.nocookie.net/mkwikia/images/a/a7/Joker_mkvsdc_Render.png/revision/latest?cb=20150505074733';

const backgroundImg = new Image();
backgroundImg.src = 'https://mbtskoudsalg.com/images/game-background-png-6.png';


const gameData = {
	hero: {
		x: rand(1420-50),
		y: rand(800-120),
		xDelta: 0,
		yDelta: 0,
		width: 60,
		height: 120,
		image: goodGuyImg,
		draw: function() {
			context.drawImage(this.image, this.x, this.y, this.width, this.height);
		},
		update: function() {

			if (this.xDelta !== 0 && this.x + this.xDelta >= 0 && canvas.width >= this.x + this.xDelta + this.width) {
                this.x += this.xDelta
            }
            if (this.yDelta !== 0 && this.y + this.yDelta >= 0 && canvas.height >= this.y + this.yDelta + this.height) {
                this.y += this.yDelta
            }

			for(let i=0; i<gameData.badGuys.length; i++) {
				const enemy = gameData.badGuys[i]
				if  (this.x <= enemy.x+enemy.width && this.x + this.width >= enemy.x && this.y <= enemy.y + enemy.height && this.y + this.height >= enemy.y) {
					
					context.clearRect(this.x, this.y, this.width, this.height)
					context.drawImage(backgroundImg, this.x, this.y, this.width, this.height)
					this.x = rand(1420-50)
					this.y = rand(800-120)
					this.draw()
					this.xDelta = 0
					this.yDelta = 0
					alert("Game Over");			
				}
			}
		} 	
	},
	
	badGuys: []

}

const createEnemies = function(count, canvasWidth, canvasHeight) {
  	canvas.width = canvasWidth
  	canvas.height = canvasHeight

  	let array = [];
  	for(let i = 0; count>i; i++) {
   	 array[i] = {
		x: rand(1420-50),
		y: rand(800-100),
		xDelta: 3,
		yDelta: 3,
		width: 50,
		height: 100,
		image: badGuyImg,
		draw: function() {
			context.drawImage(this.image, this.x, this.y, this.width, this.height)
		},
       	update: function() {		
			this.x += this.xDelta
            this.y += this.yDelta

            if (this.x + this.width >= canvas.width) {
           		this.xDelta = -3
           	} else if (this.x < 0) {
                this.xDelta = 3
            }
            if (this.y + this.height >= canvas.height) {
             	this.yDelta = -3
           	} else if (this.y < 0) {
             	this.yDelta = 3
            }
        }
     }
  	}

	gameData.badGuys = array
	return array
}


const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
document.addEventListener('keydown', function(event) {
	if(event.keyCode === upKey) {
        gameData.hero.yDelta = -3
  	} else if (event.keyCode === leftKey) {
  		gameData.hero.xDelta = -3
  	} else if (event.keyCode === rightKey) {
  		gameData.hero.xDelta = 3
  	} else if (event.keyCode === downKey) {
  		gameData.hero.yDelta = 3
  		console.log("a")
  	}
}, false);
document.addEventListener('keyup', function(event) {
	gameData.hero.xDelta = 0
	gameData.hero.yDelta = 0
}, false)

const enemies = createEnemies(5, 1420, 800)

const draw = function(enemies) {
  context.drawImage(backgroundImg, 0, 0)
  gameData.hero.draw()
  for(let i = 0; enemies.length>i; i++) {
  	enemies[i].draw()
  }
}

const update = function(enemies) {
	gameData.hero.update()
    for (let i = 0; enemies.length>i; i++) {
    	enemies[i].update()
  	}
}


const loop = function() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  draw(enemies)
  update(enemies)
  requestAnimationFrame(loop)
}

loop()






