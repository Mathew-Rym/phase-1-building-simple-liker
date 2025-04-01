// Defining text characters for the empty and full hearts
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Wait for DOM to load before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const errorModal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  const hearts = document.querySelectorAll('.like-glyph');
  
  // Add click event listeners to all heart elements
  hearts.forEach(heart => {
    heart.addEventListener('click', handleLike);
  });
  
  function handleLike(event) {
    const heart = event.target;
    
    mimicServerCall()
      .then(() => {
        // Server request succeeded - toggle heart state
        if (heart.textContent === EMPTY_HEART) {
          heart.textContent = FULL_HEART;
          heart.classList.add('activated-heart');
        } else {
          heart.textContent = EMPTY_HEART;
          heart.classList.remove('activated-heart');
        }
      })
      .catch(error => {
        // Server request failed - show error modal
        modalMessage.textContent = error;
        errorModal.classList.remove('hidden');
        
        // Hide modal after 3 seconds
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  }
});

// Mock server function (provided)
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}