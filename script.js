const albumData = [
    { id: 1, title: "Anxious", cover: "images/ANXIOUS.png", excerpt: "audios/Anxious Instagram.mp3", fullTrack: "audios/Anxious Instagram.mp3", description: "Description de l'album 1", background: "images/Anxious-bg.jpg" },
    { id: 2, title: "Frustrated", cover: "https://via.placeholder.com/150", excerpt: "audios/Frustrated.mp3", fullTrack: "audios/Frustrated.mp3", description: "Description de l'album 2",background: "images/Frustrated-bg.jpg"},
    { id: 3, title: "Horizon", cover: "https://via.placeholder.com/150", excerpt: "audios/Horizon.mp3", fullTrack: "audios/Horizon.mp3", description: "Description de l'album 3",background: "images/Horizon-bg.jpg" },
    { id: 4, title: "Look Around", cover: "images/Look around.png", excerpt: "audios/Look Around.mp3", fullTrack: "audios/Look Around.mp3", description: "Description de l'album 4",background: "images/Look-around-bg.jpg" },
    { id: 5, title: "Lost", cover: "https://via.placeholder.com/150", excerpt: "audios/Lost.mp3", fullTrack: "audios/Lost.mp3", description: "Description de l'album 5",background: "images/Lost-bg.jpg" },
    { id: 6, title: "Missing You", cover: "https://via.placeholder.com/150", excerpt: "audios/Missing You.MP3", fullTrack: "audios/Missing You.MP3", description: "Description de l'album 6",background: "images/Missing-you-bg.jpg" },
    { id: 7, title: "The End", cover: "https://via.placeholder.com/150", excerpt: "audios/The End.mp3", fullTrack: "audios/The End.mp3", description: "Description de l'album 7",background: "images/The-End-bg.jpg" },
    { id: 8, title: "Not Right", cover: "https://via.placeholder.com/150", excerpt: "audios/Not right.mp3", fullTrack: "audios/Not right.mp3", description: "Description de l'album 8",background: "images/Not-right-bg.jpg" },
    { id: 9, title: "Space Drill", cover: "https://via.placeholder.com/150", excerpt: "audios/Space drill.mp3", fullTrack: "audios/Space drill.mp3", description: "Description de l'album 9",background: "images/Space-drill-bg.jpg" },

];

const albums = document.querySelectorAll('.album');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupAudio = document.getElementById('popup-audio');
const popupDescription = document.getElementById('popup-description');
const closePopup = document.getElementsByClassName('close')[0];

let currentAudio = null;

function getRandomPosition(element) {
    const x = Math.random() * (window.innerWidth - element.clientWidth);
    const y = Math.random() * (window.innerHeight - element.clientHeight);
    return [x, y];
}

function updateBackground(imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
}

albums.forEach((album, index) => {
    const [x, y] = getRandomPosition(album);
    album.style.left = `${x}px`;
    album.style.top = `${y}px`;

    const draggie = new Draggabilly(album, {
        containment: 'body'
    });

    draggie.on('dragStart', function(event, pointer) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = new Audio(albumData[index].excerpt);
        currentAudio.play();

        updateBackground(albumData[index].background);
    });

    draggie.on('dragEnd', function(event, pointer) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
    });

    album.addEventListener('click', (event) => {
        const albumInfo = albumData[index];
        popupTitle.textContent = albumInfo.title;
        popupAudio.src = albumInfo.fullTrack;
        popupDescription.textContent = albumInfo.description;
        popup.style.display = 'block';
        event.stopPropagation();
    });
});

closePopup.onclick = function() {
    popup.style.display = 'none';
    popupAudio.pause();
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = 'none';
        popupAudio.pause();
    }
}

document.body.style.willChange = 'background-image';
albums.forEach(album => {
    album.style.willChange = 'transform';
});

