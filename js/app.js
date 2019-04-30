function getMessage() {

    // Requête ajax // 


    const requeteAjax = new XMLHttpRequest();
    // Ou et comment doit aller la requête //
    requeteAjax.open("GET", "messages.php");


    // La requête recup les données //
    requeteAjax.onload = function() {
    
        // Permet de voir ce que le serveur à répondu et transform la réponse en objet //
        const resultat = JSON.parse(requeteAjax.responseText);

        // Transforme en html // 
        const html = resultat.reverse().map(function(message){
            return `
            <div class="message">
            <span class="date">${message.dateMessage.substring(11, 16)}</span>
            <span class="auteur">${message.auteur}</span> :
            <span class="contenu">${message.contenuMessage}</span>
            </div>

            `

        // Transforme en une phrase //
        }).join('');

        const messages = document.getElementById('messages');
        console.log(messages);

        messages.innerHTML = html;
        

        // Scroll barre qui descend automatiquement //
        messages.scrollTop = messages.scrollHeight;
    }

    // Pour envoyer la requête //
    requeteAjax.send();
    
}

function postMessage(event) {

    // L'évenement classique doit s'arreter //
    
        event.preventDefault()
 
    // Recupère les champs du formulaire //
    const auteur = document.getElementById('auteur');
    const contenuMessage = document.getElementById('contenuMessage');

    // Créer un essemble de données //
    const data = new FormData();
    data.append('auteur', auteur.value);
    data.append('contenuMessage', contenuMessage.value);

    // Ou et comment on envoie les données //
    const requeteAjax = new XMLHttpRequest();
    requeteAjax.open('POST', 'messages.php?task=write');

    requeteAjax.onload = function(){
        // Vide le champ contenu du message //
        contenuMessage.value= '';
        // Laisse la souris dans le champ //
        
        getMessage();
    }

    // Envoi les données récoltées par le formulaire //
    requeteAjax.send(data);

}

    // Démmare la fonction au subit du form //
    document.querySelector('form').addEventListener('submit', postMessage);

    // Rafraichis pour voir les messages //
    const interval = window.setInterval(getMessage, 5000);

    getMessage();
