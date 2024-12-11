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

         // Longitud mínima mayor a 2 (Aunque no se pedía explicitamente, puse esta condición
         // para que si el usuario pone 1 caracter, de fallo, ya que, no conozco un nombre de una persona
         // con solo 1 caracter, con tres, sí, Sol, por ejemplo)
        if (username.length < 3) {
            showError(errorNombre, 'El nombre debe tener al menos 3 caracteres.');
            return false;
        }

        // Caso 2: Formato inválido
        const usernameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüñÑ\s]+$/; // Esta validación nos permite emplear
        // mayúsculas, minúsculas, acentos, la ñ y espacios en blanco.
        if (!usernameRegex.test(username)) {
            showError(errorNombre, 'Nombre inválido.');
            return false;
        }

        // Caso 3: Longitud máxima
        if (username.length > 20) {
            showError(errorNombre, 'El nombre no puede tener más de 20 caracteres.');
            return false;
        }

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
        const passwordRegex = /^[a-zA-Z0-9!$%&/()*+,-.:;=?@_]+$/; // A diferencia de la validación del nombre de usuario
        // esta, nos permite emplear números y algunos caracteres especiales como
        //  ·$%&/(). (Lo que nos pide el profesor)
        if (password.length < 8 || password.length > 16 || !passwordRegex.test(password)) {
            showError(
                errorPassword,
                'La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y caracteres $%&/().'
            );
            return false;
        }

        return true;
    }

    // Evento de envío del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Con esta estructura, prevenimos el envío del formulario si hay errores

        clearErrors(); 
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();

        if (isUsernameValid && isPasswordValid) {
            alert('Formulario enviado con éxito.');
        }
    });

    // Empleamos el evento blur tal y como nos dijo el profesor para mejorar
    // la experiencia de usuario al escribir en los inputs del formulario.
    // Aquí, al perder el foco de un input, se ejecuta la función de validación correspondiente.
    // Esto puede ayudar a reducir el tiempo de espera al usuario al escribir en los inputs y a
    // que se muestren los errores en tiempo real.
    usernameInput.addEventListener('blur', validateUsername);
    passwordInput.addEventListener('blur', validatePassword);

    // Evento del botón limpiar
    clearButton.addEventListener('click', () => {
        usernameInput.value = '';
        passwordInput.value = '';
        clearErrors();
    });
});
