var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var inContainer = document.getElementById('inputContainer')

var TOOLBOX = {
    nextIn: 1,
    nextOut: alphabet.length-2,
    lines: ['<div id="inputA" class="inputBody"></div>','<div id="outputZ" class="inputBody"></div>'],
    idToName: {'inputA':'A', 'outputZ': 'Z'}
}
function updateLines(){
    for(let id of INPUTS.IDs){
        document.getElementById(id).textContent = TOOLBOX.idToName[id]
    }
    for(let id of OUTPUTS.IDs){
        document.getElementById(id).textContent = TOOLBOX.idToName[id]
    }
    updateInputLoc()
    updateOutputLoc()
}
function addInput(){
    
    let inChar = alphabet[TOOLBOX.nextIn]

    let input = `<div id="input${inChar}" class="inputBody"></div>`

    TOOLBOX.lines.push(input)
    TOOLBOX.idToName[`input${inChar}`] = inChar
    INPUTS.IDs.push(`input${inChar}`)

    inContainer.innerHTML = TOOLBOX.lines.join('')

    TOOLBOX.nextIn++

    updateLines()
}
function addOutput(){

    let outChar = alphabet[TOOLBOX.nextOut]

    let output = `<div id="output${outChar}" class="inputBody"></div>`
    
    TOOLBOX.lines.push(output)
    TOOLBOX.idToName[`output${outChar}`] = outChar
    OUTPUTS.IDs.push(`output${outChar}`)

    inContainer.innerHTML = TOOLBOX.lines.join('')

    TOOLBOX.nextOut--

    updateLines()
}
function removeInput(){
    
    if(TOOLBOX.nextIn > 1){
        let ID = INPUTS.IDs[INPUTS.IDs.length-1]

        INPUTS.IDs.splice(INPUTS.IDs.indexOf(ID), 1)
        INPUTS.toGate[ID] = null
        TOOLBOX.lines.splice(TOOLBOX.lines.indexOf(`<div id="${ID}" class="inputBody"></div>`))

        inContainer.innerHTML = TOOLBOX.lines.join('')

        TOOLBOX.nextIn--

        updateLines()
    }
}
function removeOutput(){

    if(TOOLBOX.nextOut < alphabet.length-2){
        
        let ID = OUTPUTS.IDs[OUTPUTS.IDs.length-1]

        OUTPUTS.IDs.splice(OUTPUTS.IDs.indexOf(ID), 1)
        OUTPUTS.toGate[ID] = null
        TOOLBOX.lines.splice(TOOLBOX.lines.indexOf(`<div id="${ID}" class="inputBody"></div>`))

        inContainer.innerHTML = TOOLBOX.lines.join('')

        TOOLBOX.nextOut++

        updateLines()
    }
    console.log(TOOLBOX.nextOut, alphabet.length)
}
function showInputTable(){
    
    let buttonT = document.getElementById('tableButton')

    switch(buttonT.textContent){
        case '+table':
            buttonT.textContent = '-table'
            document.getElementById('inputTable').style.opacity = '1'
            break
        case '-table':
            buttonT.textContent = '+table'
            document.getElementById('inputTable').style.opacity = '0'
    }
}