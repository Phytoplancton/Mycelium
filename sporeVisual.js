const SporeVisual = (()=>{
    const SV = {}


    SV.drawPlayerScore = ()=>{
        for (var i = 0; i < TheSettings.playerCount; i ++){
            scoreCtx.font = TheSettings.font
            scoreCtx.fillStyle = TheSettings.neutralColor
            // staticCtx.fillStyle = TheSettings.playerColors[i]
            var TextBlockheight = TheSettings.textZSpace*TheSettings.playerCount
            scoreCtx.fillText(
                `${TheSettings.playerNames[i]} player has ${SporeData.playerPointCount[i]} points`,
                window.innerWidth - 290,
                window.innerHeight - 15 - TextBlockheight + TheSettings.textZSpace*i)        
        }

    }
    SV.drawScoreDiff = ()=>{
        var scoreDiff = SporeData.calcScoreDiff()
        scoreCtx.font = TheSettings.font
        scoreCtx.fillStyle = TheSettings.playerColors[SporeData.calcLeadingPlayer()]
        if (scoreDiff === 0 ){scoreCtx.fillStyle = TheSettings.neutralColor}
        
        scoreCtx.fillText(
            `the point difference is: ${scoreDiff} points`,
            15,
            window.innerHeight - 15 - TheSettings.textZSpace)    
        
    }

    SV.drawAllSpores = function(){
        SporeData.loopOverAllSpores(function(spore){
                var shiftedX = BoardShiftX.changeCoords(spore.x)
                var shiftedY = BoardShiftY.changeCoords(spore.y)
                boardCtx.beginPath()
                boardCtx.lineWidth = 0
                boardCtx.fillStyle = TheSettings.playerColors[spore.player]
                boardCtx.arc(shiftedX,shiftedY,TheSettings.sporeRadius,0,Math.PI*2,false)

                boardCtx.fill()
            }
        )
    }
    SV.drawAllLines = function(){
        SporeData.loopOverAllSpores(function(spore1){
            var shiftedX = BoardShiftX.changeCoords(spore1.x)
            if(shiftedX<0 || shiftedX>window.innerWidth){return}
            var shiftedY = BoardShiftY.changeCoords(spore1.y)
            if(shiftedY<0 || shiftedY>window.innerHeight){return}
            SporeData.loopOverLinkedSpores(spore1,(spore1,spore2)=>{
                boardCtx.beginPath()
                SporeData.checkIfColorsAreEqual(spore1,spore2)
                boardCtx.lineWidth = TheSettings.lineWidth
                boardCtx.moveTo(shiftedX,shiftedY)
                boardCtx.lineTo(BoardShiftX.changeCoords(spore2.x),BoardShiftY.changeCoords(spore2.y))
                boardCtx.stroke()
            })
        })
    }
    SV.drawSporesInRange = ()=>{
        SporeData.loopOverAllSpores(function(spore1){
            var shiftedX = BoardShiftX.changeCoords(spore1.x)
            if(shiftedX<0 || shiftedX>window.innerWidth){return}
            var shiftedY = BoardShiftY.changeCoords(spore1.y)
            if(shiftedY<0 || shiftedY>window.innerHeight){return}
            var distToOtherSpore = SporeData.calcDistance(shiftedX,shiftedY,MousePosX,MousePosY)
            if (distToOtherSpore < TheSettings.outerRadius){

                boardCtx.beginPath()
                // boardCtx.strokeStyle = TheSettings.canvasColor
                boardCtx.strokeStyle = TheSettings.playerColors[spore1.player]
                boardCtx.lineWidth = TheSettings.markingWidth
                boardCtx.arc(shiftedX,shiftedY,TheSettings.sporeRadius,0,Math.PI*2,false)
                boardCtx.stroke()

                // console.log('draw spores in range')
            }

        })

    }
    

    return SV
})()