window.addEventListener('mousedown', (e) => {
    for(let i of gateInfo.gateIds){
        let gateX = gateInfo.IdToLoc[i][0], gateY = gateInfo.IdToLoc[i][1]

        if(e.clientX > gateX && e.clientX < gateX + amount*4 && e.clientY > gateY && e.clientY < gateY + amount*6){
            
            if(cable.startLoc == null){
                
                cable.startLoc = [gateX, gateY]
                cable.activeGate = i
            }else{
                if(cable.activeGate != i){
                    if(cable.ConnectedGates[cable.activeGate] == null){

                        cable.ConnectedGates[cable.activeGate] = [i]
                    }else{

                        cable.ConnectedGates[cable.activeGate].push(i)
                    }
                    cable.startLoc = null
                }
            }
        }
    }
})