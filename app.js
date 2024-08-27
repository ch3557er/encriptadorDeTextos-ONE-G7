// Declaración de variables
const encriptar = document.getElementById("btn__encriptar");
const coppiar = document.getElementById("btn__copiar");
const desencriptar = document.getElementById("btn__desencriptar");
const textoInicial = document.getElementById("entrada__texto");
const textoFinal = document.getElementById("texto__final");
const textoInformativo = document.getElementById("texto__informativo");
const persona = document.getElementById("persona");
const derecho = document.getElementById("derecho");

let reemplazar = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"]
];

// Función para validar que el texto solo tenga letras minúsculas sin acentos ni caracteres especiales
const validacionTexto = (texto) => /^[a-z\s]*$/.test(texto);

// Función para encriptar el texto
const encriptadoTexto = (texto) => {
    for (let [letra, codigo] of reemplazar) {
        texto = texto.replaceAll(letra, codigo);
    }
    return texto;
};

// Función para desencriptar el texto
const desencriptadoTexto = (texto) => {
    for (let [codigo, letra] of reemplazar) {
        texto = texto.replaceAll(letra, codigo);
    }
    return texto;
};

// Mostrar el texto en la pantalla
const reemplazando = (newvalue) => {
    textoFinal.innerHTML = newvalue;
    textoFinal.classList.add("ajustar");
    derecho.classList.add("ajuste");
    textoInicial.value = "";
    textoInicial.style.height = "auto";
    textoInicial.placeholder = "Ingrese el texto aquí";
    persona.classList.add("ocultar");
    textoInformativo.classList.add("ocultar");
    coppiar.classList.remove("accion_ocultar");
};

// Función para reiniciar el formulario
const reset = () => {
    textoInicial.value = "";
    textoInicial.style.height = "auto";
    textoFinal.innerHTML = "";
    derecho.classList.remove("ajuste");
    textoFinal.classList.remove("ajustar");
    persona.classList.remove("ocultar");
    textoFinal.placeholder = "Ningún mensaje fue encontrado";
    textoInformativo.classList.remove("ocultar");
    coppiar.classList.add("accion_ocultar");
    textoInicial.focus();
};

// Evento para encriptar
encriptar.addEventListener('click', () => {
    const texto = textoInicial.value;
    if (validacionTexto(texto)) {
        reemplazando(encriptadoTexto(texto.toLowerCase()));
    } else {
        alert("Ingrese solo letras minúsculas sin acentos ni caracteres especiales");
        reset();
    }
});

// Evento para desencriptar
desencriptar.addEventListener('click', () => {
    const texto = textoInicial.value;
    if (validacionTexto(texto)) {
        reemplazando(desencriptadoTexto(texto.toLowerCase()));
    } else {
        alert("Ingrese solo letras minúsculas sin acentos ni caracteres especiales.");
        reset();
    }
});

// Evento para copiar el texto encriptado/desencriptado
coppiar.addEventListener("click", () => {
    navigator.clipboard.writeText(textoFinal.textContent).then(() => {
        alert("Texto Copiado");
        reset();
    }).catch(err => {
        console.error("Error al copiar el texto: ", err);
    });
});

// Autoajuste del textarea
textoInicial.addEventListener("input", e => {
    textoInicial.style.height = "auto";
    textoInicial.style.height = `${e.target.scrollHeight}px`;
});
