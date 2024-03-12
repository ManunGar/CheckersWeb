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
        if(matrixDesk[topRow][columRight] == type || 
            matrixDesk[topRow][columRight] == '3.'+type){return}
        if(matrixDesk[topRow][columRight] == 0){
            matrixDesk[topRow][columRight] = parseFloat('0.'+ type) 
            getSquare(topRow,columRight).setAttribute('caneat', canEatAtributte)
            getSquare(topRow,columRight).setAttribute('queenmove', true) 
        
        }else if(matrixDesk[topRow][columRight] != type || 
            matrixDesk[topRow][columRight] != '3.'+type){
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
        if(matrixDesk[topRow][columLeft] == type || 
            matrixDesk[topRow][columLeft] == '3.'+type){return}
        if(matrixDesk[topRow][columLeft] == 0){
            matrixDesk[topRow][columLeft] = parseFloat('0.'+ type)   
            getSquare(topRow,columLeft).setAttribute('caneat', canEatAtributte)
            getSquare(topRow,columLeft).setAttribute('queenmove', true)
        }else if(matrixDesk[topRow][columLeft] != type ||
            matrixDesk[topRow][columLeft] != '3.'+type){
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
        if(matrixDesk[bottomRow][columRight] == type || 
            matrixDesk[bottomRow][columRight] == '3.'+type){return}
        if(matrixDesk[bottomRow][columRight] == 0){
            matrixDesk[bottomRow][columRight] = parseFloat('0.'+ type)  
            getSquare(bottomRow,columRight).setAttribute('caneat', canEatAtributte)
            getSquare(bottomRow,columRight).setAttribute('queenmove', true) 
        }else if(matrixDesk[bottomRow][columRight] != type ||
            matrixDesk[bottomRow][columRight] != '3.'+type){
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
        if(matrixDesk[bottomRow][columLeft] == type || 
            matrixDesk[bottomRow][columLeft] == '3.'+type){return}
        if(matrixDesk[bottomRow][columLeft] == 0){
            matrixDesk[bottomRow][columLeft] = parseFloat('0.'+ type)  
            getSquare(bottomRow,columLeft).setAttribute('caneat', canEatAtributte)
            getSquare(bottomRow,columLeft).setAttribute('queenmove', true) 
        }else if(matrixDesk[bottomRow][columLeft] != type ||
            matrixDesk[bottomRow][columLeft] != '3.' +type){
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
    let bottomRow = row + 1
    let columRight = colum + 1
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
        if(matrixDesk[topRow][columRight] == type || 
            matrixDesk[topRow][columRight] == '3.'+type){
                canEatState = false
            }else if(matrixDesk[topRow][columRight] == 0){
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
        if(matrixDesk[topRow][columLeft] == type || 
            matrixDesk[topRow][columLeft] == '3.'+type){
                canEatState = false
            }else if(matrixDesk[topRow][columLeft] == 0){
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
        if(matrixDesk[bottomRow][columRight] == type || 
            matrixDesk[bottomRow][columRight] == '3.'+type){
                canEatState = false
        }else if(matrixDesk[bottomRow][columRight] == 0){
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
        if(matrixDesk[bottomRow][columLeft] == type || 
            matrixDesk[bottomRow][columLeft] == '3.'+type){
                canEatState = false
        }else if(matrixDesk[bottomRow][columLeft] == 0){
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