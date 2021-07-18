
const form = document.getElementById('formulario');
var nombre = document.getElementById('nombre'), email = document.getElementById('email'), comentario = document.getElementById('mensaje');

formulario.addEventListener('submit', (e) => {
    // Evitamos que el formulario se envie con los datos por defecto
    e.preventDefault();
    // Validamos los campos
    var formatoEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(comentario.value == ' ' || nombre.value.length < 6){
        alert('El campo está vacío o el nombre es demasiado corto');
    } else {
        if (!formatoEmail.test(email.value)) {
            alert('email inválido');
        } else {
            if (comentario.value == ' ' || comentario.value.length < 10) {
                alert('El campo está vacío o el comentario es demasiado breve');
            } else {
                // Enviamos el formulario y reseteamos campos
                sendData(formulario);
                formulario.reset();
                alert('Formulario enviado');
            }
        }
    }
})

// Recibe el formulario mediante data
const sendData = (data) => {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest;
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
//Recibe el mensaje en un archivo php que a través de localhost se comprobó que los datos llegan y se guardan
    xhr.open('POST', 'marvel.php');
    const formData = new FormData(data);
    xhr.send(formData);
}

