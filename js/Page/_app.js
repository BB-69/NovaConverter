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
    // apply default font color
    right.style.color = document.body.classList.contains('dark') ? '#ffffff' : '#000000';
}

left.addEventListener('input', render);
clearBtn.addEventListener('click', ()=>{ left.value = ''; render(); left.focus(); });

// Expand logic
expandBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
    const target = document.getElementById(btn.dataset.target);
    const other = (target.id === 'panelLeft') ? panelRight : panelLeft;
    if(target.classList.contains('expanded')){
        target.classList.remove('expanded');
        other.classList.remove('hidden');
        btn.textContent = '⤢';
    } else {
        target.classList.add('expanded');
        other.classList.add('hidden');
        btn.textContent = '✖';
    }
    });
});

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

const copyBtn = document.getElementById('copyBtn');

copyBtn.addEventListener('click', async () => {
    const clone = right.cloneNode(true);
    clone.style.color = document.body.classList.contains('dark') ? '#ffffff' : '#000000';

    const wrapper = document.createElement('div');
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';

    html2canvas(clone, {
    backgroundColor: bgToggle.checked ? null : (document.body.classList.contains('dark') ? '#0f172a' : '#fafafa'),
    scale: 1,
    onclone: (clonedDoc) => {
        clonedDoc.fonts.add(defaultFontFace);
    }
    }).then(async canvas => {
    try {
        canvas.toBlob(async blob => {
        if (navigator.clipboard && blob) {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        }
        document.body.removeChild(wrapper);
        });
    } catch (err) {
        console.error(err);
        document.body.removeChild(wrapper);
    }
    });
});

const downloadImgBtn = document.getElementById('downloadImgBtn');

// Export PNG
downloadImgBtn.addEventListener('click', () => {
    const clone = document.getElementById('right').cloneNode(true);
    clone.style.color = document.body.classList.contains('dark') ? '#ffffff' : '#000000';

    const wrapper = document.createElement('div');
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';

    html2canvas(clone, {
    backgroundColor: bgToggle.checked ? null : (document.body.classList.contains('dark') ? '#0f172a' : '#fafafa'),
    scale: 1,
    onclone: (clonedDoc) => {
        clonedDoc.fonts.add(defaultFontFace);
    }
    }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'novamodern.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    document.body.removeChild(wrapper);
    });
});

// Default text
left.value = 'Stella Sora release when?';
render();
