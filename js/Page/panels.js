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
