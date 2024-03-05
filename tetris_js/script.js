/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const len = 3
const block = canvas.width/10
var loc = {
    x:4*block,
    y:0
}
const shape_L = [
    [1,0,0],
    [1,0,0],
    [1,1,0]
]
var matrix = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
]
ctx.fillStyle = 'ghostwhite'
// ctx.fillRect(loc.x, loc.y, block, block)
var timer = performance.now()
update_window(shape_L)

function save_shape(shape_matrix, matrix){
    for(let y = 0; y<len; y++){
        for(let x = 0/block; x<len; x++){
            if(shape_matrix[y][x]==1) matrix[loc.y/ block+y][loc.x/ block+x] = 1
        }
    }
}
function draw_shape_matrix(shape_matrix){
    for(let y = 0; y<len; y++){
        for(let x = 0; x<len; x++){
            if(shape_matrix[y][x]==1) ctx.fillRect(loc.x+x*block, loc.y+y*block, block, block)
        }
    }
}

function load_matrix(matrix){
    for(let y = 0; y<20; y++){
        for(let x = 0; x<10; x++){
            if(matrix[y][x]==1) ctx.fillRect(x*block, y*block, block, block)
        }
    }
}

function update_window(shape_matrix, matrix){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw_shape_matrix(shape_matrix)
    load_matrix(matrix)
}

function drop_down(){
    update_window(shape_L)
    loc.y += block
    timer = performance.now()
    return 'kys'
}

window.addEventListener('keypress', (e) => {
    document.getElementById('keypressed').textContent = e.key
    if(e.key == 'a' && loc.x-block >= 0) loc.x -= block
    else if(e.key == 'd' && loc.x+block < canvas.width) loc.x += block
    else if(e.key == 'w' && loc.y-block >= 0) loc.y -= block
    else if(e.key == 's' && loc.y+block < canvas.height) loc.y += block
    else if(e.key == 'e') matrix = save_shape(shape_L, matrix)

    update_window(shape_L, matrix)
})

// setInterval(drop_down, 500)