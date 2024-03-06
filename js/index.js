let start = document.getElementById('startButton')
let desk = document.getElementById('desk')
let matrixDesk

let row
let colum
let type
let nextRow
let nextColumLeft
let nextColumRight

let enemySquare
let countEnemyEat = 0
let canEatAtributte = false

let player = 'white'
let contentPlayer = document.getElementById('container')


start.onclick = function (){
    start.classList.add('hide')
    desk.classList.remove('hide')
    generateDesk()
}

/*
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0]
*/

function generateDesk() {
    matrixDesk = [[0,0,0,0,0,0,0,0],
    [0,0,0,2,0,2,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,2,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,2,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0]]
    for(let i=0;i<8;i++){
        for(let j=0; j<8;j++){
            let square = document.createElement('div')
            square.setAttribute('class','square')
            square.setAttribute('type', matrixDesk[i][j])
            square.setAttribute('colum',j)
            square.setAttribute('row',i )
            square.setAttribute('caneat', false)
            square.setAttribute('queenmove', false)
            desk.appendChild(square)

            square.onclick = function(){
                let typeSquare = square.getAttribute('type')
                switch(player){
                    case 'white':
                        switch(typeSquare){
                            case '1'://MOSTRAR EL CAMINO
                                if(desk.getAttribute('eat') == 'false'){
    /* Si esta en la accion de comer oponentes, no se le permite
    *  jugar con otras fichas
    */
                                    removeNextMovePath()
                                    whiteNextMovePath(square)
                                    rePaintDesk()
                                }
                                break
                            case '0.1'://
                                move(square, row, colum)
                                if(square.getAttribute('caneat') == 'true'){
                                    desk.setAttribute('eat', true)
    /* Con el atributo eat decimos que la ficha a comido 
    *  a un oponente por lo que entra en una accion de comer oponentes
    *  para asi pueda comer a varias fichas oponentes a la vez 
    */                              if(square.getAttribute('queenmove') == 'false'){
                                        eatEnemySquareQueen(square,row,colum)
                                        removeNextMovePath()
                                        checkWhiteCanEat(square)
                                    }else{
                                        removeNextMovePath()
                                        rePaintDesk()
                                        eatEnemySquareQueen(square,row,colum)
                                        checkQueenCanEat(square, 1)
                                    }
                                }else{removeNextMovePath()}

                                checkWhiteTransformQueen(square)
                                rePaintDesk()
                                changePlayer()
                                break
                            case '3.1':
                                if(desk.getAttribute('eat') == 'false'){
                                    removeNextMovePath()
                                    queenNextMovePath(square,1)
                                    rePaintDesk();
                                }
                                
                                break
                        }
                        break
                    case 'black':
                        switch(typeSquare){
                            case '2':
                                if(desk.getAttribute('eat') == 'false'){
                                    removeNextMovePath()
                                    blackNextMovePath(square)
                                    rePaintDesk()
                                }
                                break
                            case '0.2':
                                move(square, row, colum)
                                if(square.getAttribute('caneat') == 'true'){
                                    desk.setAttribute('eat', true)
                                    if(square.getAttribute('queenmove') == 'false'){
                                        eatEnemySquare(square,row,colum)
                                        removeNextMovePath()
                                        checkBlackCanEat(square)
                                    }else{
                                        removeNextMovePath()
                                        rePaintDesk()
                                        eatEnemySquareQueen(square,row,colum)
                                        checkQueenCanEat(square, 2)
                                    }
                                    
                                }else{removeNextMovePath()}

                                checkBlackTransformQueen(square)
                                rePaintDesk()
                                changePlayer()
                                break
                            case '3.2':
                                if(desk.getAttribute('eat') == 'false'){
                                    removeNextMovePath()
                                    queenNextMovePath(square,2)
                                    rePaintDesk();
                                }
                                break
                        }
                        break

                }
            }
        }
    }
    
}
let squareList = document.getElementsByClassName('square')


function whiteNextMovePath(square){
    /*Coge las posiciones de la ficha para siguientes funciones*/
    row = parseInt(square.getAttribute('row'))
    colum = parseInt(square.getAttribute('colum'))
    /*Calcula las posiciones siguientes a las que puede ir la ficha*/
    nextRow = row - 1
    nextColumLeft = colum - 1
    nextColumRight = colum - 0 + 1
     
    if(nextColumLeft>=0){/*Comprueba que no se salga del tablero*/
        switch(matrixDesk[nextRow][nextColumLeft]){
            case 0:
                if(desk.getAttribute('eat') == 'false'){
                    /* Si detecta la actividad de comer imposibilita que
                    *  las siguiente posicion este vacia para asi obligar a 
                    *  comer al oponente cercano
                    */
                    matrixDesk[nextRow][nextColumLeft] = 0.1
                }
                break
            case 2:
            case 3.2:
                if(nextRow-1 < 0){return}
                if(matrixDesk[nextRow-1][nextColumLeft-1] == 0){
                    matrixDesk[nextRow-1][nextColumLeft-1] = 0.1
                    let nextSquare = getSquare(nextRow-1, nextColumLeft-1)
                    nextSquare.setAttribute('caneat',true) 
                    /* Con este atributo decimos que la ficha puede comer 
                    *  a un oponente 
                    */
                }
                break 
        }
    }/* Realiza la accion de mostrar el camino en ambos sentido */
    if(nextColumRight<8){
        switch(matrixDesk[nextRow][nextColumRight]){
            case 0:
                if(desk.getAttribute('eat') == 'false'){
                    matrixDesk[nextRow][nextColumRight] = 0.1
                }
                break
            case 2:
            case 3.2:
                if(nextRow-1 < 0){return}
                if(matrixDesk[nextRow-1][nextColumRight+1] == 0){
                    matrixDesk[nextRow-1][nextColumRight+1] = 0.1
                    let nextSquare = getSquare(nextRow-1, nextColumRight+1)
                    nextSquare.setAttribute('caneat',true)
                }
                break 
        }
    }
}
function blackNextMovePath(square){
    row = parseInt(square.getAttribute('row'))
    colum = parseInt(square.getAttribute('colum'))
    nextRow = row - 0 + 1
    nextColumLeft = colum - 1
    nextColumRight = colum - 0 + 1
     
    if(nextColumLeft>=0){
        switch(matrixDesk[nextRow][nextColumLeft]){
            case 0:
                if(desk.getAttribute('eat') == 'false'){
                    matrixDesk[nextRow][nextColumLeft] = 0.2
                }
                break
            case 1:
            case 3.1:
                if(nextRow-1 < 0){return}
                if(matrixDesk[nextRow+1][nextColumLeft-1] == 0){
                    matrixDesk[nextRow+1][nextColumLeft-1] = 0.2
                    let nextSquare = getSquare(nextRow+1, nextColumLeft-1)
                    nextSquare.setAttribute('caneat',true)
                }
                break 
        }
    }
    if(nextColumRight<8){
        switch(matrixDesk[nextRow][nextColumRight]){
            case 0:
                if(desk.getAttribute('eat') == 'false'){
                    matrixDesk[nextRow][nextColumRight] = 0.2
                }
                break
            case 1:
            case 3.1:
                if(nextRow-1 < 0){return}
                if(matrixDesk[nextRow+1][nextColumRight+1] == 0){
                    matrixDesk[nextRow+1][nextColumRight+1] = 0.2
                    let nextSquare = getSquare(nextRow+1, nextColumRight+1)
                    nextSquare.setAttribute('caneat',true)
                }
                break
        }
    }
}


function checkWhiteCanEat(square){
    //COGE LAS COORDENADAS DE LA SIGUIENTE POSICION
    let nextRow = square.getAttribute('row') - 1
    let nextColumRight = square.getAttribute('colum') - 0 + 1
    let nextColumLeft = square.getAttribute('colum') - 1
    //COGE LAS COORDENADAS DE LA SIGUIENTE POSICION
    let nnextRow = square.getAttribute('row') - 2
    let nnextColumRight = square.getAttribute('colum') - 0 + 2
    let nnextColumLeft = square.getAttribute('colum') - 2

    //COMPRUEBA CASUISTICAS QUE POSIBILITEN EL COMER LA FICHA
    if(desk.getAttribute('eat') == 'true' && 
        ((nnextRow >= 0 && nnextColumRight < 8) || (nnextRow >= 0 && nnextColumLeft >= 0))){
        
        //COMPRUEBA QUE HAY POSIBILIDAD DE QUE LA FICHA SE LO PUEDA COMER
        if(((matrixDesk[nextRow][nextColumRight] == 2|| 
            matrixDesk[nextRow][nextColumRight] == 3.2) && 
            matrixDesk[nnextRow][nnextColumRight] == 0)
         || ((matrixDesk[nextRow][nextColumLeft] == 2 || 
            matrixDesk[nextRow][nextColumLeft] == 3.2) && 
            matrixDesk[nnextRow][nnextColumLeft] == 0)){
            desk.setAttribute('eat',true)
        }else{
            desk.setAttribute('eat',false)  
        }
    }else {
        desk.setAttribute('eat',false)
    }
    
    //SI SE PUEDE COMER, SIGUE MOVIENDO EL BLANCO
    if(desk.getAttribute('eat') == 'true'){
        changePlayer()
        whiteNextMovePath(square)
    }   
}
function checkBlackCanEat(square){
    let nextRow = square.getAttribute('row') -0 + 1
    let nextColumRight = square.getAttribute('colum') - 0 + 1
    let nextColumLeft = square.getAttribute('colum') - 1

    let nnextRow = square.getAttribute('row')-0 + 2
    let nnextColumRight = square.getAttribute('colum') - 0 + 2
    let nnextColumLeft = square.getAttribute('colum') - 2
    if(desk.getAttribute('eat') == 'true' &&  
        ((nnextRow < 8 && nnextColumRight < 8) || (nnextRow < 8 && nnextColumLeft >= 0))){
            
            if(((matrixDesk[nextRow][nextColumRight] == 1 ||
                matrixDesk[nextRow][nextColumRight] == 3.1) && 
                matrixDesk[nnextRow][nnextColumRight] == 0)
            || ((matrixDesk[nextRow][nextColumLeft] == 1 ||
                matrixDesk[nextRow][nextColumLeft] == 3.1) && 
                matrixDesk[nnextRow][nnextColumLeft] == 0)){
            desk.setAttribute('eat',true)
        }else{
            desk.setAttribute('eat',false)  
        }
    }else {
        desk.setAttribute('eat',false)
    }
    
    if(desk.getAttribute('eat') == 'true'){
        changePlayer()
        blackNextMovePath(square)
    }   
}


function checkWhiteTransformQueen(square){
    let row = square.getAttribute('row')
    let colum = square.getAttribute('colum')
    if(row == 0){
        matrixDesk[row][colum] = 3.1
    }
}
function checkBlackTransformQueen(square){
    let row = square.getAttribute('row')
    let colum = square.getAttribute('colum')
    if(row == 7){
        matrixDesk[row][colum] = 3.2
    }
}


function queenNextMovePath(square, type){
    canEatAtributte = false
    row = parseInt(square.getAttribute('row'))
    colum = parseInt(square.getAttribute('colum'))
    let topRow = row - 1
    let bottomRow = row - 0 + 1
    let columRight = colum - 0 + 1
    let columLeft = colum - 1
    if(desk.getAttribute('eat') == 'false'){
        queenTopRowRightPath(topRow, columRight, type)
        queenTopRowLeftPath(topRow,columLeft,type)
        queenBottomRowRightPath(bottomRow, columRight, type)
        queenBottomRowLeftPath(bottomRow, columLeft, type)
    }
    
}

//FUNCIONES RECURSIVAS PARA EL CAMINO DE LA REINA
function queenTopRowRightPath(topRow, columRight, type){
    if(topRow >= 0 && columRight < 8 && countEnemyEat < 2){  

        if(matrixDesk[topRow][columRight] == 0){
            matrixDesk[topRow][columRight] = parseFloat('0.'+ type) 
            getSquare(topRow,columRight).setAttribute('caneat', canEatAtributte)
            getSquare(topRow,columRight).setAttribute('queenmove', true) 
        
        }else if(matrixDesk[topRow][columRight] != type || 
            matrixDesk[topRow][columRight] != '3.'+type){
                enemySquare = getSquare(topRow,columRight)
                canEatAtributte = true
                countEnemyEat++
        }
        queenTopRowRightPath(topRow - 1, columRight + 1,type)
    }
    countEnemyEat = 0
    canEatAtributte = false
}
function queenTopRowLeftPath(topRow, columLeft, type){
    
    if(topRow >= 0 && columLeft >= 0 && countEnemyEat < 2){
        if(matrixDesk[topRow][columLeft] == 0){
            matrixDesk[topRow][columLeft] = parseFloat('0.'+ type)   
            getSquare(topRow,columLeft).setAttribute('caneat', canEatAtributte)
            getSquare(topRow,columLeft).setAttribute('queenmove', true)
        }else if(matrixDesk[topRow][columLeft] != type ||
            matrixDesk[topRow][columLeft] != '3.'+type){
                enemySquare = getSquare(topRow,columLeft)
                canEatAtributte = true
                countEnemyEat++
            }
        queenTopRowLeftPath(topRow - 1, columLeft - 1,type)
    }
    countEnemyEat = 0
    canEatAtributte = false
}
function queenBottomRowRightPath(bottomRow, columRight, type){
    if(bottomRow < 8 && columRight < 8 && countEnemyEat < 2){
        if(matrixDesk[bottomRow][columRight] == 0){
            matrixDesk[bottomRow][columRight] = parseFloat('0.'+ type)  
            getSquare(bottomRow,columRight).setAttribute('caneat', canEatAtributte)
            getSquare(bottomRow,columRight).setAttribute('queenmove', true) 
        }else if(matrixDesk[bottomRow][columRight] != type ||
            matrixDesk[bottomRow][columRight] != '3.'+type){
                enemySquare = getSquare(bottomRow,columRight)
                canEatAtributte = true
                countEnemyEat++
            }
        queenBottomRowRightPath(bottomRow + 1, columRight + 1,type)
    }
    countEnemyEat = 0
    canEatAtributte = false
}
function queenBottomRowLeftPath(bottomRow, columLeft, type){
    if(bottomRow < 8 && columLeft >= 0 && countEnemyEat < 2){
        if(matrixDesk[bottomRow][columLeft] == 0){
            matrixDesk[bottomRow][columLeft] = parseFloat('0.'+ type)  
            getSquare(bottomRow,columLeft).setAttribute('caneat', canEatAtributte)
            getSquare(bottomRow,columLeft).setAttribute('queenmove', true) 
        }else if(matrixDesk[bottomRow][columLeft] != type ||
            matrixDesk[bottomRow][columLeft] != '3.' +type){
                enemySquare = getSquare(bottomRow,columLeft)
                canEatAtributte = true
                countEnemyEat++
            }
        queenBottomRowLeftPath(bottomRow + 1, columLeft - 1,type)
    }
    countEnemyEat = 0
    canEatAtributte = false
}

//FUNCION PARA COMPROBAR QUE LA REINA PUEDE SEGUIR COMIENDO
function checkQueenCanEat(square, type) {
    row = parseInt(square.getAttribute('row'))
    colum = parseInt(square.getAttribute('colum'))
    let topRow = row - 1
    let bottomRow = row - 0 + 1
    let columRight = colum - 0 + 1
    let columLeft = colum - 1

    topRowRightState = queenCanEatTopRowRightPath(topRow, columRight, type)
    topRowLeftState = queenCanEatTopRowLeftPath(topRow, columLeft, type)
    topBottomRightState = queenCanEatBottomRowRightPath(bottomRow, columRight, type)
    topBottomLeftState = queenCanEatBottomRowLeftPath(bottomRow,columLeft, type)

    if(topRowRightState || topRowLeftState || topBottomRightState || topBottomLeftState){
        changePlayer()
        desk.setAttribute('eat',true)
    }else{
        desk.setAttribute('eat',false)
    }
}

function queenCanEatTopRowRightPath(topRow, columRight, type){
    let canEatState = false
    if(topRow-1 >= 0 && columRight+1 < 8){
        if(matrixDesk[topRow][columRight] == 0){
            canEatState = queenCanEatTopRowRightPath(topRow-1, columRight+1, type)
        }else if(!(matrixDesk[topRow][columRight] == type)
                    || !(matrixDesk[topRow][columRight] == '3.'+type)){

            if(matrixDesk[topRow-1][columRight+1] == 0){
                matrixDesk[topRow-1][columRight+1] = parseFloat('0.'+type)
                getSquare(topRow-1, columRight+1).setAttribute('queenmove', true)
                getSquare(topRow-1, columRight+1).setAttribute('caneat', true)
                canEatState = true
            }
        }
    }
    return canEatState
}
function queenCanEatTopRowLeftPath(topRow, columLeft, type){
    let canEatState = false
    if(topRow-1 >= 0 && columLeft-1 >= 0){
        if(matrixDesk[topRow][columLeft] == 0){
            canEatState = queenCanEatTopRowLeftPath(topRow-1, columLeft-1, type)
        }else if(!(matrixDesk[topRow][columLeft] == type)
                    || !(matrixDesk[topRow][columLeft] == '3.'+type)){

            if(matrixDesk[topRow-1][columLeft-1] == 0){
                matrixDesk[topRow-1][columLeft-1] = parseFloat('0.'+type)
                getSquare(topRow-1, columLeft-1).setAttribute('queenmove', true)
                getSquare(topRow-1, columLeft-1).setAttribute('caneat', true)
                canEatState = true
            }
        }
    }
    return canEatState
}
function queenCanEatBottomRowRightPath(bottomRow, columRight, type){
    let canEatState = false
    if(bottomRow+1 < 8 && columRight+1 < 8){
        if(matrixDesk[bottomRow][columRight] == 0){
            canEatState = queenCanEatBottomRowRightPath(bottomRow+1, columRight+1, type)
        }else if(!(matrixDesk[bottomRow][columRight] == type)
                    || !(matrixDesk[bottomRow][columRight] == '3.'+type)){

            if(matrixDesk[bottomRow+1][columRight+1] == 0){
                matrixDesk[bottomRow+1][columRight+1] = parseFloat('0.'+type)
                getSquare(bottomRow+1, columRight+1).setAttribute('queenmove', true)
                getSquare(bottomRow+1, columRight+1).setAttribute('caneat', true)
                canEatState = true
            }
        }
    }
    return canEatState
}
function queenCanEatBottomRowLeftPath(bottomRow, columLeft, type){
    let canEatState = false
    if(bottomRow+1 < 8 && columLeft-1 >= 0){
        if(matrixDesk[bottomRow][columLeft] == 0){
            canEatState = queenCanEatBottomRowLeftPath(bottomRow+1, columLeft-1, type)
        }else if(!(matrixDesk[bottomRow][columLeft] == type)
                    || !(matrixDesk[bottomRow][columLeft] == '3.'+type)){

            if(matrixDesk[bottomRow+1][columLeft-1] == 0){
                matrixDesk[bottomRow+1][columLeft-1] = parseFloat('0.'+type)
                getSquare(bottomRow+1, columLeft-1).setAttribute('queenmove', true)
                getSquare(bottomRow+1, columLeft-1).setAttribute('caneat', true)
                canEatState = true
            }
        }
    }
    return canEatState
}





//FUNCION PARA MOVER LA FICHA
function move(square, row, colum){
    let rowMove = square.getAttribute('row')
    let columMove = square.getAttribute('colum')
    let moveQueen = square.getAttribute('queenmove')
    switch(player){
        case 'white':
            if(moveQueen == 'true'){matrixDesk[rowMove][columMove] = 3.1}
            else{matrixDesk[rowMove][columMove] = 1}
            break
        case 'black':
            if(moveQueen == 'true'){matrixDesk[rowMove][columMove] = 3.2}
            else{matrixDesk[rowMove][columMove] = 2}
            break    
    }
    matrixDesk[row][colum] = 0
}

//FUNCION PARA COMER AL ENEMIGO
function eatEnemySquare(square, row, colum){
    /*Posiciones actuales de la ficha*/
    let movRow = square.getAttribute('row')
    let movColum = square.getAttribute('colum')
    let enemyRow; let enemyColum
    /* Sacamos las coordenadas de la ficha enemiga mediante la
    *  posicion de la ficha antes y despues restando las filas y las
    *  columnas y sabiendo si sale positivo o negativo 
    */
    if(row - movRow > 0){
        /*Si el resultado es positivo la ficha enemiga estaba una fila 
          anterior a la fila de la ficha, es decir, estaba arriba*/
        enemyRow = row - 1
    }else{
        enemyRow = row - 0 + 1
    }

    if(colum - movColum > 0){
        /*Si el resultado es positivo la ficha enemiga estaba una columna
          antes a la columna de la ficha, es decir, estaba a la izquierda*/
        enemyColum = colum - 1
    }else{
        enemyColum = colum - 0 + 1
    }
    matrixDesk[enemyRow][enemyColum] = 0
}

//FUNCION PARA COMER AL ENEMIGO SIENDO REINA
function eatEnemySquareQueen(square, aRow, aColum){
    let movRow = parseInt(square.getAttribute('row'))
    let movColum = parseInt(square.getAttribute('colum'))
    let enemyRowIt; let enemyColumIt

    if(aRow - movRow > 0){
        enemyRowIt = -1
    }else{
        enemyRowIt = 1
    }

    if(aColum - movColum > 0){
        enemyColumIt = -1
    }else{
        enemyColumIt = 1
    }

    let enemySq = getEnemySquare(aRow, aColum, enemyRowIt, enemyColumIt)
    matrixDesk[enemySq.getAttribute('row')][enemySq.getAttribute('colum')] = 0

}
function getEnemySquare(row, colum, enemyRowIt, enemyColumIt){
    row = row + enemyRowIt
    colum = colum + enemyColumIt
    let sq = getSquare(row, colum)
    console.log(sq.getAttribute('type'))
    if(sq.getAttribute('type') == '0'){
        sq = getEnemySquare(row, colum, enemyRowIt, enemyColumIt)
    }
    return sq
}

//FUNCION QUE DEVUELVE LA FICHA CON LAS COORDENADAS
function getSquare(row, colum){
    let selectSquare
    for(let i = 0; i < squareList.length; i++){
        if(squareList[i].getAttribute('row') == row && squareList[i].getAttribute('colum') == colum){
            selectSquare = squareList[i]
        }
    }
    return selectSquare
}

//FUNCION DE CAMBIAR JUGADOR TRAS MOVER FICHA
function changePlayer(){
    setTimeout(function(){
        if(player == 'white'){
            player = 'black'
            contentPlayer.setAttribute('player', 'black')
        }else {
            player = 'white'
            contentPlayer.setAttribute('player','white')
        }
    }, 200)   
}

//FUNCION DE ELIMINAR EL PATH QUE MUESTRAN LAS FICHAS
function removeNextMovePath(){
    let n = 0;
    for(let i=0;i<8;i++){
        for(let j=0; j<8;j++){
            let valueSquare = matrixDesk[i][j]
            if(valueSquare == 0.1 || valueSquare == 0.2){
                matrixDesk[i][j] = 0
            }
            squareList[n].setAttribute('caneat', false)
            squareList[n].setAttribute('queenmove', false)
            n++
        }
    }
}//TODO: Quitar el rePaint??

//FUNCION DE REPINTAR EL TABLERO
function rePaintDesk(){
    console.log(matrixDesk)
    let squareIndex = 0
    for(let i=0;i<8;i++){
        for(let j=0; j<8;j++){
           squareList[squareIndex].setAttribute('type', matrixDesk[i][j])
           squareIndex++
        }
    }
}