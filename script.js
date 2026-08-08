const formulario = document.querySelector("#formulario-contacto");

if (formulario) {
    const mensaje = document.querySelector("#mensaje");
    const contador = document.querySelector("#contador");

    mensaje.addEventListener("input", function () {
        contador.textContent = `${mensaje.value.length} / 500 caracteres`;
    });

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores();

        const nombre = document.querySelector("#nombre");
        const correo = document.querySelector("#correo");
        const asunto = document.querySelector("#asunto");
        const terminos = document.querySelector("#terminos");
        let formularioValido = true;

        if (nombre.value.trim().length < 3) {
            mostrarError("nombre", "Escribe un nombre de al menos 3 caracteres.");
            formularioValido = false;
        }

        if (!correo.validity.valid) {
            mostrarError("correo", "Escribe un correo electrónico válido.");
            formularioValido = false;
        }

        if (asunto.value === "") {
            mostrarError("asunto", "Selecciona un asunto.");
            formularioValido = false;
        }

        if (mensaje.value.trim().length < 10) {
            mostrarError("mensaje", "El mensaje debe tener al menos 10 caracteres.");
            formularioValido = false;
        }

        if (!terminos.checked) {
            mostrarError("terminos", "Debes aceptar antes de enviar.");
            formularioValido = false;
        }

        if (formularioValido) {
            document.querySelector("#mensaje-exito").textContent = "Formulario validado correctamente. Esta es una demostración y los datos no fueron enviados.";
            formulario.reset();
            contador.textContent = "0 / 500 caracteres";
        }
    });
}

function mostrarError(campo, texto) {
    const elemento = document.querySelector(`#${campo}`);
    const error = document.querySelector(`#error-${campo}`);
    elemento.setAttribute("aria-invalid", "true");
    error.textContent = texto;
}

function limpiarErrores() {
    document.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
    });
    document.querySelectorAll("[aria-invalid]").forEach(function (campo) {
        campo.removeAttribute("aria-invalid");
    });
    document.querySelector("#mensaje-exito").textContent = "";
}
