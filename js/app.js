//Objeto tablero
var objetoTablero = {
    list:[
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0],
    ]
}

//Solicita nombres de los jugadores y si los mismos quedan vacíos usará nombres por defecto
var jugador1 = document.getElementById('jugador1');
var jugador2 = document.getElementById('jugador2');

document.getElementById('ingresaNombres').addEventListener('click', ingresaNombres);
function ingresaNombres(){
    jugador1 = jugador1.innerHTML = prompt('Ingrese el nombre del primer jugador:');
    jugador2 = jugador2.innerHTML = prompt('Ingrese el nombre del segundo jugador:');
    if (jugador1 == '' || jugador2 == '' ){
        document.getElementById('jugador1').innerHTML = 'JUGADOR 1';
        document.getElementById('jugador2').innerHTML = 'JUGADOR 2';
    }
}

//Variables
var casilla, piezaMovil, piezaMovilSeleccionada, posicion,jugador1 ,jugador2; 
var turno = 1;
var comerIzquierda = false;
var comerDerecha = false;
var diagonalesCortas = false;
var columnaSiete = false;
var pintaDoble =  false;
var puntosJugador1 = document.getElementById('puntosJugador1');
var puntosJugador2 = document.getElementById('puntosJugador2');
var puntaje1 = 0;
var puntaje2 = 0;
var comparaRojas = 0;
var comparaBlancas = 0;

//Tablero
function generarTablero(){
    var tablero = document.getElementById("tablero"), contador = 0;
    for (var i = 0; i < 8; i++) {       
        var divFila = document.createElement('tr');
        divFila.className = 'fila';
        tablero.appendChild(divFila);
        contador = i % 2;
        for (var j = 0; j < 8; j++) {
            var casilla = document.createElement('td');
            if (contador === 0) {
                casilla.className = 'recuadroBlanco';
                contador++;// Suma 1 para hacer al número impar para que en el proximo búcle pinte el recuadro en negro
            }else{
                casilla.className = 'recuadroNegro';
                contador--;// Resta 1 para hacer al número par para que en el proximo búcle pinte el recuadro en blanco
            }
            casilla.id = 'fila' + i + 'columna' + j;
            
            divFila.appendChild(casilla);
        }
    }
}
generarTablero();

//Fichas
//Recorre el tablero y agrega las fichas de acuerdo al array objetoTablero.list
function rellenarTablero(){
    for (var m = 0; m < 8; m++) {  
        for (var n = 0; n < 8; n++) { 
            //Ficha Blanca corresponde a 1
            if (objetoTablero.list[m][n] === 1) {
                var piezaBlanca = document.createElement('img');
                piezaBlanca.src = 'imgs/'+1+'.png';
                piezaBlanca.alt = 'Pieza_Blanca';
                piezaBlanca.className = 'fichas';
                document.getElementById('fila' + m +'columna' + n).appendChild(piezaBlanca);
                
            //Ficha Roja corresponde a 2
            }else if (objetoTablero.list[m][n] === 2){
                var piezaRoja = document.createElement('img');
                piezaRoja.src = 'imgs/'+2+'.png';
                piezaRoja.alt = 'Pieza_Roja';
                piezaRoja.className = 'fichas';
                document.getElementById('fila' + m +'columna' + n).appendChild(piezaRoja);
            }  
        }
    }
}
rellenarTablero();

function botonCuadrosNegros(){
//Recorre el arreglo para darle boton de seleccion por casilla
var casillas = document.getElementsByClassName('recuadroNegro'); 
for(x=0; x<casillas.length; x++) {
    casillas[x].addEventListener('click', seleccionaPieza);
    }
}
botonCuadrosNegros();
pintarJugador();
    function seleccionaPieza(e) {
        if (turno == 1){
            // Si el elemento no está seleccionado y hay un elemento hijo entonces
            if(!piezaMovilSeleccionada && e.currentTarget.querySelector('img[alt="Pieza_Blanca"]')) {
                casillero = e.currentTarget; 
                piezaMovil = e.currentTarget.innerHTML;
                e.currentTarget.querySelector('img[alt="Pieza_Blanca"]').classList.add("pintado"); 
                //Movimientos posibles activados
                function ubicacion(){
                    ubicacion = e.currentTarget.id;
                    fila = ubicacion.substring(4, 5);
                    columna = ubicacion.substring(12);  
                }
                ubicacion();
                columnaInicial = columna;
                //Si la ficha está en la columna 7 
                if(columna == 7){ 
                    columnaSiete = true;
                    fila++;  
                    columna--;
                    console.log('la fila '+fila);
                        ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );    
                        if (ubicacionIzquierda.querySelector('img[alt="Pieza_Roja"]')){
                            fila++;  
                            columna = columna - 1;
                            if (fila < 8){
                            ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                                if (!ubicacionIzquierda.firstElementChild){
                                    ubicacionIzquierda.classList.add('movimiento');
                                    comerIzquierda = true;
                                }
                            }
                        }
                        else if (!ubicacionIzquierda.querySelector('img[alt="Pieza_Blanca"]')){ 
                            ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                            ubicacionIzquierda.classList.add('movimiento');          
                        }
                }
                //Si la ficha está en la columna 0  
                else if(columna == 0){
                    fila++;  
                    columna++;   
                    ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                    if (!ubicacionDerecha.querySelector('img[alt="Pieza_Blanca"]') && !ubicacionDerecha.querySelector('img[alt="Pieza_Roja"]')){ 
                            ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                            ubicacionDerecha.classList.add('movimiento');            
                    }
                    else if (ubicacionDerecha.querySelector('img[alt="Pieza_Roja"]')){ 
                        fila++;  
                        columna++;
                        ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                            if(!ubicacionDerecha.firstElementChild){
                                ubicacionDerecha.classList.add('movimiento');
                                comerDerecha = true;
                            }            
                        }
                    }
                    //Si la ficha está en las columnas del medio     
                else {
                        //COMIENZA A VERIFICAR TODOS LOS MOVIMIENTOS
                        fila++;  
                        columna++;   
                        ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                        columna = columna - 2;
                        ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                        
                        //Si en la ubicacion diagonal derecha e izquierda no hay una pieza Roja se pintará la casilla
                        if (!ubicacionDerecha.firstElementChild && !ubicacionIzquierda.firstElementChild){         
                            ubicacionDerecha.classList.add('movimiento');
                            ubicacionIzquierda.classList.add('movimiento');
                            diagonalesCortas = true;
                            }
                            
                        //Si en la ubicacion diagonal derecha no hay una pieza roja y en la izquierda hay una pieza roja continúa
                        else if(!ubicacionDerecha.querySelector('img[alt="Pieza_Roja"]') && ubicacionIzquierda.querySelector('img[alt="Pieza_Roja"]') ){
                                fila++;  
                                columna--;
                                if (fila < 8){
                                    diagonalesCortas = true;
                                    ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                                    if (columna >= 0){
                                    //Si en la ubicacion diagonal izquierda no hay una pieza pinta casilla de movimiento
                                        if(!ubicacionIzquierda.firstElementChild){
                                            ubicacionIzquierda.classList.add('movimiento');
                                            comerIzquierda = true;
                                            diagonalesCortas = true;
                                            }
                                    //Si en la ubicacion diagonal izquierda hay una pieza roja pinta casilla de movimiento diagonal derecha
                                    //Acá nos manejamos con el movimiento izquierdo por eso hay que moverse mas
                                        else {
                                        fila--;  
                                        columna = columna + 3;
                                        ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                                            if(!ubicacionIzquierda.firstElementChild){
                                                ubicacionIzquierda.classList.add('movimiento');
                                            }
                                        }
                                    }
                                    else {
                                    fila--;  
                                    columna = columna + 3;
                                    ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                                    ubicacionIzquierda.classList.add('movimiento')
                                    }
                                }
                            }
                        //Si no hay una pieza roja  a la diagonal izquierda y hay una pieza roja a la diagonal derecha
                        else if(!ubicacionIzquierda.querySelector('img[alt="Pieza_Roja"]') && ubicacionDerecha.querySelector('img[alt="Pieza_Roja"]') ){
                                fila++;  
                                columna = columna + 3;
                                if (fila < 8){
                                    ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                                    //Si en la ubicacion diagonal derecha no hay una pieza pinta casilla de movimientos
                                    if (8 > columna){
                                        if(!ubicacionDerecha.firstElementChild){
                                        ubicacionDerecha.classList.add('movimiento');
                                        diagonalesCortas = false;
                                        comerDerecha = true;
                                        }
                                    //Si en la ubicacion diagonal derecha hay una pieza pinta casilla de movimiento diagonal izquierda
                                    //Acá nos manejamos con el movimiento derecho por eso hay que moverse mas
                                        else{
                                        fila--;  
                                        columna = columna - 3;
                                        ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                                        if(!ubicacionDerecha.firstElementChild){
                                            ubicacionDerecha.classList.add('movimiento');
                                            }   
                                        diagonalesCortas = false;
                                        } 
                                    }
                                    else if (columna == 8){
                                        fila--;  
                                        columna = columna - 3;   
                                        ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                                        ubicacionDerecha.classList.add('movimiento');
                                        diagonalesCortas = false;
                                    }
                                } 
                            }
                        //Si hay una pieza roja tanto a la diagonal izquierda y a la diagonal derecha
                        else if (ubicacionDerecha.querySelector('img[alt="Pieza_Roja"]') && ubicacionIzquierda.querySelector('img[alt="Pieza_Roja"]')){
                                fila++;
                                if (fila < 8){
                                    columna = columna + 3;   
                                    ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                                    if (columna < 8){
                                        if (!ubicacionDerecha.firstElementChild){
                                        ubicacionDerecha.classList.add('movimiento');
                                        diagonalesCortas = false;
                                        pintaDoble = true;
                                        }
                                    }
                                    columna = columna - 4;
                                    ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                                    //Si no hay un elemento en la segunda diagonal derecha la pinta
                                    //Si no hay un elemento en la segunda diagonal izquierda la pinta
                                    if (columna >= 0){
                                        if (!ubicacionIzquierda.firstElementChild){
                                            ubicacionIzquierda.classList.add('movimiento');
                                            diagonalesCortas = false;
                                            pintaDoble = true;
                                            }
                                    }
                                }
                            }
                        //Si no hay una pieza blanca  a la diagonal izquierda y hay una pieza blanca a la diagonal derecha
                        else if(!ubicacionIzquierda.querySelector('img[alt="Pieza_Blanca"]') && ubicacionDerecha.querySelector('img[alt="Pieza_Blanca"]') ){ 
                            ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna ); 
                            //Si en la ubicacion diagonal izquierda no hay una pieza pinta casilla de movimiento
                            if(!ubicacionIzquierda.firstElementChild){
                                ubicacionIzquierda.classList.add('movimiento')
                                diagonalesCortas = true;
                            }
                        }
                            //Si  hay una pieza blanca  a la diagonal izquierda y no hay una pieza blanca a la diagonal derecha
                        else if(ubicacionIzquierda.querySelector('img[alt="Pieza_Blanca"]') && !ubicacionDerecha.querySelector('img[alt="Pieza_Blanca"]') ){ 
                            ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna ); 
                            //Si en la ubicacion diagonal derecha no hay una pieza pinta casilla de movimiento
                            if(!ubicacionDerecha.firstElementChild){
                                ubicacionDerecha.classList.add('movimiento')
                                diagonalesCortas = true;
                            }
                        }
                        
                    }
                    
                    movimiento = document.querySelectorAll('.movimiento');
                    piezaMovilSeleccionada = true;
                    
                }

            //Si el elemento está seleccionado y no hay un elemento hijo
            else if(piezaMovilSeleccionada && !e.currentTarget.firstElementChild){
                posicion = e.currentTarget;
                //Moviendo la matriz   
                ubicacion = e.currentTarget.id;
                matrizFila = ubicacion.substring(4, 5);
                matrizColumna = ubicacion.substring(12);  
                columnaFinal = matrizColumna;
                objetoTablero.list[matrizFila][matrizColumna] = 1;
                if(objetoTablero.list[7][0] === 1 || objetoTablero.list[7][2] === 1 || objetoTablero.list[7][4] === 1 || objetoTablero.list[7][6] === 1){
                    comparaBlancas = comparaBlancas + 1;
                    verificarEmpate();
                }
                if(posicion != casilla && posicion.id === movimiento[0].id || posicion.id === movimiento[1].id ){
                    casillero.innerHTML = '';
                    //Si hay dos casillas pintadas para comer entra al if
                    if (pintaDoble == true && columnaFinal > columnaInicial){
                        //Suma puntos por pieza comida
                        puntaje1 = puntaje1 + 1;
                        puntosJugador1.innerHTML = puntaje1;
                        //busco la ubicacion de la casilla que está la ficha a comer
                        matrizFila--;
                        matrizColumna--; 
                        ubicacion = document.querySelector('#fila' + matrizFila +'columna' + matrizColumna ).innerHTML = '';
                        //busco la ubicacion de la casilla que está la ficha a comer para ponerla en la matriz
                        objetoTablero.list[matrizFila][matrizColumna] = 0;
                        pintaDoble = false;
                        if(puntaje1 == 12){
                            document.getElementById('ganador1').style.display="block";
                            removerBotonCuadrosNegros();
                        }
                    }
                    //Si hay dos casillas pintadas para comer entra al if
                    else if (pintaDoble == true && columnaFinal < columnaInicial){
                        //Suma puntos por pieza comida
                        puntaje1 = puntaje1 + 1;
                        puntosJugador1.innerHTML = puntaje1;
                        //busco la ubicacion de la casilla que está la ficha a comer
                        matrizFila--;
                        matrizColumna++; 
                        ubicacion = document.querySelector('#fila' + matrizFila +'columna' + matrizColumna ).innerHTML = '';
                        //busco la ubicacion de la casilla que está la ficha a comer para ponerla en la matriz
                        objetoTablero.list[matrizFila][matrizColumna] = 0;
                        pintaDoble = false;
                        if(puntaje1 == 12){
                            document.getElementById('ganador1').style.display="block";
                            removerBotonCuadrosNegros();
                        }
                    }
                    if (comerDerecha == true){
                            //Suma puntos por pieza comida
                            puntaje1 = puntaje1 + 1;
                            puntosJugador1.innerHTML = puntaje1;
                            //busco la ubicacion de la casilla que está la ficha a comer
                            fila--;
                            columna--; 
                            ubicacion = document.querySelector('#fila' + fila +'columna' + columna ).innerHTML = '';
                            //busco la ubicacion de la casilla que está la ficha a comer para ponerla en la matriz
                            matrizFila = fila;
                            matrizColumna = columna;
                            objetoTablero.list[matrizFila][matrizColumna] = 0;
                            if(puntaje1 == 12){
                                document.getElementById('ganador1').style.display="block";
                                removerBotonCuadrosNegros();
                            }
                            fila++;
                            columna--;
                            comerDerecha = false;
                        
                    }
                    else if (comerIzquierda == true ){
                            //Suma puntos por pieza comida
                            puntaje1 = puntaje1 + 1;
                            puntosJugador1.innerHTML = puntaje1;
                            //busco la ubicacion de la casilla que está la ficha a comer
                            fila--;
                            columna++; 
                            ubicacion = document.querySelector('#fila' + fila +'columna' + columna ).innerHTML = '';
                            //busco la ubicacion de la casilla que está la ficha a comer para ponerla en la matriz
                            matrizFila = fila;
                            matrizColumna = columna;
                            objetoTablero.list[matrizFila][matrizColumna] = 0;
                            if(puntaje1 == 12){
                                document.getElementById('ganador1').style.display="block";
                                removerBotonCuadrosNegros();
                            }
                            fila++;
                            columna--;
                            comerIzquierda = false;
                    } 
                
                //Moviendo la matriz     
                ubicacion = casillero.id;
                matrizFila = ubicacion.substring(4, 5);
                matrizColumna = ubicacion.substring(12);  
                objetoTablero.list[matrizFila][matrizColumna] = 0;
                e.currentTarget.innerHTML = piezaMovil; 
                piezaMovilSeleccionada = false;
                turno = 2;    
                pintarJugador();
                removerSeleccion();
                }                   
            }
            //Si el elemento está seleccionadao y hay una pieza blanca
            else if(piezaMovilSeleccionada && e.currentTarget.querySelector('img[alt="Pieza_Blanca"]')){
                posicion = e.currentTarget; 
                comer = false;           
                if(posicion == casillero){
                    e.currentTarget.querySelector('img[alt="Pieza_Blanca"]').classList.remove("pintado");     
                    piezaMovilSeleccionada = false;                    
                    removerSeleccion();
                }
            }
            
        /************************************************************************************************/
        }    //Turno 2 Piezas Rojas
        
        else if (turno == 2){
            if(!piezaMovilSeleccionada && e.currentTarget.firstElementChild) {
                casillero = e.currentTarget; 
                piezaMovil = e.currentTarget.innerHTML;
                e.currentTarget.querySelector('img[alt="Pieza_Roja"]').classList.add("pintado");
                //Movimientos posibles activados
                ubicacion = e.currentTarget.id;
                fila = ubicacion.substring(4, 5); 
                columna = ubicacion.substring(12);
                columnaInicial = columna;
                if(columna == 7){
                    columnaSiete = true;
                    fila--;  
                    columna--;
                    ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                    //Si hay una ficha blanca en la diagonal izquierda seguir
                    if (ubicacionIzquierda.querySelector('img[alt="Pieza_Blanca"]')){
                        fila = fila - 1;  
                        columna = columna - 1;
                        ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                        if (!ubicacionIzquierda.firstElementChild){
                            ubicacionIzquierda.classList.add('movimiento');
                            comerIzquierda = true;
                        }
                    }
                    else if (!ubicacionIzquierda.querySelector('img[alt="Pieza_Roja"]')){ 
                        ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                        ubicacionIzquierda.classList.add('movimiento');          
                    }
                }
                else if(columna == 0){
                    fila-- ;  
                    columna++;   
                    ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                    if (!ubicacionDerecha.firstElementChild){
                            ubicacionDerecha.classList.add('movimiento');            
                        }
                    else if (ubicacionDerecha.querySelector('img[alt="Pieza_Blanca"]')){ 
                            fila--;  
                            columna++;
                            ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                            if(fila >= 0){
                                if(!ubicacionDerecha.firstElementChild){
                                    ubicacionDerecha.classList.add('movimiento');
                                    comerDerecha = true;
                                }
                            }            
                        }                    
                    }

                else {
                    //COMIENZA A VERIFICAR TODOS LOS MOVIMIENTOS
                    fila--;  
                    columna--;   
                    ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                    columna = columna + 2;
                    ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                    //Si en la ubicacion diagonal derecha e izquierda no hay una pieza se pintará la casilla
                    if (!ubicacionDerecha.firstElementChild && !ubicacionIzquierda.firstElementChild){         
                        ubicacionDerecha.classList.add('movimiento');
                        ubicacionIzquierda.classList.add('movimiento');
                        diagonalesCortas = true;
                        }
                    //Si en la ubicacion diagonal derecha no hay una pieza roja y en la izquierda hay una pieza roja continúa o Si en la ubicacion diagonal derecha no hay una pieza roja y en la ubicacion diagonal izquierda no hay pieza blanca
                    else if(!ubicacionDerecha.querySelector('img[alt="Pieza_Roja"]') && ubicacionIzquierda.querySelector('img[alt="Pieza_Roja"]') || !ubicacionDerecha.querySelector('img[alt="Pieza_Roja"]') && !ubicacionIzquierda.querySelector('img[alt="Pieza_Blanca"]')){
                        //diagonalesCortas = true;
                        ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                        
                        //Si en la ubicacion diagonal izquierda no hay una pieza pinta casilla de movimiento
                            if(!ubicacionDerecha.firstElementChild){
                                ubicacionDerecha.classList.add('movimiento')
                                //diagonalesCortas = true;
                                }
                        //Si en la ubicacion diagonal izquierda hay una pieza roja pinta casilla de movimiento diagonal derecha
                        //Acá nos manejamos con el movimiento izquierdo por eso hay que moverse mas
                            else {
                                fila--;  
                                columna++;
                                if(fila >= 0){
                                    ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                                    if(columna < 8){
                                        if(!ubicacionDerecha.firstElementChild){
                                            ubicacionDerecha.classList.add('movimiento')
                                            comerDerecha = true;
                                        }
                                        else{
                                            fila++;
                                            columna = columna - 3;
                                            ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                                            if(!ubicacionDerecha.firstElementChild){
                                                ubicacionDerecha.classList.add('movimiento');
                                            }
                                        }
                                        
                                    }
                                    else{
                                        columna = columna - 3;
                                        fila++;
                                        ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                                        ubicacionDerecha.classList.add('movimiento')
                                    }
                                }
                            }
                    }
                      //Si en la ubicacion diagonal izquierda no hay una pieza roja y en la derecha hay una pieza roja continúa o en la ubicacion diagonal izquierda no hay pieza roja y en la derecha no hay pieza blanca
                    else if(ubicacionDerecha.querySelector('img[alt="Pieza_Roja"]') && !ubicacionIzquierda.querySelector('img[alt="Pieza_Roja"]') || !ubicacionDerecha.querySelector('img[alt="Pieza_Blanca"]') && !ubicacionIzquierda.querySelector('img[alt="Pieza_Roja"]')){
                        columna = columna - 2;
                        ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                        
                        //Si en la ubicacion diagonal izquierda no hay una pieza pinta casilla de movimiento
                            if(!ubicacionIzquierda.firstElementChild){
                                ubicacionIzquierda.classList.add('movimiento')
                                }
                        //Si en la ubicacion diagonal izquierda hay una pieza roja pinta casilla de movimiento diagonal derecha
                            else {
                                fila--;  
                                columna--;
                                if(fila >= 0){
                                    ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                                    if(columna >= 0){
                                        if(!ubicacionIzquierda.firstElementChild){ 
                                            ubicacionIzquierda.classList.add('movimiento');
                                            comerIzquierda = true;
                                        }
                                        else{
                                            fila++;
                                            columna = columna + 3;
                                            ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                                            if(!ubicacionDerecha.firstElementChild){
                                                ubicacionDerecha.classList.add('movimiento');
                                            }
                                        }
                                    }
                                    else{
                                        fila++;
                                        columna = columna + 3;
                                        ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                                        ubicacionDerecha.classList.add('movimiento');
                                    }
                                }
                            }
                    }
                         //Si  hay una pieza blanca tanto en la diagonal izquierda como en la diagonal derecha
                        else if(ubicacionIzquierda.querySelector('img[alt="Pieza_Blanca"]') && ubicacionDerecha.querySelector('img[alt="Pieza_Blanca"]')){ 
                                fila--;
                                if(fila >= 0){
                                    columna++
                                    ubicacionDerecha = document.querySelector('#fila' + fila +'columna' + columna );
                                    if(columna < 8){
                                        if(!ubicacionDerecha.firstElementChild){
                                            ubicacionDerecha.classList.add('movimiento');
                                            diagonalesCortas = false;
                                            pintaDoble = true;
                                        }
                                    }
                                    columna = columna - 4;
                                    ubicacionIzquierda = document.querySelector('#fila' + fila +'columna' + columna );
                                    if(columna >= 0){
                                        if (!ubicacionIzquierda.firstElementChild){
                                            ubicacionIzquierda.classList.add('movimiento');
                                            diagonalesCortas = false;
                                            pintaDoble = true;
                                        }
                                    }
                                }
                            }   
                    }
                movimiento = document.querySelectorAll('.movimiento');
                piezaMovilSeleccionada = true;             
            }
            else if(piezaMovilSeleccionada  && !e.currentTarget.firstElementChild){
                posicion = e.currentTarget;
                //Moviendo la matriz   
                ubicacion = e.currentTarget.id;
                matrizFila = ubicacion.substring(4, 5);
                matrizColumna = ubicacion.substring(12);
                columnaFinal = matrizColumna;  
                objetoTablero.list[matrizFila][matrizColumna] = 2;
                if(objetoTablero.list[0][1] === 2 || objetoTablero.list[0][3] === 2 || objetoTablero.list[0][5] === 2 || objetoTablero.list[0][7] === 2){
                    comparaRojas = comparaRojas + 1;
                    verificarEmpate();
                }
                if(posicion != casilla && posicion.id === movimiento[0].id || posicion.id === movimiento[1].id ){
                    casillero.innerHTML = '';
                    //Si hay dos casillas pintadas para comer entra al if
                    if (pintaDoble == true && columnaFinal > columnaInicial){
                        //Suma puntos por pieza comida
                        puntaje2 = puntaje2 + 1;
                        puntosJugador2.innerHTML = puntaje2;
                        matrizColumna = matrizColumna - 4;
                        matrizColumna = matrizColumna + 4;
                        //busco la ubicacion de la casilla que está la ficha a comer
                        matrizFila++;
                        matrizColumna--; 
                        ubicacion = document.querySelector('#fila' + matrizFila +'columna' + matrizColumna ).innerHTML = '';
                        //busco la ubicacion de la casilla que está la ficha a comer para ponerla en la matriz
                        objetoTablero.list[matrizFila][matrizColumna] = 0;
                        pintaDoble = false;
                        if(puntaje2 == 12){
                            document.getElementById('ganador2').style.display="block";
                            removerBotonCuadrosNegros();
                        }
                    }
                    //Si hay dos casillas pintadas para comer entra al if
                    else if (pintaDoble == true && columnaFinal < columnaInicial){
                        //Suma puntos por pieza comida
                        puntaje2 = puntaje2 + 1;
                        puntosJugador2.innerHTML = puntaje2;
                        //despinta la posicion a donde se mueve
                        console.log(matrizColumna);
                        //El siguiente if sirve para que siga comiendo normal en la columna 6 cuando se pinta doble
                        //busco la ubicacion de la casilla que está la ficha a comer
                        matrizFila++;
                        matrizColumna++;
                        ubicacion = document.querySelector('#fila' + matrizFila +'columna' + matrizColumna ).innerHTML = '';
                        //busco la ubicacion de la casilla que está la ficha a comer para ponerla en la matriz
                        objetoTablero.list[matrizFila][matrizColumna] = 0;
                        pintaDoble = false;
                        if(puntaje2 == 12){
                            document.getElementById('ganador2').style.display="block";
                            removerBotonCuadrosNegros();
                        }
                    }
                    if (comerIzquierda == true ){
                        //Suma puntos por pieza comida
                        puntaje2 = puntaje2 + 1;
                        puntosJugador2.innerHTML = puntaje2;
                        //busco la ubicacion de la casilla que está la ficha a comer
                        fila++;
                        columna++; 
                        ubicacion = document.querySelector('#fila' + fila +'columna' + columna ).innerHTML = '';
                        //busco la ubicacion de la casilla que está la ficha a comer para ponerla en la matriz
                        matrizFila = fila;
                        matrizColumna = columna;
                        objetoTablero.list[matrizFila][matrizColumna] = 0;
                        if(puntaje2 == 12){
                            document.getElementById('ganador2').style.display="block";
                            removerBotonCuadrosNegros();
                        }
                        fila++;
                        columna--;
                        comerIzquierda = false;
                    }
                    else if (comerDerecha == true){
                        //Suma puntos por pieza comida
                        puntaje2 = puntaje2 + 1;
                        puntosJugador2.innerHTML = puntaje2;
                        //busco la ubicacion de la casilla que está la ficha a comer
                        fila++;
                        columna--; 
                        ubicacion = document.querySelector('#fila' + fila +'columna' + columna ).innerHTML = '';
                        //busco la ubicacion de la casilla que está la ficha a comer para ponerla en la matriz
                        matrizFila = fila;
                        matrizColumna = columna;
                        objetoTablero.list[matrizFila][matrizColumna] = 0;
                        if(puntaje2 == 12){
                            document.getElementById('ganador2').style.display="block";
                            removerBotonCuadrosNegros();
                        }
                        fila++;
                        columna--;
                        comerDerecha = false;
                    }  
                //Moviendo la matriz     
                ubicacion = casillero.id;
                matrizFila = ubicacion.substring(4, 5);
                matrizColumna = ubicacion.substring(12);  
                objetoTablero.list[matrizFila][matrizColumna] = 0;
                e.currentTarget.innerHTML = piezaMovil; 
                piezaMovilSeleccionada = false;
                posicion = e.currentTarget;
                turno = 1;
                pintarJugador();
                //Se remueve el efecto en las casillas porque ya movio la dama
                removerSeleccion();  
                } 
            } 
            else if(piezaMovilSeleccionada && e.currentTarget.querySelector('img[alt="Pieza_Roja"]')){
                posicion = e.currentTarget;            
                if(posicion == casillero){
                    e.currentTarget.querySelector('img[alt="Pieza_Roja"]').classList.remove("pintado");     
                    piezaMovilSeleccionada = false;
                    removerSeleccion();          
                }
            }
        }
    }

// Se Pintan nombres de jugadores según el turno
function pintarJugador(){
    if (turno == 1){
        //Pinta la ficha del titulo del jugador de turno
        var fichaJugador1 = document.getElementById("img-jugador1");
        fichaJugador1.classList.add("pintado");
        var fichaJugador2 = document.getElementById("img-jugador2");
        fichaJugador2.classList.remove("pintado");
        
        //Pinta el nombre del jugador de turno y despinta al otro
        var jugador1 = document.getElementById("jugador1");
        jugador1.style.color = 'lightblue';
        var jugador2 = document.getElementById("jugador2");
        jugador2.style.color = '';
    }
    else{
        //Despinta ficha de titulo cuando ya no es tu turno
        var fichaJugador1 = document.getElementById("img-jugador1");
        fichaJugador1.classList.remove("pintado");
        var fichaJugador2 = document.getElementById("img-jugador2");
        fichaJugador2.classList.add("pintado");

        //Despinta nombre cuando ya no es tu turno
        var jugador1 = document.getElementById("jugador1");
        jugador1.style.color = '';
        var jugador2 = document.getElementById("jugador2");
        jugador2.style.color = 'lightblue';
    }
}

document.getElementById('guardar').addEventListener('click', guardar);
function guardar(){
    // Guarda la partida
    localStorage.setItem('partida', JSON.stringify(objetoTablero.list));
    localStorage.setItem('turno', JSON.stringify(turno));
    localStorage.setItem('jugador1', JSON.stringify(jugador1));
    localStorage.setItem('jugador2', JSON.stringify(jugador2));
    localStorage.setItem('puntaje1', JSON.stringify(puntaje1));
    localStorage.setItem('puntaje2', JSON.stringify(puntaje2));
}

document.getElementById('cargar').addEventListener('click', cargar);
function cargar(){
    // Carga la partida guardada con el nombre de los jugadores
    objetoTablero.list = JSON.parse(localStorage.getItem('partida'));
    turno =  JSON.parse(localStorage.getItem('turno'));
    var jugador1 = document.getElementById('jugador1');
    var jugador2 = document.getElementById('jugador2');
    var puntosJugador1 = document.getElementById('puntosJugador1');
    var puntosJugador2 = document.getElementById('puntosJugador2');
    jugador1 = jugador1.innerHTML =  JSON.parse(localStorage.getItem('jugador1'));
    jugador2 = jugador2.innerHTML =  JSON.parse(localStorage.getItem('jugador2'));
    puntosJugador1 = puntosJugador1.innerHTML =  JSON.parse(localStorage.getItem('puntaje1'));
    puntosJugador2 = puntosJugador2.innerHTML =  JSON.parse(localStorage.getItem('puntaje2'));
    pintarJugador();
    resetearTablero();
}

document.getElementById('boton').addEventListener('click', nuevaPartida);
function nuevaPartida(){
    //Resetea el tablero para volver a cargarlo con las nuevas posiciones
    tablero.innerHTML = '';
    generarTablero();
    var objetoTablero = {
    list:[
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0],
    ]
}
//rellenarTablero();
    for (var m = 0; m < 8; m++) {  
        for (var n = 0; n < 8; n++) { 
            //Ficha Blanca corresponde a 1
            if (objetoTablero.list[m][n] === 1) {
                var piezaBlanca = document.createElement('img');
                piezaBlanca.src = 'imgs/'+1+'.png';
                piezaBlanca.alt = 'Pieza_Blanca';
                piezaBlanca.className = 'fichas';
                document.getElementById('fila' + m +'columna' + n).appendChild(piezaBlanca);
                
            //Ficha Roja corresponde a 2
            }else if (objetoTablero.list[m][n] === 2){
                var piezaRoja = document.createElement('img');
                piezaRoja.src = 'imgs/'+2+'.png';
                piezaRoja.alt = 'Pieza_Roja';
                piezaRoja.className = 'fichas';
                document.getElementById('fila' + m +'columna' + n).appendChild(piezaRoja);
            }  
        }
    }
    turno = 1;
    document.getElementById('puntosJugador1').innerHTML = '0';
    document.getElementById('puntosJugador2').innerHTML = '0';
    document.getElementById('jugador1').innerHTML = 'JUGADOR 1';
    document.getElementById('jugador2').innerHTML = 'JUGADOR 2';
    document.getElementById('ganador1').style.display="none";
    document.getElementById('ganador2').style.display="none";
    botonCuadrosNegros();
    pintarJugador();
}
function resetearTablero(){
    //Resetea el tablero para volver a cargarlo con las nuevas posiciones
    tablero.innerHTML = '';
    generarTablero();
    rellenarTablero();
    botonCuadrosNegros();
}
function removerBotonCuadrosNegros(){
    //Recorre el arreglo para quitar boton de seleccion por casilla
    var casillas = document.getElementsByClassName('recuadroNegro'); 
    for(x=0; x<casillas.length; x++) {
        casillas[x].removeEventListener('click', seleccionaPieza);
        }
    }

function verificarEmpate(){
    //Si se cumplen las siguientes consignas en alguno de los turnos saldrá alerta de empate y bloqueará los botones para seguir jugando
    if(comparaBlancas > 0 && comparaRojas > 0){
        document.getElementById('empate').style.display="block";
        removerBotonCuadrosNegros();
    }
}
function removerSeleccion(){
    for (var m = 0; m < 10; m++) {  
        for (var n = 0; n < 10; n++) {
            ubicacionDerecha.classList.remove('movimiento');
            ubicacionIzquierda.classList.remove('movimiento');
            document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento');
        }
    }
}