const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const highestScore = document.getElementById('highest');

let isJumping = false;
let isGameOver = false;
let position  = 0;
let score = 0;
let record = localStorage.getItem('record'); 

function handleKey(event) {
    if (event.keyCode === 32) {
        if(!isJumping) {
            jump();
        }
    }
}

function handleTouch(event) {
    if(!isJumping) {
        jump();
    }
}

function start() {
    location.reload(true);
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval (() => {
                if(position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 30);
        } else {
        position += 20;
        dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            score++;
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //gameover
            clearInterval(leftInterval);
            isGameOver = true;
            document.body.innerHTML = "<h1 class='game-over'>Game over</h1><h3 class='score'>Your score: " + score + "</h3>        <div id='restart-btn'><button onclick='start()'>Restart</button></div>";
            updateRecord();
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);

}

function updateRecord() {
    if(score > record) {
        localStorage.setItem('record', score);
    }
    highestScore.innerHTML = record;
}

updateRecord();
createCactus();

document.addEventListener('keydown', handleKey);
document.addEventListener('touchend', handleTouch);