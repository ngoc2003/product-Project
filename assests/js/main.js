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
                    NAVBAR AND SIDEBAR
*/
let defaultPadding = document.querySelector('.nav-list').style.padding;
var modal = document.querySelector('.modal');
var modalElements = document.querySelectorAll('.modal-element');
var navBarNavigations = document.querySelectorAll('.navbar .nav-item span');
var sidebar = document.querySelector('.sidebar');
var closeBtns = document.querySelectorAll('.modal__close-btn');
function hideContainer() {
    modal.classList.remove('show');
    sidebar.classList.remove('active');
    for ( let i = modalElements.length; i>0; i--) {
            modalElements[i-1].classList.remove('active');
    }
    sideBarNavigations.forEach( navi2 => { 
        navi2.classList.remove('selected');
    })

}
function showPanel(num) {
    modalElements[num].classList.add('active');
    closeBtns.forEach( (btn) => {       
        btn.style.display = 'none';
    })
    for (let i = modalElements.length - 1; i>=0 ; i--) {
        if (modalElements[i].classList.contains('active')) {
            closeBtns[i].style.display = 'flex';
            break;
        }
    }
}


navBarNavigations.forEach( (navi, index) => {
    navi.addEventListener('click', () => {
        navBarNavigations.forEach( navi2 => { 
            navi2.classList.remove('selected');
        })
        navi.classList.add('selected');
        if (index == 1 || index ==2 || index==0) {
            modal.classList.add('show');
            modalElements[0].classList.add('active');
            sidebar.classList.add('active');
            closeBtns[0].style.display = 'flex';
        }
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


/*
        API
*/
const productDesList = [
    {
        title: "category",
        button_links: ["accesories","designer","panels","slats"]
    },
    {
        title: "application",
        button_links: ["internals","externals"]
    },
    {
        title: "suitable for",
        button_links:["ceilings","walls"]
    },
    {
        title: "finish",
        button_links:["other","raw","timber","laminate","timber veneer","polyurethane","smartlook"]
    },
    {
        title:"fire substrate",
        button_links:["metal","fire rated mdf","timber","plywood","mdf","fibre cement","plasterboard"]
    }
]
var productsList = document.querySelector('.products-list div');
var productsDesContainer = document.querySelector('.products-des-container');
for (let i = 0; i<productDesList.length;i++) {
    var htmls='';
    for (let j =0; j<productDesList[i].button_links.length; j++) {
        htmls += `
        <button class="product-des-item__option">${productDesList[i].button_links[j]}</button>
        `
        console.log(htmls)
    }
    productsDesContainer.insertAdjacentHTML('beforeend',`
        <div class="product-des-item">
        <button class="product-des-item__btn" onclick="productMenuList(this)">
            ${productDesList[i].title}
            <svg class="dropDownBtn" height=6px width=10px>
                <polyline points="0,0 5,6 10,0" style="fill:none; stroke:black;stroke-width:.5" />
            </svg>
        </button>
        <div class="product-des-item__list">
            ${htmls}
        </div>

    `);
}
var apiUrl = `https://6266bd397863833642166644.mockapi.io/api/products`;
fetch(apiUrl)
    .then( response => {
        return response.json();
    })
    .then( products => {
        console.log(products);
    })