let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

document.getElementById("start-btn").addEventListener("click", function() {
    if (!started) {
        started = true;

        // Play game start sound
        new Audio("sounds/game-start.mp3").play();

        nextSequence();
    }
});

function nextSequence() {
    userPattern = [];
    level++;
    document.getElementById("level-title").innerText = `Level ${level}`;

    let randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    
    setTimeout(() => playSequence(), 500);
}

function playSequence() {
    let i = 0;
    function playNext() {
        if (i < gamePattern.length) {
            let color = gamePattern[i];
            let button = document.getElementById(color);
            button.classList.add("flash");
            setTimeout(() => button.classList.remove("flash"), 300);
            new Audio(`sounds/${color}.mp3`).play();
            i++;
            setTimeout(playNext, 600);
        }
    }
    playNext();
}

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        if (!started) return;

        let userColor = this.id;
        userPattern.push(userColor);
        this.classList.add("flash");
        setTimeout(() => this.classList.remove("flash"), 200);

        // Play second.mp3 when a button is clicked
        new Audio("sounds/second.mp3").play();

        new Audio(`sounds/${userColor}.mp3`).play();
        checkAnswer(userPattern.length - 1);
    });
});

function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        document.body.classList.add("game-over");
        document.getElementById("level-title").innerText = "Game Over! Press Start to Restart";
        new Audio("sounds/wrong.mp3").play();
        setTimeout(() => document.body.classList.remove("game-over"), 200);
        resetGame();
    }
}

function resetGame() {
    started = false;
    gamePattern = [];
    level = 0;
}
