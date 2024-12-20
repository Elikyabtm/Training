const albumData = [
    { id: 1, title: "Anxious", cover: "images/ANXIOUS.png", excerpt: "audios/Anxious Instagram.mp3", fullTrack: "audios/Anxious Instagram.mp3", description: "Description de l'album 1", background: "images/Anxious-bg.jpg" },
    { id: 2, title: "Frustrated", cover: "https://via.placeholder.com/150", excerpt: "audios/Frustrated.mp3", fullTrack: "audios/Frustrated.mp3", description: "Description de l'album 2", background: "images/Frustrated-bg.jpg" },
    { id: 3, title: "Horizon", cover: "https://via.placeholder.com/150", excerpt: "audios/Horizon.mp3", fullTrack: "audios/Horizon.mp3", description: "Description de l'album 3", background: "images/Horizon-bg.jpg" },
    { id: 4, title: "Look Around", cover: "images/Look around.png", excerpt: "audios/Look Around.mp3", fullTrack: "audios/Look Around.mp3", description: "Look Around est une prod sombre et percutante, caractéristique du style drill. Avec un tempo à 140 BPM, elle plonge dans une ambiance nocturne, brute et introspective. Les 808 vibrants et profonds s’entrelacent avec des hi-hats tranchants et une caisse claire sèche, créant une rythmique incisive. Une mélodie oppressante, basée sur un sample modifié, accentue le côté mélancolique et menaçant, rappelant les rues désertes éclairées par des lampadaires.", background: "images/Look-around-bg.jpg" },
    { id: 5, title: "Lost", cover: "https://via.placeholder.com/150", excerpt: "audios/Lost.mp3", fullTrack: "audios/Lost.mp3", description: "Lost est une prod mélancolique et introspective, où une mélodie poignante portée par des synthés doux crée une ambiance pesante et émotive. Les 808 profonds et vibrants, associés à des hi-hats rapides et précis, ancrent la rythmique dans le style drill tout en laissant place à une certaine sensibilité. Des transitions subtiles et des effets atmosphériques renforcent l’impression de solitude et de réflexion. Une composition parfaite pour raconter une histoire personnelle ou transmettre une émotion brute.", background: "images/Lost-bg.jpg" },
    { id: 6, title: "Missing You", cover: "https://via.placeholder.com/150", excerpt: "audios/Missing You.MP3", fullTrack: "audios/Missing You.MP3", description: "Description de l'album 6", background: "images/Missing-you-bg.jpg" },
    { id: 7, title: "The End", cover: "https://via.placeholder.com/150", excerpt: "audios/The End.mp3", fullTrack: "audios/The End.mp3", description: "The End est une prod intense et sombre, clairement influencée par le style drill. Elle s'ouvre avec une mélodie oppressante et répétitive, jouée sur des synthés glacials, qui instaure immédiatement une tension dramatique. Les 808 frappent avec puissance, accompagnées de hi-hats rapides et tranchants, caractéristiques de la drill.La composition est rythmée par des kicks lourds et des transitions bien marquées, accentuant l'énergie brute et l'atmosphère menaçante. Les variations subtiles dans la mélodie et la rythmique maintiennent une dynamique constante tout en restant minimalistes. L’ensemble évoque un sentiment de détermination et de danger, idéal pour un storytelling ou une ambiance introspective et urbaine", background: "images/The-End-bg.jpg" },
    { id: 8, title: "Not Right", cover: "https://via.placeholder.com/150", excerpt: "audios/Not right.mp3", fullTrack: "audios/Not right.mp3", description: "Description de l'album 8", background: "images/Not-right-bg.jpg" },
    { id: 9, title: "Space Drill", cover: "https://via.placeholder.com/150", excerpt: "audios/Space drill.mp3", fullTrack: "audios/Space drill.mp3", description: "Space Drill est une prod immersive qui fusionne l’intensité de la drill avec une ambiance futuriste. Une mélodie éthérée et des synthés spatiaux instaurent une tension mystique, tandis que des 808 puissants et des hi-hats rapides apportent une rythmique percutante. Les effets d’écho et de réverbe renforcent l’atmosphère cosmique, créant un équilibre entre lourdeur et légèreté. Une prod captivante et innovante, parfaite pour des thèmes de mystère ou de conquête.", background: "images/Space-drill-bg.jpg" },

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

    draggie.on('dragStart', function (event, pointer) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = new Audio(albumData[index].excerpt);
        currentAudio.play();

        updateBackground(albumData[index].background);
    });

    draggie.on('dragEnd', function (event, pointer) {
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

closePopup.onclick = function () {
    popup.style.display = 'none';
    popupAudio.pause();
}

window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = 'none';
        popupAudio.pause();
    }
}

document.body.style.willChange = 'background-image';
albums.forEach(album => {
    album.style.willChange = 'transform';
});

