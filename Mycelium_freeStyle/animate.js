

function drawBoardCanvas(){
    boardCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
    SporeVisual.drawAllLines()
    SporeVisual.drawAllSpores()
    SporeVisual.drawSporesInRange()
}

function drawScoreCanvas(){
    scoreCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
    SporeVisual.drawPlayerScore()
    SporeVisual.drawScoreDiff()
}

function drawStaticCanvases(){
    drawBoardCanvas()
    drawScoreCanvas()
}

function resize(){
    var setWidthAndHeight = (AllCanvases)=>{
        AllCanvases.forEach(canvas => {
            canvas.width = window.innerWidth - 20
            canvas.height = window.innerHeight - 20
        });
    }
    setWidthAndHeight([boardCanvas,donutCanvas,scoreCanvas])

    drawStaticCanvases()
    TheSettings.setBoardDimensions()

    console.log('canvas is resized!')

}

function placeNewSpore() {
    SporeData.addNewSpore(MousePosX,MousePosY)
    SporeData.removeDeadSpores()
    SporeData.calculatePlayerPointCount()
    drawStaticCanvases()
    SporeData.checkWinner()

    // console.log('clickEvent')
    
}

function animateDonutAndSporeCanvas(){
    donutCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
    drawMouseDonut()
    drawBoardCanvas()
    
    requestAnimationFrame(animateDonutAndSporeCanvas)
}



(initalizeListeners = ()=>{
    resize()
    window.addEventListener('resize',resize) 
    animateDonutAndSporeCanvas()
    document.addEventListener('keydown',(event)=>{
        console.log('keydown - ' + event.code)
        if (event.code == TheSettings.newSporeKey){
            placeNewSpore()
        }
        if (event.key === TheSettings.undeLastActionKey){
            console.log('undoLastAction')
            SporeData.undoLastAction()
        }
    })
    console.log('animate is running!')
})()

