$(document).ready(function() {

  // wait to layout grid until all images are loaded
  $('.grid').imagesLoaded(function() {

    $('.grid li').wookmark({
      container: $('.grid'),
      autoResize: true,
      flexibleWidth: "25%" // 5 columns on biggest layout
    });

    // fade spinner element out and then remove
    $(".spinner-wrap").addClass("fadeOut");

    var timeout = setTimeout(function() {
      $('.spinner-wrap').remove();
    }, 1100);

  });

  $('.grid').magnificPopup({
    delegate: 'a', // child items selector, by clicking on it, the popup will open
    type: 'image',
    gallery: { enabled: true },

    // disables popup on mobile
    disableOn: function() {
      if ($(window).width() < 640) {
        return false;
      }
      return true;
    }
  });

  // disables links to image src on mobile
  $('.grid a').click(function(e) {
    if ($(window).width() < 640) {
      e.preventDefault();
    }
  });

  $('.navicon').click(function() {
    $('.nav, .navicon').toggleClass('is-open');
    $('body').toggleClass('no-scroll');
  });

  $('.add-cookie').click(function() {
    Cookies.set('hasSeenModal', true, { expires: 365 });
    console.log('The "hasSeenModal" cookie has now been set.');
    $('.modal-wrap').remove();
    console.log('Modal has been removed.');
  });

  $('.remove-cookie').click(function() {
    Cookies.remove('hasSeenModal');
    console.log('The "hasSeenModal" cookie has been removed!');
  });

  var hasSeenModal = Cookies.get('hasSeenModal');
  if (hasSeenModal === 'true') {
    console.log('The "hasSeenModal" cookie has already been set.');
    $('.modal-wrap').remove();
    console.log('Modal has been removed.');
  };

});

