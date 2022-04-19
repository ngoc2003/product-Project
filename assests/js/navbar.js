let defaultPadding = document.querySelector('.nav-list').style.padding;
window.onscroll = function() {
    let scrollY = this.scrollY;
    if (scrollY != 0) {
        document.querySelector('.nav-list').style.padding= '1.2rem 2.5rem';
        document.querySelector('.logo').style.transform = 'scale(1)';
    } else {
        document.querySelector('.nav-list').style.padding = defaultPadding;
        document.querySelector('.logo').style.transform = 'scale(1.2)';
    }
}

var containers = document.querySelector('.containers');
var navBarNavigations = document.querySelectorAll('.navbar .nav-item span');
navBarNavigations.forEach( (navi, index) => {
    navi.addEventListener('click', () => {
        navBarNavigations.forEach( navi2 => { 
            navi2.classList.remove('selected');
        })
        navi.classList.add('selected');
        containers.classList.add('show');
        sideBarNavigations[index].classList.add('selected')
    })
})

var sideBarNavigations = document.querySelectorAll('.containers .nav-item span');
sideBarNavigations.forEach( navi => {
    navi.addEventListener('click', () => {
        sideBarNavigations.forEach( navi2 => { 
            navi2.classList.remove('selected');
        })
        navi.classList.add('selected');
    })
})






