document.addEventListener("DOMContentLoaded", () => {
    function updateSliderValue(slider, value, unit = '') {
        slider.addEventListener('input', () => {
            const val = slider.value;
            value.textContent = val + ' ' + unit;
        });
    }

    updateSliderValue(
        document.getElementById('resSlider'),
        document.getElementById('resValue'),
        'res'
    )
    updateSliderValue(
        document.getElementById('charSlider'),
        document.getElementById('charValue'),
        'ch'
    )
});
