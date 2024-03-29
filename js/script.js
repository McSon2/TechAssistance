//BUTON BACK TO TOP

const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (
    window.pageYOffset > 70 &&
    window.innerHeight + window.pageYOffset < document.body.offsetHeight - 35
  ) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

// SMOOTH SCROLL

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//CONTACT FORM

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const emailInput = document.getElementById("email");
  const popup = document.getElementById("popup");
  const closePopupButton = document.getElementById("close-popup");
  const formError = document.getElementById("form-error");
  const emailError = document.getElementById("email-error");

  emailInput.addEventListener("input", function () {
    const emailError = document.getElementById("email-error");
    if (!this.validity.valid) {
        if (this.validity.typeMismatch) {
            emailError.textContent = "Veuillez entrer une adresse e-mail valide.";
        } else if (this.validity.valueMissing) {
            emailError.textContent = "Veuillez remplir ce champ.";
        }
        emailError.classList.remove("hidden");
    } else {
        emailError.classList.add("hidden");
    }
});

  form.addEventListener("submit", function (event) {

    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    
    if (!emailInput.validity.valid) {
        event.preventDefault();
        if (emailInput.validity.typeMismatch) {
            emailError.textContent = "Veuillez entrer une adresse e-mail valide.";
        } else if (emailInput.validity.valueMissing) {
            emailError.textContent = "Veuillez remplir ce champ.";
        }
        emailError.classList.remove("hidden");
        return;
    }

    event.preventDefault();

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);

          if (response.success) {
            popup.classList.remove("hidden");
            form.reset();
            emailError.classList.add("hidden");
          } else {
            if (response.error === 'Email non valide') { // Nouveau
              emailError.classList.remove("hidden"); // Nouveau
          } else {
              formError.style.visibility = "visible";
          }
          }
        } else {
              formError.style.visibility = "visible";
        }
      }
    };

    xhr.open("POST", "contact.php", true);
    xhr.send(formData);
  });

  closePopupButton.addEventListener("click", function () {
    popup.classList.add("hidden");
  });
});

//FAQ

document.querySelectorAll(".accordion-title").forEach((title) => {
  title.addEventListener("click", () => {
    const id = title.parentElement.getAttribute("data-id");
    closeOtherAccordions(id);
    toggleAccordion(title.nextElementSibling);
  });
});

function closeOtherAccordions(id) {
  document.querySelectorAll(".accordion-item").forEach((item) => {
    if (item.getAttribute("data-id") !== id) {
      const content = item.querySelector(".accordion-content");
      const chevron = item.querySelector(".fas");
      if (content.style.display === "block") {
        content.style.display = "none";
        chevron.classList.remove("rotate");
      }
    }
  });
}

function toggleAccordion(content) {
  const allAccordionItems = document.querySelectorAll(".accordion-item");
  const chevron = content.parentElement.querySelector(".fas");

  allAccordionItems.forEach((item) => {
    const otherContent = item.querySelector(".accordion-content");

    if (otherContent !== content && otherContent.style.maxHeight) {
      otherContent.style.maxHeight = null;
      const otherChevron = item.querySelector(".fas");
      otherChevron.classList.remove("rotate");
    }
  });

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    chevron.classList.remove("rotate");
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    chevron.classList.add("rotate");
  }
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();

    const target = document.querySelector(anchor.getAttribute('href'));
    const headerHeight = document.querySelector('.header').getBoundingClientRect().height;

    const yOffset = -headerHeight;

    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});