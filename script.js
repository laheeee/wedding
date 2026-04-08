/* ---------------------------
   1. D-DAY COUNTDOWN
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
  snapIndicator.textContent = `${realIndex + 1} / ${totalOriginal}`;

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
  "images/wedding-12.jpg",
  "images/wedding-13.jpg",
  "images/wedding-14.jpg",
  "images/wedding-15.jpg",
  "images/wedding-16.jpg",
  "images/wedding-17.jpg",
  "images/wedding-18.jpg"
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
   5. GALLERY PAGE INDICATOR
--------------------------- */
const galleryPages = document.getElementById("galleryPages");
const galleryPageIndicator = document.querySelector(".gallery-page-indicator span");

function updateGalleryPageIndicator() {
  const pageWidth = galleryPages.clientWidth;
  const scrollLeft = galleryPages.scrollLeft;
  const currentPage = Math.round(scrollLeft / pageWidth) + 1;
  const totalPages = galleryPages.querySelectorAll(".gallery-page").length;

  galleryPageIndicator.textContent = `${currentPage} / ${totalPages}`;
}

galleryPages.addEventListener("scroll", () => {
  updateGalleryPageIndicator();
});

updateGalleryPageIndicator();

/* ---------------------------
   6. SCROLL REVEAL ANIMATION
--------------------------- */
const observerOptions = {
  root: null,
  rootMargin: '0px',
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