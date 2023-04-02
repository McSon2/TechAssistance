//BUTON BACK TO TOP

const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (
    window.pageYOffset > 70 &&
    window.innerHeight + window.pageYOffset <
      document.body.offsetHeight - 35
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
  const popup = document.getElementById("popup");
  const closePopupButton = document.getElementById("close-popup");

  form.addEventListener("submit", function (event) {
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
          } else {
            alert(
              "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer."
            );
          }
        } else {
          alert(
            "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer."
          );
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

document.querySelectorAll('.accordion-title').forEach((title) => {
  title.addEventListener('click', () => {
    const id = title.parentElement.getAttribute('data-id');
    closeOtherAccordions(id);
    toggleAccordion(title.nextElementSibling);
  });
});

function closeOtherAccordions(id) {
  document.querySelectorAll('.accordion-item').forEach((item) => {
    if (item.getAttribute('data-id') !== id) {
      const content = item.querySelector('.accordion-content');
      if (content.style.display === 'block') {
        content.style.display = 'none';
      }
    }
  });
}

function toggleAccordion(content) {
  const allAccordionItems = document.querySelectorAll('.accordion-item');
  
  allAccordionItems.forEach((item) => {
    const otherContent = item.querySelector('.accordion-content');
    
    if (otherContent !== content && otherContent.style.maxHeight) {
      otherContent.style.maxHeight = null;
    }
  });

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}
