

//Funcion para obtener el tipo de Jugador al que pertenece la ficha.
function getColorSquare(square){
    console.log(square)
    let colorSquare
    if(square.getAttribute('type').includes('1')){
        colorSquare = 1
    }else if(square.getAttribute('type').includes('2')){
        colorSquare = 2
    }else {
        colorSquare = 0
    }
    return colorSquare
}

//Funcion que devuelve el tipo que es la ficha (0.1,.0.2,1,2,3.1,3.2)
function getTypeSquare(square){
    return parseFloat(square.getAttribute('type'))
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

//Funcion para obtener la ficha enemiga que va a ser comida
function getEnemySquare(row, colum, enemyRowIt, enemyColumIt){
    row = row + enemyRowIt
    colum = colum + enemyColumIt
    let sq = getSquare(row, colum)
    if(sq.getAttribute('type') < 1){
        sq = getEnemySquare(row, colum, enemyRowIt, enemyColumIt)
    }
    return sq
}

//Funcion para mover la ficha
function move(square, row, colum){
    let nextMoveRow = parseInt(square.getAttribute('row'))
    let nextMoveColum = parseInt(square.getAttribute('colum'))
    let isQueenMove = square.getAttribute('queenmove')
    let player = getColorSquare(square) //Entra la ficha y devuelve 1 o 2

    matrixDesk[nextMoveRow][nextMoveColum] = isQueenMove == 'false' ? player : parseFloat('3.' + player)    
    matrixDesk[row][colum] = 0
    row = nextMoveRow
    colum = nextMoveColum
}


//Funcion para eliminar a la ficha enemiga que es comida
function eatEnemySquare(square, row, colum){
    let nextMoveRow = parseInt(square.getAttribute('row'))
    let nextMoveColum = parseInt(square.getAttribute('colum'))
    let enemyRowIt; let enemyColumIt

    enemyRowIt = (row - nextMoveRow > 0) ? -1 : 1 
    enemyColumIt = (colum - nextMoveColum > 0) ? -1 : 1

    let enemySq = getEnemySquare(row, colum, enemyRowIt, enemyColumIt)
    matrixDesk[enemySq.getAttribute('row')][enemySq.getAttribute('colum')] = 0
}


//TODO: La ficha no come en cadena y creo q es problema de esto
function nextMovePath(square){
    let isQueenMove = square.getAttribute('queenmove')
    /*Coge las posiciones de la ficha para siguientes funciones*/
    row = parseInt(square.getAttribute('row')) 
    colum = parseInt(square.getAttribute('colum'))

    let colorSquare = getColorSquare(square)
    /*Calcula las posiciones siguientes a las que puede ir la ficha*/
    let nextRowIt = colorSquare == 1 ? -1 : 1
    let nextColumLeft = colum - 1
    let nextColumRight = colum + 1

    if(isQueenMove == 'false'){
        nextMovePathRigth(row + nextRowIt, nextColumRight, nextRowIt, colorSquare)
        nextMovePathLeft(row + nextRowIt, nextColumLeft, nextRowIt, colorSquare)
    }
}


function nextMovePathRigth(nextRow, nextColumRight, nextRowIt, colorSquare){
    if(nextColumRight < 8 && nextRow >= 0 && nextRow < 8){/*Comprueba que no se salga del tablero*/
    let nextSquareColor = getColorSquare(getSquare(nextRow,nextColumRight))
    let nextSquareType = getTypeSquare(getSquare(nextRow,nextColumRight))
        if((nextSquareColor == 0 || nextSquareType < 1) && (countEnemyEat == 1 || desk.getAttribute('eat') == 'false')){
            matrixDesk[nextRow][nextColumRight] = parseFloat('0.'+colorSquare)
            getSquare(nextRow, nextColumRight).setAttribute('caneat', canEatAtributte)
        }else if(nextSquareColor != colorSquare && nextSquareColor != 0 && countEnemyEat == 0) {
            countEnemyEat = 1
            canEatAtributte = true
            nextMovePathRigth(nextRow + nextRowIt, nextColumRight + 1, nextRowIt, colorSquare)
        }
    }
    countEnemyEat = 0
    canEatAtributte = false
}
function nextMovePathLeft(nextRow, nextColumLeft, nextRowIt, colorSquare){
    if(nextColumLeft >= 0 && nextRow >= 0 && nextRow < 8){/*Comprueba que no se salga del tablero*/
    let nextSquareColor = getColorSquare(getSquare(nextRow,nextColumLeft))
    let nextSquareType = getTypeSquare(getSquare(nextRow,nextColumLeft))
        if((nextSquareColor == 0 || nextSquareType < 1) && (countEnemyEat == 1 || desk.getAttribute('eat') == 'false')){
            matrixDesk[nextRow][nextColumLeft] = parseFloat('0.'+colorSquare)
            getSquare(nextRow, nextColumLeft).setAttribute('caneat', canEatAtributte)
        }else if(nextSquareColor != colorSquare && nextSquareColor != 0  && countEnemyEat == 0) {
            countEnemyEat = 1
            canEatAtributte = true
            nextMovePathLeft(nextRow + nextRowIt, nextColumLeft - 1, nextRowIt, colorSquare)
        }
    }
    countEnemyEat = 0
    canEatAtributte = false
}



function checkCanEat(square){
    let colorSquare = getColorSquare(square)
    let nextRowIt = colorSquare == 1 ? -1 : 1

    let parseRow = parseFloat(square.getAttribute('row'))
    let parseColum = parseFloat(square.getAttribute('colum'))
    //COGE LAS COORDENADAS DE LA SIGUIENTE POSICION
    let nextRow = parseRow + nextRowIt
    let nextColumRight = parseColum + 1
    let nextColumLeft = parseColum - 1
    
    if(checkCanEatRight(square, nextRow, nextColumRight,nextRowIt, colorSquare) ||
    checkCanEatLeft(square, nextRow, nextColumLeft,nextRowIt, colorSquare)){
        nextMovePath(square)
        changePlayer()
    }else{
        desk.setAttribute('eat', false)
    }  
}

function checkCanEatRight(square, nextRow, nextColumRight,nextRowIt, colorSquare){
    let canEatAtributte = false
    if(nextRow < 8 && nextRow >= 0 && nextColumRight < 8){
        if(getColorSquare(getSquare(nextRow, nextColumRight)) != colorSquare &&
        getColorSquare(getSquare(nextRow, nextColumRight))!= 0 && countEnemyEat == 0){
            countEnemyEat = 1
            canEatAtributte = checkCanEatRight(square, nextRow + nextRowIt, nextColumRight + 1, colorSquare)
        }else if(getColorSquare(getSquare(nextRow, nextColumRight)) == 0 && countEnemyEat == 1){
            canEatAtributte = true
        }else{
            canEatAtributte = false
        }
    }else{
        canEatAtributte = false
    }
    countEnemyEat = 0
    return canEatAtributte
}

function checkCanEatLeft(square, nextRow, nextColumLeft,nextRowIt, colorSquare){
    let canEatAtributte = false
    if(nextRow < 8 && nextRow >= 0 && nextColumLeft >= 0){
        if(getColorSquare(getSquare(nextRow, nextColumLeft)) != colorSquare &&
        getColorSquare(getSquare(nextRow, nextColumLeft))!= 0 && countEnemyEat == 0){
            countEnemyEat = 1
            canEatAtributte = checkCanEatLeft(square, nextRow + nextRowIt, nextColumLeft - 1, colorSquare)
        }else if(getColorSquare(getSquare(nextRow, nextColumLeft))== 0 && countEnemyEat == 1){
            canEatAtributte = true
        }else{
            canEatAtributte = false
        }
    }else{
        canEatAtributte = false
    }
    countEnemyEat = 0
    return canEatAtributte
}


function checkCanTransformQueen(square){
    let colorSquare = getColorSquare(square)
    let parseRow = parseFloat(square.getAttribute('row'))
    let parseColum = parseFloat(square.getAttribute('colum'))
    if(parseRow == 0 && colorSquare == 1){
        matrixDesk[parseRow][parseColum] = 3.1
    }else if(parseRow == 7 && colorSquare == 2){
        matrixDesk[parseRow][parseColum] = 3.2
    }
} 

