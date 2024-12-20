document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ici, vous pouvez ajouter le code pour envoyer le formulaire à votre backend
    // Pour cet exemple, nous allons simplement afficher une alerte
    alert('Merci pour votre message ! Nous vous contacterons bientôt.');
    this.reset();
});

