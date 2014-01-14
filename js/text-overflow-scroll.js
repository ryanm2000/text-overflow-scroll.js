function isDone() {
  console.log('Add a class of complete to element')
}
(function($){

  var timer;

  // Apply styles to animate and text indent the text
  var applyActiveStyles = function(elToChange, textIndent, duration, easing) {
    timer = window.setTimeout(isDone, duration);
    elToChange.css({
      'transition': 'text-indent ' + duration + 'ms ' + easing,
      'text-indent': (-textIndent) + 'px'
    }).addClass('is-scrolling');
  };

  // Reset/remove previously added styles
  var removeActiveStyles = function(elToChange, duration) {
    window.clearTimeout(isDone);
    elToChange.css({
      'transition': (duration /3)  + 'ms',
      'text-indent': '0'
    }).removeClass('is-scrolling');
  };

  var ScrollText = function(el, settings) {
    this.el = el;
    this.container = el.parent();
    this.settings = settings;
    this.prefix = settings.prefix;
  };

  ScrollText.prototype = $.extend({
    getWidth: function() {
      var calcWidth = this.el.css('position','absolute').width();
      this.el.css('position','relative');
      return calcWidth;
    },

    // Get the width of the direct parent of the scrolling element
    getContainerWidth: function() {
      return this.container.width()
    },

    // Determine which element will receive the hover event
    getHoverTarget: function() {
      if(this.settings.hoverElement == 'parent') {
        return this.container;
      } else {
        return this.el;
      }
    },

    // Calculate how far the text needs to indent
    calculateTextIndent : function() {
      return this.getWidth() - this.getContainerWidth();
    },

    // Use text length to determine animation durations
    calculateDuration: function() {
      if(this.settings.speed == 'fast') {
        return this.el.text().length * 42;
      } else if (this.settings.speed == 'slow') {
        return this.el.text().length * 105;
      } else {
        return this.el.text().length * 68;
      }
    },

    attachClipEffect: function() {
      if(this.settings.clipTechnique == 'ellipsis') {
        this.el.append('<span class="'+this.prefix+'-clip-ellipsis">...</span>')
      } else if(this.settings.clipTechnique == 'fade') {
        this.el.append('<span class="'+this.prefix+'-clip-fade-end">','<span class="'+this.prefix+'-clip-fade-start">');
        // this.el.addClass(this.prefix+'-clip-fade');
      }
    },

    // Attach the hover event
    attachEvent: function() {
      var that = this,
          duration = that.calculateDuration();
      this.getHoverTarget().hover(function() {
        applyActiveStyles(that.el, that.calculateTextIndent(), duration, that.settings.easing);
      }, function(completeTimeout) {
        removeActiveStyles(that.el, duration);
        window.clearTimeout(completeTimeout)
      });
    },

    // Roll Out!
    init: function() {
      if(this.getWidth() > this.getContainerWidth()) {
        this.attachClipEffect();
        this.attachEvent();
      }
    }

  });


  $.fn.scrollingText = function(options) {

    // Combine global settings and user settings
    var settings = $.extend({
      prefix: 'overflow-scroll',// To prevent naming collisions
      speed: 'medium',          // Speed in which you want the animation to run
      hoverElement: 'self',     // Element to hook the hover event to
      easing: 'ease-out',       // Easing function to use
      clipTechnique: 'fade',    // Technique to clip the end of the text
      fadeColor: '255,255,255', // In R,G,B format. Only used if clipTechnique is fade
      complete: null            // Placeholder for callback
    }, options);

    return this.each(function() {
      var scrollText = new ScrollText($(this), settings);
      scrollText.init();
      $(this).data("scrollText", scrollText);

      //window.scrollText = scrollText;
    })

  }
}(jQuery));
