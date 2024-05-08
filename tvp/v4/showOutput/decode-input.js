var GATES = {
    IDs: ['gate0','gate1','gate2'],
    type: {'gate0': '1', 'gate1': '&', 'gate2': '1'},
    values: {'inputA': 1, 'inputB': 0}, // change ur input values here

    inputs: {},
}
var INPUTS = {
    IDs: ['inputA', 'inputB'],
    toGate: {'inputA': ['gate0', 'gate1'], 'inputB': ['gate0', 'gate1']},
}
var CABLE = {
    connectedGates: {'gate2': ['gate0', 'gate1'], 'gate1': [null, null], 'gate0': [null, null]}
}

function ANDgate(gateInput){
    return (gateInput.includes(0)) ? 0 : 1
}
function ORgate(gateInput){
    return (gateInput.includes(1)) ? 1 : 0
}
function NOT(gateOutput){
    return gateOutput == 1 ? 0 : 1
}
function findAnswer(){
   
    for(let input of INPUTS.IDs){
        
        let value = GATES.values[input]
        if(INPUTS.toGate[input] != null){

            for(let gate of INPUTS.toGate[input]){

                if(GATES.inputs[gate] == null) GATES.inputs[gate] = []

                GATES.inputs[gate].push(value)
            }
        }
    }

    for(let id of GATES.IDs){
        
        if(GATES.inputs[id] != null){
            
            if(GATES.inputs[id].length == CABLE.connectedGates[id].length){

                if(GATES.type[id].includes('&')){

                    GATES.values[id] = ANDgate(GATES.inputs[id])
                }else if(GATES.type[id].includes('1')){

                    GATES.values[id] = ORgate(GATES.inputs[id])
                }
                if(GATES.type[id].includes('N')){
                    GATES.values[id] = NOT(GATES.values[id])
                }
            }
            for(let i of GATES.IDs){
                
                for(let j of CABLE.connectedGates[i]){

                    if(j == id){
                        if(GATES.inputs[i] == null) GATES.inputs[i] = []

                        GATES.inputs[i].push(GATES.values[id])
                    }
                }
            }
        }
    }
    console.log(GATES.values)

}
findAnswer()