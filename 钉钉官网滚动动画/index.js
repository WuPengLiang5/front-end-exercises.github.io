const items = document.querySelectorAll('.list-item')
const playGroud = document.querySelector('.playground')
const list = document.querySelector('.list')

function createAnimation(scrollStart,scrollEnd,valueStart,valueEnd){
    return function(scroll){
        if(scroll <= scrollStart){
            return valueStart
        }
        if(scroll >= scrollEnd){
            return valueEnd
        }

        return valueStart + (valueEnd - valueStart) * (scroll -scrollStart) / (scrollEnd - scrollStart)
    }
}

const animationMap = new Map()

function getDomAnimation(dom,scrollStart,scrollEnd){
    scrollStart = scrollStart + dom.dataset.order * 100;

    const opacityAnimation = createAnimation(scrollStart,scrollEnd,0,1);
    const opacity = function(scroll){
        return opacityAnimation(scroll);
    }

    const scaleAnimation = createAnimation(scrollStart,scrollEnd,0.5,1);
    const xAnimation = createAnimation(
        scrollStart,
        scrollEnd,
        list.clientWidth / 2 - dom.offsetLeft - dom.clientWidth / 2,
        0);
    const yAnimation = createAnimation(
            scrollStart,
            scrollEnd,
            list.clientHeight / 2 - dom.offsetTop - dom.clientHeight / 2,
        0);
    const transform = function(scroll){
        return `translate(${xAnimation(scroll)}px,${yAnimation(scroll)}px)
        scale(${scaleAnimation(scroll)})`;
    }

    return {
        opacity,
        transform
    };
}

function updateMap(){
    animationMap.clear();
    const playGroudRect = playGroud.getBoundingClientRect();
    const scrollStart = playGroudRect.top + window.scrollY;
    const scrollEnd = playGroudRect.bottom + window.scrollY - window.innerHeight;
    // console.log(scrollStart,scrollEnd,scrollY,playGroudRect.top,playGroudRect.bottom)
    for(const item of items){
         animationMap.set(item,getDomAnimation(item,scrollStart,scrollEnd))
    }
}

updateMap()

function updateStytes(){
    const scroll = window.scrollY;
    for(let [dom,value] of animationMap){
        for(const cssProp in value){
            dom.style[cssProp] = value[cssProp](scroll)
        }
    }
}

updateStytes();

window.addEventListener('scroll',updateStytes)