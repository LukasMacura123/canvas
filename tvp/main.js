/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width  = window.innerWidth
canvas.height = window.innerHeight

var infoBox = document.getElementById('infobox')
var gateBox = document.getElementById('gates')
var inputBox = document.getElementById('inputBox')

var amount = null

var toolBoxContent = {
    gates: ['main','peak'],
    activeGate: 'main',

    activeInput: 'cable',

    inputs: ['cable','&', '&N', '1', '1N', 'N'],
    inputsInfo: {
        'cable': 'this allowes you to connect different gates and cables',
        '&': 'and gate allows you to add up different inputs',
        '&N': 'Nand gate allows you to negate add up input',
        '1': 'or gate allows you to multipli input',
        '1N': 'Nor gate allows you to negate multiplied input',
        'N': 'Not gate allows you to negate any input'
    },
}

var gateId = {
    allGates: [],
    IDs: [],
    activeGate: '',
    activeId: ''
}

updateToolBox()
drawGrid()

function activeGrab(name){toolBoxContent.grabedInput = `${name}`}
function updateToolBox(){
    let content = ''
    for(let i of toolBoxContent.gates){
        if(i == toolBoxContent.activeGate){
            content += `<div class="file" id="activeFile">${i}</div>`
        }
        else content += `<div class="file">${i}</div>`
    }
    gateBox.innerHTML = content
    
    content = ''
    for(let i of toolBoxContent.inputs){
        if(i == toolBoxContent.activeInput){
            content += `<div class="input" id="${i}" style="box-shadow: 0 0 5px black;">${i}</div>`

        }else content += `<div class="input" id="${(i)}" onclick="changeInput('${i}')">${i}</div>`
    }
    inputBox.innerHTML = content
}
function addFile(){
    let fileName = window.prompt('name your file:')
    while(fileName.length > 16){
        fileName = window.prompt('your file name needs to be 16 characters or less\nname your file againg')
    }
    toolBoxContent.gates.push(`${fileName}`)
    
    updateToolBox()
}
function drawGrid(){
    let x = canvas.height, y = canvas.height
    
    if(y > x) amount = y/48
    else amount = x/48
    
    ctx.fillStyle = 'rgb(15,15,15)'

    for(let i = 1; i <= 100; i++){
        ctx.fillRect(0, i*(amount), canvas.width, 2)
        ctx.fillRect(i*(amount), 0, 2, canvas.height)
    }
    let GateStyle = document.getElementById('Gate0')
    GateStyle.style.width = `${amount*6}px`, GateStyle.style.height = `${amount*6}px`

    GateStyle.style.top = `${amount*5}px`, GateStyle.style.left = `${amount*15}px`
}
function cableControl(e){

    ctx.strokeStyle = 'white'
    ctx.lineWidth = 3

    ctx.moveTo(tools.cable.startLoc.x, cable.startLoc.y)

    while(tools.cable.endLock == null){    
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawGrid()
        
        ctx.lineTo(e.clientX, e.clientY)
    }
    
}
function changeInput(id){
    toolBoxContent.activeInput = id
    addHtmlGate()
    updateToolBox()
}
function addHtmlGate(){
        
    let IDname = `${toolBoxContent.activeInput}${Math.floor(Math.random()*1000)}`

    while(gateId.IDs.includes(IDname)){
        IDname = `${toolBoxContent.activeInput}${Math.floor(Math.random()*1000)}`
    }
    gateId.activeId = IDname
}
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight, canvas.width = window.innerWidth

    drawGrid()
})
window.addEventListener('mousemove', (e) => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    drawGrid()

    ctx.fillStyle = 'rgba(143, 51, 143, 0.829)'
    for(let i = 0; i <= 100; i++){
        for(let j = 0; j <= 100; j++){
            if((e.clientY > i*amount - amount/2 && e.clientY < i*amount + amount/2) && 
                (e.clientX > j*amount - amount/2 && e.clientX < j*amount + amount/2)){
                    ctx.fillRect(j*amount -2, i*amount -2, 6, 6)
            }
        }
    }
})
let HOVER = setInterval(() => {
    infoBox.style.top = '110vh'

    for(let i of toolBoxContent.inputs){
        let elementItem = document.getElementById(i)
        elementItem.addEventListener('mouseover', (e) => {
            infoBox.style.top = `${e.clientY + 15}px`

            infoBox.textContent = toolBoxContent.inputsInfo[i]
        })
    }
}, 2000)
