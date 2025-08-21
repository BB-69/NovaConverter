const copyBtn = document.getElementById('copyBtn');
const exportImgBtn = document.getElementById('exportImgBtn');

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

// Export PNG
exportImgBtn.addEventListener('click', () => {
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
