const albumData = [
    {
      id: 1,
      title: "Anxious",
      cover: "images/ANXIOUS.png",
      excerpt: "audios/Anxious Instagram.mp3",
      fullTrack: "audios/Anxious Instagram.mp3",
      description: "Un beat anxiogène qui te plonge dans une ambiance sombre et oppressante.",
      background: "images/Anxious-bg.jpg",
    },
    {
      id: 2,
      title: "Frustrated",
      cover: "images/Frustrated.png",
      excerpt: "audios/Frustrated.mp3",
      fullTrack: "audios/Frustrated.mp3",
      description: "Une prod qui canalise toute ta frustration en une explosion sonore puissante.",
      background: "images/Frustrated-bg.jpg",
    },
    {
      id: 3,
      title: "Horizon",
      cover: "images/Horizon.png",
      excerpt: "audios/Horizon.mp3",
      fullTrack: "audios/Horizon.mp3",
      description: "Un voyage sonore qui t'emmène vers de nouveaux horizons musicaux.",
      background: "images/Horizon-bg.jpg",
    },
    {
      id: 4,
      title: "Look Around",
      cover: "images/Look-around.png",
      excerpt: "audios/Look Around.mp3",
      fullTrack: "audios/Look Around.mp3",
      description: "Un beat qui t'invite à ouvrir les yeux sur le monde qui t'entoure.",
      background: "images/Look-around-bg.jpg",
    },
    {
      id: 5,
      title: "Lost",
      cover: "images/Lost.png",
      excerpt: "audios/Lost.mp3",
      fullTrack: "audios/Lost.mp3",
      description: "Une prod mélancolique pour exprimer ce sentiment de perte et d'égarement.",
      background: "images/Lost-bg.jpg",
    },
    {
      id: 6,
      title: "Missing You",
      cover: "images/Missing-you.png",
      excerpt: "audios/Missing You.MP3",
      fullTrack: "audios/Missing You.MP3",
      description: "Une mélodie nostalgique qui évoque le manque et l'absence.",
      background: "images/Missing-you-bg.jpg",
    },
    {
      id: 7,
      title: "The End",
      cover: "images/The-End.png",
      excerpt: "audios/The End.mp3",
      fullTrack: "audios/The End.mp3",
      description: "Le beat final, celui qui clôture tout en beauté.",
      background: "images/The-End-bg.jpg",
    },
    {
      id: 8,
      title: "Not Right",
      cover: "images/Not-right.png",
      excerpt: "audios/Not right.mp3",
      fullTrack: "audios/Not right.mp3",
      description: "Quand quelque chose ne tourne pas rond, ce beat l'exprime parfaitement.",
      background: "images/Not-right-bg.jpg",
    },
    {
      id: 9,
      title: "Space Drill",
      cover: "images/Space-drill.png",
      excerpt: "audios/Space drill.mp3",
      fullTrack: "audios/Space drill.mp3",
      description: "Un drill cosmique qui te propulse dans une autre dimension.",
      background: "images/Space-drill-bg.jpg",
    },
  ]
  
  const vinylContainer = document.getElementById("vinyl-container")
  const popup = document.getElementById("popup")
  const popupTitle = document.getElementById("popup-title")
  const popupAudio = document.getElementById("popup-audio")
  const popupDescription = document.getElementById("popup-description")
  const popupVinyl = document.getElementById("popup-vinyl")
  const closePopup = document.getElementsByClassName("close")[0]
  
  let currentAudio = null
  
  function updateBackground(imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundPosition = "center"
    document.body.style.backgroundAttachment = "fixed"
  }
  
  function createVinylElement(album) {
    const vinylElement = document.createElement("div")
    vinylElement.className = "vinyl"
    vinylElement.style.backgroundImage = `url(${album.cover})`
  
    Draggable.create(vinylElement, {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: vinylContainer,
      inertia: true,
      onDragStart: () => {
        if (currentAudio) {
          currentAudio.pause()
          currentAudio.currentTime = 0
        }
        currentAudio = new Audio(album.excerpt)
        currentAudio.play()
  
        gsap.to(vinylElement, { scale: 1.1, duration: 0.3 })
        updateBackground(album.background)
      },
      onDragEnd: () => {
        if (currentAudio) {
          currentAudio.pause()
          currentAudio.currentTime = 0
        }
        gsap.to(vinylElement, { scale: 1, duration: 0.3 })
      },
    })
  
    vinylElement.addEventListener("click", (event) => {
      popupTitle.textContent = album.title
      popupAudio.src = album.fullTrack
      popupDescription.textContent = album.description
      popupVinyl.style.backgroundImage = `url(${album.cover})`
      popup.style.display = "block"
      event.stopPropagation()
    })
  
    return vinylElement
  }
  
  albumData.forEach((album) => {
    const vinylElement = createVinylElement(album)
    vinylContainer.appendChild(vinylElement)
  
    gsap.set(vinylElement, {
      x: Math.random() * (vinylContainer.offsetWidth - 200),
      y: Math.random() * (vinylContainer.offsetHeight - 200),
    })
  })
  
  closePopup.onclick = () => {
    popup.style.display = "none"
    popupAudio.pause()
    gsap.to(".tonearm", { rotation: -30, duration: 1, ease: "power2.in" })
    popupVinyl.style.animationPlayState = "paused"
  }
  
  window.onclick = (event) => {
    if (event.target == popup) {
      popup.style.display = "none"
      popupAudio.pause()
      gsap.to(".tonearm", { rotation: -30, duration: 1, ease: "power2.in" })
      popupVinyl.style.animationPlayState = "paused"
    }
  }
  
  // Animation du bras de lecture et rotation du vinyle
  popupAudio.addEventListener("play", () => {
    gsap.to(".tonearm", { rotation: 0, duration: 1, ease: "power2.out" })
    popupVinyl.style.animationPlayState = "running"
  })
  
  popupAudio.addEventListener("pause", () => {
    gsap.to(".tonearm", { rotation: -30, duration: 1, ease: "power2.in" })
    popupVinyl.style.animationPlayState = "paused"
  })
  
  // Initialisation du fond
  updateBackground(albumData[0].background)
  
  // Gestion du redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    const vinyls = document.querySelectorAll(".vinyl")
    vinyls.forEach((vinyl) => {
      gsap.set(vinyl, {
        x: Math.random() * (vinylContainer.offsetWidth - 200),
        y: Math.random() * (vinylContainer.offsetHeight - 200),
      })
    })
  })
  
  // Ajout d'animations au défilement
function animateOnScroll() {
  const elements = document.querySelectorAll(".about-content, .service-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// Animation du hero
function animateHero() {
  const tl = gsap.timeline()

  tl.from("h1", { opacity: 0, y: 50, duration: 1 })
    .from(".hero-subtitle", { opacity: 0, y: 30, duration: 1 }, "-=0.5")
    .from(".cta-button", { opacity: 0, y: 20, duration: 0.5, stagger: 0.2 }, "-=0.5")
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  animateHero()
  animateOnScroll()

  // ... (garder le code existant pour les vinyles) ...
})

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})