document.addEventListener("DOMContentLoaded", () => {
    const contenedorProductos = document.getElementById("contenedor-productos");
    const tituloPrincipal = document.getElementById("titulo-principal");
    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    const openMenu = document.getElementById("open-menu");
    const closeMenu = document.getElementById("close-menu");
    const asideMenu = document.querySelector(".aside-visible");
    const numerito = document.getElementById("numerito");

    let productos = [];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Recuperar carrito del localStorage

    // Cargar productos desde el archivo JSON
    fetch('./js/productos.json')
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar productos.json");
            return response.json();
        })
        .then(data => {
            productos = data;
            mostrarProductos(productos); // Mostrar todos los productos al inicio
            actualizarContadorCarrito(); // Refrescar el contador del carrito
        })
        .catch(error => console.error("Error al cargar productos:", error));

    // Función para mostrar los productos
    function mostrarProductos(listaProductos) {
        contenedorProductos.innerHTML = "";

        if (listaProductos.length === 0) {
            contenedorProductos.innerHTML = `<p>No se encontraron productos en esta categoría.</p>`;
            return;
        }

        listaProductos.forEach(producto => {
            const productoHTML = `
                <div class="producto">
                    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" onerror="this.src='./img/default.jpg'">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
                    </div>
                </div>
            `;
            contenedorProductos.insertAdjacentHTML("beforeend", productoHTML);
        });
    }

    // Evento para filtrar productos por categoría
    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", () => {
            const categoriaId = boton.id.trim().toLowerCase();

            tituloPrincipal.textContent =
                categoriaId === "todos" ? "Todos los productos" : boton.textContent.trim();

            const productosFiltrados = categoriaId === "todos"
                ? productos
                : productos.filter(producto => producto.categoria.id.trim().toLowerCase() === categoriaId);

            mostrarProductos(productosFiltrados);

            // Resaltar el botón seleccionado
            botonesCategorias.forEach(btn => btn.classList.remove("active"));
            boton.classList.add("active");
        });
    });

    // Abrir el menú lateral
    openMenu.addEventListener("click", () => {
        asideMenu.classList.add("open");
    });

    // Cerrar el menú lateral
    closeMenu.addEventListener("click", () => {
        asideMenu.classList.remove("open");
    });

    // Función para agregar producto al carrito
    function agregarAlCarrito(event) {
        const idProducto = event.target.dataset.id; // Capturamos el ID del producto

        // Buscamos / comprobamos  si el producto ya está en el carrito
        const productoExistente = carrito.find(producto => producto.id === idProducto);

        if (productoExistente) {
            // Incrementar cantidad si ya existe (Es decur, aumentamos el nº del carrito)
            productoExistente.cantidad += 1;
        } else {
            // Añadir producto nuevo al carrito
            const productoSeleccionado = productos.find(producto => producto.id === idProducto);
            if (productoSeleccionado) {
                carrito.push({ ...productoSeleccionado, cantidad: 1 });
            }
        }

        // Guardar en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContadorCarrito();
    }

    // Actualizar contador del carrito
    function actualizarContadorCarrito() {
        const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        numerito.textContent = totalProductos; // Actualiza el número de productos en la interfaz
    }

    // Event Listener para los botones "Agregar"
    contenedorProductos.addEventListener("click", (event) => {
        if (event.target.classList.contains("producto-agregar")) {
            agregarAlCarrito(event);
        }
    });

    // Al cargar la página, actualizar el contador del carrito
    actualizarContadorCarrito();
});
