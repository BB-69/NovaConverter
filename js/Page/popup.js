function spawnPopup(message) {
    const container = document.getElementById("popup-container");

    if (container.children.length >= 3) {
        const firstPopup = container.firstElementChild;
        if (firstPopup) {
            firstPopup.classList.remove("show");
            firstPopup.classList.add("hide");

            setTimeout(() => firstPopup.remove(), 600);
        }
    }

    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = message;
    container.appendChild(popup);

    setTimeout(() => popup.classList.add("show"), 10);

    setTimeout(() => {
        popup.classList.remove("show");
        popup.classList.add("hide");

        setTimeout(() => popup.remove(), 600);
    }, 3000);
}