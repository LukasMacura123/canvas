window.addEventListener('mousemove', (e) => {
    if(toolBoxContent.activeInput != 'cable'){
        try{
            let activeElement = document.getElementById(gateId.activeId)

            activeElement.style.top = e.clientY, activeElement.style.left = e.clientX
        }catch(error){}
    }
}) 