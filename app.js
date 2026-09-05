const BUSINESS_WHATSAPP = "573155458751";
const STORE_NAME = "Dolci";
const ADDRESS = "Calle 130F #124-58, Bogotá, Colombia";

const categories = {
  conos: {
    name: "Conos",
    description: "Crujientes, deliciosos y de la mejor calidad",
    image: "images/conos.jpg",
    products: [
      {id:"cono-1",name:"Cono #1",presentation:"Paquete x 10 unidades",price:2600,image:"images/cono-1.jpg"},
      {id:"cono-2",name:"Cono #2",presentation:"Paquete x 10 unidades",price:3200,image:"images/cono-2.jpg"},
      {id:"cono-3",name:"Cono #3",presentation:"Paquete x 10 unidades",price:3800,image:"images/cono-3.jpg"},
      {id:"cono-4",name:"Cono #4",presentation:"Paquete x 10 unidades",price:4600,image:"images/cono-4.jpg"},
      {id:"cono-especial",name:"Cono especial",presentation:"Paquete x 10 unidades",price:5800,image:"images/cono-especial.jpg"},
      {id:"mini-cono",name:"Mini cono",presentation:"Paquete x 20 unidades",price:3000,image:"images/mini-cono.jpg"},
      {id:"cono-colores",name:"Cono de colores",presentation:"Paquete x 10 unidades",price:4900,image:"images/cono-colores.jpg"},
      {id:"cono-sin-punta",name:"Cono sin punta",presentation:"Paquete x 10 unidades",price:3500,image:"images/cono-sin-punta.jpg"}
    ]
  },

  galletas: {
    name:"Galletas",
    description:"Galletas crujientes para acompañar tus mejores momentos",
    image:"images/galletas.jpg",
    products:[
      {id:"galleta-cuadrada",name:"Galleta cuadrada",presentation:"Paquete x 50 unidades",price:3500,image:"images/galletas.jpg"},
      {id:"galleta-mediana",name:"Galleta mediana",presentation:"Paquete x 50 unidades",price:6500,image:"images/galletas.jpg"},
      {id:"galleta-grande",name:"Galleta grande",presentation:"Paquete x 50 unidades",price:8500,image:"images/galletas.jpg"},
      {id:"galleta-especial",name:"Galleta especial",presentation:"Paquete x 50 unidades",price:10000,image:"images/galletas.jpg"}
    ]
  },

  canastas: {
    name:"Canastas",
    description:"Canastas de galleta listas para servir y disfrutar",
    image:"images/canastas.jpg",
    products:[
      {id:"canasta-pequena",name:"Canasta pequeña",presentation:"Paquete x 10 unidades",price:5000,image:"images/canastas.jpg"},
      {id:"canasta-mediana",name:"Canasta mediana",presentation:"Paquete x 10 unidades",price:6500,image:"images/canastas.jpg"},
      {id:"canasta-grande",name:"Canasta grande",presentation:"Paquete x 10 unidades",price:8500,image:"images/canastas.jpg"},
      {id:"canasta-especial",name:"Canasta especial",presentation:"Paquete x 10 unidades",price:10000,image:"images/canastas.jpg"}
    ]
  },

  obleas: {
    name:"Obleas",
    description:"Obleas delgadas, crocantes y de excelente calidad",
    image:"images/obleas.jpg",
    products:[
      {id:"oblea-natural",name:"Oblea natural",presentation:"Paquete x 10 unidades",price:4000,image:"images/obleas.jpg"},
      {id:"oblea-grande",name:"Oblea grande",presentation:"Paquete x 10 unidades",price:5500,image:"images/obleas.jpg"},
      {id:"oblea-especial",name:"Oblea especial",presentation:"Paquete x 10 unidades",price:7000,image:"images/obleas.jpg"},
      {id:"oblea-dorada",name:"Oblea dorada",presentation:"Paquete x 10 unidades",price:7500,image:"images/obleas.jpg"}
    ]
  },

  barquillos: {
    name:"Barquillos",
    description:"Barquillos crujientes para helados, postres y más",
    image:"images/barquillos.jpg",
    products:[
      {id:"barquillo-corto",name:"Barquillo corto",presentation:"Paquete x 100 unidades",price:9000,image:"images/barquillos.jpg"},
      {id:"barquillo-largo",name:"Barquillo largo",presentation:"Paquete x 100 unidades",price:12000,image:"images/barquillos.jpg"},
      {id:"barquillo-mini",name:"Barquillo mini",presentation:"Paquete x 100 unidades",price:8000,image:"images/barquillos.jpg"},
      {id:"barquillo-especial",name:"Barquillo especial",presentation:"Paquete x 100 unidades",price:14000,image:"images/barquillos.jpg"}
    ]
  }
};

let cart = JSON.parse(localStorage.getItem("dolciCart") || "{}");
let selectedCategory = "conos";
let lastOrder = JSON.parse(localStorage.getItem("dolciLastOrder") || "null");

const $ = id => document.getElementById(id);
const money = n => "$ " + Number(n).toLocaleString("es-CO");

function allProducts(){
  return Object.values(categories).flatMap(c => c.products);
}

function getProduct(id){
  return allProducts().find(p => p.id === id);
}

function saveCart(){
  localStorage.setItem("dolciCart", JSON.stringify(cart));
}

function cartEntries(){
  return Object.entries(cart)
    .map(([id,qty]) => ({product:getProduct(id), qty:Number(qty)}))
    .filter(x => x.product && x.qty > 0);
}

function cartCount(){
  return cartEntries().reduce((s,x) => s + x.qty, 0);
}

function cartTotal(){
  return cartEntries().reduce((s,x) => s + x.product.price * x.qty, 0);
}

function openView(name){
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  $(name).classList.add("active");
  window.scrollTo({top:0,behavior:"instant"});
}

function renderHomeCategories(){
  $("homeCategories").innerHTML = Object.entries(categories).map(([key,c]) => `
    <button class="home-category" data-category="${key}" type="button">
      <img src="${c.image}" alt="${c.name}">
      <span>${c.name}</span>
    </button>
  `).join("");

  document.querySelectorAll(".home-category").forEach(btn => {
    btn.addEventListener("click", () => openProducts(btn.dataset.category));
  });
}

function renderCategoryNav(){
  $("categoryNav").innerHTML = Object.entries(categories).map(([key,c]) => `
    <button class="${key===selectedCategory ? "active" : ""}" data-category="${key}" type="button">
      <img src="${c.image}" alt="${c.name}">
      <span>${c.name}</span>
    </button>
  `).join("");

  document.querySelectorAll("#categoryNav button").forEach(btn => {
    btn.addEventListener("click", () => openProducts(btn.dataset.category));
  });
}

function renderProducts(){
  const c = categories[selectedCategory];

  $("selectedCategoryName").textContent = c.name;
  $("selectedCategoryDescription").textContent = c.description;
  $("selectedCategoryImage").src = c.image;
  $("selectedCategoryImage").alt = c.name;

  $("productGrid").innerHTML = c.products.map(p => {
    const qty = cart[p.id] || 0;

    return `
      <article class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="presentation">${p.presentation}</p>
        <div class="price">${money(p.price)}</div>
        <div class="qty-control">
          <button data-minus="${p.id}" type="button">−</button>
          <span>${qty}</span>
          <button data-plus="${p.id}" type="button">+</button>
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-plus]").forEach(b => {
    b.addEventListener("click", () => changeQty(b.dataset.plus,1));
  });

  document.querySelectorAll("[data-minus]").forEach(b => {
    b.addEventListener("click", () => changeQty(b.dataset.minus,-1));
  });
}

function changeQty(id,delta){
  cart[id] = Math.max(0,(cart[id] || 0) + delta);

  if(!cart[id]) delete cart[id];

  saveCart();
  updateCartUI();
  renderProducts();
}

function updateCartUI(){
  const count = cartCount();
  const total = cartTotal();

  $("topCartCount").textContent = count;
  $("mobileNavCount").textContent = count;
  $("bottomCartItems").textContent = `${count} producto${count===1 ? "" : "s"}`;
  $("bottomCartTotal").textContent = money(total);
}

function openProducts(category="conos"){
  selectedCategory = category;
  renderCategoryNav();
  renderProducts();
  updateCartUI();
  openView("productsView");
}

function openModal(id){
  $(id).classList.add("open");
  $(id).setAttribute("aria-hidden","false");
}

function closeModal(id){
  $(id).classList.remove("open");
  $(id).setAttribute("aria-hidden","true");
}

function renderCart(){
  const entries = cartEntries();

  $("cartItems").innerHTML = entries.length
    ? entries.map(x => `
      <div class="cart-line">
        <img src="${x.product.image}" alt="${x.product.name}">
        <div>
          <h4>${x.product.name}</h4>
          <small>${x.product.presentation} · ${money(x.product.price)}</small>
          <div class="mini-qty">
            <button data-cart-minus="${x.product.id}" type="button">−</button>
            <span>${x.qty}</span>
            <button data-cart-plus="${x.product.id}" type="button">+</button>
          </div>
        </div>
        <div class="line-total">${money(x.product.price*x.qty)}</div>
      </div>
    `).join("")
    : `<p class="modal-subtitle">Aún no has agregado productos.</p>`;

  $("cartTotal").textContent = money(cartTotal());

  document.querySelectorAll("[data-cart-plus]").forEach(b => {
    b.addEventListener("click", () => {
      changeQty(b.dataset.cartPlus,1);
      renderCart();
    });
  });

  document.querySelectorAll("[data-cart-minus]").forEach(b => {
    b.addEventListener("click", () => {
      changeQty(b.dataset.cartMinus,-1);
      renderCart();
    });
  });
}

function openCart(){
  renderCart();
  openModal("cartModal");
}

function openOrder(){
  if(!cartEntries().length){
    alert("Agrega al menos un producto al pedido.");
    return;
  }

  $("formTotal").textContent = money(cartTotal());
  closeModal("cartModal");
  openModal("orderModal");
}

function orderNumber(){
  const n = Number(localStorage.getItem("dolciOrderCounter") || 125) + 1;
  localStorage.setItem("dolciOrderCounter",String(n));
  return "#" + String(n).padStart(6,"0");
}

function formatDate(){
  return new Intl.DateTimeFormat("es-CO",{
    dateStyle:"medium",
    timeStyle:"short"
  }).format(new Date());
}

function createOrder(data){
  const order = {
    number:orderNumber(),
    date:formatDate(),
    customer:data.name,
    phone:data.phone,
    address:data.address,
    payment:data.payment,
    notes:data.notes,
    items:cartEntries().map(x => ({
      ...x.product,
      qty:x.qty,
      lineTotal:x.product.price*x.qty
    })),
    total:cartTotal()
  };

  lastOrder = order;
  localStorage.setItem("dolciLastOrder",JSON.stringify(order));
  return order;
}

function renderInvoice(order){
  $("invoiceDate").textContent = order.date;
  $("invoiceCustomer").textContent = order.customer;
  $("invoicePayment").textContent = order.payment;
  $("invoiceNumber").textContent = order.number;

  $("invoiceRows").innerHTML = order.items.map(p => `
    <div class="invoice-row">
      <span>${p.name}</span>
      <span>${p.qty}</span>
      <span>${p.presentation}</span>
      <span>${money(p.price)}</span>
      <span>${money(p.lineTotal)}</span>
    </div>
  `).join("");

  $("invoiceTotal").textContent = money(order.total);
}

function whatsappText(order){
  const lines = [
    `PEDIDO ${order.number} - DOLCI`,
    `Cliente: ${order.customer}`,
    `Teléfono: ${order.phone}`,
    `Dirección: ${order.address}`,
    `Pago: ${order.payment}`,
    "",
    ...order.items.map(p => `• ${p.name} x${p.qty} — ${money(p.lineTotal)}`),
    "",
    `TOTAL: ${money(order.total)}`,
    order.notes ? `Observaciones: ${order.notes}` : "",
    "",
    "Gracias por tu pedido."
  ];

  return lines.filter(Boolean).join("\n");
}

function sendWhatsApp(){
  if(!lastOrder) return;

  const url =
    `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(whatsappText(lastOrder))}`;

  window.open(url,"_blank","noopener");
}

function printInvoice(){
  window.print();
}

async function shareInvoice(){
  if(!lastOrder) return;

  if(!navigator.share){
    alert("Tu navegador no permite compartir directamente. Usa 'Imprimir / Guardar PDF'.");
    return;
  }

  try{
    await navigator.share({
      title:`Pedido ${lastOrder.number} - Dolci`,
      text:whatsappText(lastOrder)
    });
  }catch(e){
    // El usuario puede cancelar la ventana de compartir.
  }
}

$("backHome").addEventListener("click",() => openView("homeView"));
$("homeCartButton").addEventListener("click",openCart);
$("openCartTop").addEventListener("click",openCart);
$("openCartBottom").addEventListener("click",openCart);
$("mobileCartNav").addEventListener("click",openCart);
$("continueOrder").addEventListener("click",openOrder);
$("sendWhatsApp").addEventListener("click",sendWhatsApp);
$("shareInvoice").addEventListener("click",shareInvoice);
$("printInvoice").addEventListener("click",printInvoice);

document.querySelector('[data-nav="home"]').addEventListener("click",() => {
  openView("homeView");
});

$("ordersNav").addEventListener("click",() => {
  if(lastOrder){
    renderInvoice(lastOrder);
    openModal("invoiceModal");
  }else{
    alert("Todavía no tienes un pedido registrado en este dispositivo.");
  }
});

$("moreNav").addEventListener("click",() => {
  alert("Dolci · Fábrica de galletas\nWhatsApp: 315 545 8751\nHorario: lunes a sábado, 8:00 a. m. - 6:00 p. m.");
});

document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click",() => closeModal(btn.dataset.close));
});

document.querySelectorAll(".modal").forEach(m => {
  m.addEventListener("click",e => {
    if(e.target === m) closeModal(m.id);
  });
});

document.addEventListener("keydown",e => {
  if(e.key === "Escape"){
    document.querySelectorAll(".modal.open").forEach(m => closeModal(m.id));
  }
});

$("orderForm").addEventListener("submit",e => {
  e.preventDefault();

  const order = createOrder({
    name:$("customerName").value.trim(),
    phone:$("customerPhone").value.trim(),
    address:$("customerAddress").value.trim(),
    payment:$("paymentMethod").value,
    notes:$("customerNotes").value.trim()
  });

  renderInvoice(order);
  closeModal("orderModal");
  openModal("invoiceModal");

  cart = {};
  saveCart();
  updateCartUI();
  renderProducts();
  $("orderForm").reset();
});

renderHomeCategories();
renderCategoryNav();
renderProducts();
updateCartUI();
