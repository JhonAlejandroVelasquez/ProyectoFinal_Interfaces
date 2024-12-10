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

    // Evento del botón limpiar
    clearButton.addEventListener('click', () => {
        usernameInput.value = '';
        passwordInput.value = '';
        clearErrors();
    });
});



    // Código del main.html

    document.addEventListener("DOMContentLoaded", () => {
    const contenedorProductos = document.getElementById("contenedor-productos");
    const botonesCategoria = document.querySelectorAll(".boton-categoria");
    const numeritoCarrito = document.getElementById("numerito");

    let productos = [];
    let carrito = [];

    // Cargar los productos desde el JSON
    const cargarProductos = async () => {
        try {
            const respuesta = await fetch("./productos.json");
            productos = await respuesta.json();
            mostrarProductos(productos);
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    };

    // Mostrar productos en el contenedor
    const mostrarProductos = (productos) => {
        contenedorProductos.innerHTML = ""; // Limpiar el contenedor
        productos.forEach((producto) => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
                </div>
            `;
            contenedorProductos.appendChild(div);
        });

        // Agregar eventos a los botones de agregar
        document.querySelectorAll(".producto-agregar").forEach((boton) =>
            boton.addEventListener("click", agregarAlCarrito)
        );
    };

    // Filtrar productos por categoría
    botonesCategoria.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const categoriaId = e.currentTarget.id;

            botonesCategoria.forEach((btn) => btn.classList.remove("active"));
            e.currentTarget.classList.add("active");

            if (categoriaId === "todos") {
                mostrarProductos(productos);
            } else {
                const productosFiltrados = productos.filter(
                    (producto) => producto.categoria.id === categoriaId
                );
                mostrarProductos(productosFiltrados);
            }
        });
    });

    // Agregar producto al carrito
    const agregarAlCarrito = (e) => {
        const idProducto = e.currentTarget.dataset.id;
        const productoSeleccionado = productos.find(
            (producto) => producto.id === idProducto
        );

        carrito.push(productoSeleccionado);
        actualizarCarrito();
    };

    // Actualizar el número del carrito
    const actualizarCarrito = () => {
        numeritoCarrito.textContent = carrito.length;
    };

    // Inicializar la app
    cargarProductos();
});
