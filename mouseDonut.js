function drawMouseDonut(){
    donutCtx.beginPath()
    donutCtx.strokeStyle = TheSettings.playerColors[TheSettings.currentPlayer]
    donutCtx.lineWidth = TheSettings.outerRadius - TheSettings.innerRadius
    // console.log(TheSettings.playerColors[TheSettings.currentPlayer])
    donutCtx.arc(
        MousePosX, MousePosY,
        TheSettings.innerRadius + (TheSettings.outerRadius-TheSettings.innerRadius)/2 - TheSettings.sporeRadius,
        0,Math.PI*2,false
    )
    donutCtx.stroke()

}

