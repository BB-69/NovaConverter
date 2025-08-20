// function disablePreviewButtonsOnMobile() {
//   const isMobile = window.matchMedia("(max-width: 768px)").matches 
//                 || 'ontouchstart' in window;

//   const previewBtns = document.querySelectorAll('.preview-btn');
//   previewBtns.forEach(btn => {
//     btn.disabled = isMobile; // disable if mobile
//   });
// }

// disablePreviewButtonsOnMobile();
// window.addEventListener('resize', disablePreviewButtonsOnMobile);

const left = document.getElementById('left');
const right = document.getElementById('right');
const clearBtn = document.getElementById('clearBtn');
const expandBtns = document.querySelectorAll('.expand-btn');
const panelLeft = document.getElementById('panelLeft');
const panelRight = document.getElementById('panelRight');
const themeToggle = document.getElementById('themeToggle');
const bgToggle = document.getElementById('bgToggle');

// Load NovaModern font
const defaultFontUrl = 'fonts/NovaModern.woff2';
const defaultFontFace = new FontFace('NovaModern', `url(${defaultFontUrl})`);
defaultFontFace.load().then(f => { document.fonts.add(f); render(); });

function render(){
    right.textContent = left.value;
    right.style.color = document.body.classList.contains('dark') ? '#ffffff' : '#000000';
}

left.addEventListener('input', render);
clearBtn.addEventListener('click', ()=>{ left.value = ''; render(); left.focus(); });

// Default text
left.value = 'Stella Sora release when?';
render();
