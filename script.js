function toggleNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  function handleNavigation(event) {
    const clickedElement = event.target.closest('.clickable');
    if (clickedElement) {
        const href = clickedElement.getAttribute('data-href');
        if (href) {
            window.location.href = href;
        }
    }
  }
  
  function handleCaseStudyButtonClick() {
    window.location.href = '/school-ride.html';
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const bigContainer = document.getElementById('big-container');
    if (bigContainer) {
        bigContainer.addEventListener('click', handleNavigation);
    }
  
    const caseStudyButton = document.getElementById('caseStudyButton');
    if (caseStudyButton) {
        caseStudyButton.addEventListener('click', handleCaseStudyButtonClick);
    }
  });