/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white'

const speed = 8

var BotPlayer = {opp: false, user: false}

var user = {
    width: canvas.height/32,
    height: canvas.height/4,
    
    x: canvas.height/10,
    y: canvas.height/2 - canvas.height/8,

    up: false,
    down: false,

    score: 0,
    destination: null
}

var opp = {
    width: canvas.height/32,
    height: canvas.height/4,
    
    x: canvas.width - canvas.height/10 - canvas.height/32,
    y: canvas.height/2 - canvas.height/8,

    up: false,
    down: false,

    score: 0,
    destination: null
}

var ball = {
    width: canvas.height/20,
    height: canvas.height/20,

    x: canvas.width/2 - canvas.height/40,
    y: canvas.height/2- canvas.height/40,

    up: false, down: false, left: false, right: false
}
switch(Math.floor(Math.random()*4)){
    case 0:
        ball.up = true, ball.left = true
        break
    case 1:
        ball.up = true, ball.right = true
        break
    case 2:
        ball.down = true, ball.left = true
        break
    case 3:
        ball.down = true, ball.right = true
        break
}

function switchModes(){
    if(BotPlayer.user) BotPlayer.opp = false, BotPlayer.user = false
    else if(BotPlayer.opp) BotPlayer.user = true
    else BotPlayer.opp = true

    if(BotPlayer.user) document.getElementById('box1').textContent = 'computer'
    else document.getElementById('box1').textContent = 'player'

    if(BotPlayer.opp) document.getElementById('box2').textContent = 'computer'
    else document.getElementById('box2').textContent = 'player'
    
    console.log(BotPlayer)
}

function showAll(...variables){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    for(let i of variables) ctx.fillRect(i.x, i.y, i.width, i.height)
}

function ballMovement(){
    if(ball.up && ball.y - speed*1.5 < 0) ball.down = true, ball.up = false
    if(ball.down && ball.y + ball.height + speed*1.5 >= canvas.height) ball.up = true, ball.down = false

    if(ball.x - speed<= user.x + user.width && user.x < ball.x){
        if(user.y < ball.y + ball.height && user.y + user.height > ball.y) ball.right = true, ball.left = false
    }
    if(ball.x + ball.width + speed >= opp.x){
        if(opp.y < ball.y + ball.width && opp.y + opp.height > ball.y) ball.left = true, ball.right = false
    }
}

function ballReset(){
    ball.x = canvas.width/2 - canvas.height/40
    ball.y = canvas.height/2- canvas.height/40

    ball.up = false, ball.down = false, ball.left = false, ball.right = false
    
    switch(Math.floor(Math.random()*4)){
        case 0:
            ball.up = true, ball.left = true
            break
        case 1:
            ball.up = true, ball.right = true
            break
        case 2:
            ball.down = true, ball.left = true
            break
        case 3:
            ball.down = true, ball.right = true
            break
    }
}

window.addEventListener('keydown', (e) => {
    if(e.key == 'w') user.up = true
    else if(e.key == 's') user.down = true

    if(e.key == 'o') opp.up = true
    else if(e.key == 'l') opp.down = true
})

window.addEventListener('keyup', (e) => {
    if(e.key == 'w') user.up = false
    else if(e.key == 's') user.down = false

    if(e.key == 'o') opp.up = false
    else if(e.key == 'l') opp.down = false
})

let mainInterval = setInterval(() => {
    //------------------------movement------------------------
    if(BotPlayer.user == false){
        if(user.up && user.y - speed > 0) user.y -= speed
        else if(user.down && user.y + speed + user.height < canvas.height) user.y += speed
    }
    if(BotPlayer.opp == false){
        if(opp.up && opp.y - speed > 0) opp.y -= speed
        else if(opp.down && opp.y + speed + opp.height < canvas.height) opp.y += speed
    }
    if(ball.up) ball.y -= speed*1.5
    else if(ball.down) ball.y += speed*1.5
    if(ball.left) ball.x -= speed*1.5
    else if(ball.right) ball.x += speed*1.5
    //------------------------movement------------------------
    if(ball.x + ball.width < 0){
        opp.score++
        document.getElementById("oppScore").textContent = opp.score
        ballReset()
    }
    else if(ball.x > canvas.width){
        user.score++
        document.getElementById("userScore").textContent = user.score
        ballReset()
    }

    ballMovement()

    showAll(user, opp, ball)

}, 50)