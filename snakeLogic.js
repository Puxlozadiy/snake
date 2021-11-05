window.onload = function() {
    let canv = document.getElementById("canv")
    canv.width = document.body.clientWidth - 10
    canv.height = document.body.clientHeight - 10
    ctx = canv.getContext("2d")
    speed = 2
    xp = yp = 100
    let velosity = 3
    snakePositions = [80, 100, 3, 100, 100, 3, 120, 100, 3, 140, 100, 3, 160, 100, 3, 180, 100, 3, 200, 100, 3, 220, 100, 3, 240, 100, 3, 260, 100, 3]
    applePosition = []
    partSize = 20
    xspace = 5
    yspace = 0
    pauseStatus = 0
    counter = 0
    appleYpos = 0
    appleXpos = 0
    addSnake = false
    document.addEventListener("keydown", key)
    pauseButton = document.getElementById("canv-button1")
    playButton = document.getElementById("canv-button2")
    pauseButton.addEventListener("click", function(){
        pauseStatus = 1; return;
    })
    playButton.addEventListener("click", function() {
        pauseStatus = 0; return;
    })


    function key(evt){
        switch (evt.keyCode){
            case 37:
                if (velosity != 3 && counter >= 20){
                    velosity = 1 
                }
                break
            case 38:
                if (velosity != 4 && counter >= 20){
                    velosity = 2
                }
                break
            case 39:
                if (velosity != 1 && counter >= 20){
                    velosity = 3 
                }
                break
            case 40:
                if (velosity != 2 && counter >= 20){
                    velosity = 4
                }
                break
            case 191:
        }}
    
    setInterval(() => {
        if (pauseStatus == 1){
            return
        }
        ctx.clearRect(0, 0, canv.width, canv.height)
        
        for(var i = 0; i < snakePositions.length; i++) {
            ctx.fillStyle = "red"
            
            local_velosity = snakePositions[i+2]
            if (local_velosity === 1){snakePositions[i] -= speed}
            else if (local_velosity === 2){snakePositions[i+1] -= speed}
            else if (local_velosity === 3){snakePositions[i] += speed}
            else if (local_velosity === 4){snakePositions[i+1] += speed}
            ctx.fillRect(snakePositions[i], snakePositions[i+1], partSize, partSize)
            if (i <= snakePositions.length - 5){
                if (snakePositions[i+5] === 4 && snakePositions[i] == snakePositions[i+3]){snakePositions[(i+2)] = 4}
                else if (snakePositions[i+5] === 3 && snakePositions[i+1] === snakePositions[i+4]){snakePositions[i+2] = snakePositions[i+5]}
                else if (snakePositions[i+5] === 2 && snakePositions[i] === snakePositions[i+3]){snakePositions[i+2] = snakePositions[i+5]}
                else if (snakePositions[i+5] === 1 && snakePositions[i+1] === snakePositions[i+4]){snakePositions[i+2] = snakePositions[i+5]}
            }
            if (snakePositions[i] < 0) {snakePositions[i] = canv.width}
            if (snakePositions[i] >= canv.width + partSize) {snakePositions[i] = 0}
            if (snakePositions[i+1] < 0 - partSize) {snakePositions[i+1] = canv.height}
            if (snakePositions[i+1] > canv.height) snakePositions[i+1] = -partSize
            if (snakePositions[i] >= appleXpos && snakePositions[i] <= (appleXpos + partSize) && snakePositions[i+1] >= appleYpos && snakePositions[i+1] <= (appleYpos + partSize)){
                newApple();
                addSnake = true
            }
            else if ((snakePositions[i] + partSize) >= appleXpos && (snakePositions[i] + partSize) <= (appleXpos + partSize) && (snakePositions[i+1] + partSize) >= appleYpos && (snakePositions[i+1] + partSize) <= (appleYpos + partSize)){
                newApple();
                addSnake = true
            }
            i+=2
        }
        if (velosity != snakePositions[snakePositions.length - 1]){
            snakePositions[snakePositions.length - 1] = velosity
            counter = 0
        }
        if (addSnake == true){
            addPart();
            addSnake = false
        }
        counter++
        ctx.fillRect(appleXpos, appleYpos, partSize, partSize)
    }, 10);

    function newApple() {
        appleXpos = Math.floor(Math.random() * (canv.width - partSize))
        appleYpos = Math.floor(Math.random() * (canv.height - partSize))

    }
    newApple();

    function addPart(){
        if (snakePositions[2] == 1){
            snakePositions.unshift((snakePositions[0] + partSize), snakePositions[1], snakePositions[2])
        }
        else if (snakePositions[2] == 2){
            snakePositions.unshift(snakePositions[0], (snakePositions[1] + partSize), snakePositions[2])
        }
        else if (snakePositions[2] == 3){
            snakePositions.unshift((snakePositions[0] - partSize), snakePositions[1], snakePositions[2])
        }
        else if (snakePositions[2] == 4){
            snakePositions.unshift(snakePositions[0], (snakePositions[1] - partSize), snakePositions[2])
        }
        console.log(snakePositions)
    }
}
