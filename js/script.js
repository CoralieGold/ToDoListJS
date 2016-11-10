$(document).ready(function() {
	// déclaration des variables
	var maxTaches = 25;
	var tabTaches;
	var tacheActuelle;
	var identifiant;

	// on vérifie si le web storage est possible
	if(typeof(Storage) !== "undefined") {

		//on récupère les tâches du webstorage si elles existent, et on les affiche
		if(localStorage.getItem('taches') != null) {
			tabTaches = JSON.parse(localStorage.getItem('taches'));

			/* AFFICHAGE DES TACHES */
			$.each(tabTaches, function(index, value) {
				$("#listeTaches").append("<li id=" + index + "><span class='titre'>"
				+ value.nom + "<img src='./images/croix.png' class='croix'/></span><br />Pour le "
				+ value.date + "<br/>"
				+ value.pourcentage + "% effectué <img src='./images/moins.png' class='moins'/> <img src='./images/plus.png' class='plus'/> <br /> Description : "
				+ value.description + "</li>");
			});
		}
		// sinon on définit tabTaches comme un tableau vide
		else {
			tabTaches = new Array;
		}
				
		/* AJOUT D'UNE TACHE */
		// au clique sur le bouton "ajout" on récupère les valeurs du formulaire pour les mettre dans l'objet tacheActuelle
		$("#ajout").click(function() {
			tacheActuelle = {
				nom : $("#nomTache").val(),
				date : $("#dateTache").val(),
				description : $("#descriptionTache").val(),
				pourcentage : $("#pourcentageTache").val()
			};
			
			// on limite l'affichage sur la page : si on ne dépasse pas la feuille on ajoute dans le tableau
			if(tabTaches.length < 7) {
				tabTaches.push(tacheActuelle);
				localStorage.setItem('taches', JSON.stringify(tabTaches));
				location.reload();
			}
			else {
				alert("Vous avez trop de tâches en cours. Veuillez en supprimer une avant d'en ajouter.");
			}

		});

		/* SUPPRESSION D'UNE TACHE */
		$(".croix").click(function() {
			// on récupère l'identifiant de la tâche
			identifiant = parseInt($(this).parent().parent().attr('id'));
			// on supprime la tache du tableau qui a le bon identifiant et on remet le tableau dans le storage
			tabTaches.splice(identifiant,1);
			localStorage["taches"] = JSON.stringify(tabTaches);		
			location.reload();
		});

		/* AJOUT AVANCEMENT */
		$(".plus").click(function() {
			identifiant = parseInt($(this).parent().attr('id'));
			// on récupère l'avancement et on l'augmente
			if(tabTaches[identifiant].pourcentage < 91)
			{
				tabTaches[identifiant].pourcentage = parseInt(tabTaches[identifiant].pourcentage) + 10;
				localStorage["taches"] = JSON.stringify(tabTaches);		
				location.reload();
			}
			
		});

		/* DIMINUER AVANCEMENT */
		$(".moins").click(function() {
			identifiant = parseInt($(this).parent().attr('id'));
			// on récupère l'avancement et on le diminue
			if(tabTaches[identifiant].pourcentage > 9)
			{
				tabTaches[identifiant].pourcentage = parseInt(tabTaches[identifiant].pourcentage) - 10;
				localStorage["taches"] = JSON.stringify(tabTaches);		
				location.reload();
			}
		});			
	}
	else {
		alert("Désolé, mais le Web Storage n'est pas supporté");
	}


	/* Datepicker */
	$("#dateTache").datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: "dd-mm-yy",
		minDate: new Date(2015,1,1)
	});
});