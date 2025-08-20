// ---THEME TOGGLE + AUTO DETECT + CACHE---
function applyTheme(isDark, save = false){
    document.body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? '🌙' : '🌞';
    if(save){
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    render();
}

// Manual toggle
themeToggle.addEventListener('click', ()=>{
    const isDark = !document.body.classList.contains('dark');
    applyTheme(isDark, true);
});

// Load saved theme or system preference
const savedTheme = localStorage.getItem('theme');
if(savedTheme){
    applyTheme(savedTheme === 'dark');
} else {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    applyTheme(mediaQuery.matches);
    mediaQuery.addEventListener('change', e => {
        if(!localStorage.getItem('theme')){
            applyTheme(e.matches);
        }
    });
}
