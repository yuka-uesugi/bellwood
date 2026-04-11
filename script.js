/* ============================================================
   ベルウッドカンパニー コーポレートサイト — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- ヘッダーのスクロール連動 ---
  const header = document.getElementById('header');
  const scrollThreshold = 60;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // 初期状態チェック

  // --- ハンバーガーメニュー ---
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  const navOverlay = document.getElementById('navOverlay');

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  // --- ナビリンクをクリックしたらメニューを閉じる ---
  // ※ジャンプ自体はブラウザ本来のアンカーリンク機能に任せる（CSS scroll-behavior: smooth で制御）
  // ※e.preventDefault() は使わない（iOS Safari でジャンプが無効化されるため）
  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // --- アクティブナビリンクの更新 ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // --- Intersection Observer によるフェードインアニメーション ---
  const fadeInElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // 少しずつ遅延をつけてフェードイン
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 100);
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeInElements.forEach(el => fadeInObserver.observe(el));

});
