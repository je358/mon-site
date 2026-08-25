// Remplacez par votre numéro de téléphone WhatsApp (avec l'indicatif sans le +)
const NUMERO_WHATSAPP = "2290158789161"; 

let panier = [];

// Gestion de l'affichage du volet panier
const modalPanier = document.getElementById('volet-panier');
document.getElementById('ouvrir-panier').onclick = () => modalPanier.style.display = 'flex';
document.getElementById('fermer-panier').onclick = () => modalPanier.style.display = 'none';

// Ajouter un article au panier
function ajouterAuPanier(nom, prix, image) {
    const articleExistant = panier.find(item => item.nom === nom);

    if (articleExistant) {
        articleExistant.quantite++;
    } else {
        panier.push({ nom, prix, quantite: 1 });
    }

    mettreAJourPanier();
}

// Supprimer ou réduire la quantité d'un article
function retirerDuPanier(nom) {
    panier = panier.filter(item => item.nom !== nom);
    mettreAJourPanier();
}

// Mettre à jour le DOM
function mettreAJourPanier() {
    const conteneurListe = document.getElementById('liste-panier');
    conteneurListe.innerHTML = '';

    let total = 0;
    let totalArticles = 0;

    panier.forEach(item => {
        total += item.prix * item.quantite;
        totalArticles += item.quantite;

        const div = document.createElement('div');
        div.classList.add('element-panier');
        div.innerHTML = `
            <div>
                <strong>${item.nom}</strong>
                <span>x${item.quantite}</span>
            </div>
            <div>
                <span>${item.prix * item.quantite} FCFA</span>
                <button class="btn-retirer" onclick="retirerDuPanier('${item.nom}')">X</button>
            </div>
        `;
        conteneurListe.appendChild(div);
    });

    document.getElementById('total-panier').innerText = total;
    document.getElementById('compteur-panier').innerText = totalArticles;
}

// Envoi de la commande récapitulative sur WhatsApp
function validerCommande() {
    if (panier.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    let message = "Bonjour JP Shop, je souhaite passer la commande suivante :\n\n";
    let total = 0;

    panier.forEach(item => {
        const sousTotal = item.prix * item.quantite;
        total += sousTotal;
        message += `- ${item.nom} (x${item.quantite}) : ${sousTotal} FCFA\n`;
    });

    message += `\n*Total Général : ${total} FCFA*`;

    const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(urlWhatsApp, '_blank');
}
// Fonction de filtrage dynamique des produits
function filtrerProduits() {
    const saisie = document.getElementById('barre-recherche').value.toLowerCase().trim();
    const cartesProduits = document.querySelectorAll('.carte-produit');
    const messageAucunResultat = document.getElementById('message-aucun-resultat');
    let compteurVisibles = 0;

    cartesProduits.forEach(carte => {
        // Récupère le nom de l'article dans le h3
        const nomProduit = carte.querySelector('h3').innerText.toLowerCase();

        // Vérifie si le nom contient la chaîne saisie
        if (nomProduit.includes(saisie)) {
            carte.style.display = 'flex';
            compteurVisibles++;
        } else {
            carte.style.display = 'none';
        }
    });

    // Affiche un message si aucun résultat n'est trouvé
    if (compteurVisibles === 0) {
        messageAucunResultat.style.display = 'block';
    } else {
        messageAucunResultat.style.display = 'none';
    }
                           }
                  
