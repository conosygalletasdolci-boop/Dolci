/* ========================================
   DOLCI
   FUNCIONAMIENTO DE LA PÁGINA
======================================== */


/* ========================================
   PRODUCTOS POR CATEGORÍA
======================================== */

const productos = {

  conos: [
    "Cono tradicional",
    "Cono pequeño",
    "Cono grande"
  ],

  galletas: [
    "Galletas tradicionales",
    "Galletas especiales"
  ],

  canastas: [
    "Canasta tradicional",
    "Canasta especial"
  ],

  obleas: [
    "Obleas tradicionales",
    "Obleas especiales"
  ],

  barquillos: [
    "Barquillo tradicional",
    "Barquillo especial"
  ]

};


/* ========================================
   NOMBRES DE LAS CATEGORÍAS
======================================== */

const nombresCategorias = {

  conos: "🍦 Conos",

  galletas: "🧇 Galletas",

  canastas: "🧇 Canastas",

  obleas: "🥞 Obleas",

  barquillos: "🍪 Barquillos"

};


/* ========================================
   ELEMENTOS DE LA PÁGINA
======================================== */

const modal = document.getElementById("modal");

const modalTitle =
  document.getElementById("modalTitle");

const productsList =
  document.getElementById("productsList");

const cartModal =
  document.getElementById("cartModal");

const cartItems =
  document.getElementById("cartItems");

const orderButton =
  document.getElementById("orderButton");

const categoryButtons =
  document.querySelectorAll(".category-btn");

const closeButtons =
  document.querySelectorAll(".close-modal");


/* ========================================
   CARRITO
======================================== */

let carrito = [];


/* ========================================
   ABRIR CATEGORÍA
======================================== */

categoryButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const categoria =
      button.dataset.category;

    abrirCategoria(categoria);

  });

});


/* ========================================
   MOSTRAR PRODUCTOS
======================================== */

function abrirCategoria(categoria) {

  modalTitle.textContent =
    nombresCategorias[categoria];

  productsList.innerHTML = "";

  const listaProductos =
    productos[categoria];


  listaProductos.forEach(function (producto) {

    const productoDiv =
      document.createElement("div");

    productoDiv.style.display = "flex";

    productoDiv.style.justifyContent =
      "space-between";

    productoDiv.style.alignItems =
      "center";

    productoDiv.style.gap =
      "10px";

    productoDiv.style.padding =
      "14px";

    productoDiv.style.marginBottom =
      "10px";

    productoDiv.style.border =
      "1px solid #d8c7b5";

    productoDiv.style.borderRadius =
      "10px";

    productoDiv.style.background =
      "#fffdf7";


    const nombreProducto =
      document.createElement("span");

    nombreProducto.textContent =
      producto;


    const agregarBoton =
      document.createElement("button");

    agregarBoton.textContent =
      "Agregar";

    agregarBoton.style.border =
      "none";

    agregarBoton.style.borderRadius =
      "20px";

    agregarBoton.style.padding =
      "8px 14px";

    agregarBoton.style.background =
      "#7a3d1d";

    agregarBoton.style.color =
      "white";

    agregarBoton.style.cursor =
      "pointer";


    agregarBoton.addEventListener(
      "click",
      function () {

        agregarAlCarrito(producto);

      }
    );


    productoDiv.appendChild(
      nombreProducto
    );

    productoDiv.appendChild(
      agregarBoton
    );


    productsList.appendChild(
      productoDiv
    );

  });


  modal.classList.remove(
    "hidden"
  );

}


/* ========================================
   AGREGAR AL CARRITO
======================================== */

function agregarAlCarrito(producto) {

  carrito.push(producto);

  alert(
    producto +
    " fue agregado a tu pedido."
  );

}


/* ========================================
   BOTÓN HACER PEDIDO
======================================== */

orderButton.addEventListener(
  "click",
  function () {

    abrirCarrito();

  }
);


/* ========================================
   MOSTRAR CARRITO
======================================== */

function abrirCarrito() {

  cartItems.innerHTML = "";


  /* SI EL CARRITO ESTÁ VACÍO */

  if (carrito.length === 0) {

    const mensaje =
      document.createElement("p");

    mensaje.textContent =
      "Tu carrito está vacío.";

    mensaje.style.textAlign =
      "center";

    mensaje.style.padding =
      "20px";

    cartItems.appendChild(
      mensaje
    );

  }


  /* SI HAY PRODUCTOS */

  else {

    carrito.forEach(
      function (
        producto,
        indice
      ) {

        const productoDiv =
          document.createElement(
            "div"
          );

        productoDiv.style.display =
          "flex";

        productoDiv.style.justifyContent =
          "space-between";

        productoDiv.style.alignItems =
          "center";

        productoDiv.style.padding =
          "12px";

        productoDiv.style.marginBottom =
          "8px";

        productoDiv.style.borderBottom =
          "1px solid #ddd";


        const nombre =
          document.createElement(
            "span"
          );

        nombre.textContent =
          producto;


        const eliminar =
          document.createElement(
            "button"
          );

        eliminar.textContent =
          "✕";

        eliminar.style.border =
          "none";

        eliminar.style.background =
          "transparent";

        eliminar.style.fontSize =
          "20px";

        eliminar.style.cursor =
          "pointer";


        eliminar.addEventListener(
          "click",
          function () {

            eliminarDelCarrito(
              indice
            );

          }
        );


        productoDiv.appendChild(
          nombre
        );

        productoDiv.appendChild(
          eliminar
        );


        cartItems.appendChild(
          productoDiv
        );

      }
    );


    /* BOTÓN WHATSAPP */

   
