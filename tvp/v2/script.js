/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width  = window.innerWidth
canvas.height = window.innerHeight

var container = document.getElementById('gateContainer')

var mouseMoved = true

var myTools = {
    logicGates: true,
    cable: false
}

var gateInfo = {
    activeId: 'Gate0',
    
    allGates: ['<div class="Gate" id="Gate0"><div class="gateBody"><div class="gateName" id="Gate0text">1</div></div></div>'],
    gateIds: [],

    IdToLoc:{},

    activeInput: '1',
    freeSpace: true,

    nextId: 1
}

var tools = {
    cable: false,
    gate: true
}

var cable = {
    ConnectedGates: {},
    
    GateToInputRatio: {},

    startLoc: null,
    activeGate: false
}

drawGrid()

container.innerHTML = gateInfo.allGates.join('')
var activeGate = document.getElementById(gateInfo.activeId)
activeGate.style.opacity = '0.5'

function drawGrid(){
    let x = canvas.height, y = canvas.height
    
    if(y > x) amount = y/48
    else amount = x/48
    
    ctx.fillStyle = 'rgb(15,15,15)'

    for(let i = 1; i <= 100; i++){
        ctx.fillRect(0, i*(amount), canvas.width, 2)
        ctx.fillRect(i*(amount), 0, 2, canvas.height)
    }
}

function updateGateLocation(){
    for(let i of gateInfo.gateIds){
        let GATE = document.getElementById(i)

        GATE.style.left = `${gateInfo.IdToLoc[i][0]}px`
        GATE.style.top  = `${gateInfo.IdToLoc[i][1]}px`

        GATE.style.opacity = '0.75'
    }
}
function drawLine(startX, startY, endX, endY, color){
    ctx.beginPath()

    ctx.strokeStyle = color
    ctx.lineWidth = 5

    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)

    ctx.stroke()
}
function showConnections(){
    for(let i of gateInfo.gateIds){
        if(cable.ConnectedGates[i] != null){
            for(let j of cable.ConnectedGates[i]){
                if(j[0] != null){
                    try{
                        drawLine(gateInfo.IdToLoc[i][0], gateInfo.IdToLoc[i][1], gateInfo.IdToLoc[j][0], gateInfo.IdToLoc[j][1], 'white')
                    }catch(error){}
                }
            }   
        }
    }
}
window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawGrid()
})

window.addEventListener('mousemove', (e) => {
    mouseMoved = true

    ctx.clearRect(0,0,canvas.width,canvas.height)

    drawGrid()
    if(tools.gate){
        
        activeGate.style.top = `${e.clientY + 10}px`, activeGate.style.left = `${e.clientX + 10}px`
    }else{

        if(cable.startLoc != null){
            drawLine(cable.startLoc[0], cable.startLoc[1], e.clientX, e.clientY, 'rgba(255,255,255,0.6)')
        }
    }

    showConnections()

    ctx.fillStyle = 'rgb(143, 51, 143)'
    for(let i = 0; i < 100; i++){
        for(let j = 0; j < 100; j++){
            if((e.clientY > i*amount - amount/2 && e.clientY < i*amount + amount/2) &&
                (e.clientX > j*amount - amount/2 && e.clientX < j*amount + amount/2)){
                    ctx.fillRect(j*amount -2, i*amount -2, 6, 6)
            }
        }
    }

    let yesNo = true

    let POINTX, POINTY

    if(e.clientX % amount < amount/2) POINTX = e.clientX - e.clientX % amount
    else POINTX = e.clientX - e.clientX % amount + amount
    
    if(e.clientY % amount < amount/2) POINTY = e.clientY - e.clientY % amount
    else POINTY = e.clientY - e.clientY % amount + amount

    for(let i of gateInfo.gateIds){

        let X = gateInfo.IdToLoc[i][0], Y = gateInfo.IdToLoc[i][1]

        if(!((POINTX > X + amount*3 || POINTX < X - amount*4) ||
        (POINTY > Y + amount*5 || POINTY < Y - amount*6))){
            yesNo = false
        }
    }
    gateInfo.freeSpace = yesNo
    if(!yesNo) document.getElementById(gateInfo.activeId).style.opacity = '0.1'
    else document.getElementById(gateInfo.activeId).style.opacity = '0.5'
})
window.addEventListener('keypress', (e) => {
    if(e.key == ' '){  
        if(tools.cable) tools.cable = false, tools.gate = true
        else tools.cable = true, tools.gate = false
    
        let GATE = document.getElementById(gateInfo.activeId)

        if(cable){
            GATE.style.top = '110vh'
        }else{
            GATE.style.left = `${e.clientX + 10}px`
            GATE.style.top  = `${e.clientY + 10}px`
        }
        updateGateLocation()
    }
    if(cable.startLoc != null && e.key == 'q'){
        cable.startLoc = null
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawGrid()
        showConnections()
    }
    if(e.key == 'e'){
        if(gateInfo.activeInput == '1') gateInfo.activeInput = '&'
        else gateInfo.activeInput = '1'

        document.getElementById(`${gateInfo.activeId}text`).textContent = gateInfo.activeInput
    }
    
    ctx.clearRect(0,0,canvas.width,canvas.height)

    drawGrid()
    if(tools.gate){
        
        activeGate.style.top = `${e.clientY + 10}px`, activeGate.style.left = `${e.clientX + 10}px`
    }else{

        if(cable.startLoc != null){
            drawLine(cable.startLoc[0], cable.startLoc[1], e.clientX, e.clientY, 'rgba(255,255,255,0.6)')
        }
    }

    showConnections()
})
window.addEventListener('mousedown', (e) =>{
    let X, Y

    if(e.clientX % amount < amount/2) X = e.clientX - e.clientX % amount
    else X = e.clientX - e.clientX % amount + amount

    if(e.clientY % amount < amount/2) Y = e.clientY - e.clientY % amount
    else Y = e.clientY - e.clientY % amount + amount


    if(e.button === 0 && tools.gate){       
        if(gateInfo.freeSpace && mouseMoved && myTools){
            gateInfo.gateIds.push(gateInfo.activeId)

            gateInfo.allGates.push(`<div class="Gate" id="Gate${gateInfo.nextId}"><div class="gateBody"><div class="gateName" id="Gate${gateInfo.nextId}text">${activeGate.textContent}</div></div></div>`)

            container.innerHTML = `${gateInfo.allGates.join('')}${gateInfo.activeGate}`

            let GATE = document.getElementById(gateInfo.activeId)

            gateInfo.IdToLoc[gateInfo.activeId] = [X + amount/2.35, Y + amount/8]

            gateInfo.activeId = `Gate${gateInfo.nextId}`
            gateInfo.nextId++

            GATE = document.getElementById(gateInfo.activeId)

            activeGate = document.getElementById(gateInfo.activeId)
            GATE.style.opacity = '0.5'

            GATE.style.left = `${e.clientX + 10}px`
            GATE.style.top  = `${e.clientY + 10}px`
        
            mouseMoved = false
            updateGateLocation()
        }   
    }else if(e.button === 1 && cable.startLoc == null){
        for(let i of gateInfo.gateIds){
            let gateX = gateInfo.IdToLoc[i][0], gateY = gateInfo.IdToLoc[i][1]

            if(e.clientX > gateX && e.clientX < gateX + amount*4 && e.clientY > gateY && e.clientY < gateY + amount*6){
                
                let index = gateInfo.allGates.indexOf(`<div class="Gate" id="${i}"><div class="gateBody"><div class="gateName" id="${i}text">${document.getElementById(i).textContent}</div></div></div>`)

                gateInfo.allGates.splice(index, 1)
                gateInfo.gateIds.splice(gateInfo.gateIds.indexOf(i), 1)

                gateInfo.IdToLoc[i] = null
            }
            
        }
        
        container.innerHTML = `${gateInfo.allGates.join('')}${gateInfo.activeGate}`

        GATE = document.getElementById(gateInfo.activeId)
        activeGate = document.getElementById(gateInfo.activeId)

        GATE.style.opacity = '0.5'
        if(tools.gate){
            GATE.style.left = `${e.clientX + 10}px`
            GATE.style.top  = `${e.clientY + 10}px`
        }else{
            GATE.style.top = '110vh'
        }
        updateGateLocation()
    }
    ctx.clearRect(0,0,canvas.width,canvas.height)

    drawGrid()
    if(tools.gate){
        
        activeGate.style.top = `${e.clientY + 10}px`, activeGate.style.left = `${e.clientX + 10}px`
    }else{

        if(cable.startLoc != null){
            drawLine(cable.startLoc[0], cable.startLoc[1], e.clientX, e.clientY, 'rgba(255,255,255,0.6)')
        }
    }

    showConnections()
})