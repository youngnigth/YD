
  document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Newsletter Toast Logic
    const form = document.getElementById("subscribe-form");
    const toast = document.getElementById("toast");

    if (form && toast) {
      form.addEventListener("submit", (e) => {
        e.preventDefault(); // Stop form from reloading page

        const formData = new FormData(form);

        fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        })
        .then(response => {
          if (response.ok) {
            showToast();
            form.reset();
          } else {
            alert("Oops! Something went wrong.");
          }
        })
        .catch(() => {
          alert("Submission failed. Please try again.");
        });
      });

      function showToast() {
        toast.classList.remove("opacity-0");
        toast.classList.add("opacity-100");

        setTimeout(() => {
          toast.classList.remove("opacity-100");
          toast.classList.add("opacity-0");
        }, 4000);
      }
    }
  });

  // Carousel Scroll Function
  function scrollCarousel(direction) {
    const track = document.getElementById('carousel-track');
    const scrollAmount = 320;
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }


//Star modal

const modal = document.getElementById("newsletter-modal");
    const closeModal = document.getElementById("close-modal");
    const form = document.getElementById("newsletter-form");
    const spinner = document.getElementById("spinner");
    const submitText = document.getElementById("submit-text");

    if (!localStorage.getItem("newsletterSubscribed")) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }

    closeModal.addEventListener("click", () => {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
      localStorage.setItem("newsletterSubscribed", "true");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show spinner
      spinner.classList.remove("hidden");
      submitText.textContent = "Sending...";

      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
        .then((response) => {
          if (response.ok) {
            localStorage.setItem("newsletterSubscribed", "true");

            // Confetti burst
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 }
            });

            const modalContent = form.parentElement;
            modalContent.innerHTML = `
              <button id="close-modal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl">&times;</button>
              <div class="text-center">
                <h2 class="text-2xl font-bold mb-4 text-green-600">🎉 Thank You!</h2>
                <p class="text-gray-700">You're now subscribed to our newsletter. Stay tuned!</p>
              </div>
            `;

            // Auto-close modal after 4 seconds
            setTimeout(() => {
              modal.classList.add("hidden");
              document.body.style.overflow = "auto";
            }, 2000);
          } else {
            alert("Oops! Something went wrong.");
            resetButton();
          }
        })
        .catch(() => {
          alert("Submission failed. Please try again.");
          resetButton();
        });

      function resetButton() {
        spinner.classList.add("hidden");
        submitText.textContent = "Subscribe";
      }
    });


