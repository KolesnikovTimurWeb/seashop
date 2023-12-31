
const showMore = document.querySelector('.show-more-button');
const productsLength = document.querySelectorAll('.sigaret-container-1 .sigaret-item').length;
let items = 8;

showMore.addEventListener('click', () => {
   items += 8;
   const array = Array.from(document.querySelector('.sigaret-container-1').children);
   const visItems = array.slice(0, items);

   visItems.forEach(el => el.classList.add('visible'));

   if (visItems.length === productsLength) {
      showMore.style.display = 'none';
   }
});

const showMore2 = document.querySelector('.show-more-button-2');
const productsLength2 = document.querySelectorAll('.sigaret-container-2 .sigaret-item').length;
let items2 = 8;

showMore2.addEventListener('click', () => {
   items2 += 8;
   const array2 = Array.from(document.querySelector('.sigaret-container-2').children);
   const visItems2 = array2.slice(0, items2);

   visItems2.forEach(el => el.classList.add('visible'));

   if (visItems2.length === productsLength2) {
      showMore2.style.display = 'none';
   }
});

const showMore3 = document.querySelector('.show-more-button-3');
const productsLength3 = document.querySelectorAll('.sigaret-container-3 .sigaret-item').length;
let items3 = 8;

showMore3.addEventListener('click', () => {
   items3 += 8;
   const array3 = Array.from(document.querySelector('.sigaret-container-3').children);
   const visItems3 = array3.slice(0, items3);

   visItems3.forEach(el => el.classList.add('visible'));

   if (visItems3.length === productsLength3) {
      showMore3.style.display = 'none';
   }
});

let categoryUp = document.querySelectorAll('.category-item');

categoryUp.forEach(el => {
   el.addEventListener('click', function () {
      this.classList.toggle('active')

   })
})


const swiper2 = new Swiper('.sigaret-1', {
   spaceBetween: 40,
   // grabCursor: true,
   slidesPerView: 1,
   loop: true,
   grabCursor: true,
   // Navigation arrows
   breakpoints: {
      640: {
         slidesPerView: 2,
         spaceBetween: 20,
      },
      1200: {
         slidesPerView: 3,
         spaceBetween: 40,
      },
      1480: {
         slidesPerView: 4,
         spaceBetween: 50,
      },
   }
});
let headerCart = document.querySelector('.header-cart')
let headerBlock = document.querySelector('.header-shopping')
let headerClose = document.querySelector('.header-shopping-close')

headerCart.addEventListener('click', function () {
   headerBlock.classList.add('active')
})
headerClose.addEventListener('click', function () {
   headerBlock.classList.remove('active')
})



let productBtn = document.querySelectorAll('.sigaret-text a')
let cartProductList = document.querySelector('.header-shopping-container')
const cart = document.querySelector('.header-cart')
const cartContini = document.querySelector('.header-cart p')
const fullPrice = document.querySelector('.header-shopping-price h2');

let price = 0

const randomId = () => {
   return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
   return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
   return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
const plusFullPrice = (currentPrice) => {
   return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
   return price -= currentPrice;
};

const printQuantity = () => {

};

const printFullPrice = () => {
   fullPrice.textContent = `${normalPrice(price)} ₽`;
};









const initialState = () => {
   if (localStorage.getItem('products') !== null) {
      cartProductList.innerHTML = localStorage.getItem('products');
      printQuantity();
      countSumm();
      printFullPrice();


      document.querySelectorAll('.cart-content__product').forEach(el => {
         let id = el.dataset.id;
         document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = true;
      });
   }
};


const updateStorage = () => {
   let parent = cartProductList;
   let html = parent.innerHTML;

   html = html.trim();

   if (html.length) {
      localStorage.setItem('products', html);
   } else {
      localStorage.removeItem('products');
   }
};









function addCuonterCart(id) {
   const itemInCart = cartProductList.querySelector(`[data-id="${id}"]`);
   let counter = itemInCart.querySelector('.header-shopping-counter');
   counter.textContent = `${parseInt(counter.textContent) + 1}`

   return
}


function minusCuonterCart(id) {
   const itemInCart = cartProductList.querySelector(`[data-id="${id}"]`);
   let counter = itemInCart.querySelector('.header-shopping-counter');
   counter.textContent = `${parseInt(counter.textContent) - 1}`

   return
}

const deleteProducts = (productParent) => {



   let conter = productParent.querySelector('.header-shopping-counter');

   let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.header-shopping-price').textContent));

   minusFullPrice(parseInt(currentPrice * conter.textContent));
   printFullPrice();
   productParent.remove();


};

cartProductList.addEventListener('click', (e) => {



   if (e.target.classList.contains('header-delete')) {

      deleteProducts(e.target.closest('.header-shopping-item'));

   }
});






const generateCartProduct = (img, title, counter, price, id) => {
   return `
   <div class="header-shopping-item" data-id="${id}">
      <div class="header-shopping-img">
         <img src="${img}" alt="">
      </div>

      <div class="header-shopping-block">
            <div class="header-shopping-text">
            <p>${title} </p>

               <div class="header-shopping-menucounter">
               
                  <h3 class="header-shopping-plus">+</h3>
                  <p class="header-shopping-counter"> ${counter} </p>
                  
                  <h3 class="header-shopping-minus">-</h3>
               </div>
            

            <h2 class="header-shopping-price">${price}</h2>

            

         </div>
         <button class="header-delete">
          <img src="./img/bin.png" alt="">
         </button>
      </div>

</div>
	`;
};

productBtn.forEach(el => {
   el.closest('.sigaret-item').setAttribute('data-id', randomId());

   el.addEventListener('click', (e) => {
      let self = e.currentTarget;
      let parent = self.closest('.sigaret-item');
      let counter = 1;
      let id = parent.dataset.id;
      let img = parent.querySelector('.sigater-img img').getAttribute('src');
      let title = parent.querySelector('.sigaret-text h2').textContent;
      let priceString = priceWithoutSpaces(parent.querySelector('.sigaret-current-price').textContent);
      let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.sigaret-current-price').textContent));


      const itemInCart = cartProductList.querySelector(`[data-id="${id}"]`);
      if (itemInCart) {
         let self = e.currentTarget;
         let parent = self.closest('.sigaret-item');

         plusFullPrice(priceNumber);
         let counter = itemInCart.querySelector('.header-shopping-counter');
         counter.textContent = parseInt(counter.textContent) + 1

         printFullPrice();

         return
      }


      plusFullPrice(priceNumber);
      printFullPrice();


      cartProductList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, counter, priceString, id));
      printQuantity();

      let headerPlus = document.querySelector('.header-shopping-plus')
      let headerMinus = document.querySelector('.header-shopping-minus')



      headerPlus.addEventListener('click', function (el) {
         let self = el.currentTarget;


         let parent = self.closest('.header-shopping-item');

         let id = parent.dataset.id;
         plusFullPrice(priceNumber);

         addCuonterCart(id)


         printFullPrice();

         return
      })

      headerMinus.addEventListener('click', function (el) {
         let self = el.currentTarget;
         let parent = self.closest('.header-shopping-item');

         let id = parent.dataset.id;

         if (price > 0) {
            minusFullPrice(priceNumber)
            minusCuonterCart(id)

         }
         printFullPrice();
         return
      })


   });
});







// document.querySelector('.modal').addEventListener('click', (e) => {
//    if (e.target.classList.contains('order-product__delete')) {
//       let id = e.target.closest('.order-modal__product').dataset.id;
//       let cartProduct = document.querySelector(`.cart-content__product[data-id="${id}"]`).closest('.cart-content__item');
//       deleteProducts(cartProduct)
//       e.target.closest('.order-modal__product').remove();
//    }
// });



