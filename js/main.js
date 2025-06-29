
// маска телефона

document.querySelectorAll('[data-mask]').forEach(input => {
    input.addEventListener('input', onMaskInput);
    input.addEventListener('focus', onMaskInput);
    input.addEventListener('blur', () => {
    if (input.value === '+7 (') input.value = '';
    });
});

function onMaskInput(e) {
    const input = e.target;
    const mask = input.dataset.mask;
    let i = 0;
    const def = mask.replace(/\D/g, '');
    let val = input.value.replace(/\D/g, '');

    if (val.startsWith('8')) val = val.slice(1); // убираем 8 в начале
    if (val.startsWith('7')) val = val.slice(1); // убираем 7 в начале
    val = def + val;

    input.value = mask.replace(/[_\d]/g, a => {
    return i < val.length ? val.charAt(i++) : '_';
    }).split('_')[0];
}

// скрипт попап

document.addEventListener('click', function (e) {
  const openBtn = e.target.closest('[data-popup-target]');
  const closeBtn = e.target.closest('[data-popup-close]');
  const switchBtn = e.target.closest('[data-popup-switch-to]');

  // Определение клика по фону
  const isBackdropClick = e.target.classList.contains('popup') &&
                          !e.target.querySelector('.popup__content')?.contains(e.target);

  // Открытие
  if (openBtn) {
    const target = openBtn.dataset.popupTarget;
    const popup = document.querySelector(`[data-popup="${target}"]`);
    if (popup) {
      openPopup(popup);
    }
  }

  // Переключение
  if (switchBtn) {
    const nextTarget = switchBtn.dataset.popupSwitchTo;
    const currentPopup = switchBtn.closest('.popup');
    const nextPopup = document.querySelector(`[data-popup="${nextTarget}"]`);

    if (currentPopup && nextPopup) {
      closePopup(currentPopup, () => openPopup(nextPopup));
    }
  }

  // Закрытие по кнопке
  if (closeBtn) {
    const popup = closeBtn.closest('.popup');
    if (popup) {
      closePopup(popup);
    }
  }

  // Закрытие по фону
  if (isBackdropClick) {
    const popup = e.target.closest('.popup');
    if (popup) {
      closePopup(popup);
    }
  }
});

// Закрытие по ESC
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.popup.active').forEach(p => closePopup(p));
  }
});

// Отмена submit и переключение попапов, если нужно
document.addEventListener('submit', function (e) {
  const switchTarget = e.submitter?.dataset?.popupSwitchTo;
  if (switchTarget) {
    e.preventDefault(); // Остановить реальную отправку

    const currentPopup = e.target.closest('.popup');
    const nextPopup = document.querySelector(`[data-popup="${switchTarget}"]`);

    if (currentPopup && nextPopup) {
      closePopup(currentPopup, () => openPopup(nextPopup));
    }
  }
});

// ===== Функции =====

function openPopup(popup) {
  popup.classList.add('active');
  document.documentElement.classList.add('popup-open');
  document.body.classList.add('popup-open');
}

function closePopup(popup, callback) {
  popup.classList.add('closing');
  popup.addEventListener('transitionend', function handler() {
    popup.classList.remove('active', 'closing');
    popup.removeEventListener('transitionend', handler);

    // Удаляем классы, если нет других активных попапов
    if (document.querySelectorAll('.popup.active').length === 0) {
      document.body.classList.remove('popup-open');
      document.documentElement.classList.remove('popup-open');
    }

    if (typeof callback === 'function') {
      // 🧠 Важно: выполняем только ПОСЛЕ завершения transition
      callback();
    }
  }, { once: true });
}


//аккордеон

document.querySelectorAll('.nav__title[type="button"]').forEach(title => {
    title.addEventListener('click', () => {
        const clickedNav = title.closest('.nav');
        const isOpen = clickedNav.classList.contains('open');

        // Закрываем все
        document.querySelectorAll('.footer__nav .nav').forEach(nav => nav.classList.remove('open'));

        // Открываем только если он был закрыт
        if (!isOpen) {
        clickedNav.classList.add('open');
        }
    });
 });

//  hero slide

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=100%",
    scrub: true,
    anticipate: true,
    pin: true
  }
});

tl.to(".hero-slide--1", { y: "-200%", opacity: 0, ease: "power2.out" }, 0)
  .fromTo(".hero-slide--2", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, ease: "power2.out" }, 0);



