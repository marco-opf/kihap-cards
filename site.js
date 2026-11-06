(function () {
  'use strict';

  var store = {
    checkoutUrl: 'https://buy.stripe.com/8x2dRa5M9fLmfi4dyp9k400',
    testMode: false,
    videoUrl: 'https://vimeo.com/1236913465'
  };

  document.querySelectorAll('[data-checkout]').forEach(function (link) {
    link.href = store.checkoutUrl;
    link.rel = 'noopener';
  });

  if (store.testMode) {
    document.querySelectorAll('[data-test-notice]').forEach(function (notice) {
      notice.hidden = false;
    });
  }

  var menuButton = document.querySelector('.menu-button');
  var nav = document.querySelector('.site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      var open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuButton.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });
  }

  var drawDecks = Array.prototype.slice.call(document.querySelectorAll('[data-draw-deck]'));
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var signature = document.querySelector('[data-signature]');
  if (signature && !reduceMotion) {
    signature.classList.add('signature-ready');

    function writeSignatureWhenVisible() {
      var rect = signature.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.82 || rect.bottom < window.innerHeight * 0.18) return;
      signature.classList.add('is-signing');
      window.removeEventListener('scroll', writeSignatureWhenVisible);
      window.removeEventListener('resize', writeSignatureWhenVisible);
    }

    window.addEventListener('scroll', writeSignatureWhenVisible, { passive: true });
    window.addEventListener('resize', writeSignatureWhenVisible);
    window.requestAnimationFrame(writeSignatureWhenVisible);
  }

  document.querySelectorAll('[data-box-gallery]').forEach(function (gallery) {
    var stage = gallery.querySelector('[data-box-stage]');
    var slides = Array.prototype.slice.call(gallery.querySelectorAll('[data-box-slide]'));
    var buttons = Array.prototype.slice.call(gallery.querySelectorAll('[data-box-index]'));
    var mobileQuery = window.matchMedia('(max-width: 720px)');
    var current = 0;
    var scrollTicking = false;

    if (!stage || !slides.length || !buttons.length) return;

    function updateView(index, moveStage) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, slideIndex) {
        var active = slideIndex === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      buttons.forEach(function (button, buttonIndex) {
        var active = buttonIndex === current;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-current', String(active));
      });

      if (moveStage && mobileQuery.matches) {
        stage.scrollTo({
          left: slides[current].offsetLeft,
          behavior: reduceMotion ? 'auto' : 'smooth'
        });
      }
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        updateView(Number(button.getAttribute('data-box-index')), true);
      });
    });

    gallery.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      updateView(current + (event.key === 'ArrowRight' ? 1 : -1), true);
      buttons[current].focus();
    });

    stage.addEventListener('scroll', function () {
      if (!mobileQuery.matches || scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(function () {
        var next = Math.round(stage.scrollLeft / Math.max(stage.clientWidth, 1));
        if (next !== current && next >= 0 && next < slides.length) updateView(next, false);
        scrollTicking = false;
      });
    }, { passive: true });

    function alignGallery() {
      if (mobileQuery.matches) stage.scrollLeft = slides[current].offsetLeft;
    }

    if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', alignGallery);
    else if (mobileQuery.addListener) mobileQuery.addListener(alignGallery);
    updateView(0, false);
  });

  if (drawDecks.length && !reduceMotion) {
    document.documentElement.classList.add('deck-motion-ready');
    var deckTicking = false;

    function updateDrawDecks() {
      var focusLine = window.innerHeight * 0.44;
      drawDecks.forEach(function (deck) {
        var cards = Array.prototype.slice.call(deck.querySelectorAll('[data-draw-card]'));
        var activeIndex = -1;

        cards.forEach(function (card, index) {
          if (card.getBoundingClientRect().top <= focusLine) activeIndex = index;
        });

        cards.forEach(function (card, index) {
          card.classList.toggle('is-active', index === activeIndex);
          card.classList.toggle('is-past', index < activeIndex);
          card.classList.toggle('is-next', index === activeIndex + 1 || (activeIndex < 0 && index === 0));
        });
      });
      deckTicking = false;
    }

    function requestDeckUpdate() {
      if (deckTicking) return;
      deckTicking = true;
      window.requestAnimationFrame(updateDrawDecks);
    }

    window.addEventListener('scroll', requestDeckUpdate, { passive: true });
    window.addEventListener('resize', requestDeckUpdate);
    requestDeckUpdate();
  }

  function embedVideo(container, url) {
    var youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    var vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    var vimeoHash = url.match(/[?&]h=([a-zA-Z0-9]+)/) || url.match(/vimeo\.com\/\d+\/([a-zA-Z0-9]+)/);
    var src = youtube
      ? 'https://www.youtube-nocookie.com/embed/' + youtube[1] + '?autoplay=1&rel=0'
      : vimeo
        ? 'https://player.vimeo.com/video/' + vimeo[1] + (vimeoHash ? '?h=' + vimeoHash[1] + '&' : '?') + 'autoplay=1&dnt=1'
        : '';
    if (!src) return false;
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = 'Kihap Cards explainer video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    container.replaceChildren(iframe);
    return true;
  }

  var video = document.querySelector('[data-video-placeholder]');
  var play = document.querySelector('[data-video-play]');
  var message = document.querySelector('[data-video-message]');
  if (video && play) {
    play.addEventListener('click', function () {
      if (!embedVideo(video, store.videoUrl) && message) {
        message.textContent = 'Add the YouTube or Vimeo link in site.js to publish this video.';
        message.classList.add('is-visible');
      }
    });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
}());
