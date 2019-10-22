var score = document.querySelector('#score strong');
var over = document.querySelector('#over');
var btn = over.querySelector('button');

var valueOfScore = 0;
var idInterval;
var self;

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {
    self = this;
    this.board = document.querySelectorAll('section#board > div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x,y) {
        return x + (y * 10);
    };
    this.showFurry = function () {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y > 9 || this.furry.y < 0){
            self.gameOver();
        }else{
            this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
        }
    };
    this.showCoin = function () {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    };
    this.startGame = function () {
        idInterval = setInterval(this.moveFurry, 250);
    };
    this.moveFurry = function () {
        if(self.furry.direction === "right") {
            self.furry.x = self.furry.x + 1;
        }else if(self.furry.direction === "left") {
            self.furry.x = self.furry.x - 1;
        }else if(self.furry.direction === "down") {
            self.furry.y = self.furry.y + 1;
        }else if(self.furry.direction === "up") {
            self.furry.y = self.furry.y - 1;
        }
        self.hideVisibleFurry();
        self.showFurry();
        self.checkCoinCollision();
    };
    this.hideVisibleFurry = function () {
        document.querySelector('.furry').classList.remove('furry');
    };
    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
        this.moveFurry();
    };
    this.checkCoinCollision = function () {
        if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
            this.removeCoin();
            valueOfScore += 1;
            score.innerText = valueOfScore;
            this.coin = new Coin();
            this.showCoin();
        }
    };
    this.removeCoin = function () {
        document.querySelector('.coin').classList.remove('coin');
    };
    this.gameOver = function () {
            over.classList.remove('invisible');
            over.querySelector('p').innerText = valueOfScore;
            clearInterval(idInterval);
            this.hideVisibleFurry();

    }
}
var game;
newGame();

function newGame() {
    game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();
}

document.addEventListener('keydown', function(event){
    game.turnFurry(event);
});

btn.addEventListener('click', function () {
    over.classList.add('invisible');
    document.querySelector('.coin').classList.remove('coin');
    valueOfScore = 0;
    score.innerText = valueOfScore;
    newGame();
});