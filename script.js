// Function to create floating background hearts
function createBackgroundHearts() {
    const container = document.getElementById('background-hearts');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    // Create 15 floating hearts
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-bg';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(heart);
    }
}

// Function to move the No button randomly
function moveNoButton() {
    const noBtn = document.getElementById('no-btn');
    const container = document.getElementById('button-container');
    
    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    
    // Calculate random position within a safe range
    const maxX = containerRect.width - 150; // Button width consideration
    const maxY = 100; // Limited vertical movement
    
    const randomX = Math.random() * maxX - (maxX / 2);
    const randomY = Math.random() * maxY - (maxY / 2);
    
    // Apply the new position
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Function to handle Yes button click
function handleYes() {
    // Hide the question section
    document.getElementById('question-section').classList.add('hidden');
    
    // Show the celebration section
    const celebrationSection = document.getElementById('celebration-section');
    celebrationSection.style.display = 'block';
    
    // Create confetti effect
    createConfetti();
}

// Function to create confetti animation
function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ff6b9d', '#ffc0cb'];
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Initialize background hearts when page loads
window.onload = function() {
    createBackgroundHearts();
};