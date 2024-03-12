let start = document.getElementById('startButton')
let desk = document.getElementById('desk')
let contentPlayer = document.getElementById('container')
let matrixDesk

let row // Cogemos la fila del cuadrado seleccionado para cuando se mueva o coma un enemigo
let colum // Cogemos la columna del cuadrado seleccionado para cuando se mueva o coma un enemigo
let countEnemyEat = 0
let canEatAtributte = false

start.onclick = function (){
    start.classList.add('hide')
    desk.classList.remove('hide')
    generateDesk()
}

/* Matrices puestas para ser probadas al generar el tablero:
    Tablero vacio:
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0]

    Tablero en disposición de juego:
[2,0,2,0,2,0,2,0],
[0,2,0,2,0,2,0,2],
[2,0,2,0,2,0,2,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0],
[0,1,0,1,0,1,0,1]
*/

function generateDesk() {
    matrixDesk = [ //Este sera el Tablero, donde se le aplicaran todos los cambios
        [2,0,2,0,2,0,2,0],
        [0,2,0,2,0,2,0,2],
        [2,0,2,0,2,0,2,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1]]
        /*Para entender que tipo de cuadrado es cada número:
            Blancas = 1
            Negras = 2
            Reinas Blancas = 3.1
            Reinas Negras = 3.2
            Camino de las Blancas = 0.1
            Camino de las Negras = 0.2
        */
    for(let i=0;i<8;i++){//La i es la fila: posicion de las listas internas en la lista principal
        for(let j=0; j<8;j++){//La j es la columna: posicion del elemento dentro de la lista interna
            let square = document.createElement('div') //Se crea el DIV
            square.setAttribute('class','square')// Le ponemos una clase para estilizarla en el CSS
            square.setAttribute('type', matrixDesk[i][j]) // Le pones el tipo de cuadrado que será gracias a la matriz
            square.setAttribute('colum',j) // Su columna dentro del tablero
            square.setAttribute('row',i )// Su fila dentro del tablero
            square.setAttribute('caneat', false)// Para comprobar si es un camino cuyo movimiento lleva consigo el comerse a un enemigo
            square.setAttribute('queenmove', false)// Para comprobar si es un camino que pertenece a una reina
            desk.appendChild(square) //Añadimos el DIV al tablero en el HTML

            square.onclick = function(){clickOnSquare(square)}// Añade la funcion cuando se hace click
        }
    }
    
}
let squareList = document.getElementsByClassName('square')// Genera la lista de los cuadrados

//Tras hacer click en un cuadro comprueba que funcion hacer dependiendo del tipo de cuadrado que se ha seleccionado
function clickOnSquare(square){
    let typeSquare = getTypeSquare(square)
    if(getColorSquare(square) == getPlayerDesk()){// Si la ficha seleccionada no es del mismo color que el turno de la partida no realiza ninguna funcion, si si es el mismo las realiza
        if(typeSquare >= 1 && typeSquare < 3){// Cuando el cuadrado es 1 o 2
            desk.getAttribute('eat') == 'false' ? squareFunctions(square) : console.log('sigue comiendo')
            //Si hay un cuadrado que esta comiendo, es decir, esta comiendo en cadena, imposibilita la opción de que se pueda seleccionar otra ficha, obligando a acabar el movimiento en cadena
        }else if(typeSquare < 1){// Cuando el cuadrado es 0.1 o 0.2
            squarePathFunctions(square)
        }else{// Cuando el cuadrado es 3.1 o 3.2
            desk.getAttribute('eat') == 'false' ? queenFunctions(square) : console.log('sigue comiendo')
        }
    }
} 

/* 
    Funcion para los cuadrados 1 o 2:
        Elimina cualquier camino restante que haya quedado de otro cuadrado.
        Muestra el camino del cuadrado seleccionado.
        Repinta el Tablero ya que se ha modificado la matriz
*/
function squareFunctions(square){
    removeNextMovePath()
    nextMovePath(square)
    rePaintDesk()
}

/* 
    Funcion para cuando lo cuadrados seleccionados son caminos (0.1 o 0.2):
    Mueve el cuadrado que ha mostrado el camino: move()
    Si el camino seleccionado lleva consigo el comer al enemigo realiza las siguientes funciones{
        Ponemos el atributo eat a true para decir al tablero que hay una ficha que esta comiendo a un enemigo, 
        esto sera útil para poder comer en cadena y mostrar el camino de esta acción.
        Come al enemigo: eatEnemySquare()
        Elimina los caminos que se han creado.
        Comprueba que pueda seguir comiendo para mantener el atributo 'eat' a true y 
        así realizar el movimiento de comer en cadena. Tanto para los cuadrados normales o reinas.
    }Si es un camino normal{
        Elimina los caminos que se han creado.
    }
    Comprobar si le cuadrado que se ha movido se puede transformar en reina
    Repinta el tablero
    Cambia el turno del jugador

*/
function squarePathFunctions(square){
    move(square,  row, colum)
    if(square.getAttribute('caneat') == 'true'){ 
        desk.setAttribute('eat', true) 
        eatEnemySquare(square,row,colum) 
        removeNextMovePath()
        if(square.getAttribute('queenmove') == 'false'){
            checkCanEat(square)
        }else{
            checkQueenCanEat(square, getColorSquare(square))
        }
        
    }else{
        removeNextMovePath()
    }
    checkCanTransformQueen(square)
    rePaintDesk()
    changePlayer()
}

/*
    Funcion para los cuadrado 3.1 y 3.2 
    (igual que para 1 o 2 pero con una funcion para los caminos de las reinas)
*/
function queenFunctions(square){
    removeNextMovePath()
    queenNextMovePath(square,getColorSquare(square))
    rePaintDesk();

}


/* 
    Coge el color del jugador al cual pertenece el turno de la partida
*/
function getPlayerDesk(){
    return contentPlayer.getAttribute('player') == 'white' ? 1 : 2
}


/* 
    Cambia el turno de la partida, se le establece un setTimeout para que en el CSS 
    los cambios de estilos no sean instantaneos
*/
function changePlayer(){
    setTimeout(function(){
        if(contentPlayer.getAttribute('player') == 'white'){
            contentPlayer.setAttribute('player', 'black')
        }else {
            contentPlayer.setAttribute('player','white')
        }
    }, 200)   
}


/*
    Elimina los caminos de las fichas que estan en el tablero, para ello
    recorre la matriz cambiando los valores 0.1 y 0.2 por 0
*/
function removeNextMovePath(){
    let n = 0;
    for(let i=0;i<8;i++){
        for(let j=0; j<8;j++){
            let valueSquare = matrixDesk[i][j]
            if(valueSquare == 0.1 || valueSquare == 0.2){
                matrixDesk[i][j] = 0
            }
            /*Si el cuadrado camino tenía un atributo de caneat o queenmove los pone a 0 para restablecerlo*/
            squareList[n].setAttribute('caneat', false)
            squareList[n].setAttribute('queenmove', false)
            n++
        }
    }
}


/*
    Al aplicar todas las funciones establecidas en el clickOnSquare los cambios de mover, eliminar o mostrar
    el camino se realizan sobre la matriz. Con el Repaint cambamos los tipos de cada cuadro (DIV) del tablero
    para que los cambios se hagan visibles en la página
*/
function rePaintDesk(){
    let squareIndex = 0
    for(let i=0;i<8;i++){
        for(let j=0; j<8;j++){
           squareList[squareIndex].setAttribute('type', matrixDesk[i][j])
           squareIndex++
        }
    }
}