const artistData = [
  {
    id: 1,
    name: "Aaryan Shah",
    image: "images/Aaryan Shah.jpeg",
    description: "Aaryan Shah est un chanteur indo-américain de R&B alternatif aux influences sombres et atmosphériques. Son titre le plus connu est Renegade.",
    audio: "audios/Aaryan Shah - Renegade (Lyrics) w&k.mp3",
  },
  {
    id: 2,
    name: "Burna Boy",
    image: "images/Burna boy.jpg",
    description: "Burna Boy est un artiste nigérian de Afrobeats, reggae et dancehall, connu pour son style fusionnant des influences africaines et internationales. Son titre le plus célèbre est Ye.",
    audio: "audios/Burna Boy - Alone  From Black Panther Wakanda Forever.mp3",
  },
  {
    id: 3,
    name: "Isabel LaRosa",
    image: "images/Isabel LaRosa.jpeg",
    description: "Isabel LaRosa est une artiste américano-cubaine de dark pop et électropop. Son titre le plus connu est I'm Yours.",
    audio: "audios/Isabel LaRosa - eyes dont lie (Audio).mp3",
  },
  {
    id: 4,
    name: "Kerchak",
    image: "images/Kerchak.jpeg",
    description: "Kerchak est un rappeur français d'origine ivoirienne, connu pour son style Jersey drill. Son titre le plus célèbre est Sabor.",
    audio: "audios/Kerchak - Taimerais feat. @ZiakCC (Clip Officiel).mp3",
  },
  {
    id: 5,
    name: "Metro Boomin",
    image: "images/Metro Boomin.jpeg",
    description: "Metro Boomin est un producteur et rappeur américain, spécialisé dans le trap et le hip-hop. Son titre le plus connu en tant qu’artiste principal est Creepin (avec The Weeknd et 21 Savage).",
    audio: "audios/Trance.mp3",
  },
  {
    id: 6,
    name: "Ninho",
    image: "images/Ninho.jpeg",
    description: "Ninho est un rappeur français d'origine congolaise, connu pour son style mêlant rap et trap. Son titre le plus célèbre est Jefe.",
    audio: "audios/Arme de poing.mp3",
  },
  {
    id: 7,
    name: "The Weeknd",
    image: "images/The Weekend.png",
    description: "The Weeknd est un chanteur canadien d'origine éthiopienne, connu pour son style mêlant R&B, pop et synthwave. Son titre le plus célèbre est Blinding Lights.",
    audio: "audios/The Weeknd - Starboy (Lyrics) ft. Daft Punk.mp3",
  },
  {
    id: 8,
    name: "Tsew The Kid",
    image: "images/Tsew The Kid.jpeg",
    description: "Tsew The Kid est un chanteur et rappeur français d'origine malgache, connu pour son style mêlant rap mélodique, R&B et pop urbaine. Son titre le plus célèbre est Wouna.",
    audio: "audios/Tsew The Kid - Peur de sombrer (clip officiel).mp3",
  },
  {
    id: 9,
    name: "Sam Smith",
    image: "images/Sam Smith.jpeg",
    description: "Sam Smith est un chanteur britannique connu pour son style mêlant pop, soul et R&B. Son titre le plus célèbre est Stay With Me.",
    audio: "audios/Naughty Boy - La la la ft. Sam Smith (Lyrics).mp3",
  },
  {
    id: 10,
    name: "The Neighbourhood",
    image: "images/The Neighbourhood.jpg",
    description: "The Neighbourhood est un groupe de rock alternatif américain, connu pour son style mêlant indie rock, R&B et dream pop. Leur titre le plus célèbre est Sweater Weather.",
    audio: "audios/The Neighbourhood - Sweater Weather (Lyrics).mp3",
  },
]

const artistGrid = document.getElementById("artist-grid")
const listeningZone = document.getElementById("listening-zone")
const popup = document.getElementById("artist-popup")
const popupImage = document.getElementById("artist-image")
const popupName = document.getElementById("artist-name")
const popupDescription = document.getElementById("artist-description")
const popupAudio = document.getElementById("artist-audio")
const closePopup = popup.querySelector(".close")



function createArtistCard(artist) {
  const card = document.createElement("div")
  card.className = "artist-card"
  card.innerHTML = `
        <img src="${artist.image}" alt="${artist.name}">
        <h3>${artist.name}</h3>
    `

  Draggable.create(card, {
    type: "x,y",
    bounds: document.body,
    onDragStart: function () {
      gsap.to(this.target, { scale: 1.1, boxShadow: "0 0 20px rgb(255, 255, 255)" })
    },
    onDrag: function () {
      if (this.hitTest(listeningZone, "50%")) {
        listeningZone.classList.add("active")
      } else {
        listeningZone.classList.remove("active")
      }
    },
    onDragEnd: function () {
      gsap.to(this.target, { scale: 1, boxShadow: "none" })
      if (this.hitTest(listeningZone, "50%")) {
        showArtistPopup(artist)
      }
      gsap.to(this.target, { x: 0, y: 0, duration: 0.5 })
      listeningZone.classList.remove("active")
    },
  })

  return card
}

function showArtistPopup(artist) {
  popupImage.src = artist.image
  popupName.textContent = artist.name
  popupDescription.textContent = artist.description
  popupAudio.src = artist.audio
  popup.style.display = "block"
}

artistData.forEach((artist) => {
  const card = createArtistCard(artist)
  artistGrid.appendChild(card)
})

closePopup.onclick = () => {
  popup.style.display = "none"
  popupAudio.pause()
}

window.onclick = (event) => {
  if (event.target == popup) {
    popup.style.display = "none"
    popupAudio.pause()
  }
}

