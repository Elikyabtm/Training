import gsap from "gsap"

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form")
  const formElements = form.elements

  // Animation d'entrée des éléments du formulaire
  gsap.from(formElements, {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out",
  })

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Animation du bouton lors de la soumission
    gsap.to(e.submitter, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    })

    // Simuler l'envoi du formulaire (remplacer par votre logique d'envoi réelle)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Réinitialiser le formulaire et afficher un message de confirmation
    form.reset()
    alert("Votre message a été envoyé avec succès !")
  })

  // Ajouter des effets de survol sur les champs du formulaire
  Array.from(formElements).forEach((element) => {
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      element.addEventListener("focus", () => {
        gsap.to(element, {
          boxShadow: "0 0 10px rgba(30, 215, 96, 0.5)",
          duration: 0.3,
        })
      })

      element.addEventListener("blur", () => {
        gsap.to(element, {
          boxShadow: "none",
          duration: 0.3,
        })
      })
    }
  })
})

