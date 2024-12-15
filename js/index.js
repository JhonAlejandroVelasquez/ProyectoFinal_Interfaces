document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#formulario');
    const usernameInput = document.querySelector('#nombre');
    const passwordInput = document.querySelector('#password');
    const errorNombre = document.querySelector('#error-nombre');
    const errorPassword = document.querySelector('#error-password');
    const clearButton = document.querySelector('#limpiar');

    // Función para mostrar los mensajes de error del pdf
    function showError(element, message) {
        element.textContent = message;
        element.style.color = '#961818'; // Le ponemos el color rojo a los mensajes de error
    }

    // Función para limpiar mensajes de error
    function clearErrors() {
        errorNombre.textContent = '';
        errorPassword.textContent = '';
    }

    // Validación del nombre de usuario
    function validateUsername() {
        const username = usernameInput.value.trim();

        // Caso 1: Campo vacío
        if (username === '') {
            showError(errorNombre, 'Nombre obligatorio.');
            return false;
        }

        // Caso 2: Longitud mínima
        if (username.length < 3) {
            showError(errorNombre, 'El nombre debe tener al menos 3 caracteres.');
            return false;
        }

        // Caso 3: Formato inválido
        const usernameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüñÑ\s]+$/; // Esta validación nos permite emplear
        // mayúsculas, minúsculas, acentos, la ñ y espacios en blanco.
        if (!usernameRegex.test(username)) {
            showError(errorNombre, 'Nombre inválido.');
            return false;
        }

        // Caso 4: Longitud máxima
        if (username.length > 20) {
            showError(errorNombre, 'El nombre no puede tener más de 20 caracteres.');
            return false;
        }

        // Si todo está bien, limpiar el mensaje de error
        errorNombre.textContent = '';
        return true;
    }

    // Validación de la contraseña
    function validatePassword() {
        const password = passwordInput.value.trim();

        // Caso 1: Campo vacío
        if (password === '') {
            showError(errorPassword, 'La contraseña es obligatoria.');
            return false;
        }

        // Caso 2: Formato inválido
        const passwordRegex = /^[a-zA-Z0-9!$%&/()*+,-.:;=?@_]+$/; // Esta validación nos permite emplear
        // números y algunos caracteres especiales como ·$%&/(). (Lo que nos pide el profesor)
        if (password.length < 8 || password.length > 16 || !passwordRegex.test(password)) {
            showError(
                errorPassword,
                'La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y caracteres $%&/().'
            );
            return false;
        }

        // Si todo está bien, limpiar el mensaje de error
        errorPassword.textContent = '';
        return true;
    }

    // Evento de envío del formulario
    form.addEventListener('submit', (event) => {
        clearErrors(); // Limpiamos errores previos antes de validar nuevamente
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();

        // Si alguna validación falla, prevenimos el envío del formulario
        if (!isUsernameValid || !isPasswordValid) {
            event.preventDefault(); // Evita que el formulario se envíe
        }
    });

    // Empleamos el evento blur tal y como nos dijo el profesor para mejorar
    // la experiencia de usuario al escribir en los inputs del formulario.
    // Aquí, al perder el foco de un input, se ejecuta la función de validación correspondiente.
    // Esto puede ayudar a reducir el tiempo de espera al usuario al escribir en los inputs y a
    // que se muestren los errores en tiempo real.
    usernameInput.addEventListener('blur', validateUsername);
    passwordInput.addEventListener('blur', validatePassword);

    // Mejoramos la experiencia con el evento 'input' para limpiar errores en tiempo real
    usernameInput.addEventListener('input', validateUsername);
    passwordInput.addEventListener('input', validatePassword);

    // Evento del botón limpiar
    clearButton.addEventListener('click', () => {
        // Limpiamos los valores de los campos de texto
        usernameInput.value = '';
        passwordInput.value = '';

        // Limpiamos todos los mensajes de error
        clearErrors();
    });
});
