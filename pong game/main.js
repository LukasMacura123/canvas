/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const playerSpeed = 8
var ballSpeed = 8

var userUp=0, userDown=0, oppUp=0, oppDown

const user = {
    width: canvas.height/32,
    height: canvas.height/4,
    x: canvas.height/10,
}
let userY = canvas.height/2 - canvas.height/8

const opp  = {
    width: canvas.height/32,
    height: canvas.height/4,
    x: canvas.width - canvas.height/10 - canvas.height/32,
}
let oppY = canvas.height/2 - canvas.height/8
var score = {opp: 0, user: 0}

var AIpowerOne = true, AIpowerBoth = true

var ball = {
    width: canvas.height/20,
    height: canvas.height/20,
    x: canvas.width/2- canvas.height/40,
    y: canvas.height/2- canvas.height/40,
    direction: Math.floor(Math.random()*4),
    destination: null
}

window.addEventListener('keydown', (e) => {
    if(e.key == 'w') userUp = performance.now()
    if(e.key == 's') userDown = performance.now()

    if(e.key == 'o') oppUp = performance.now()
    if(e.key == 'l') oppDown = performance.now()

    if(e.key == 'q') console.log(ball.destination)
})

function display_all(...list_of){
    ctx.fillStyle = 'white'
    for(let i of list_of){
        if(i == user) ctx.fillRect(i.x, userY, i.width, i.height)
        else if(i == opp) ctx.fillRect(i.x, oppY, i.width, i.height)
        else ctx.fillRect(i.x, i.y, i.width, i.height)
    }
}

function handle_movement(){
    let timer = performance.now()

    if(userUp + 50 >= timer && userY - playerSpeed >= 0) userY -= playerSpeed
    if(userDown+50 >= timer && userY + playerSpeed + user.height < canvas.height) userY += playerSpeed
    
    if(oppUp + 50 >= timer && oppY - playerSpeed >= 0) oppY -= playerSpeed
    if(oppDown+50 >= timer && oppY + playerSpeed + opp.height < canvas.height) oppY += playerSpeed
}

function ball_movement(){
    
    let oldDirection = ball.direction
    console.log(typeof ball.direction)

    switch(ball.direction){
        case 0:
            if(ball.y + ballSpeed < canvas.height - ball.width){
                ball.x+=ballSpeed
                ball.y+=ballSpeed
            }else{
                ball.direction = 1
                ball.x += ballSpeed
                ball.y -= ballSpeed
            }
            break
        case 1:
            if(ball.y - ballSpeed > 0){
                ball.x+=ballSpeed
                ball.y-=ballSpeed
            }else{
                ball.direction = 0
                ball.x+=ballSpeed
                ball.y+=ballSpeed
            }
            break
        case 2:
            if(ball.y + ballSpeed < canvas.height - ball.width){
                ball.x-=ballSpeed
                ball.y+=ballSpeed
            }else{
                ball.direction = 3
                ball.x-=ballSpeed
                ball.y-=ballSpeed
            }
            break
        case 3:
            if(ball.y - ballSpeed > 0){
                ball.x-=ballSpeed
                ball.y-=ballSpeed
            }else{
                ball.direction = 2
                ball.x-=ballSpeed
                ball.y+=ballSpeed
            }
            break
    }
    if((ball.x <= user.x + user.width)&&(ball.x > user.x)){
        if((ball.y+ball.height > userY)&&(userY + user.height > ball.y)){
            if(ball.direction == 3) ball.direction = 1
            else ball.direction = 0
        }
    }
    else if((ball.x >= opp.x - ball.width)&&(ball.x < opp.x + opp.width - ball.width)){
        if((ball.y+ball.height > oppY)&&(oppY + opp.height > ball.y)){
            if(ball.direction == 1) ball.direction = 3
            else ball.direction = 2
        }
    }

    if(ball.x > canvas.width || ball.x < 0 - ball.width){
        if(ball.x < 0 - ball.width) score.opp++
        else score.user++

        ball = {
            width: canvas.height/20,
            height: canvas.height/20,
            x: canvas.width/2- canvas.height/40,
            y: canvas.height/2- canvas.height/40,
            direction: Math.floor(Math.random()*4)
        }
        document.getElementById("oppScore").textContent = score.opp
        document.getElementById("userScore").textContent = score.user
    }
}
display_all(user, ball, opp)
let main = setInterval(() => {
    ball_movement()
     
    handle_movement(user, opp)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    display_all(user, ball, opp)
}, 25)