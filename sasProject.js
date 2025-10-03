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
    case "10":
      res = cc();
      console.log(res);
      break;

    case "9":
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
  
}
