document.addEventListener("DOMContentLoaded", () => {
    const contenedorProductos = document.getElementById("contenedor-productos");
    const tituloPrincipal = document.getElementById("titulo-principal");

    // Botones de categorías
    const botonesCategorias = document.querySelectorAll(".boton-categoria");

    let productos = [];

    // Cargar productos desde el archivo JSON
    fetch('./js/productos.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error al cargar productos.json: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            productos = data;
            mostrarProductos(productos); // Mostrar todos los productos por defecto
        })
        .catch((error) => console.error("Error al cargar productos:", error));

    // Función para mostrar los productos
    function mostrarProductos(listaProductos) {
        contenedorProductos.innerHTML = ""; // Limpiar el contenedor
        if (listaProductos.length === 0) {
            contenedorProductos.innerHTML = `<p>No se encontraron productos en esta categoría.</p>`;
            return;
        }

        listaProductos.forEach((producto) => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" onerror="this.src='../img/default.jpg'">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
                </div>
            `;
            contenedorProductos.appendChild(div);
        });
    }

    // Filtrar productos por categoría
    botonesCategorias.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const categoriaId = e.target.id;

            // Cambiar el título principal
            tituloPrincipal.textContent =
                categoriaId === "todos" ? "Todos los productos" : categoriaId.charAt(0).toUpperCase() + categoriaId.slice(1);

            // Filtrar productos
            const productosFiltrados =
                categoriaId === "todos"
                    ? productos
                    : productos.filter((producto) => producto.categoria.id === categoriaId);

            mostrarProductos(productosFiltrados);

            // Resaltar el botón seleccionado
            botonesCategorias.forEach((btn) => btn.classList.remove("active"));
            e.target.classList.add("active");
        });
    });
});
