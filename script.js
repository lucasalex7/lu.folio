// Store the current language
let currentLang = 'pt';

// Function to translate the page
function translatePage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  
  // Get all elements with data-translate attribute
  const elements = document.querySelectorAll('[data-translate]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      // Handle different element types
      if (element.tagName === 'INPUT' && element.type === 'text') {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
  
  // Update language toggle button
  const toggleBtn = document.querySelector('.language-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'pt' ? 'EN/PT' : 'PT/EN';
  }
  
  // Save preference to localStorage
  localStorage.setItem('preferredLang', lang);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved language preference
  const savedLang = localStorage.getItem('preferredLang') || 'pt';
  translatePage(savedLang);
  
  // Set up language toggle button
  const languageToggle = document.querySelector('.language-toggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      const newLang = currentLang === 'pt' ? 'en' : 'pt';
      translatePage(newLang);
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.top-bar').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without page reload
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Lazy load videos
  const lazyLoadVideos = function() {
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
      if (container.getBoundingClientRect().top < window.innerHeight * 1.5) {
        const iframe = container.querySelector('iframe');
        if (iframe && !iframe.src && iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
        }
      }
    });
  };
  
  // Initial check and event listeners
  lazyLoadVideos();
  window.addEventListener('scroll', lazyLoadVideos);
  window.addEventListener('resize', lazyLoadVideos);
});