
window.addEventListener('scroll', function() {
    const aboutSection = document.getElementById('about');
    const sectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.5;

    if (sectionPos < screenPos) {
        aboutSection.classList.add('visible');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const profileLink = document.getElementById('profileLink');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        // Hide profile link if user is not logged in
        profileLink.style.display = 'none';
    } else {
        // Show profile link if user is logged in
        profileLink.style.display = 'block';
    }
});

