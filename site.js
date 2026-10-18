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
