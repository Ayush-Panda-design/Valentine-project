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

// ----- Welcome onboarding banner -----
const WELCOME_BANNER_STORAGE_KEY = 'valentine_welcome_banner_dismissed';

// Lightweight analytics hook. Pushes to dataLayer if present and logs for now;
// swap in a real analytics provider later without touching call sites.
function trackBannerEvent(eventName, detail) {
    const payload = Object.assign(
        { event: eventName, timestamp: new Date().toISOString() },
        detail || {}
    );
    if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push(payload);
    }
    console.debug('[banner-analytics]', payload);
}

// Reading/writing dismissal state is wrapped because localStorage can throw
// (e.g. private browsing / disabled storage). Failing open shows the banner.
function isBannerDismissed() {
    try {
        return localStorage.getItem(WELCOME_BANNER_STORAGE_KEY) === 'true';
    } catch (e) {
        return false;
    }
}

function persistBannerDismissed() {
    try {
        localStorage.setItem(WELCOME_BANNER_STORAGE_KEY, 'true');
    } catch (e) {
        // Storage unavailable: banner will reappear next session, which is acceptable.
    }
}

function hideWelcomeBanner(persist) {
    const banner = document.getElementById('welcome-banner');
    if (!banner) return;

    banner.hidden = true;
    if (persist) {
        persistBannerDismissed();
        trackBannerEvent('welcome_banner_dismissed');
    }
}

function initWelcomeBanner() {
    const banner = document.getElementById('welcome-banner');
    if (!banner) return;

    // Display condition: only first-time visitors who have not dismissed it.
    if (isBannerDismissed()) {
        return;
    }

    banner.hidden = false;
    trackBannerEvent('welcome_banner_viewed');

    const closeBtn = document.getElementById('welcome-banner-close');
    const cta = document.getElementById('welcome-banner-cta');

    closeBtn.addEventListener('click', function() {
        hideWelcomeBanner(true);
    });

    cta.addEventListener('click', function() {
        trackBannerEvent('welcome_banner_cta_click', {
            destination: cta.getAttribute('href')
        });
        // Dismiss after engagement so the prompt does not linger.
        hideWelcomeBanner(true);
    });

    // Accessibility: allow Escape to dismiss while the banner is visible.
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !banner.hidden) {
            hideWelcomeBanner(true);
        }
    });
}

// Initialize background hearts and onboarding banner when page loads
window.onload = function() {
    createBackgroundHearts();
    initWelcomeBanner();
};