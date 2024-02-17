let mensajeProcesado = []; // variable que recibe el mensaje resultado final de encriptado.
let mensajeProcesar = ""; // variable que recibe el mensaje que se quiere encriptar o desencriptar.
let claveEncriptacion = { "e" : "enter", "i" : "imes", "a" : "ai", "o" : "ober", "u" : "ufat"};
let claveAvanceContador = { "e" : 4, "i" : 3, "a" : 1, "o" : 3, "u" : 3}; //se usa en la función para desencriptar.
let abecedario = 'abcdefghijklmnñopqrstuvwxyz:;,.!¡¿?-_"';

// función que toma el mensaje a encriptar y lo asigna a la variable.
function asignarMensaje(accion){
    mensajeProcesar = ""; //reinicia la variable
    mensajeProcesado = []; //reinicia la variable 
    mensajeProcesar = document.getElementById("ingresoTexto").value; //asigna texto a la variable.      
    if (accion === "encriptar") {
        if (revisarCaracteres(mensajeProcesar)) {
            encriptar(mensajeProcesar);    
        } else{
            alert("No puedes usar mayúsculas o caracteres especiales");
        }
           
    } else if (accion === "desencriptar") {
        desencriptar(mensajeProcesar); 
    }           
}

//función que revisa si no hay mayusculas o caracteres especiales
function revisarCaracteres(mensaje){
    for (let i = 0; i < mensaje.length; i++) {
        // revisa si la letra está en el abecedario y no es un espacio en blanco
        if (mensaje[i] != " " && abecedario.indexOf(mensaje[i]) == -1){  
            return false;            
        } 
    }  
    return true;
}

// función que encripta el mensaje.
function encriptar(mensaje) {
    let claves = Object.keys(claveEncriptacion);
    for (let i = 0; i < mensaje.length; i++) {
        if (claves.includes(mensaje[i])){  // revisa si la letra debe encriptarse
            mensajeProcesado.push(claveEncriptacion[mensaje[i]]);
        } else{
            mensajeProcesado.push((mensaje[i]));
        }          
    }
    mostrarMensaje(mensajeProcesado);
}

// función que desencripta el mensaje.
function desencriptar(mensaje) {
    let claves = Object.keys(claveEncriptacion);
    for (let i = 0; i < mensaje.length; i++) {
        if (claves.includes(mensaje[i])){ //revisa si la letra debe desencriptarse
            mensajeProcesado.push((mensaje[i])); //copia la primera letra de la palabra encriptada
            i = i + claveAvanceContador[mensaje[i]];  //salta el resto de la palabra encriptada y continua con la siguente letra
        } else{
            mensajeProcesado.push((mensaje[i]));
        }          
    }
    mostrarMensaje(mensajeProcesado);
            
}

// función que muestra el mensaje encriptado en pantalla
function mostrarMensaje(mensaje) {
    elementoHTML=document.getElementById("salidaTexto");
    elementoHTML.style.backgroundImage = "none"; //quita la imagen para poder mostrar el mensaje.
    elementoHTML.value = mensaje.join(""); //muestra el mensaje encriptado o desencriptado.    

    //quitar de pantalla información en área para mostrar el texto 
    let contenedor = document.getElementById("contenedorTexto").getElementsByTagName("p");
    for (let index = 0; index < contenedor.length; index++) {
        element = contenedor[index];
        element.style.display = "none";
    }

    //muestra el botón copiar que estaba oculto.    
    document.getElementById("copiar").style.display = "block"; 
    
    //revisa si se usa un móvil o una tablet para aumentar el tamaño del campo que muestra el mensaje
    if (window.matchMedia("(max-width: 430px)").matches) {
        // pantalla menor a 430px
        document.getElementById("salidaTexto").style.display = "block";
        document.getElementById("salidaTexto").style.height = "50vh"; 
    } else if (window.matchMedia("(max-width: 820px)").matches){
        //pantalla menor a 820px y mayor a 430px
        document.getElementById("salidaTexto").style.display = "block";
        document.getElementById("salidaTexto").style.height = "25vh";
    }

    //borra el área de ingreso de mensaje
    document.getElementById("ingresoTexto").value = ""; 

}

// Copia el mensaje procesado en el clipboard y alista el encriptador para procesar un nuevo mensaje
function copiar() {
    let textoCopiar = document.getElementById("salidaTexto").value;
    navigator.clipboard.writeText(textoCopiar); // copia el mensaje al clipboard
}

// Devuelve la página a los valores cuando se cargó
function reset() {
    // reinicia las variables
    mensajeProcesado = []; 
    mensajeProcesar = ""; 

    //borra las textareas    
    document.getElementById("ingresoTexto").value = "";     
    document.getElementById("salidaTexto").value = "";  

    //quita el botón "copiar"
    document.getElementById("copiar").style.display = "none"; 

    //mostrar en pantalla información en área para mostrar el texto 
    let contenedor = document.getElementById("contenedorTexto").getElementsByTagName("p");
    for (let index = 0; index < contenedor.length; index++) {
        element = contenedor[index];
        element.style.display = "block";
    } 

    /*coloca nuevamente la imagén "Muñeco" en el área de lectura, 
    cambia los tamaños del área que muestra el mensaje procesado en móvil o tablet.*/    
    if (window.matchMedia("(max-width: 430px)").matches) {
        // pantalla menor a 430px
        document.getElementById("salidaTexto").style.display = "none";         
    } else if (window.matchMedia("(max-width: 820px)").matches){
        //pantalla menor a 820px y mayor a 430px
        document.getElementById("salidaTexto").style.display = "none";        
    } else{
        document.getElementById("salidaTexto").style.backgroundImage = 'url("imagenes/Muñeco.jpg")';
    }      
 
    
    
}


