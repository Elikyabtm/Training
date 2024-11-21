var letters = document.querySelectorAll('.letter');

letters.forEach(letter => {
    new Draggabilly(letter, {});
});

const albums = document.querySelectorAll('.album');
let currentAudio = null;

albums.forEach(album => {

    new Draggabilly(album, {
        containment: 'body' 
    });


    album.addEventListener('click', (event) => {

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; 
        }

        const audioSrc = album.getAttribute('data-audio');
        currentAudio = new Audio(audioSrc);
        currentAudio.play();
        event.stopPropagation();
    });
});

document.addEventListener('click', () => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; 
        currentAudio = null; 
    }
});

