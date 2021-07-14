//Arreglo de tablero
var arregloTablero = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0]
];

//Variables
var casilla, piezaMovil, piezaMovilSeleccionada, posicion,jugador1 ,jugador2; 
var turno = 1;

//Tablero
var tablero = document.getElementById("tablero"), contador = 0;

for (var i = 0; i < arregloTablero.length; i++) {

        var divFila = document.createElement('tr');
        divFila.className = 'fila';
        tablero.appendChild(divFila);
        contador = i % 2;
        for (var j = 0; j < arregloTablero.length; j++) {
            var casilla = document.createElement('td');
            if (contador === 0) {
                casilla.className = 'recuadroBlanco';
                contador++;
            }else{
                casilla.className = 'recuadroNegro';
                contador--;
            }
            casilla.id = 'fila' + i + 'columna' + j;
            
            divFila.appendChild(casilla);
        }
}

//Fichas
//Recorre el tablero y agrega las fichas de acuerdo al array arregloTablero
for (var m = 0; m < arregloTablero.length; m++) {  

    for (var n = 0; n < arregloTablero.length; n++) { 
        //Ficha Blanca corresponde a 1
        if (arregloTablero[m][n] === 1) {
            var piezaBlanca = document.createElement('img');
            piezaBlanca.src = 'imgs/PiezaBlanca.png';
            piezaBlanca.alt = 'Pieza_Blanca';
            piezaBlanca.className = 'fichas';
            document.getElementById('fila' + m +'columna' + n).appendChild(piezaBlanca);
            
        //Ficha Roja corresponde a 2
        }else if (arregloTablero[m][n] === 2){
            var piezaRoja = document.createElement('img');
            piezaRoja.src = 'imgs/PiezaRoja.png';
            piezaRoja.alt = 'Pieza_Roja';
            piezaRoja.className = 'fichas';
            document.getElementById('fila' + m +'columna' + n).appendChild(piezaRoja);
        }
        
    }
}


//Recorre el arreglo para darle boton de seleccion por casilla
var casillas = document.getElementsByClassName('recuadroNegro'); 
for(x=0; x<casillas.length; x++) {
    casillas[x].addEventListener('click', seleccionaPieza);
    }
    console.log(casillas.length)


    function seleccionaPieza(e) {
        if (turno == 1){
            if(!piezaMovilSeleccionada && e.currentTarget.firstElementChild) {
                casillero = e.currentTarget; 
                piezaMovil = e.currentTarget.innerHTML;
                //Envia datos de la posición actual de la ficha a la web STACKOVERFLOW
                var datos = casillero;
                fetch('https://stackoverflow.com', {
                    method: 'POST',
                    body: datos
                })
                .then (res => res.json())
                .then (data => {
                    console.log(data);
                }) 


                e.currentTarget.querySelector('img[alt="Pieza_Blanca"]').classList.add("pintado"); 
                //Movimientos posibles activados
                ubicacion = e.currentTarget.id;
                fila = ubicacion.substring(4, 5); 
                columna = ubicacion.substring(12);
                
                if(columna == 7){ 
                    fila++;  
                    columna--;
                    ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna );
                    if (!ubicacionFinalUno.firstElementChild){
                    ubicacionFinalUno.classList.add('movimiento');
                    }
                
                } else {
                    if(columna == 0){
                        fila++;  
                        columna++;   
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna );
                        if (!ubicacionFinalUno.firstElementChild){
                            ubicacionFinalUno.classList.add('movimiento');
                            }
                
                    } else {
                        fila++;  
                        columna++;   
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna );
                        if (!ubicacionFinalUno.firstElementChild){
                            ubicacionFinalUno.classList.add('movimiento');
                            }
                        columna = columna - 2;
                        ubicacionFinalDos = document.querySelector('#fila' + fila +'columna' + columna );
                        if (!ubicacionFinalDos.firstElementChild){
                            ubicacionFinalDos.classList.add('movimiento');
                            }
                    }
                }

                movimiento = document.querySelectorAll('.movimiento');
                piezaMovilSeleccionada = true;
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

            else if(piezaMovilSeleccionada && !e.currentTarget.firstElementChild){                
                posicion = e.currentTarget;
                //Envia datos de la nueva posición de la ficha a la web STACKOVERFLOW
                var datos = posicion;
                fetch('https://stackoverflow.com', {
                    method: 'POST',
                    body: datos
                })
                .then (res => res.json())
                .then (data => {
                    console.log(data);
                }) 
                console.log('ultima posicion: ');
                console.log (posicion.id)
                if(posicion != casilla && posicion.id === movimiento[0].id || posicion.id === movimiento[1].id ){
                    casillero.innerHTML = ''; 
                    e.currentTarget.innerHTML = piezaMovil; 
                    piezaMovilSeleccionada = false;
                    turno = 2;
                    
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

                    //Se remueve el efecto en las casillas porque ya movio la dama
                    columna = columna + 2;
                    
                    if(columna != 8){ 
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento');
                    }
                    columna = columna - 2;
                    ubicacionFinalDos = document.querySelector('#fila' + fila +'columna' + columna ).classList.remove('movimiento'); 
                }                   
            }
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
                 //Envia datos de la posición actual de la ficha a la web STACKOVERFLOW
                var datos = casillero;
                fetch('https://stackoverflow.com', {
                    method: 'POST',
                    body: datos
                })
                .then (res => res.json())
                .then (data => {
                    console.log(data);
                }) 


                e.currentTarget.querySelector('img[alt="Pieza_Roja"]').classList.add("pintado");
                //Movimientos posibles activados
                ubicacion = e.currentTarget.id;
                fila = ubicacion.substring(4, 5); 
                columna = ubicacion.substring(12);
                
                if(columna == 7){ 
                    fila--;  
                    columna--;
                    ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna );
                    if (!ubicacionFinalUno.firstElementChild){
                        ubicacionFinalUno.classList.add('movimiento');
                        }
                } else {
                    if(columna == 0){
                        fila--;  
                        columna++;   
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna );
                        if (!ubicacionFinalUno.firstElementChild){
                            ubicacionFinalUno.classList.add('movimiento');
                            }
                    } else {
                        fila--;  
                        columna--;   
                        ubicacionFinalUno = document.querySelector('#fila' + fila +'columna' + columna );
                        if (!ubicacionFinalUno.firstElementChild){
                            ubicacionFinalUno.classList.add('movimiento');
                            }
                        columna = columna + 2;
                        ubicacionFinalDos = document.querySelector('#fila' + fila +'columna' + columna );
                        if (!ubicacionFinalDos.firstElementChild){
                            ubicacionFinalDos.classList.add('movimiento');
                            }
                    }
                }

                movimiento = document.querySelectorAll('.movimiento');

                piezaMovilSeleccionada = true;
                
                //Pinta la ficha del titulo del jugador de turno
                var fichaJugador2 = document.getElementById("img-jugador2");
                fichaJugador2.classList.add("pintado");
                var fichaJugador1 = document.getElementById("img-jugador1");
                fichaJugador1.classList.remove("pintado");
                //Pinta el nombre del jugador de turno y despinta al otro
                var jugador1 = document.getElementById("jugador1");
                jugador1.style.color = '';
                var jugador2 = document.getElementById("jugador2");
                jugador2.style.color = 'lightblue'; 
                
            }
            else if(piezaMovilSeleccionada  && !e.currentTarget.firstElementChild){
                posicion = e.currentTarget;
                //Envia datos de la nueva posición de la ficha a la web STACKOVERFLOW
                var datos = posicion;
                fetch('https://stackoverflow.com', {
                    method: 'POST',
                    body: datos
                })
                .then (res => res.json())
                .then (data => {
                    console.log(data);
                }) 
                console.log('ultima posicion: '); 
                if(posicion != casilla && posicion.id === movimiento[0].id || posicion.id === movimiento[1].id){
                casillero.innerHTML= ''; 
                e.currentTarget.innerHTML = piezaMovil; 
                piezaMovilSeleccionada = false;
                posicion = e.currentTarget;
                turno = 1;
                //Despinta ficha de titulo cuando ya no es tu turno
                var fichaJugador2 = document.getElementById("img-jugador2");
                fichaJugador2.classList.remove("pintado");
                var fichaJugador1 = document.getElementById("img-jugador1");
                fichaJugador1.classList.add("pintado");
    
                //Despinta nombre cuando ya no es tu turno
                var jugador1 = document.getElementById("jugador1");
                jugador1.style.color = 'lightblue';
                var jugador2 = document.getElementById("jugador2");
                jugador2.style.color = '';

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
