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
    dispo: false 
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
 1. ========> Ajouter livre
    -----------------------------------------------Operation sur les livres------------------------------------------------
 2. =========> Afficher livres
 3. =========> Trier livres (asc / desc)
 4. =========> Trier livres (annee)
 5. =========> Afficher uniquement les livres disponible
 6. =========> Rechercher livres(ISBN)
    -----------------------------------------------Gestion des abonnes-----------------------------------------------------
 7. =========> Ajouter abonné
                                                   -------------------
 8. =========> Afficher abonnés
    -----------------------------------------------Gestion des emprunts----------------------------------------------------
 9. =========> Emprunter livre
                                                   -------------------
 10. =========> Retourner livre
 11. =========> Afficher les livres empruntés par un abonné donné
 12. =========> Quitter
`);
  return prompt("Choix: ");
}
let res ;
while (true) {
  switch (menu()) {
    case "1":
       AjouterLivres();
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
      EmprunterLivre();
      break;

    case "10":
      RetournerLivre();
      break;
      
    case "11":
      AfficherLivresEmpruntesParAbonne();
      break;

    case "12":
      console.log("Bye");
      process.exit();
      break;

    default :
      console.log("Option Non Exists.");
      
  };

  function AfficherLivres(){
    console.log(`
╔════════════════════════════════════════════╗
║           📚 LISTE DES LIVRES 📚            ║
╚════════════════════════════════════════════╝
  `);
    for (let i in livres){
        return livres;
    };
    
  };
  function AfficherAbonne(){
    console.log(`
╔════════════════════════════════════════════╗
║           📚 LISTE DES Abonnes 📚            ║
╚════════════════════════════════════════════╝
  `);
    for (let i in abonnes){
        return abonnes;
    };
    
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
    let res;
    for (let livre of livres) {   
      if (livre.isbn === isbnCherche) {  
        res = livre;                     
        break;                           
      }
    }
    if (res) {
      console.log(" Livre trouve :", res);
      return res;   
    } else {
      console.log(" Aucun livre avec cet ISBN.");
    }
  };
  function AfficherUniquementLesLivresDisponible(){
    let ArryDisponible =[];
    let ArryNomDisponible =[];
      for (let i in livres){
          if(livres[i].dispo === true){
              ArryDisponible.push(livres[i]);
          }else{
              ArryNomDisponible.push(livres[i]);
          }
      }
      console.log(ArryDisponible);
      console.log(ArryNomDisponible);
      return ;

  }; 
  function EmprunterLivre() {
    let id = Number(prompt("ID abonne : "));
    let abonne = abonnes.find(a => a.id === id);
      if (!abonne) {
        return console.log("Abonné introuvable");
      };
    let isbn = prompt("ISBN livre: ");
    let livre = livres.find(l => l.isbn === isbn && l.dispo);
      if (!livre){ 
        return console.log("Livre non disponible");
      }
    let date = new Date().toISOString().slice(0, 10); 
    emprunts.push({ abonneId: id, isbn, dateEmprunt: date });
    livre.dispo = false;

    console.log("Emprunt enregistré avec succès");
    console.log(emprunts);
    
  };
  function RetournerLivre() {
    let id = Number(prompt("id abonne : "));
    let isbnRetoune = prompt("ISBN livre à retourner : ");

    let emprunt = emprunts.find(e => e.abonneId === id && e.isbn === isbnRetoune);
    if (!emprunt) {
       console.log("Pas d'emprunt trouvé pour cet abonné et ce livre");
       return ;
    }
    let livre = livres.find(l => l.isbn === isbnRetoune);
    if (livre) {
      livre.dispo = true;
    };
    emprunts = emprunts.filter(e => !(e.abonneId === id && e.isbn === isbnRetoune));

    console.log("Livre retourne avec succes");
  };
  
  function AfficherLivresEmpruntesParAbonne() {
    for (let livre of livres) {
      if (livre.dispo) {
        console.log("Titre :", livre.titre, "| ISBN :", livre.isbn);
      }
    }
  };
}
