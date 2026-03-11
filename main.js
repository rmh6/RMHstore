// Produits (modifie les noms / prix comme tu veux)
const products = [
  { id: 1, name: "T-shirt Nova", price: 19.99, desc: "T-shirt stylé, parfait pour les fans de tech.", tag: "Nouveau" },
  { id: 2, name: "Sticker Pack", price: 4.99, desc: "Stickers pour PC, téléphone, console.", tag: "Best-seller" },
  { id: 3, name: "Poster Neon", price: 9.99, desc: "Poster design futuriste pour ta chambre.", tag: "Limited" },
];

const PAYPAL_EMAIL = "TON_EMAIL_PAYPAL@exemple.com"; // ← remplace par ton email PayPal

const productsGrid = document.getElementById("products-grid");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = [];

// Afficher les produits
function renderProducts() {
  productsGrid.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-tag">${p.tag}</div>
      <h3>${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      <div class="product-price">${p.price.toFixed(2)} €</div>
      <button data-id="${p.id}">Ajouter au panier</button>
    `;
    productsGrid.appendChild(card);
  });
}

// Mettre à jour le panier
function renderCart() {
  cartItemsEl.innerHTML = "";
  if (cart.length === 0) {
    cartItemsEl.textContent = "Panier vide.";
    cartTotalEl.textContent = "0,00 €";
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <span>${(item.price * item.qty).toFixed(2)} €</span>
    `;
    cartItemsEl.appendChild(row);
  });

  cartTotalEl.textContent = total.toFixed(2) + " €";
}

// Ajouter au panier
productsGrid.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "button") {
    const id = Number(e.target.dataset.id);
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(i => i.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    renderCart();
  }
});

// Redirection vers PayPal
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Ton panier est vide.");
    return;
  }

  let total = 0;
  cart.forEach(item => total += item.price * item.qty);
  total = total.toFixed(2);

  if (!PAYPAL_EMAIL || PAYPAL_EMAIL.includes("exemple.com")) {
    alert("Tu dois d’abord mettre ton vrai email PayPal dans main.js (variable PAYPAL_EMAIL).");
    return;
  }

  const url =
    "https://www.paypal.com/cgi-bin/webscr" +
    "?cmd=_xclick" +
    `&business=${encodeURIComponent(PAYPAL_EMAIL)}` +
    `&item_name=${encodeURIComponent("Commande NovaStore")}` +
    `&amount=${encodeURIComponent(total)}` +
    "&currency_code=EUR";

  window.location.href = url;
});

// Scroll helper
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
}

// Init
renderProducts();
renderCart();
