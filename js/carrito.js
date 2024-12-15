document.addEventListener("DOMContentLoaded", () => {
    const productosCarrito = document.getElementById("carrito-productos"); // Contenedor de productos
    const totalCarrito = document.getElementById("Total"); // Total del carrito
    const carritoVacio = document.getElementById("carrito-vacio"); // Mensaje del carrito vacío
    const carritoAcciones = document.querySelector(".carrito-acciones"); // Contenedor de acciones
    const carritoComprado = document.getElementById("carrito-comprado"); // Mensaje de compra realizada
    const numerito = document.getElementById("numerito"); // Contador del carrito en la interfaz

    // Recuperar el carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Mostrar los productos al cargar la página
    mostrarCarrito();

    // Función para mostrar los productos del carrito
    function mostrarCarrito() {
        productosCarrito.innerHTML = ""; // Con esto limpiamos el contenedor

        if (carrito.length === 0) {
            carritoVacio.style.display = "block";
            carritoAcciones.style.display = "none";
        } else {
            carritoVacio.style.display = "none";
            carritoAcciones.style.display = "flex";

            carrito.forEach(producto => {
                const div = document.createElement("div");
                div.classList.add("carrito-producto");
                div.innerHTML = `
                    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                        <small>Título</small>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>$${producto.precio}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>$${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="carrito-producto-comprar" data-id="${producto.id}">Comprar</button>
                    <button class="carrito-producto-eliminar" data-id="${producto.id}">Eliminar</button>
                `;
                productosCarrito.appendChild(div);
            });

            actualizarTotal(); // Actualizamos el total del carrito
            actualizarContadorCarrito(); // Actualizamos el contador del carrito
        }
    }

    // Función para actualizar el total del carrito
    function actualizarTotal() {
        const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        totalCarrito.textContent = `$${total}`;
    }

    // Función para actualizar el contador del carrito
    function actualizarContadorCarrito() {
        const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        numerito.textContent = totalProductos; // Actualiza el número en el carrito a la derecha
    }

    // Evento para eliminar un producto del carrito
    productosCarrito.addEventListener("click", (e) => {
        if (e.target.classList.contains("carrito-producto-eliminar")) {
            const idProducto = e.target.dataset.id;
            carrito = carrito.filter(producto => producto.id !== idProducto);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }

        if (e.target.classList.contains("carrito-producto-comprar")) {
            const idProducto = e.target.dataset.id;
            alert(`¡Has comprado el producto con ID: ${idProducto}!`);
        }
    });

    // Evento para vaciar el carrito
    const botonVaciar = document.querySelector(".carrito-acciones-vaciar");
    botonVaciar.addEventListener("click", () => {
        if (confirm("¿Estás seguro que quieres eliminar todos los productos del carrito?")) {
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }
    });

    // Cargamos el  carrito al iniciar la página y actualizamos el contador
    mostrarCarrito();
    actualizarContadorCarrito();

    // Selección de elementos
    const openMenuButton = document.getElementById('open-menu');
    const closeMenuButton = document.getElementById('close-menu');
    const asideMenu = document.getElementById('aside-menu');

    // Evento para abrir el menú
    openMenuButton.addEventListener('click', () => {
    asideMenu.classList.add('open'); // Añade la clase 'open' al menú
});

// Evento para cerrar el menú
closeMenuButton.addEventListener('click', () => {
    asideMenu.classList.remove('open'); // Elimina la clase 'open' del menú
});

});
