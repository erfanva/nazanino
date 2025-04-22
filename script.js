// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu when hamburger is clicked
    document.querySelector('.hamburger-menu').addEventListener('click', function() {
        this.classList.toggle('opened');
        document.querySelector('.nav-menu').classList.toggle('active');
    });
}); 