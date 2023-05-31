import { dashboardElements } from "./util.js";

export function touchSlider() {
    const slider = dashboardElements.sliderCtr();
    const sliderItem = [dashboardElements.sliderWrapper()];

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let currentIndex = 0;

    sliderItem.forEach((slide, index) => {
        // prevents icon dragging
        const slideImage = slide.querySelectorAll('img');
        slideImage.forEach(x => x.addEventListener('dragstart', (e) => e.preventDefault()));

        // touch events
        slide.addEventListener('touchstart', touchStart(index));
        slide.addEventListener('touchend', touchEnd);
        slide.addEventListener('touchmove', touchMove);

        // mouse events
        slide.addEventListener('mousedown', touchStart(index));
        slide.addEventListener('mouseup', touchEnd);
        slide.addEventListener('mouseleave', touchEnd);
        slide.addEventListener('mousemove', touchMove);
    });

    // to disable the right click menu if we don't need it
    // window.oncontextmenu = function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     return false;
    // }

    function touchStart(index) {
        return function (event) {
            currentIndex = index;
            startPos = getPositionX(event);
            isDragging = true;

            animationID = requestAnimationFrame(animation);
        }
    }

    function touchEnd(event) {
        isDragging = false;
    }

    function touchMove(event) { // triggers when you hold and move (mobile), move (pc)
        if (isDragging) {
            const currentPosition = getPositionX(event);
            console.log(prevTranslate, currentPosition, startPos);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function getPositionX(event) {
        let pcUser = event.type.includes('mouse');
        return startPos = pcUser ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) {
            requestAnimationFrame(animation);
        }
    }

    function setSliderPosition() {
        console.log(currentTranslate);
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }


}