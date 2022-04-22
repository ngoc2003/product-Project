
/* 
                    PRODUCTS
*/
function titleScroll() {
    let scrollValue = window.scrollY;
    productsDes.style.transform = `translateY(${scrollValue}px)`;
}

function navbarScroll() {
    let scrollY = this.scrollY;
    if (scrollY != 0) {
        document.querySelector('.nav-list').style.padding= '1.2rem 2.5rem';
        document.querySelector('.logo').style.transform = 'scale(1)';
    } else {
        document.querySelector('.nav-list').style.padding = defaultPadding;
        document.querySelector('.logo').style.transform = 'scale(1.2)';
    }
}
function productMenuList(btn) {
    if (btn.parentElement.lastElementChild.classList.contains('active')) {
        btn.classList.remove('active');
        btn.parentElement.lastElementChild.classList.remove('active');
        btn.lastElementChild.style.transform = 'rotate(180deg)';
    } else {
        var productList = document.querySelectorAll('button.product-des-item__btn');
        productList.forEach(productItem => {
            productItem.classList.remove('active');
            productItem.parentElement.lastElementChild.classList.remove('active');
            productItem.lastElementChild.style.transform = 'rotate(180deg)';
        })
        btn.classList.add('active');
        btn.parentElement.lastElementChild.classList.add('active');
        btn.lastElementChild.style.transform = 'rotate(0)';
    }
}

var windowHeight = window.innerHeight;
var productsDes = document.querySelector('.products-des');
window.onscroll = function () {
    titleScroll();
    navbarScroll();
}


/* 
                    NAVBAR
*/
let defaultPadding = document.querySelector('.nav-list').style.padding;
var modal = document.querySelector('.modal');
var navBarNavigations = document.querySelectorAll('.navbar .nav-item span');
navBarNavigations.forEach( (navi, index) => {
    navi.addEventListener('click', () => {
        navBarNavigations.forEach( navi2 => { 
            navi2.classList.remove('selected');
        })
        navi.classList.add('selected');
        modal.classList.add('show');
        sideBarNavigations[index].classList.add('selected')
    })
})

var sideBarNavigations = document.querySelectorAll('.modal .nav-item span');
sideBarNavigations.forEach( navi => {
    navi.addEventListener('click', () => {
        sideBarNavigations.forEach( navi2 => { 
            navi2.classList.remove('selected');
        })
        navi.classList.add('selected');
    })
})