/* JP Shop — recherche et panier */
(() => {
  "use strict";

  const cart = new Map();
  const cartOverlay = document.getElementById("volet-panier");
  const openCartButton = document.getElementById("ouvrir-panier");
  const closeCartButton = document.getElementById("fermer-panier");
  const cartList = document.getElementById("liste-panier");
  const cartCount = document.getElementById("compteur-panier");
  const cartTotal = document.getElementById("total-panier");
  const checkoutButton = document.getElementById("btn-valider");
  const searchInput = document.getElementById("barre-recherche");
  const noResults = document.getElementById("message-aucun-resultat");
  const productCards = [...document.querySelectorAll(".carte-produit")];

  // Remplace ce numéro par ton numéro WhatsApp au format international sans +.
  const WHATSAPP_NUMBER = "2290158789161";

  const formatPrice = value => new Intl.NumberFormat("fr-FR").format(value) + " FCFA";

  function openCart() {
    cartOverlay.classList.add("open");
    cartOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    cartOverlay.classList.remove("open");
    cartOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openCartButton.addEventListener("click", openCart);
  closeCartButton.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", event => {
    if (event.target === cartOverlay) closeCart();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeCart();
  });

  document.querySelectorAll(".btn-ajouter").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const card = button.closest(".carte-produit");
      const product = {
        id,
        name: button.dataset.name,
        price: Number(button.dataset.price || 0),
        image: card.querySelector("img").src,
        quantity: 1
      };
      if (cart.has(id)) cart.get(id).quantity += 1;
      else cart.set(id, product);
      renderCart();
      const oldText = button.textContent;
      button.textContent = "Ajouté ✓";
      window.setTimeout(() => { button.textContent = oldText; }, 900);
    });
  });

  function changeQuantity(id, amount) {
    const item = cart.get(id);
    if (!item) return;
    item.quantity += amount;
    if (item.quantity <= 0) cart.delete(id);
    renderCart();
  }

  function renderCart() {
    const items = [...cart.values()];
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartCount.textContent = count;
    cartTotal.textContent = new Intl.NumberFormat("fr-FR").format(total);

    if (!items.length) {
      cartList.innerHTML = '<p class="cart-empty">Votre panier est vide.</p>';
      return;
    }

    cartList.replaceChildren();
    items.forEach(item => {
      const row = document.createElement("div");
      row.className = "cart-item";

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.name;

      const details = document.createElement("div");
      const name = document.createElement("div");
      name.className = "cart-item-name";
      name.textContent = item.name;
      const price = document.createElement("div");
      price.className = "cart-item-price";
      price.textContent = formatPrice(item.price * item.quantity);

      const controls = document.createElement("div");
      controls.className = "quantity-controls";
      const minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "−";
      minus.setAttribute("aria-label", "Retirer une unité de " + item.name);
      minus.addEventListener("click", () => changeQuantity(item.id, -1));
      const qty = document.createElement("span");
      qty.textContent = item.quantity;
      const plus = document.createElement("button");
      plus.type = "button";
      plus.textContent = "+";
      plus.setAttribute("aria-label", "Ajouter une unité de " + item.name);
      plus.addEventListener("click", () => changeQuantity(item.id, 1));
      controls.append(minus, qty, plus);
      details.append(name, price, controls);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove-item";
      remove.textContent = "▤";
      remove.setAttribute("aria-label", "Supprimer " + item.name);
      remove.addEventListener("click", () => {
        cart.delete(item.id);
        renderCart();
      });

      row.append(image, details, remove);
      cartList.append(row);
    });
  }

  
  function normalizeText(text) {
    return text
      .toLocaleLowerCase("fr")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function filterProducts() {
    if (!searchInput || !noResults) return;

    const query = normalizeText(searchInput.value.trim());
    let visible = 0;

    productCards.forEach(card => {
      const title = card.querySelector("h3");
      const name = card.dataset.name || title?.textContent || "";
      const matches = normalizeText(name).includes(query);

      card.hidden = !matches;

      if (matches) visible++;
    });

    noResults.hidden = visible > 0;
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
    filterProducts();
  }


  checkoutButton.addEventListener("click", () => {
    const items = [...cart.values()];
    if (!items.length) {
      alert("Votre panier est vide. Ajoutez d'abord un article.");
      return;
    }
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const lines = items.map(item =>
      `- ${item.name} x${item.quantity} : ${formatPrice(item.price * item.quantity)}`
    );
    const message = [
      "Bonjour JP Shop ! Je souhaite commander :",
      "",
      ...lines,
      "",
      `Total : ${formatPrice(total)}`,
      "Merci de me confirmer la disponibilité et la livraison."
    ].join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  renderCart();
})();
