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
function hidePanels(num) {
    for ( let i = modalElements.length; i>num; i--) {
        modalElements[i-1].classList.remove('active');
}
}
function hideContainer() {
    modal.classList.remove('show');
    sidebar.classList.remove('active');
    hidePanels(0);
    sideBarNavigations.forEach( navi2 => { 
        navi2.classList.remove('selected');
    })

}
function showPanel(num,item) {
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
    if (num==1) {
        hidePanels(2);

        let text = item.innerText.toLowerCase().slice(0,-2).trim();

        setTimeout( () => {
            reloadProductsList (text,'',2);
        },200);
        
    }
    if(num==2) {
        console.log(item)
        let text = item.firstElementChild.firstElementChild.innerText;
        panel3.innerHTML = `
        <div>
            <h4 class="modal__title">${text}</h4>
            <p class="description">Lorem ipsum dolor sit amet.</p>
        </div>
        `
    }

    let maxHeight = document.documentElement.clientHeight - panel2.parentElement.firstElementChild.clientHeight;
        
        panel2.lastElementChild.offsetHeight > maxHeight ? panel2.lastElementChild.style =`
            overflow-y:scroll;
            max-height: ${maxHeight}px;
        ` : panel2.lastElementChild.style = `overflow-y:hidden;`;
}


var panel1 =document.querySelector('.js-panel-1 .js-panel-1__content');
var panel2 = document.querySelector('.js-panel-2 .js-panel-2__content');
var panel3 = document.querySelector('.js-panel-3__content > div');
function activePanel(item,num) {
    if (num==0) {
        var panelLiItems = document.querySelectorAll('.js-panel-1 .modal__navi li');
        
    } else if (num == 1) {
        var panelLiItems = document.querySelectorAll('.js-panel-2 .modal__navi li');
    }
    panelLiItems.forEach(itemTemp => {
        itemTemp.classList.remove('hover');
    });
    item.classList.add('hover');
}

navBarNavigations.forEach( (navi, index) => {
    navi.addEventListener('click', () => {
        navBarNavigations.forEach( navi2 => { 
            navi2.classList.remove('selected');
        })
        sideBarNavigations.forEach( navi2 => { 
            navi2.classList.remove('selected');
        })
        navi.classList.add('selected');
        if (index == 1||index==0||index==2) {
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
function addProductItem(product) {
    productsList.insertAdjacentHTML('beforeend',`
    <a href="" class="product-item" >
        <div class="product-item__img">
            <img src="./assests/img/product1.webp" alt="">
        </div>
        <div class="product-item__content">
            <div>
                <h4 class="title">${product.title}</h4>
                <p class="caption">${product.categorize[0]}</p>
            </div>
            <div>
                <div class="des">${product.soundprofile}</div>
                <div class="des">|</div>
                <div class="des">${product.combustible}</div>
            </div>
        </div>
    </a>
    `)
} 

function scrollToTopList() {
    window.scroll({top:'0'})
}
async function reloadProductsList (para,btn,modalCheck=0) {
    let haveText=0;
    let apiUrl = `https://6266bd397863833642166644.mockapi.io/api/products`;
    let products = await fetch(apiUrl).then(res=> res.json());
    if (modalCheck ==0) {
        productsList.innerHTML=``;
        for( let index = 0; index< products.length; index++) {
            let product = products[index];
            
            for ( let i = 0 ; i< product.categorize.length; i++) {
                if (para == product.categorize[i]) {
                    addProductItem(product);
                    haveText = 1;
                    break;
                }
            }       
        }
        let productOptions = document.querySelectorAll('.product-des-item__option');
        productOptions.forEach( product => {
            product.classList.remove('active');
        });
        btn.classList.add('active');
        scrollToTopList();
        if (haveText == 0) {
            productsList.innerHTML = `<h4 class="warningNoText">No Results</h4>`
        }
    }
    else if(modalCheck == 2) {
        let htmls = ``;
        for( let index = 0; index< products.length; index++) {
            let product = products[index];
            for ( let i = 0 ; i< product.categorize.length; i++) {
                console.log(para);
                if (para == product.categorize[i]) {
                    console.log(product.categorize[i]);
                htmls += `
                <li onmouseover='activePanel(this,1)'>
                    <a href="#" onmouseover="showPanel(2,this)">
                        <div>   
                            <h4 class="modal__navi-item__title">${product.title}</h4>
                            <span class="arrow">
                                <svg class="arrowSvg" height=8px width=18px>
                                    <polyline points="0,4 18,4 13,0 18,4 13,8 18,4 0,4" style="fill:none; stroke:grey;stroke-width:.5" />
                                </svg>
                            </span>
                        </div>
                        <div class="modal__navi__des">
                            <div>
                                <h4 class="title">MATERIAL</h4>
                                <p class="description">${product.material}</p>
                            </div>
                            <div>
                                <h4 class="title">SOUND PROFile</h4>
                                <p class="description">${product.soundprofile}</p>
                            </div>
                        </div>
                    </a>
                </li>`;
                console.log(htmls);
                break;
                }
            }   
        }
        panel2.innerHTML = `
        <header>
            <a class="modal__title" onclick="reloadProductsList('${para.toLowerCase()}');hideContainer()">all ${para}</a>
        </header>
        <nav class="modal__navi">
            ${htmls}
        </nav>
        `;
    } 
    if (modalCheck == -1) {
        return await products;
    }
}
reloadProductsList('all');
const productDesList = [
    {
        title: "category",
        button_links: ["accessories","designer","panels","slats"]
    },
    {
        title: "application",
        button_links: ["internal","external"]
    },
    {
        title: "suitable for",
        button_links:["ceilings","walls"]
    },
    {
        title: "finish",
        button_links:["other","raw","finish timber","laminate","timber veneer","polyurethane","smartlook"]
    },
    {
        title:"fire substrate",
        button_links:["metal","fire rated mdf","timber","plywood","mdf","fibre cement","plasterboard"]
    }
]
var productsList = document.querySelector('.products-list div');
var productsDesContainer = document.querySelector('.products-des-container');

for (let i = 0; i<productDesList.length;i++) {
    var htmls=``;
    for (let j =0; j<productDesList[i].button_links.length; j++) {
        htmls += `
        <button class="product-des-item__option" onclick="reloadProductsList('${productDesList[i].button_links[j]}',this)">${productDesList[i].button_links[j]}</button>
        `
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

function showPanelSec1(num) {
    if (num == 1) {
        products = reloadProductsList ('','',-1);
        products.then( (value) => {
                if (num==1) {
                    let htmls=``;
                    for (let i = 0 ; i<productDesList[0].button_links.length;i++) {
                        let count =0;
                        for( let j = 0 ;j<value.length;j++) {
                            if (value[j].categorize[0] == productDesList[0].button_links[i]) {
                                count++;
                            }
                        };
                        
                        htmls += `<li onmouseover='activePanel(this,0)'><a  onmouseover="showPanel(1,this)" class="isCountItem middle">${productDesList[0].button_links[i]}<span class="countItem">${count>=10? count : '0'+count}</span></a>
                        </li>`
                    };
                    panel1.innerHTML =`
                    <header>
                        <a  class="modal__title middle" onclick="reloadProductsList('all');hideContainer()">See All <span class="countItem">${value.length}</span></a>
                    </header>
                    <nav class="modal__navi">
                        <ul >
                            ${htmls}
                        </ul>
                    </nav>
                    `;
                } 
        });
    }
    hidePanels(1);
    
    if (num==0) {
        panel1.innerHTML = `  
        <h4 class="warningNoText">Sorry, pls choose PRODUCTS tab</h4>`;     
    } 
}

