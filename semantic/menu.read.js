$(document)
  .ready(function() {

    // fix menu when passed
    $('.masthead')
      .visibility({
        once: false,
        onBottomPassed: function() {
          $('.full.height.background').css("background-color","rgba(31, 29, 29, 0.77)");
          $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function() {
          $('.full.height.background').css("background-color","white");
          $('.fixed.menu').transition('fade out');
        }
    });

    // create sidebar and attach to menu open
  /*  $('.ui.sidebar')
      .sidebar('attach events', '.toc.item')
    ;*/

  })
;
