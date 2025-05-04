function toggleNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }



  // Single initialization script
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.expandable');
  const overlay = document.getElementById('overlay');
  const expandedImg = document.getElementById('expanded-img');
  const closeBtn = document.querySelector('.close');
  
  images.forEach(img => {
    img.addEventListener('click', function() {
      expandedImg.src = this.src;
      expandedImg.alt = this.alt;
      overlay.style.display = 'flex';
    });
  });
  
  overlay.addEventListener('click', function() {
    this.style.display = 'none';
  });
  
  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    overlay.style.display = 'none';
  });
});








    // Object to store slideshow states
    const slideshows = {
      1: { index: 1 },
      2: { index: 1 }
  };
  
  // Initialize all slideshows
  for (let id in slideshows) {
      showSlides(slideshows[id].index, parseInt(id));
  }
  
  function changeSlide(n, slideshowId) {
      slideshows[slideshowId].index += n;
      showSlides(slideshows[slideshowId].index, slideshowId);
  }
  
  function currentSlide(n, slideshowId) {
      slideshows[slideshowId].index = n;
      showSlides(slideshows[slideshowId].index, slideshowId);
  }
  
  function showSlides(n, slideshowId) {
      let container = document.querySelector(`[data-slideshow="${slideshowId}"]`);
      let slides = container.getElementsByClassName("slide");
      // CHANGED: "dot" to "circle"
      let circles = container.nextElementSibling.getElementsByClassName("circle");
      
      if (n > slides.length) {slideshows[slideshowId].index = 1}
      if (n < 1) {slideshows[slideshowId].index = slides.length}
      
      for (let i = 0; i < slides.length; i++) {
          slides[i].classList.remove("active");
      }
      
      // CHANGED: "dots" to "circles"
      for (let i = 0; i < circles.length; i++) {
          circles[i].classList.remove("active");
      }
      
      slides[slideshows[slideshowId].index-1].classList.add("active");
      circles[slideshows[slideshowId].index-1].classList.add("active");
  }
  
  // Touch event handling remains the same
  document.querySelectorAll('.slideshow-container').forEach(container => {
      let touchStartX;
      let touchEndX;
      const slideshowId = parseInt(container.dataset.slideshow);
      
      container.addEventListener('touchstart', e => {
          touchStartX = e.changedTouches[0].screenX;
      });
      
      container.addEventListener('touchend', e => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe(slideshowId);
      });
      
      function handleSwipe(id) {
          const swipeThreshold = 50;
          const diff = touchStartX - touchEndX;
          
          if (Math.abs(diff) > swipeThreshold) {
              if (diff > 0) {
                  // Swipe left - next slide
                  changeSlide(1, id);
              } else {
                  // Swipe right - previous slide
                  changeSlide(-1, id);
              }
          }
      }
  });
  
  // Auto-play remains the same
  let autoplayIntervals = {};
  
  for (let id in slideshows) {
      autoplayIntervals[id] = setInterval(() => {
          changeSlide(1, parseInt(id));
      }, 5000);
      
      // Pause auto-play on touch/click for each slideshow
      document.querySelector(`[data-slideshow="${id}"]`).addEventListener('touchstart', () => {
          clearInterval(autoplayIntervals[id]);
      });
      
      document.querySelector(`[data-slideshow="${id}"]`).addEventListener('mousedown', () => {
          clearInterval(autoplayIntervals[id]);
      });
  }