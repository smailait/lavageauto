// Navigation & Scroll Events
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('back-to-top');
  const reservationForm = document.getElementById('reservation-form');
  const contactForm = document.getElementById('contact-form');
  const confirmationModal = document.getElementById('confirmation-modal');
  const closeModal = document.querySelector('.close-modal');
  const closeConfirmation = document.getElementById('close-confirmation');
  const faqItems = document.querySelectorAll('.faq-item');
  const prevTestimonial = document.getElementById('prev-testimonial');
  const nextTestimonial = document.getElementById('next-testimonial');
  const testimonialContainer = document.querySelector('.testimonials-container');
  const testimonials = document.querySelectorAll('.testimonial');
  
  // Current testimonial index
  let currentTestimonial = 0;
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }
  });
  
  // Mobile menu toggle
  mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle hamburger animation
    const bars = mobileMenu.querySelectorAll('.bar');
    if (navMenu.classList.contains('active')) {
      bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });
  
  // Close mobile menu when clicking on a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileMenu.classList.remove('active');
      
      // Reset hamburger
      const bars = mobileMenu.querySelectorAll('.bar');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
      
      // Add active class to clicked link
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      link.classList.add('active');
    });
  });
  
  // Back to top button
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // FAQ accordion
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQs
      faqItems.forEach(faq => faq.classList.remove('active'));
      
      // If the clicked FAQ wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // Testimonial slider
  function showTestimonial(index) {
    if (index < 0) {
      currentTestimonial = testimonials.length - 1;
    } else if (index >= testimonials.length) {
      currentTestimonial = 0;
    } else {
      currentTestimonial = index;
    }
    
    testimonialContainer.style.transform = `translateX(-${currentTestimonial * 100}%)`;
  }
  
  prevTestimonial.addEventListener('click', () => {
    showTestimonial(currentTestimonial - 1);
  });
  
  nextTestimonial.addEventListener('click', () => {
    showTestimonial(currentTestimonial + 1);
  });
  
  // Auto slide testimonials
  let testimonialInterval = setInterval(() => {
    showTestimonial(currentTestimonial + 1);
  }, 5000);
  
  // Pause auto slide on hover
  testimonialContainer.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });
  
  testimonialContainer.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
      showTestimonial(currentTestimonial + 1);
    }, 5000);
  });
  
  // Reservation form submission
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = {
    nom: document.getElementById('nom').value,
    telephone: document.getElementById('telephone').value,
    email: document.getElementById('email').value,
    date: document.getElementById('date').value,
    heure: document.getElementById('heure').value,
    typeVehicule: document.getElementById('type-vehicule').value,
    adresse: document.getElementById('adresse').value,
    formule: document.getElementById('formule').value,
    commentaire: document.getElementById('commentaire').value
  };

  fetch('reservation.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
  // Remplir les infos dans le modal
  document.getElementById('confirm-date').textContent = formData.date;
  document.getElementById('confirm-time').textContent = formData.heure;
  document.getElementById('confirm-formule').textContent = formData.formule;

  // Afficher le modal
  confirmationModal.classList.add('show');
}

    if (data.success) {
      // Met à jour et affiche le modal comme actuellement
      // ...
    } else {
      alert("Erreur : " + data.message);
    }
  })
  .catch(error => {
    console.error('Erreur réseau :', error);
    alert('Une erreur est survenue, veuillez réessayer.');
  });
});

  }
  
  // Contact form submission
 if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    fetch('contact_process.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(msg => {
      
      alert(msg); // Affiche le vrai message retourné par contact_process.php
      contactForm.reset();
    })
    .catch(error => {
      alert("Erreur d'envoi : " + error);
    });
  });
}

  
  // Close modal events
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      confirmationModal.classList.remove('show');
    });
  }
  
  if (closeConfirmation) {
    closeConfirmation.addEventListener('click', () => {
      confirmationModal.classList.remove('show');
      
      // Reset form
      reservationForm.reset();
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === confirmationModal) {
      confirmationModal.classList.remove('show');
    }
  });
  
  // Before/After image slider in gallery
  const beforeAfterContainer = document.querySelector('.before-after');
  if (beforeAfterContainer) {
    const sliderHandle = document.querySelector('.slider-handle');
    const beforeImage = document.querySelector('.before');
    
    function handleSlider(e) {
      const containerRect = beforeAfterContainer.getBoundingClientRect();
      let position;
      
      // Check if it's a mouse or touch event
      if (e.type === 'touchmove') {
        position = e.touches[0].clientX - containerRect.left;
      } else {
        position = e.clientX - containerRect.left;
      }
      
      // Calculate position percentage
      let percentage = (position / containerRect.width) * 100;
      
      // Limit percentage between 0 and 100
      percentage = Math.max(0, Math.min(percentage, 100));
      
      // Update slider position
      sliderHandle.style.left = `${percentage}%`;
      
      // Update clip-path of before image
      beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    }
    
    let isSliding = false;
    
    // Mouse events
    sliderHandle.addEventListener('mousedown', () => {
      isSliding = true;
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isSliding) {
        handleSlider(e);
      }
    });
    
    document.addEventListener('mouseup', () => {
      isSliding = false;
    });
    
    // Touch events for mobile
    sliderHandle.addEventListener('touchstart', () => {
      isSliding = true;
    });
    
    document.addEventListener('touchmove', (e) => {
      if (isSliding) {
        handleSlider(e);
      }
    });
    
    document.addEventListener('touchend', () => {
      isSliding = false;
    });
  }

  // Initialize Google Map
  
  window.initMap = function () {
  const bejaia = { lat: 36.750889, lng: 5.056733 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: bejaia
  });

  new google.maps.Marker({
    position: bejaia,
    map: map,
    title: "Nous sommes à Béjaïa"
  });
};

  // Initialiser la carte 
  const map = L.map('map').setView([36.750889, 5.056733], 13);

  // Ajouter les tuiles OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19
  }).addTo(map);

  // Ajouter un marqueur
  L.marker([36.750889, 5.056733])
    .addTo(map)
    .bindPopup("📍 Lavage auto a Béjaïa")
    .openPopup();

 
  // Active nav link based on scroll position
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});