document.addEventListener('DOMContentLoaded', () => {
    const draggableElements = document.querySelectorAll('.draggable');
    const artistCards = document.querySelectorAll('.artist-card');
    const artistPopup = document.getElementById('artist-popup');
    const closePopup = artistPopup.querySelector('.close');
    const artistImage = document.getElementById('artist-image');
    const artistName = document.getElementById('artist-name');
    const artistGenre = document.getElementById('artist-genre');

    draggableElements.forEach(element => {
        new Draggabilly(element, {
            containment: '.inspirations-main'
        });
    });

    artistCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const name = card.querySelector('h3').textContent;
            
            artistImage.src = img.src;
            artistName.textContent = name;
            artistGenre.textContent = "Genre: " + getRandomGenre(); 
            
            artistPopup.style.display = 'block';
        });
    });

    closePopup.onclick = () => {
        artistPopup.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == artistPopup) {
            artistPopup.style.display = 'none';
        }
    };

    const playlists = document.querySelectorAll('.playlist');
    playlists.forEach(playlist => {
        playlist.addEventListener('click', () => {
            alert(`Vous avez cliqué sur ${playlist.textContent}`);
        });
    });
});

// Ajout d'une fonctionnalité de tri pour les playlists
const playlistContainer = document.getElementById('playlist-container');
new Sortable(playlistContainer, {
    animation: 150,
    ghostClass: 'playlist-ghost'
});

// Fonction pour ajouter une nouvelle playlist
function addPlaylist(name) {
    const newPlaylist = document.createElement('li');
    newPlaylist.className = 'playlist draggable';
    newPlaylist.textContent = name;
    playlistContainer.appendChild(newPlaylist);
    
    new Draggabilly(newPlaylist, {
        containment: '.inspirations-main'
    });

    newPlaylist.addEventListener('click', () => {
        alert(`Vous avez cliqué sur ${name}`);
    });
}

// Bouton pour ajouter une nouvelle playlist
const addPlaylistButton = document.createElement('button');
addPlaylistButton.textContent = 'Ajouter une playlist';
addPlaylistButton.addEventListener('click', () => {
    const playlistName = prompt('Entrez le nom de la nouvelle playlist:');
    if (playlistName) {
        addPlaylist(playlistName);
    }
});
document.querySelector('.sidebar').appendChild(addPlaylistButton);

// Ajout d'une fonctionnalité de recherche pour les artistes
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Rechercher un artiste';
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    artistCards.forEach(card => {
        const artistName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = artistName.includes(searchTerm) ? 'block' : 'none';
    });
});
document.querySelector('.content').insertBefore(searchInput, document.querySelector('.artist-grid'));

function getRandomGenre() {
    const genres = ['Pop', 'Rock', 'Hip-Hop', 'R&B', 'Electronic', 'Jazz', 'Classical'];
    return genres[Math.floor(Math.random() * genres.length)];
}

