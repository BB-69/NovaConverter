const customizeBtn = document.getElementById('customizeBtn');
const dropdown = customizeBtn.parentElement;

// Toggle dropdown
customizeBtn.addEventListener('click', () => {
    const isOpen = dropdown.classList.toggle('show');
    customizeBtn.setAttribute('aria-expanded', isOpen);
});

window.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});
