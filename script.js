// DOM Elements
const elements = {
  header: document.querySelector(".header"),
  mobileMenu: document.getElementById("mobileMenu"),
  burgerBtn: document.getElementById("burgerBtn"),
  closeMenuBtn: document.getElementById("closeMenu"),
  mobileLinks: document.querySelectorAll(".mobile-link"),
  loading: document.querySelector(".loading"),
  swiper: document.querySelector(".swiper"),
  packagesSwiper: document.querySelector(".packages-swiper"),
};

// Utility Functions
const utils = {
  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Smooth scroll to element
  smoothScrollTo: (target) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  },
};

// Header Scroll Effect
class HeaderManager {
  constructor() {
    this.header = elements.header;
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    if (!this.header) return;

    window.addEventListener(
      "scroll",
      utils.debounce(() => {
        this.handleScroll();
      }, 10)
    );
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    // Add scrolled class for styling
    if (currentScrollY > 50) {
      this.header.classList.add("scrolled");
    } else {
      this.header.classList.remove("scrolled");
    }

    this.lastScrollY = currentScrollY;
  }
}

// Mobile Menu Manager
class MobileMenuManager {
  constructor() {
    this.menu = elements.mobileMenu;
    this.burgerBtn = elements.burgerBtn;
    this.closeBtn = elements.closeMenuBtn;
    this.links = elements.mobileLinks;
    this.isOpen = false;
    this.init();
  }

  init() {
    if (!this.menu || !this.burgerBtn || !this.closeBtn) return;

    this.burgerBtn.addEventListener("click", () => this.openMenu());
    this.closeBtn.addEventListener("click", () => this.closeMenu());

    // Close menu when clicking on links
    this.links.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeMenu();
      }
    });

    // Close menu when clicking on overlay
    const overlay = document.getElementById("mobileMenuOverlay");
    if (overlay) {
      overlay.addEventListener("click", () => this.closeMenu());
    }
  }

  openMenu() {
    this.menu.classList.add("active");
    const overlay = document.getElementById("mobileMenuOverlay");
    if (overlay) overlay.classList.add("active");
    this.isOpen = true;
    document.body.style.overflow = "hidden";

    // Animate links
    this.links.forEach((link, index) => {
      link.style.transitionDelay = `${index * 0.1}s`;
    });
  }

  closeMenu() {
    this.menu.classList.remove("active");
    const overlay = document.getElementById("mobileMenuOverlay");
    if (overlay) overlay.classList.remove("active");
    this.isOpen = false;
    document.body.style.overflow = "";

    // Reset transition delays
    this.links.forEach((link) => {
      link.style.transitionDelay = "";
    });
  }
}

// Swiper Manager
class SwiperManager {
  constructor() {
    this.swiperElement = elements.swiper;
    this.packagesSwiperElement = elements.packagesSwiper;
    this.reviewsSwiperElement = document.querySelector(".reviews-swiper");
    this.swiper = null;
    this.packagesSwiper = null;
    this.reviewsSwiper = null;
    this.init();
  }

  init() {
    this.initMainSwiper();
    this.initPackagesSwiper();
    this.initReviewsSwiper();
  }

  initMainSwiper() {
    if (!this.swiperElement || typeof Swiper === "undefined") return;

    try {
      this.swiper = new Swiper(this.swiperElement, {
        loop: true,
        spaceBetween: 24,
        grabCursor: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
        },
        on: {
          init: function () {
            this.navigation.prevEl.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            `;
            this.navigation.nextEl.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            `;
          },
        },
      });
    } catch (error) {
      console.error("Main Swiper initialization failed:", error);
    }
  }

  initPackagesSwiper() {
    if (!this.packagesSwiperElement || typeof Swiper === "undefined") {
      console.log("Packages Swiper element not found or Swiper not loaded");
      return;
    }

    try {
      console.log("Initializing Packages Swiper...");
      this.packagesSwiper = new Swiper(this.packagesSwiperElement, {
        loop: false,
        spaceBetween: 24,
        grabCursor: true,
        autoplay: false,
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },
        on: {
          init: function () {
            console.log("Packages Swiper initialized successfully");
            // Add arrow icons to navigation buttons
            const prevBtn = this.navigation.prevEl;
            const nextBtn = this.navigation.nextEl;

            if (prevBtn) {
              prevBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              `;
            }

            if (nextBtn) {
              nextBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              `;
            }
          },
        },
      });
    } catch (error) {
      console.error("Packages Swiper initialization failed:", error);
    }
  }

  initReviewsSwiper() {
    if (!this.reviewsSwiperElement || typeof Swiper === "undefined") {
      console.log("Reviews Swiper element not found or Swiper not loaded");
      return;
    }

    try {
      console.log("Initializing Reviews Swiper...");
      this.reviewsSwiper = new Swiper(this.reviewsSwiperElement, {
        loop: true,
        spaceBetween: 24,
        grabCursor: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },
        on: {
          init: function () {
            console.log("Reviews Swiper initialized successfully");
            // Add arrow icons to navigation buttons
            const prevBtn = this.navigation.prevEl;
            const nextBtn = this.navigation.nextEl;

            if (prevBtn) {
              prevBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              `;
            }

            if (nextBtn) {
              nextBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              `;
            }
          },
        },
      });
    } catch (error) {
      console.error("Reviews Swiper initialization failed:", error);
    }
  }
}

// Animation Manager
class AnimationManager {
  constructor() {
    this.animatedElements = document.querySelectorAll("[data-aos]");
    this.init();
  }

  init() {
    if (typeof AOS === "undefined") {
      this.initCustomAnimations();
      return;
    }

    // Initialize AOS
    AOS.init({
      once: true,
      duration: 700,
      offset: 40,
      easing: "ease-out-cubic",
      delay: 0,
    });
  }

  initCustomAnimations() {
    // Fallback animations if AOS is not available
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    this.animatedElements.forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });
  }
}

// Loading Manager
class LoadingManager {
  constructor() {
    this.loading = elements.loading;
    this.init();
  }

  init() {
    if (!this.loading) return;

    // Hide loading screen when page is fully loaded
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.hideLoading();
      }, 500);
    });

    // Also hide when DOM is ready
    if (document.readyState === "complete") {
      setTimeout(() => {
        this.hideLoading();
      }, 500);
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
          this.hideLoading();
        }, 500);
      });
    }

    // Fallback: hide loading after 2 seconds (reduced from 3)
    setTimeout(() => {
      this.hideLoading();
    }, 2000);

    // Additional fallback: hide loading after 1 second for live server
    setTimeout(() => {
      this.hideLoading();
    }, 1000);
  }

  hideLoading() {
    if (this.loading) {
      this.loading.classList.add("hidden");
      setTimeout(() => {
        this.loading.style.display = "none";
      }, 500);
    }

    // Additional fallback for live server
    const loadingElement = document.querySelector(".loading");
    if (loadingElement) {
      loadingElement.classList.add("hidden");
      setTimeout(() => {
        loadingElement.style.display = "none";
      }, 500);
    }
  }
}

// Performance Optimizer
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Lazy load images
    this.lazyLoadImages();

    // Optimize scroll events
    this.optimizeScrollEvents();

    // Preload critical resources
    this.preloadResources();

    // Optimize animations
    this.optimizeAnimations();
  }

  lazyLoadImages() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  optimizeScrollEvents() {
    // Use passive listeners for better performance
    const scrollOptions = { passive: true };

    window.addEventListener("scroll", () => {}, scrollOptions);
    window.addEventListener("touchmove", () => {}, scrollOptions);
  }

  preloadResources() {
    // Preload critical images
    const criticalImages = [
      "./img/backgroundhero.png",
      "./img/srngengelogoo.png",
      "./img/texthero.png",
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      link.fetchPriority = "high";
      document.head.appendChild(link);
    });
  }

  optimizeAnimations() {
    // Use Intersection Observer for better performance
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.willChange = "transform";
            } else {
              entry.target.style.willChange = "auto";
            }
          });
        },
        { threshold: 0.1 }
      );

      // Observe elements with animations
      document
        .querySelectorAll(".card, .package-card, .review-card")
        .forEach((el) => {
          observer.observe(el);
        });
    }
  }
}

// Error Handler
class ErrorHandler {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener("error", (e) => {
      console.error("Global error:", e.error);
    });

    window.addEventListener("unhandledrejection", (e) => {
      console.error("Unhandled promise rejection:", e.reason);
    });
  }
}

// Main App Class
class SrengengeApp {
  constructor() {
    this.managers = {};
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    try {
      // Initialize all managers
      this.managers = {
        header: new HeaderManager(),
        mobileMenu: new MobileMenuManager(),
        swiper: new SwiperManager(),
        animation: new AnimationManager(),
        loading: new LoadingManager(),
        performance: new PerformanceOptimizer(),
        errorHandler: new ErrorHandler(),
      };

      // Initialize smooth scrolling for anchor links
      this.initSmoothScrolling();

      // Initialize additional features
      this.initAdditionalFeatures();

      console.log("Srengenge App initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Srengenge App:", error);
    }
  }

  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = anchor.getAttribute("href");
        utils.smoothScrollTo(target);
      });
    });
  }

  initAdditionalFeatures() {
    // Add hover effects to cards
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px) scale(1.02)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
      });
    });

    // Add click effects to buttons
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Create ripple effect
        const ripple = document.createElement("span");
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.classList.add("ripple");

        btn.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Initialize gallery expand functionality
    this.initGalleryExpand();

    // Initialize pax counter functionality
    this.initPaxCounter();
  }

  initPaxCounter() {
    // Initialize pax counters for all packages
    for (let i = 1; i <= 4; i++) {
      this.updatePaxDisplay(i);
      this.updateTotalPrice(i, 850000);
    }
  }

  initGalleryExpand() {
    const expandBtn = document.getElementById("expandGallery");
    const hiddenItems = document.querySelectorAll(".gallery-hidden");
    const expandText = expandBtn?.querySelector(".expand-text");
    const collapseText = expandBtn?.querySelector(".collapse-text");
    const expandIcon = expandBtn?.querySelector(".expand-icon");

    if (!expandBtn) return;

    expandBtn.addEventListener("click", () => {
      const isExpanded = expandBtn.getAttribute("aria-expanded") === "true";

      if (!isExpanded) {
        // Show all gallery items
        hiddenItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("show");
          }, index * 100); // Stagger animation
        });

        // Update button state
        expandBtn.setAttribute("aria-expanded", "true");
        if (expandText) expandText.style.display = "none";
        if (collapseText) collapseText.style.display = "inline";
        if (expandIcon) expandIcon.textContent = "📷";

        // Smooth scroll to show new items
        setTimeout(() => {
          const firstHiddenItem = document.querySelector(
            ".gallery-hidden.show"
          );
          if (firstHiddenItem) {
            firstHiddenItem.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
        }, 500);
      } else {
        // Hide additional gallery items
        hiddenItems.forEach((item) => {
          item.classList.remove("show");
        });

        // Update button state
        expandBtn.setAttribute("aria-expanded", "false");
        if (expandText) expandText.style.display = "inline";
        if (collapseText) collapseText.style.display = "none";
        if (expandIcon) expandIcon.textContent = "📷";

        // Scroll back to gallery section
        const gallerySection = document.getElementById("gallery");
        if (gallerySection) {
          gallerySection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  }
}

// Initialize the app when the script loads
new SrengengeApp();

// Additional loading screen fix for live server
document.addEventListener("DOMContentLoaded", function () {
  // Force hide loading screen after DOM is ready
  setTimeout(() => {
    const loading = document.querySelector(".loading");
    if (loading) {
      loading.classList.add("hidden");
      setTimeout(() => {
        loading.style.display = "none";
      }, 500);
    }
  }, 1000);
});

// Emergency fallback to hide loading screen
setTimeout(() => {
  const loading = document.querySelector(".loading");
  if (loading) {
    loading.classList.add("hidden");
    loading.style.display = "none";
  }
}, 3000);

// Final emergency fallback for live server issues
window.addEventListener("load", function () {
  setTimeout(() => {
    const loading = document.querySelector(".loading");
    if (loading) {
      loading.classList.add("hidden");
      loading.style.display = "none";
    }
  }, 500);
});

// Force hide loading screen on any user interaction
document.addEventListener(
  "click",
  function () {
    const loading = document.querySelector(".loading");
    if (loading && !loading.classList.contains("hidden")) {
      loading.classList.add("hidden");
      loading.style.display = "none";
    }
  },
  { once: true }
);

// Global pax counter functions
let paxCounts = { 1: 1, 2: 1, 3: 1, 4: 1 };

function increasePax(packageId) {
  if (paxCounts[packageId] < 20) {
    // Max 20 pax
    paxCounts[packageId]++;
    updatePaxDisplay(packageId);
    updateTotalPrice(packageId, 850000);
  }
}

function decreasePax(packageId) {
  if (paxCounts[packageId] > 1) {
    // Min 1 pax
    paxCounts[packageId]--;
    updatePaxDisplay(packageId);
    updateTotalPrice(packageId, 850000);
  }
}

function updatePaxDisplay(packageId) {
  const paxElement = document.getElementById(`pax-${packageId}`);
  const decreaseBtn = document.getElementById(`decrease-${packageId}`);
  const increaseBtn = document.getElementById(`increase-${packageId}`);

  if (paxElement) {
    paxElement.textContent = paxCounts[packageId];
  }

  // Update button states
  if (decreaseBtn) {
    decreaseBtn.disabled = paxCounts[packageId] <= 1;
  }

  if (increaseBtn) {
    increaseBtn.disabled = paxCounts[packageId] >= 20;
  }
}

function updateTotalPrice(packageId, basePrice) {
  const totalElement = document.getElementById(`total-${packageId}`);
  const totalPrice = basePrice * paxCounts[packageId];

  if (totalElement) {
    // Format price with K for thousands
    const formattedPrice =
      totalPrice >= 1000000
        ? `Rp ${(totalPrice / 1000000).toFixed(1)}M`
        : `Rp ${(totalPrice / 1000).toFixed(0)}K`;

    totalElement.textContent = `Total: ${formattedPrice}`;
  }
}

function bookPackage(packageId, packageName, basePrice) {
  const pax = paxCounts[packageId];
  const totalPrice = basePrice * pax;
  const formattedPrice =
    totalPrice >= 1000000
      ? `${(totalPrice / 1000000).toFixed(1)}M`
      : `${(totalPrice / 1000).toFixed(0)}K`;

  const message = `Hai kak saya tertarik dengan ${packageName} ini.. sebanyak ${pax} pax tanggal yang ready di hari apa ya kak?`;

  const whatsappUrl = `https://wa.me/6287729388529?text=${encodeURIComponent(
    message
  )}`;

  // Open WhatsApp in new tab
  window.open(whatsappUrl, "_blank");
}
