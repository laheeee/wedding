// 간단한 JavaScript 기능들
document.addEventListener('DOMContentLoaded', function() {
    const rsvpButton = document.querySelector('.rsvp-button');

    // RSVP 버튼 클릭 이벤트
    rsvpButton.addEventListener('click', function() {
        alert('참석 의사를 전달해 주셔서 감사합니다!\n곧 연락드리겠습니다.');
    });

    // 애니메이션 효과 추가
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // 터치 이벤트 지원 (모바일용)
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;

        // 스와이프 다운으로 새로고침 효과
        if (deltaY < -50) {
            location.reload();
        }
    });
});