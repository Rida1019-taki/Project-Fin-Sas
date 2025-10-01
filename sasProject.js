const prompt = require("prompt-sync")({ sigint: true });

let livres = [
  { 
    isbn: "14556", 
    titre: "Petit Prince", 
    auteur: "Exupéry", 
    annee: 1980, 
    dispo: true 
  },
  { 
    isbn: "1233", 
    titre: "detit Prince", 
    auteur: "Dxupéry", 
    annee: 1943, 
    dispo: false 
  },
  { 
    isbn: "4566", 
    titre: "getit Prince", 
    auteur: "Exupéry", 
    annee: 1955, 
    dispo: true 
  },
];

let abonnes = [
  { 
    id: 1, 
    nom: "rida", 
    prenom: "taki", 
    email: "rida@mail.com" 
  }
];
let emprunts = [];

function menu() {
  console.log(`
    -----------------------------------------------Ajouter plusieur livres-------------------------------------------------
1. =========> Ajouter livre
    -----------------------------------------------Operation sur les livres------------------------------------------------
2. =========> Afficher livres
3. =========> Trier livres (asc / desc)
4. =========> Trier livres (annee)
5. =========> Afficher uniquement les livres disponible
6. =========> Rechercher livres(ISBN)
    -----------------------------------------------Gestion des abonnes-----------------------------------------------------
7. =========> Ajouter abonné
8. =========> Afficher abonnés
    -----------------------------------------------Gestion des emprunts----------------------------------------------------
9. =========> Emprunter livre
10. =========> Retourner livre
11. =========> Quitter
`);
  return prompt("Choix: ");
}
let res ;
while (true) {
  switch (menu()) {
    case "1":
      res = AjouterLivres();
      console.log(res);
      break;

    case "2":
      res = AfficherLivres();
      console.log(res);
      break;

    case "3":
      let chooceByTitre = prompt("Trier par titre (asc/desc): ");
      if (chooceByTitre === "asc") {
        livres.sort((a, b) => a.titre.localeCompare(b.titre));
      } else if (chooceByTitre === "desc") {
        livres.sort((a, b) => b.titre.localeCompare(a.titre));
      } else {
        console.log(" Choix invalide !");
      }
      AfficherLivres();
      break;

    case "4":
      let chooceByAnnee = prompt("Trier par Annee (asc/desc): ");
      if (chooceByAnnee === "asc") {
        livres.sort((a, b) => a.annee - b.annee);      
      } else if (chooceByAnnee === "desc") {
        livres.sort((a, b) => b.annee - a.annee);
      } else {
        console.log(" Choix invalide !");
      }
      AfficherLivres();
      break;

    case "5":
       AfficherUniquementLesLivresDisponible(); 
       break;

    case "6": 
     RechercherLivre();
      break;
    
    case "7":
      res = AjouterAbonne();
      console.log(res);
      break;

    case "8":
      res = AfficherAbonne();
      console.log(res);
      break;

    case "9":
      res = EmprunterLivre();
      console.log(res);
      break;

    case "10":
      
      
    case "11":
      console.log("Bye");
      process.exit();
      break;

    default :
      console.log("Option Non Exists.");
      
  };

  function AfficherLivres(){
    for (let i in livres){
        console.log(livres[i].isbn);
        console.log(livres[i].titre);
        console.log(livres[i].auteur);
        console.log(livres[i].annee); 
        console.log(livres[i].dispo); 
    };
    return livres;
  };
  function AfficherAbonne(){
    for (let i in abonnes){
        console.log(abonnes[i].id);
        console.log(abonnes[i].nom);
        console.log(abonnes[i].prenom);
        console.log(abonnes[i].email);  
    };
    return abonnes;
  };
  function AjouterLivres(){
    let Isbn = prompt("Entrer ISBN : ");
    let Titre = prompt("Entrer Titre de livre : ");
    let Auteur = prompt("Entrer Auteur : ");
    let Annee = prompt("Entrer Annee : ");
    livres.push({
      isbn : Isbn ,
      titre : Titre ,
      auteur : Auteur ,
      annee : Annee ,
      dispo : true ,
    });
  };
  function AjouterAbonne(){
    let Nom = prompt("Entrer Nom : ");
    let Prenom = prompt("Entrer Prenom : ");
    abonnes.push({
      id : abonnes.length + 1,
      nom : Nom ,
      prenom : Prenom ,
      email : Nom + "@gmail.com" ,
    });
    return abonnes;
  };
  function RechercherLivre() {
  let isbnCherche = prompt("Donner ISBN du livre : "); 
  let res = null;

  for (let livre of livres) {   
    if (livre.isbn === isbnCherche) {  
      res = livre;                     
      break;                           
    }
  }
  if (res) {
    console.log(" Livre trouvé :", res);
    return res;   
  } else {
    console.log(" Aucun livre avec cet ISBN.");
  }
  }
  function AfficherUniquementLesLivresDisponible(){
  let ArryDisponible =[];
  let ArryNomDisponible =[];
    for (let i in livres){
        if(livres[i].dispo){
            ArryDisponible.push(livres[i]);
        }else{
            ArryNomDisponible.push(livres[i]);
        }
    }
    console.log(ArryDisponible);
    console.log(ArryNomDisponible);
    return ArryDisponible;

  } 
  function EmprunterLivre() {
  let id = Number(prompt("ID abonne : "));
  let abonne = abonnes.find(a => a.id === id);
  if (!abonne) return console.log("Abonné introuvable");

  let isbn = prompt("ISBN livre: ");
  let livre = livres.find(l => l.isbn === isbn && l.dispo);
  if (!livre) return console.log("Livre non disponible");

  emprunts.push({ abonneId: id, isbn });
  livre.dispo = false;
  console.log("Emprunt sauvgarder");
  }
  
}
