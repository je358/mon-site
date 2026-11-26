/* JP Shop — recherche et panier 
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
})();*/




document.addEventListener("DOMContentLoaded", () => {

    // NUMÉRO WHATSAPP DE JP SHOP
    const numeroWhatsApp = "229158789161";

    // LISTE DES PRODUITS
    const produits = [
        {
            id: 1,
            nom: "Montre connectée",
            prix: 7500,
            categorie: "Électronique",
            image: "b1.jpg",
            emoji: "⌚"
        },
        {
            id: 2,
            nom: "Sac à dos",
            prix: 3000,
            categorie: "Mode",
            image: "b2.jpg",
            emoji: "🎒"
        },
        {
            id: 3,
            nom: "Power bank 30 000 mAh",
            prix: 5500,
            categorie: "Électronique",
            image: "b3.jpg",
            emoji: "🔋"
        },
        {
            id: 4,
            nom: "Écouteur sans fil",
            prix: 3000,
            categorie: "Électronique",
            image: "b4.jpg",
            emoji: "🎧"
        },
        {
            id: 5,
            nom: "Micro cravate",
            prix: 5500,
            categorie: "Électronique",
            image: "b5.jpg",
            emoji: "🎙️"
        },
        {
            id: 6,
            nom: "Casque Soyto T-12",
            prix: 6500,
            categorie: "Électronique",
            image: "b6.jpg",
            emoji: "🎧"
        },
        {
            id: 7,
            nom: "Sonnette sans fil",
            prix: 4000,
            categorie: "Maison",
            image: "b7.jpg",
            emoji: "🔔"
        },
        {
            id: 8,
            nom: "Gourde thermos",
            prix: 4500,
            categorie: "Maison",
            image: "b8.jpg",
            emoji: "🥤"
        },
        {
            id: 9,
            nom: "Mini climatiseur",
            prix: 6000,
            categorie: "Maison",
            image: "b9.jpg",
            emoji: "❄️"
        },
        {
            id: 10,
            nom: "Diffuseur de senteur",
            prix: 5000,
            categorie: "Maison",
            image: "b10.jpg",
            emoji: "🌿"
        },
        {
            id: 11,
            nom: "Parfum",
            prix: 4500,
            categorie: "Mode",
            image: "b11.jpg",
            emoji: "🌸"
        },
        {
            id: 12,
            nom: "Accessoire de cuisine",
            prix: 3500,
            categorie: "Cuisine",
            image: "b12.jpg",
            emoji: "🍽️"
        }
    ];

    // ÉLÉMENTS HTML
    const listeProduits = document.getElementById("liste-produits");
    const recherche = document.getElementById("barre-recherche");
    const aucunResultat = document.getElementById("aucun-resultat");

    const listePanier = document.getElementById("liste-panier");
    const compteurPanier = document.getElementById("compteur-panier");
    const totalPanier = document.getElementById("total-panier");

    const panier = {};

    let categorieActive = "Tous";

    // FORMAT DES PRIX
    function formaterPrix(prix) {
        return new Intl.NumberFormat("fr-FR").format(prix) + " FCFA";
    }

    // AFFICHER LES PRODUITS
    function afficherProduits() {

        let resultat = produits.filter(produit => {

            const nom = produit.nom.toLowerCase();
            const categorie = produit.categorie.toLowerCase();
            const rechercheTexte = recherche.value.trim().toLowerCase();

            const correspondRecherche =
                nom.includes(rechercheTexte) ||
                categorie.includes(rechercheTexte);

            const correspondCategorie =
                categorieActive === "Tous" ||
                produit.categorie === categorieActive;

            return correspondRecherche && correspondCategorie;
        });

        // TRI DES PRODUITS
        const tri = document.getElementById("tri-produits").value;

        if (tri === "croissant") {
            resultat.sort((a, b) => a.prix - b.prix);
        }

        if (tri === "decroissant") {
            resultat.sort((a, b) => b.prix - a.prix);
        }

        if (tri === "nom") {
            resultat.sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
        }

        document.getElementById("nombre-resultats").textContent =
            resultat.length + " article(s) trouvé(s)";

        aucunResultat.hidden = resultat.length !== 0;

        listeProduits.innerHTML = resultat.map(produit => `
            <article class="produit">

                <div class="produit-image">

                    <img
                        src="${produit.image}"
                        alt="${produit.nom}"
                        onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"
                    >

                    <span class="emoji" style="display:none">
                        ${produit.emoji}
                    </span>

                </div>

                <div class="produit-info">

                    <span class="produit-categorie">
                        ${produit.categorie}
                    </span>

                    <h3>${produit.nom}</h3>

                    <div class="produit-bas">

                        <strong class="prix">
                            ${formaterPrix(produit.prix)}
                        </strong>

                        <button
                            class="ajouter-panier"
                            data-id="${produit.id}"
                        >
                            + Ajouter
                        </button>

                    </div>

                </div>

            </article>
        `).join("");
    }

    // AJOUTER AU PANIER
    listeProduits.addEventListener("click", function(e) {

        const bouton = e.target.closest(".ajouter-panier");

        if (!bouton) return;

        const id = Number(bouton.dataset.id);

        panier[id] = (panier[id] || 0) + 1;

        afficherPanier();

        bouton.textContent = "Ajouté ✓";

        setTimeout(() => {
            bouton.textContent = "+ Ajouter";
        }, 900);

    });

    // AFFICHER LE PANIER
    function afficherPanier() {

        const articles = Object.entries(panier);

        let total = 0;
        let quantiteTotale = 0;

        if (articles.length === 0) {

            listePanier.innerHTML = `
                <p class="panier-vide">
                    🛒 Votre panier est vide.
                </p>
            `;

        } else {

            listePanier.innerHTML = articles.map(([id, quantite]) => {

                const produit = produits.find(
                    p => p.id === Number(id)
                );

                const sousTotal = produit.prix * quantite;

                total += sousTotal;
                quantiteTotale += quantite;

                return `
                    <div class="article-panier">

                        <div>

                            <h4>${produit.nom}</h4>

                            <small>
                                ${formaterPrix(produit.prix)}
                            </small>

                            <div class="quantite">

                                <button data-action="moins" data-id="${id}">
                                    −
                                </button>

                                <span>${quantite}</span>

                                <button data-action="plus" data-id="${id}">
                                    +
                                </button>

                            </div>

                        </div>

                        <div>
                            <strong>
                                ${formaterPrix(sousTotal)}
                            </strong>

                            <button
                                class="supprimer"
                                data-action="supprimer"
                                data-id="${id}"
                            >
                                ✕
                            </button>
                        </div>

                    </div>
                `;

            }).join("");

        }

        compteurPanier.textContent = quantiteTotale;

        totalPanier.textContent = formaterPrix(total);
    }

    // MODIFIER LES QUANTITÉS
    listePanier.addEventListener("click", function(e) {

        const bouton = e.target.closest("[data-action]");

        if (!bouton) return;

        const id = Number(bouton.dataset.id);
        const action = bouton.dataset.action;

        if (action === "plus") {
            panier[id]++;
        }

        if (action === "moins") {
            panier[id]--;

            if (panier[id] <= 0) {
                delete panier[id];
            }
        }

        if (action === "supprimer") {
            delete panier[id];
        }

        afficherPanier();

    });

    // OUVRIR LE PANIER
    const volet = document.getElementById("volet-panier");
    const fond = document.getElementById("fond-panier");

    function ouvrirPanier() {
        volet.classList.add("actif");
        fond.classList.add("actif");
        document.body.style.overflow = "hidden";
    }

    function fermerPanier() {
        volet.classList.remove("actif");
        fond.classList.remove("actif");
        document.body.style.overflow = "";
    }

    document.getElementById("ouvrir-panier")
        .addEventListener("click", ouvrirPanier);

    document.getElementById("fermer-panier")
        .addEventListener("click", fermerPanier);

    fond.addEventListener("click", fermerPanier);

    // RECHERCHE
    recherche.addEventListener("input", afficherProduits);

    // TRI
    document.getElementById("tri-produits")
        .addEventListener("change", afficherProduits);

    // FILTRER PAR CATÉGORIE
    document.querySelectorAll(".categorie").forEach(bouton => {

        bouton.addEventListener("click", function() {

            categorieActive = this.dataset.categorie;

            document.querySelectorAll(".categorie").forEach(c => {
                c.classList.remove("active");
            });

            this.classList.add("active");

            afficherProduits();

            document.getElementById("produits")
                .scrollIntoView({ behavior: "smooth" });

        });

    });

    // RÉINITIALISER LA RECHERCHE
    document.getElementById("reinitialiser")
        .addEventListener("click", function() {

            recherche.value = "";
            categorieActive = "Tous";

            document.querySelectorAll(".categorie").forEach(c => {
                c.classList.toggle(
                    "active",
                    c.dataset.categorie === "Tous"
                );
            });

            afficherProduits();

        });

    // COMMANDER SUR WHATSAPP
    document.getElementById("btn-valider")
        .addEventListener("click", function() {

            const articles = Object.entries(panier);

            if (articles.length === 0) {
                alert("Votre panier est vide !");
                return;
            }

            let total = 0;

            let message = "Bonjour JP Shop ! Je souhaite commander :\n\n";

            articles.forEach(([id, quantite]) => {

                const produit = produits.find(
                    p => p.id === Number(id)
                );

                const sousTotal = produit.prix * quantite;

                total += sousTotal;

                message +=
                    "- " + produit.nom +
                    " x" + quantite +
                    " : " + formaterPrix(sousTotal) +
                    "\n";

            });

            message +=
                "\nTotal estimé : " + formaterPrix(total) +
                "\n\nMerci de me confirmer la disponibilité.";

            const lien =
    "https://wa.me/" +
    numeroWhatsApp +
    "?text=" +
    encodeURIComponent(message);

window.open(lien, "_blank");

        });

    // MENU MOBILE
    document.getElementById("menuToggle")
        .addEventListener("click", function() {

            document.getElementById("navigation")
                .classList.toggle("ouvert");

        });

    document.querySelectorAll("#navigation a").forEach(lien => {

        lien.addEventListener("click", function() {

            document.getElementById("navigation")
                .classList.remove("ouvert");

        });

    });

    // ANNÉE AUTOMATIQUE
    document.getElementById("annee").textContent =
        new Date().getFullYear();

    // INITIALISATION
    afficherProduits();
    afficherPanier();

});
