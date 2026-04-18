/* ---------------------------
   0. BACKGROUND MUSIC
--------------------------- */
const bgMusic = document.getElementById('bgMusic');
const musicCheckbox = document.getElementById('musicCheckbox');
let isMusicPlaying = false;

// 페이지 로드 시 음악 자동 재생 시도
document.addEventListener('DOMContentLoaded', () => {
  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise.then(() => {
      // 자동 재생 성공
      isMusicPlaying = true;
      musicCheckbox.checked = true;
    }).catch(() => {
      // 자동 재생 실패 (브라우저 정책)
      isMusicPlaying = false;
      musicCheckbox.checked = false;
    });
  }
});

// 토글 스위치 클릭
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

// 페이지 DOM 로드 후 자동으로 열림 (이미지 로딩 완료 기다리지 않음)
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (!isAutoOpened) {
      openInvitation();
      isAutoOpened = true;
    }
  }, 1500); // 1.5초 후 자동 열림
});

function openInvitation() {
  foldContainer.classList.add('hidden');
  openContainer.classList.add('visible');
  sticker.classList.remove('visible');
  tapHint.classList.remove('folded');
  tapHint.classList.add('opened');
  tapHint.textContent = 'TAP TO CLOSE';

  // 펼쳐지면 바로 폴라로이드 나타남
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

// 아날로그 시계
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
   2. SELF SNAP CAROUSEL
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

const snapCarousel = document.getElementById("snapCarousel");
const snapIndicator = document.getElementById("snapIndicator");
const snapCounter = document.querySelector(".snap-counter");
const snapArrows = document.querySelectorAll(".snap-arrow");
let snapSlides = document.querySelectorAll(".snap-slide");

let currentSnapIndex = 0;
let currentModalImages = []; // 현재 모달에서 보여줄 이미지 배열
let isSnapScrolling = false;

// 무한 루프를 위해 슬라이드 복제
const originalSlides = Array.from(snapSlides);
originalSlides.forEach(slide => {
  const clone = slide.cloneNode(true);
  snapCarousel.appendChild(clone);
});
originalSlides.forEach(slide => {
  const clone = slide.cloneNode(true);
  snapCarousel.appendChild(clone);
});

// 슬라이드 목록 다시 가져오기
snapSlides = document.querySelectorAll(".snap-slide");
const totalOriginal = snapImages.length;

// 처음 시작 위치를 중간 세트로 설정
setTimeout(() => {
  const slideWidth = snapSlides[0].offsetWidth + 16;
  snapCarousel.scrollLeft = slideWidth * totalOriginal;
}, 0);

// 스크롤로 현재 인덱스 업데이트
snapCarousel.addEventListener("scroll", () => {
  if (isSnapScrolling) return;

  const slideWidth = snapSlides[0].offsetWidth + 16;
  const scrollLeft = snapCarousel.scrollLeft;
  const currentIndex = Math.round(scrollLeft / slideWidth);

  // 실제 인덱스 계산 (0-9 범위로 유지)
  const realIndex = currentIndex % totalOriginal;
  currentSnapIndex = realIndex;
  snapCounter.textContent = `${realIndex + 1} / ${totalOriginal}`;

  // 무한 루프: 첫 번째 또는 마지막 세트에 도달하면 중간으로 점프
  if (currentIndex < 3) {
    // 너무 왼쪽으로 가면 두 번째 세트로
    isSnapScrolling = true;
    snapCarousel.scrollLeft = slideWidth * (totalOriginal + realIndex);
    setTimeout(() => { isSnapScrolling = false; }, 50);
  } else if (currentIndex >= totalOriginal * 2 - 3) {
    // 너무 오른쪽으로 가면 두 번째 세트로
    isSnapScrolling = true;
    snapCarousel.scrollLeft = slideWidth * (totalOriginal + realIndex);
    setTimeout(() => { isSnapScrolling = false; }, 50);
  }
});

// 셀프 스냅 클릭 시 모달 열기 (복제된 슬라이드 포함)
snapSlides.forEach((slide) => {
  slide.addEventListener("click", () => {
    const index = Number(slide.dataset.snapIndex);
    currentModalImages = snapImages; // 셀프 스냅 배열 사용
    openModalWithImages(index, currentModalImages);
  });
});

// 셀프 스냅 화살표 클릭으로 스크롤
snapArrows[0].addEventListener("click", () => {
  const slideWidth = snapSlides[0].offsetWidth + 16;
  snapCarousel.scrollBy({ left: -slideWidth, behavior: "smooth" });
});

snapArrows[1].addEventListener("click", () => {
  const slideWidth = snapSlides[0].offsetWidth + 16;
  snapCarousel.scrollBy({ left: slideWidth, behavior: "smooth" });
});

/* ---------------------------
   3. ACCOUNT COPY
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
   4. WEDDING GALLERY MODAL
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
  "images/wedding-12.jpg"
];

const galleryThumbs = document.querySelectorAll(".gallery-thumb");
const galleryModal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");
const modalCounter = document.getElementById("modalCounter");
const modalClose = document.getElementById("modalClose");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");

let currentWeddingIndex = 0;

function openModalWithImages(index, images) {
  currentModalImages = images;
  currentWeddingIndex = index;
  updateModalImage();
  galleryModal.classList.add("is-open");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function openModal(index) {
  currentModalImages = weddingImages; // 웨딩 사진 배열 사용
  openModalWithImages(index, currentModalImages);
}

function closeModal() {
  galleryModal.classList.remove("is-open");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function updateModalImage() {
  modalImage.src = currentModalImages[currentWeddingIndex];
  modalCounter.textContent = `${currentWeddingIndex + 1} / ${currentModalImages.length}`;
}

function showPrevImage() {
  currentWeddingIndex =
    (currentWeddingIndex - 1 + currentModalImages.length) % currentModalImages.length;
  updateModalImage();
}

function showNextImage() {
  currentWeddingIndex =
    (currentWeddingIndex + 1) % currentModalImages.length;
  updateModalImage();
}

galleryThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const index = Number(thumb.dataset.index);
    openModal(index);
  });
});

modalClose.addEventListener("click", closeModal);
modalPrev.addEventListener("click", showPrevImage);
modalNext.addEventListener("click", showNextImage);

galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (!galleryModal.classList.contains("is-open")) return;

  if (e.key === "Escape") {
    closeModal();
  } else if (e.key === "ArrowLeft") {
    showPrevImage();
  } else if (e.key === "ArrowRight") {
    showNextImage();
  }
});

/* swipe for modal */
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
   5. GALLERY PAGE INDICATOR + INFINITE LOOP
--------------------------- */
const galleryPages = document.getElementById("galleryPages");
const galleryPageIndicator = document.querySelector(".gallery-counter");
const galleryArrows = document.querySelectorAll(".gallery-arrow");

// 무한 루프를 위해 페이지 복제
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

// 모든 썸네일 클릭 이벤트 다시 연결
const allGalleryThumbs = document.querySelectorAll(".gallery-thumb");
allGalleryThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const index = Number(thumb.dataset.index);
    openModal(index);
  });
});

let isGalleryScrolling = false;

// 처음 시작 위치를 중간 세트로
setTimeout(() => {
  const pageWidth = galleryPages.clientWidth;
  galleryPages.scrollLeft = pageWidth * totalOriginalPages;
}, 0);

function updateGalleryPageIndicator() {
  if (isGalleryScrolling) return;

  const pageWidth = galleryPages.clientWidth;
  const scrollLeft = galleryPages.scrollLeft;
  const currentPageIndex = Math.round(scrollLeft / pageWidth);

  const realPage = (currentPageIndex % totalOriginalPages) + 1;
  galleryPageIndicator.textContent = `${realPage} / ${totalOriginalPages}`;

  // 무한 루프 점프
  if (currentPageIndex < 1) {
    isGalleryScrolling = true;
    galleryPages.scrollLeft = pageWidth * (totalOriginalPages + (currentPageIndex % totalOriginalPages));
    setTimeout(() => { isGalleryScrolling = false; }, 50);
  } else if (currentPageIndex >= totalOriginalPages * 2 - 1) {
    isGalleryScrolling = true;
    galleryPages.scrollLeft = pageWidth * (totalOriginalPages + (currentPageIndex % totalOriginalPages));
    setTimeout(() => { isGalleryScrolling = false; }, 50);
  }
}

galleryPages.addEventListener("scroll", updateGalleryPageIndicator);
updateGalleryPageIndicator();

// 화살표 클릭으로 페이지 이동
galleryArrows[0].addEventListener("click", () => {
  const pageWidth = galleryPages.clientWidth;
  galleryPages.scrollBy({ left: -pageWidth, behavior: "smooth" });
});

galleryArrows[1].addEventListener("click", () => {
  const pageWidth = galleryPages.clientWidth;
  galleryPages.scrollBy({ left: pageWidth, behavior: "smooth" });
});

/* ---------------------------
   6. SCROLL REVEAL ANIMATION
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
   7. ACCORDION ANIMATION
--------------------------- */
const accordions = document.querySelectorAll('.account-accordion');

accordions.forEach(accordion => {
  const summary = accordion.querySelector('summary');
  const panel = accordion.querySelector('.account-panel');

  summary.addEventListener('click', (e) => {
    e.preventDefault();

    if (accordion.hasAttribute('open')) {
      // 닫기
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
      // 열기
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