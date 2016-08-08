$(document).ready(function() {

  $('.js-page-link').each(function() {
    if (window.location.pathname === this.pathname)
      $(this).addClass('current');
  });

  // wait to layout grid until all images are loaded
  $('.grid').imagesLoaded(function() {

    $('.grid li').wookmark({
      container: $('.grid'),
      autoResize: true,
      flexibleWidth: "25%" // 5 columns on biggest layout
    });

    // fade spinner element out and then remove
    $(".spinner-wrap").fadeOut("300");
  });

  $('.grid').magnificPopup({
    delegate: 'a', // child items selector, by clicking on it, the popup will open
    type: 'image',
    gallery: { enabled: true }

    // // disables popup on mobile
    // disableOn: function() {
    //   if ($(window).width() < 640) {
    //     return false;
    //   }
    //   return true;
    // }
  });

  // disables links to image src on mobile
  $('.grid a').click(function(e) {
    if ($(window).width() < 640) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  $('.navicon').click(function() {
    $('.nav, .navicon').toggleClass('is-open');
    $('body').toggleClass('no-scroll');
  });

  $('.add-cookie').click(function() {
    Cookies.set('hasSeenModal', true, { expires: 365 });
    $('.modal-wrap').remove();
  });

  $('.remove-cookie').click(function() {
    Cookies.remove('hasSeenModal');
  });

  var hasSeenModal = Cookies.get('hasSeenModal');
  if (hasSeenModal === 'true') {
    $('.modal-wrap').remove();
  };

});

