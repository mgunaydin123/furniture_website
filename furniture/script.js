document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("search-icon");
  const searchOverlay = document.getElementById("search-overlay");
  const closeSearchOverlay = document.getElementById("close-search-overlay");
  const navbar = document.querySelector(".navbar");
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navbarCenter = document.querySelector(".navbar-center");

  searchIcon.addEventListener("click", () => {
      searchOverlay.style.display = "flex";
      navbar.classList.add("slide-down");
  });

  closeSearchOverlay.addEventListener("click", () => {
      searchOverlay.style.display = "none";
      navbar.classList.remove("slide-down");
  });

  if (hamburgerMenu && navbarCenter) {
      hamburgerMenu.addEventListener("click", () => {
          navbarCenter.style.display = navbarCenter.style.display === "block" ? "none" : "block";
      });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".slider-container");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  const navDots = document.querySelectorAll(".slider-nav .dot");

  let currentIndex = 0;
  let slideWidth;
  let totalWidth;
  const slideInterval = 3000;
  let autoSlideInterval;

  const setSliderWidths = () => {
      slideWidth = window.innerWidth;
      totalWidth = slideWidth * slides.length;
      sliderWrapper.style.width = `${totalWidth}px`;
      slides.forEach((slide) => {
          slide.style.width = `${slideWidth}px`;
      });
      // Kaydırmayı da ayarla
      sliderWrapper.style.transform = `translateX(-${
          currentIndex * slideWidth
      }px)`;
  };

  const goToSlide = (index) => {
      if (index < 0) {
          currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
          currentIndex = 0;
      } else {
          currentIndex = index;
      }
      sliderWrapper.style.transform = `translateX(-${
          currentIndex * slideWidth
      }px)`;
      updateDots();
  };

  const updateDots = () => {
      navDots.forEach((dot, index) => {
          dot.classList.remove("active");
          if (index === currentIndex) {
              dot.classList.add("active");
          }
      });
  };

  const startAutoSlide = () => {
      autoSlideInterval = setInterval(() => {
          goToSlide(currentIndex + 1);
      }, slideInterval);
  };

  const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
  };

  navDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
          goToSlide(index);
          stopAutoSlide();
          startAutoSlide();
      });
  });

  // Sayfa yüklendiğinde ve pencere yeniden boyutlandırıldığında boyutları ayarla
  setSliderWidths();
  window.addEventListener("resize", setSliderWidths);

  // Başlangıç slaydı ve otomatik kaydırma
  goToSlide(0);
  updateDots();
  startAutoSlide();
});

fetch("furn.json")
  .then((response) => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then((data) => {
      const arrivalsGrid = document.querySelector(".arrivals-grid");

      data.new_arrivals.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");
          productCard.dataset.id = product.id;

          const img = document.createElement("img");
          img.src = product.image_url;
          img.alt = product.name;

          const title = document.createElement("h4");
          title.classList.add("product-card-title");
          title.textContent = product.name;

          const price = document.createElement("p");
          price.classList.add("product-card-price");
          price.textContent = `$${product.price}`;

          if (product.sale) {
              const saleLabel = document.createElement("div");
              saleLabel.classList.add("sale-label");
              saleLabel.textContent = "Sale";
              productCard.appendChild(saleLabel);
          }

          const overlay = document.createElement("div");
          overlay.classList.add("overlay");
          const overlayLeft = document.createElement("div");
          overlayLeft.classList.add("overlay-left");
          const cartIcon = document.createElement("span");
          cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
          const addToCartText = document.createElement("span");
          addToCartText.textContent = "Add to Cart";
          overlayLeft.appendChild(cartIcon);
          overlayLeft.appendChild(addToCartText);
          const overlayRight = document.createElement("div");
          overlayRight.classList.add("overlay-right");
          const heartIcon = document.createElement("span");
          heartIcon.innerHTML = '<i class="far fa-heart"></i>';
          const squareIcon = document.createElement("span");
          squareIcon.innerHTML = '<i class="fa-solid fa-expand"></i>';
          overlayRight.appendChild(heartIcon);
          overlayRight.appendChild(squareIcon);
          overlay.appendChild(overlayLeft);
          overlay.appendChild(overlayRight);

          productCard.appendChild(img);
          productCard.appendChild(title);
          productCard.appendChild(price);
          productCard.appendChild(overlay);

          arrivalsGrid.appendChild(productCard);
      });
  })
  .catch((error) => {
      console.error("Veri yüklenirken bir hata oluştu:", error);
  });




document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.custom-slider-container');

  sliders.forEach(slider => {
      const slides = slider.querySelectorAll('.custom-slide');
      let currentIndex = 0;

      const showSlide = (index) => {
          slides.forEach(slide => slide.classList.remove('active'));
          slides[index].classList.add('active');
      };

      const nextSlide = () => {
          currentIndex = (currentIndex + 1) % slides.length;
          showSlide(currentIndex);
      };

      showSlide(currentIndex);

      setInterval(nextSlide, 3000);
  });
});


fetch("furn.json")
  .then((response) => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then((data) => {
      const featuredGrid = document.querySelector(".featured-grid");

      data.featured_products.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("featured-product-card");

          const img = document.createElement("img");
          img.src = product.image_url;
          img.alt = product.name;

          const ratingContainer = document.createElement("div");
          ratingContainer.classList.add("rating-container");
          const stars = document.createElement("span");
          stars.classList.add("stars");
          stars.innerHTML = '<span class="star yellow">\u2605</span><span class="star yellow">\u2605</span><span class="star yellow">\u2605</span><span class="star yellow">\u2605</span><span class="star light-gray">\u2606</span>';
          const reviews = document.createElement("span");
          reviews.classList.add("reviews");
          reviews.textContent = "(45 review)";

          ratingContainer.appendChild(stars);
          ratingContainer.appendChild(reviews);

          const title = document.createElement("h4");
          title.classList.add("featured-product-title");
          title.textContent = product.name;

          const price = document.createElement("p");
          price.classList.add("featured-product-price");
          price.textContent = `$${product.price}`;

          productCard.appendChild(img);
          productCard.appendChild(ratingContainer);
          productCard.appendChild(title);
          productCard.appendChild(price);

          featuredGrid.appendChild(productCard);
      });
  })
  .catch((error) => {
      console.error("Veri yüklenirken bir hata oluştu:", error);
  });



  fetch('furn.json')
  .then(response => response.json())
  .then(data => {
      const cardContainer = document.getElementById('cardContainer');
      const brands = data.brand;

      brands.forEach(brand => {
          const cardDiv = document.createElement('div');
          cardDiv.classList.add('brand-card');

          const img = document.createElement('img');
          img.src = brand.image_url;
          img.alt = `Brand ${brand.id}`;

          cardDiv.appendChild(img);

          cardContainer.appendChild(cardDiv);
      });
  });

  const backToTopBtn = document.getElementById("backToTopBtn");

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          backToTopBtn.style.display = "block";
      } else {
          backToTopBtn.style.display = "none";
      }
  }

  backToTopBtn.addEventListener("click", function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });





  // Örnek sepet içeriği (gerçekte bu dinamik olarak oluşacak)
  document.addEventListener('DOMContentLoaded', function() {
    const shoppingCartIcon = document.querySelector('.navbar-right .cart-container .fa-shopping-cart');
    const cartHover = document.querySelector('.navbar-right .cart-container .cart-hover');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotalSpan = document.querySelector('.cart-total span');
    const viewCartButton = document.querySelector('.view-cart');

    
    const cart = [
        { name: 'sofa collection banner', price: 225.99, image: 'sofa-collection-banner.jpg' },
        { name: 'table banner', price: 449.50, image: 'table-banner.jpg' }
    ];

    function updateCartDisplay() {
        cartItemsList.innerHTML = ''; 
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">${item.price.toFixed(2)} $ </span>
                </div>
                <span class="remove-item">&times;</span>
            `;
            cartItemsList.appendChild(listItem);
            total += item.price;

         
            const removeButton = listItem.querySelector('.remove-item');
            removeButton.addEventListener('click', function() {
                const index = cart.findIndex(cartItem => cartItem.name === item.name); 
                if (index > -1) {
                    cart.splice(index, 1);
                    updateCartDisplay();
                }
            });
        });
        cartTotalSpan.textContent = total.toFixed(2) + ' $';
    }

    updateCartDisplay();

});