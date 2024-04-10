/** @type {HTMLCanvasElement} */

window.addEventListener('keydown', () => {
    console.log(ball.x)
})

function AIplayer(){
    if(y == 0 || y == canvas.height) []

}

setInterval(() => {
    let X, Y, LENGHT

    if(ball.y > 450){
        if((ball.direction == 0 || ball.direction == 1) && ball.x > 300){
            if(ball == 0){
                X = ball.x + canvas.height - ball.y
                Y = canvas.height - ball.height

                LENGHT = canvas.width - opp.x - X

                X += LENGHT
                Y += LENGHT
            }else{
                X = ball.x + ball.y
                Y = 0

            }


        }else if((ball.direction == 2 || ball.direction == 3) && ball.x < 700){

        }
    }
}, 100)