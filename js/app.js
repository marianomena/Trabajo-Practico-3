
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
console.log(objetoTablero);
//Solicita nombres de los jugadores y si los mismos quedan vacíos usará nombres por defecto
var jugador1 = document.getElementById('jugador1');
var jugador2 = document.getElementById('jugador2');
jugador1 = jugador1.innerHTML = prompt('Ingrese el nombre del primer jugador:');
jugador2 = jugador2.innerHTML = prompt('Ingrese el nombre del segundo jugador:');



if (jugador1.innerHTML == '' || jugador2.innerHTML == '' ){
   jugador1 = jugador1.innerHTML = 'Jugador1';
    jugador2 = jugador2.innerHTML = 'Jugador2';
}
console.log(jugador1);
//Variables
var casilla, piezaMovil, piezaMovilSeleccionada, posicion,jugador1 ,jugador2; 
var turno = 1;


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
        debugger;
        if (turno == 1){
        
            // Si el elemento no está seleccionado y hay un elemento hijo entonces
            if(!piezaMovilSeleccionada && e.currentTarget.querySelector('img[alt="Pieza_Blanca"]')) {
                casillero = e.currentTarget; 
                piezaMovil = e.currentTarget.innerHTML;
                e.currentTarget.querySelector('img[alt="Pieza_Blanca"]').classList.add("pintado"); 
                //Movimientos posibles activados
                ubicacion = e.currentTarget.id;
                fila = ubicacion.substring(4, 5);
                columna = ubicacion.substring(12);  
                
                if(columna == 7){ 
                    fila++;  
                    columna--;
                    ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna );
                    if (!ubicacionFinalUno.querySelector('img[alt="Pieza_Blanca"]')){
                    ubicacionFinalUno.classList.add('movimiento');
                    }
                
                } else {
                    if(columna == 0){
                        fila++;  
                        columna++;   
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna );
                        if (!ubicacionFinalUno.querySelector('img[alt="Pieza_Blanca"]')){
                            
                            ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna );
                            ubicacionFinalUno.classList.add('movimiento');
                            }
                
                    } else {
                        fila++;  
                        columna++;   
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna ); console.log('ubicacionFinalUno '+ubicacionFinalUno.id);
                        //Si en la ubicacion final
                        if (!ubicacionFinalUno.querySelector('img[alt="Pieza_Blanca"]')){
                            
                            ubicacionFinalUno.classList.add('movimiento');
                            }
                        columna = columna - 2;
                        ubicacionFinalDos = document.querySelector('#fila' + fila +'columna' + columna );
                        if (!ubicacionFinalDos.querySelector('img[alt="Pieza_Blanca"]')){
                            ubicacionFinalDos.classList.add('movimiento');
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
                objetoTablero.list[matrizFila][matrizColumna] = 1;
                if(posicion != casilla && posicion.id === movimiento[0].id || posicion.id === movimiento[1].id ){
                    casillero.innerHTML = ''; 
                
                //Moviendo la matriz     
                ubicacion = casillero.id;
                matrizFila = ubicacion.substring(4, 5);
                matrizColumna = ubicacion.substring(12);  
                objetoTablero.list[matrizFila][matrizColumna] = 0;


                    e.currentTarget.innerHTML = piezaMovil; 
                    piezaMovilSeleccionada = false;
                    turno = 2;
                    
                    pintarJugador();
                    
                    //Se remueve el efecto en las casillas porque ya movio la dama
                    columna = columna + 2;
                    
                    if(columna != 8){ 
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento');
                    }
                      columna = columna - 2;
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento');
                        columna = columna + 2;
                        ubicacionFinalDos = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento');
                }                   
            }
            //Si el elemento está seleccionadao y hay una pieza blanca
            else if(piezaMovilSeleccionada && e.currentTarget.querySelector('img[alt="Pieza_Blanca"]')){
                posicion = e.currentTarget;            
                if(posicion == casillero){
                    e.currentTarget.querySelector('img[alt="Pieza_Blanca"]').classList.remove("pintado");     
                    piezaMovilSeleccionada = false;
                    columna = columna + 2;
                    if(columna != 8){ 
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento');
                    }
                    columna = columna - 2;
                    ubicacionFinalDos = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento');
                    console.log('tocaste la misma ficha')
                }
            }
        
    
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
                
                if(columna == 7){ 
                    fila--;  
                    columna--;
                    ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna );
                    if (!ubicacionFinalUno.querySelector('img[alt="Pieza_Roja"]')){
                        ubicacionFinalUno.classList.add('movimiento');
                        }
                } else {
                    if(columna == 0){
                        fila--;  
                        columna++;   
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna );
                        if (!ubicacionFinalUno.querySelector('img[alt="Pieza_Roja"]')){
                            ubicacionFinalUno.classList.add('movimiento');
                            }
                    } else {
                        fila--;  
                        columna--;   
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna );
                        if (!ubicacionFinalUno.querySelector('img[alt="Pieza_Roja"]')){
                            ubicacionFinalUno.classList.add('movimiento');
                            }
                        columna = columna + 2;
                        ubicacionFinalDos = document.querySelector('#fila' + fila +'columna' + columna );
                        if (!ubicacionFinalDos.querySelector('img[alt="Pieza_Roja"]')){
                            ubicacionFinalDos.classList.add('movimiento');
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
                objetoTablero.list[matrizFila][matrizColumna] = 2;
                if(posicion != casilla && posicion.id === movimiento[0].id || posicion.id === movimiento[1].id ){
                    casillero.innerHTML = ''; 
                
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
                if(columna != 1){ 
                        columna = columna - 2;
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento');
                        columna = columna + 2;
                        ubicacionFinalDos = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento');
                    }  
                    ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento'); 
                } 
            } 
            else if(piezaMovilSeleccionada && e.currentTarget.querySelector('img[alt="Pieza_Roja"]')){
                posicion = e.currentTarget;            
                if(posicion == casillero){
                    e.currentTarget.querySelector('img[alt="Pieza_Roja"]').classList.remove("pintado");     
                    piezaMovilSeleccionada = false;
                
                    if(columna != 1){ 
                        columna = columna - 2;
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento');
                        columna = columna + 2;
                        ubicacionFinalDos = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento');
                    }  
                    ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento'); 
                
                    console.log('tocaste la misma ficha')                  
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
}

document.getElementById('cargar').addEventListener('click', cargar);
function cargar(){
    // Carga la partida guardada con el nombre de los jugadores
    objetoTablero.list = JSON.parse(localStorage.getItem('partida'));
    turno =  JSON.parse(localStorage.getItem('turno'));
    var jugador1 = document.getElementById('jugador1');
    var jugador2 = document.getElementById('jugador2');
    jugador1 = jugador1.innerHTML =  JSON.parse(localStorage.getItem('jugador1'));
    jugador2 = jugador2.innerHTML =  JSON.parse(localStorage.getItem('jugador2'));

    pintarJugador();
    console.log(objetoTablero.list);  
    console.log(jugador1);  
    console.log(jugador2);  
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
    botonCuadrosNegros();
    turno = 1;
    pintarJugador();
}

function resetearTablero(){
    //Resetea el tablero para volver a cargarlo con las nuevas posiciones
    tablero.innerHTML = '';
    generarTablero();
    rellenarTablero();
    botonCuadrosNegros();
}

