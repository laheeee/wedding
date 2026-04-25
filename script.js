/* ---------------------------
   0. BACKGROUND MUSIC
--------------------------- */
const bgMusic = document.getElementById('bgMusic');
const musicCheckbox = document.getElementById('musicCheckbox');
let isMusicPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise.then(() => {
      isMusicPlaying = true;
      musicCheckbox.checked = true;
    }).catch(() => {
      isMusicPlaying = false;
      musicCheckbox.checked = false;
    });
  }
});

musicCheckbox.addEventListener('change', () => {
  if (musicCheckbox.checked) {
    bgMusic.play();
    isMusicPlaying = true;
  } else {
    bgMusic.pause();
    isMusicPlaying = false;
  }
});

/* ---------------------------
   1. FOLDED INVITATION
--------------------------- */
const invitation = document.getElementById('invitation');
const foldContainer = document.getElementById('foldContainer');
const openContainer = document.getElementById('openContainer');
const polaroid = document.getElementById('polaroid');
const sticker = document.getElementById('sticker');
const tapHint = document.getElementById('tapHint');
let isOpen = false;
let polaroidTimer = null;
let isAutoOpened = false;

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (!isAutoOpened) {
      openInvitation();
      isAutoOpened = true;
    }
  }, 1500);
});

function openInvitation() {
  foldContainer.classList.add('hidden');
  openContainer.classList.add('visible');
  sticker.classList.remove('visible');
  tapHint.classList.remove('folded');
  tapHint.classList.add('opened');
  tapHint.textContent = 'TAP TO CLOSE';

  polaroidTimer = setTimeout(() => {
    polaroid.classList.add('visible');
    polaroidTimer = null;
  }, 500);

  isOpen = true;
}

function closeInvitation() {
  if (polaroidTimer) {
    clearTimeout(polaroidTimer);
    polaroidTimer = null;
  }

  polaroid.classList.remove('visible');

  setTimeout(() => {
    foldContainer.classList.remove('hidden');
    openContainer.classList.remove('visible');
    sticker.classList.add('visible');
    tapHint.classList.remove('opened');
    tapHint.classList.add('folded');
    tapHint.textContent = 'TAP TO OPEN';
  }, 300);

  isOpen = false;
}

invitation.addEventListener('click', () => {
  if (!isOpen) {
    openInvitation();
  } else {
    closeInvitation();
  }
});

/* ---------------------------
   2. D-DAY COUNTDOWN
--------------------------- */
const weddingDate = new Date("2026-08-08T16:00:00+09:00");
const countdownInline = document.getElementById("countdownInline");

function pad(number) {
  return String(number).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdownInline.textContent = "0 Days · 00 : 00 : 00";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  countdownInline.textContent =
    `${days} Days · ${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");

function updateClock() {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourDeg = (hours * 30) + (minutes * 0.5);
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  hourHand.style.transform = `rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  secondHand.style.transform = `rotate(${secondDeg}deg)`;
}

updateClock();
setInterval(updateClock, 1000);

/* ---------------------------
   3. SELF SNAP CAROUSEL
--------------------------- */
const snapImages = [
  "images/self-01.jpg",
  "images/self-02.jpg",
  "images/self-03.jpg",
  "images/self-04.jpg",
  "images/self-05.jpg",
  "images/self-06.jpg",
  "images/self-07.jpg",
  "images/self-08.jpg",
  "images/self-09.jpg",
  "images/self-10.jpg"
];
/* ---------------------------
   3. SELF SNAP CAROUSEL (최종 정렬 보정)
--------------------------- */
const snapCarousel = document.getElementById("snapCarousel");
const snapCounter = document.querySelector(".snap-counter");
const snapArrows = document.querySelectorAll(".snap-arrow");
const totalSnapImages = 10; 

const SNAP_ITEM_WIDTH = 280 + 16; 
const SNAP_LOOP_WIDTH = SNAP_ITEM_WIDTH * totalSnapImages;

// 초기 위치 설정 (정확히 중앙 세트의 1번 사진으로 이동)
setTimeout(() => {
  if (snapCarousel) {
    // 단순히 totalWidth로 가면 오차가 생길 수 있어, 
    // 실제 슬라이드 하나의 위치를 정확히 계산해서 보냅니다.
    snapCarousel.scrollLeft = SNAP_LOOP_WIDTH;
  }
}, 50);

snapCarousel.addEventListener("scroll", () => {
  const currentScroll = snapCarousel.scrollLeft;

  // 무한 루프 보정 (이 로직이 8~10번 끊김을 해결합니다)
  if (currentScroll < SNAP_LOOP_WIDTH - (SNAP_LOOP_WIDTH / 2)) {
    snapCarousel.scrollLeft = currentScroll + SNAP_LOOP_WIDTH;
  } else if (currentScroll > SNAP_LOOP_WIDTH + (SNAP_LOOP_WIDTH / 2)) {
    snapCarousel.scrollLeft = currentScroll - SNAP_LOOP_WIDTH;
  }

  // 카운터 업데이트
  // 현재 스크롤 위치에서 중앙 세트의 시작점(SNAP_LOOP_WIDTH)을 뺀 뒤 계산하면 정확합니다.
  const relativeScroll = currentScroll - SNAP_LOOP_WIDTH;
  const realSnapIndex = (Math.round(currentScroll / SNAP_ITEM_WIDTH) % totalSnapImages + totalSnapImages) % totalSnapImages;
  
  if (snapCounter) {
    snapCounter.textContent = `${realSnapIndex + 1} / ${totalSnapImages}`;
  }
});

// 화살표는 기존과 동일하게 유지
snapArrows[0].addEventListener("click", () => {
  snapCarousel.scrollBy({ left: -SNAP_ITEM_WIDTH, behavior: "smooth" });
});
snapArrows[1].addEventListener("click", () => {
  snapCarousel.scrollBy({ left: SNAP_ITEM_WIDTH, behavior: "smooth" });
});

/* ---------------------------
const snapCarousel = document.getElementById("snapCarousel");
const snapIndicator = document.getElementById("snapIndicator");
const snapCounter = document.querySelector(".snap-counter");
const snapArrows = document.querySelectorAll(".snap-arrow");

let currentSnapIndex = 0;
let isSnapScrolling = false;

const originalSlides = Array.from(document.querySelectorAll(".snap-slide"));
const totalOriginal = snapImages.length;

originalSlides.forEach(slide => {
  const clone = slide.cloneNode(true);
  snapCarousel.appendChild(clone);
});
originalSlides.forEach(slide => {
  const clone = slide.cloneNode(true);
  snapCarousel.appendChild(clone);
});

setTimeout(() => {
  const slideWidth = snapCarousel.querySelector('.snap-slide').offsetWidth + 16;
  snapCarousel.scrollLeft = slideWidth * totalOriginal;
}, 0);

snapCarousel.addEventListener("scroll", () => {
  if (isSnapScrolling) return;

  const slideWidth = snapCarousel.querySelector('.snap-slide').offsetWidth + 16;
  const scrollLeft = snapCarousel.scrollLeft;
  const currentIndex = Math.round(scrollLeft / slideWidth);

  const realIndex = currentIndex % totalOriginal;
  currentSnapIndex = realIndex;
  snapCounter.textContent = `${realIndex + 1} / ${totalOriginal}`;

  if (currentIndex < 3) {
    isSnapScrolling = true;
    snapCarousel.scrollLeft = slideWidth * (totalOriginal + realIndex);
    setTimeout(() => { isSnapScrolling = false; }, 50);
  } else if (currentIndex >= totalOriginal * 2 - 3) {
    isSnapScrolling = true;
    snapCarousel.scrollLeft = slideWidth * (totalOriginal + realIndex);
    setTimeout(() => { isSnapScrolling = false; }, 50);
  }
});

snapArrows[0].addEventListener("click", () => {
  const slideWidth = snapCarousel.querySelector('.snap-slide').offsetWidth + 16;
  snapCarousel.scrollBy({ left: -slideWidth, behavior: "smooth" });
});

snapArrows[1].addEventListener("click", () => {
  const slideWidth = snapCarousel.querySelector('.snap-slide').offsetWidth + 16;
  snapCarousel.scrollBy({ left: slideWidth, behavior: "smooth" });
});
--------------------------- */
/* ---------------------------
   4. ACCOUNT COPY
--------------------------- */
const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;

    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = "복사됨";

      setTimeout(() => {
        button.textContent = original;
      }, 1200);
    } catch (error) {
      alert("복사에 실패했습니다.");
    }
  });
});

/* ---------------------------
   5. WEDDING GALLERY MODAL (이벤트 위임)
--------------------------- */
const weddingImages = [
  "images/wedding-01.jpg",
  "images/wedding-02.jpg",
  "images/wedding-03.jpg",
  "images/wedding-04.jpg",
  "images/wedding-05.jpg",
  "images/wedding-06.jpg",
  "images/wedding-07.jpg",
  "images/wedding-08.jpg",
  "images/wedding-09.jpg",
  "images/wedding-10.jpg",
  "images/wedding-11.jpg",
  "images/wedding-12.jpg",
  "images/wedding-13.jpg",
  "images/wedding-14.jpg",
  "images/wedding-15.jpg",
  "images/wedding-16.jpg",
  "images/wedding-17.jpg",
  "images/wedding-18.jpg",
];

const galleryModal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");
const modalCounter = document.getElementById("modalCounter");
const modalClose = document.getElementById("modalClose");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");

let currentIndex = 0;
let currentImages = [];
let isModalOpen = false;
let isModalOpening = false;

/*--function openModal(index, images) {
  if (isModalOpen || isModalOpening) return;

  isModalOpening = true;

  currentIndex = index;
  currentImages = images;

  const imgSrc = currentImages[currentIndex];
  if (!imgSrc) {
    isModalOpening = false;
    return;
  }

  modalImage.src = imgSrc;
  modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;

  requestAnimationFrame(() => {
    galleryModal.classList.add("is-open");
    galleryModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    isModalOpen = true;
    isModalOpening = false;
  });
}

function closeModal() {
  if (!isModalOpen) return;

  galleryModal.classList.remove("is-open");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  isModalOpen = false;
}*/

/* --- 기존 openModal을 아래 코드로 교체 --- */
function openModal(index, images) {
  if (isModalOpen || isModalOpening) return;
  isModalOpening = true;

  currentIndex = index;
  currentImages = images;

  const pureSrc = currentImages[currentIndex];
  if (!pureSrc) {
    isModalOpening = false;
    return;
  }

  // 사파리/카톡 캐시 버그 방지 (이미지 경로 뒤에 고유 번호 추가)
  const finalSrc = pureSrc + "?v=" + new Date().getTime();

  const imgLoader = new Image();
  imgLoader.src = finalSrc;

  // 이미지가 화면에 그려질 준비가 끝났을 때만 모달을 표시
  imgLoader.onload = function() {
    modalImage.src = finalSrc;
    modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;

    // 강제 리플로우 (사파리 렌더링 깨움)
    void modalImage.offsetWidth; 

    requestAnimationFrame(() => {
      galleryModal.classList.add("is-open");
      galleryModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      
      isModalOpen = true;
      isModalOpening = false;
    });
  };

  imgLoader.onerror = function() {
    modalImage.src = pureSrc;
    galleryModal.classList.add("is-open");
    isModalOpen = true;
    isModalOpening = false;
  };
}

/* --- 기존 closeModal을 아래 코드로 교체 --- */
function closeModal() {
  if (!isModalOpen) return;

  galleryModal.classList.remove("is-open");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  // 닫을 때 이미지를 비워줘야 다음 사진 로딩 시 꼬이지 않음
  setTimeout(() => {
    modalImage.src = ""; 
    isModalOpen = false;
    isModalOpening = false;
  }, 300);
}

function updateModalImage() {
  const imgSrc = currentImages[currentIndex];
  if (!imgSrc) return;

  modalImage.src = imgSrc;
  modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

function showPrevImage() {
  if (!isModalOpen) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateModalImage();
}

function showNextImage() {
  if (!isModalOpen) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateModalImage();
}

// 이벤트 위임: 웨딩 갤러리
const galleryPages = document.getElementById("galleryPages");
galleryPages.addEventListener("click", (e) => {
  const thumb = e.target.closest('.gallery-thumb');
  if (!thumb) return;

  e.preventDefault();
  e.stopPropagation();

  const index = Number(thumb.dataset.index);
  if (isNaN(index) || index < 0 || index >= weddingImages.length) return;

  openModal(index, weddingImages);
}, { capture: true });

// 이벤트 위임: 셀프 스냅
snapCarousel.addEventListener("click", (e) => {
  const slide = e.target.closest('.snap-slide');
  if (!slide) return;

  e.preventDefault();
  e.stopPropagation();

  const index = Number(slide.dataset.snapIndex);
  if (isNaN(index) || index < 0 || index >= snapImages.length) return;

  openModal(index, snapImages);
}, { capture: true });

modalClose.addEventListener("click", closeModal);
modalPrev.addEventListener("click", showPrevImage);
modalNext.addEventListener("click", showNextImage);

galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (!isModalOpen) return;

  if (e.key === "Escape") {
    closeModal();
  } else if (e.key === "ArrowLeft") {
    showPrevImage();
  } else if (e.key === "ArrowRight") {
    showNextImage();
  }
});

let modalTouchStartX = 0;
let modalTouchEndX = 0;

galleryModal.addEventListener("touchstart", (e) => {
  modalTouchStartX = e.changedTouches[0].screenX;
});

galleryModal.addEventListener("touchend", (e) => {
  modalTouchEndX = e.changedTouches[0].screenX;
  const diff = modalTouchEndX - modalTouchStartX;

  if (diff > 40) {
    showPrevImage();
  } else if (diff < -40) {
    showNextImage();
  }
});

/* ---------------------------
   6. GALLERY PAGE INDICATOR + INFINITE LOOP
--------------------------- */
const galleryPageIndicator = document.querySelector(".gallery-counter");
const galleryArrows = document.querySelectorAll(".gallery-arrow");

const originalPages = Array.from(galleryPages.querySelectorAll(".gallery-page"));
const totalOriginalPages = originalPages.length;

originalPages.forEach(page => {
  const clone = page.cloneNode(true);
  galleryPages.appendChild(clone);
});
originalPages.forEach(page => {
  const clone = page.cloneNode(true);
  galleryPages.appendChild(clone);
});

let isGalleryScrolling = false;

setTimeout(() => {
  const pageWidth = galleryPages.clientWidth;
  galleryPages.scrollLeft = pageWidth * totalOriginalPages;
}, 0);

function updateGalleryPageIndicator() {
  if (isGalleryScrolling) return;

  const pageWidth = galleryPages.clientWidth;
  const currentPageIndex = Math.round(galleryPages.scrollLeft / pageWidth);

  const realPage =
    ((currentPageIndex - totalOriginalPages) % totalOriginalPages + totalOriginalPages) %
      totalOriginalPages + 1;

  galleryPageIndicator.textContent = `${realPage} / ${totalOriginalPages}`;

  // 무한 루프 경계 처리 - 더 여유있게
  if (currentPageIndex <= 0) {
    isGalleryScrolling = true;
    galleryPages.scrollLeft = pageWidth * totalOriginalPages;
    setTimeout(() => {
      isGalleryScrolling = false;
    }, 300);
  } else if (currentPageIndex >= totalOriginalPages * 3 - 1) {
    isGalleryScrolling = true;
    galleryPages.scrollLeft = pageWidth * (totalOriginalPages * 2 - 1);
    setTimeout(() => {
      isGalleryScrolling = false;
    }, 300);
  }
}

galleryPages.addEventListener("scroll", updateGalleryPageIndicator);
updateGalleryPageIndicator();

function getCurrentGalleryPageIndex() {
  const pageWidth = galleryPages.clientWidth;
  return Math.round(galleryPages.scrollLeft / pageWidth);
}

function goToGalleryPage(pageIndex, smooth = true) {
  const pageWidth = galleryPages.clientWidth;
  galleryPages.scrollTo({
    left: pageWidth * pageIndex,
    behavior: smooth ? "smooth" : "auto"
  });
}

galleryArrows[0].addEventListener("click", () => {
  if (isGalleryScrolling) return;

  const pageWidth = galleryPages.clientWidth;
  galleryPages.scrollBy({ left: -pageWidth, behavior: "smooth" });
});

galleryArrows[1].addEventListener("click", () => {
  if (isGalleryScrolling) return;

  const pageWidth = galleryPages.clientWidth;
  galleryPages.scrollBy({ left: pageWidth, behavior: "smooth" });
});

/* ---------------------------
   7. PARKING & SHUTTLE TABS
--------------------------- */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(targetTab + '-content').classList.add('active');
  });
});

/* ---------------------------
   8. SCROLL REVEAL ANIMATION
--------------------------- */
const observerOptions = {
  root: null,
  rootMargin: '-50px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);

const sections = document.querySelectorAll('section');
sections.forEach(section => {
  observer.observe(section);
});

/* ---------------------------
   9. ACCORDION ANIMATION
--------------------------- */
const accordions = document.querySelectorAll('.account-accordion');

accordions.forEach(accordion => {
  const summary = accordion.querySelector('summary');
  const panel = accordion.querySelector('.account-panel');

  summary.addEventListener('click', (e) => {
    e.preventDefault();

    if (accordion.hasAttribute('open')) {
      const startHeight = panel.scrollHeight + 'px';
      panel.style.height = startHeight;

      requestAnimationFrame(() => {
        panel.style.height = '0px';
        panel.style.opacity = '0';
        panel.style.padding = '0';
      });

      setTimeout(() => {
        accordion.removeAttribute('open');
      }, 300);
    } else {
      accordion.setAttribute('open', '');
      panel.style.height = '0px';
      panel.style.opacity = '0';
      panel.style.padding = '0';

      requestAnimationFrame(() => {
        const endHeight = panel.scrollHeight + 'px';
        panel.style.height = endHeight;
        panel.style.opacity = '1';
        panel.style.padding = '0 0 16px';
      });

      setTimeout(() => {
        panel.style.height = 'auto';
      }, 300);
    }
  });
});
