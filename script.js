let teacher = document.getElementById('teacher');
let gameArea = document.getElementById('gameArea');
let scoreDisplay = document.getElementById('score');

let teacherPosition = 130;
let score = 0;
let gameSpeed = 60; // Päivitetty pelinopeus (fps)
let enemySpeed = 3;
let enemies = [];

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && teacherPosition > 0) {
        teacherPosition -= 10;
    } else if (event.key === 'ArrowRight' && teacherPosition < 260) {
        teacherPosition += 10;
    }
    teacher.style.left = teacherPosition + 'px';
});

function createEnemy() {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = Math.floor(Math.random() * 260) + 'px';
    enemy.style.top = '0px'; // Asetetaan viholliselle alkuperäinen top-arvo
    gameArea.appendChild(enemy);
    enemies.push(enemy);
}

function moveEnemies() {
    enemies.forEach((enemy, index) => {
        let enemyTop = parseInt(enemy.style.top);
        if (enemyTop > 500) { // Jos vihollinen menee pelialueen ulkopuolelle
            gameArea.removeChild(enemy);
            enemies.splice(index, 1);
            score++;
            scoreDisplay.textContent = score;
            if (score % 5 === 0) {
                enemySpeed++;
            }
        } else {
            enemy.style.top = enemyTop + enemySpeed + 'px';
        }
    });
}

function checkCollision() {
    enemies.forEach(enemy => {
        let enemyRect = enemy.getBoundingClientRect();
        let teacherRect = teacher.getBoundingClientRect();
        if (!(teacherRect.right < enemyRect.left || 
              teacherRect.left > enemyRect.right || 
              teacherRect.bottom < enemyRect.top || 
              teacherRect.top > enemyRect.bottom)) {
            alert('Peli päättyi! Pisteesi: ' + score);
            window.location.reload();
        }
    });
}

function gameLoop() {
    moveEnemies();
    checkCollision();
    setTimeout(gameLoop, 1000 / gameSpeed);
}

setInterval(createEnemy, 1000);
gameLoop();

