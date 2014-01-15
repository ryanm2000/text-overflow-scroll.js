
(function($){

  var timer;

  var ScrollText = function(el, settings) {
    this.el = el;
    this.container = el.parent();
    this.settings = settings;
    this.prefix = settings.prefix;
  };

  ScrollText.prototype = $.extend({

    scrollStart: function(duration, textIndent) {
      var that = this,
          easing = that.settings.easing;
      // Set a timer for the same duration as the animation and fire scrollComplete
      timer = window.setTimeout(function() {
        that.scrollComplete();
      }, duration);
      // Set indentation styles
      that.el.css({
        'transition': 'text-indent ' + duration + 'ms ' + easing,
        'text-indent': (-textIndent) + 'px'
      }).addClass('is-scrolling');
    },

    scrollCancel: function(duration) {
      var that  = this;
      // Clear the timer
      window.clearTimeout(timer);
      // Reset styles
      that.el.css({
        'transition': (duration /3)  + 'ms',
        'text-indent': '0'
      }).removeClass('is-scrolling').removeClass('has-scrolled');
    },

    scrollComplete: function() {
      var that = this;
      // Set some different classes to differentiate the styling
      that.el.removeClass('is-scrolling').addClass('has-scrolled')
    },

    getWidth: function() {
      var calcWidth = this.el.css('position','absolute').width();
      this.el.css('position','relative');
      return calcWidth;
    },

    hasMargin: function() {
      return parseInt(this.el.css('marginLeft').replace('px','')) || parseInt(this.el.css('marginRight').replace('px',''));
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

    animations: {
      'css': {
        in: function() {
          console.log('css-1')
        },
        out: function() {
          console.log('css-2')
        }
      },
      'js': {
        in: function() {
          console.log('js-1')
        },
        out: function() {
          console.log('js-2')
        }
      }
    },

    modernAnimation: function(duration, textIndent) {
      var that = this;
      that.scrollStart(duration, textIndent);
    },
    modernAnimationReset: function(duration, textIndent) {
      that.scrollCancel(duration);
      window.clearTimeout(completeTimeout)
    },
    legacyAnimation: function(duration, textIndent) {
      var that = this;
      that.el.animate({ textIndent: - textIndent }, duration);
    },
    legacyAnimationReset: function(duration) {
      var that = this;
      that.el.animate({ textIndent: 0 }, duration);
    },

    animationMethod: function() {
      // Logic to determine whether to use CSS animations or the JS fallbacks
      var that = this;
      if(Modernizr.cssanimations) {
        return {
          'mouseenter': function() {that.animations.css.in()},
          'mouseleave': function() {that.animations.css.out()}
        }
      } else {
        return {
          'mouseenter': function() {that.animations.js.in()},
          'mouseleave': function() {that.animations.js.out()}
        }
      }
    },

    attachClipEffect: function() {
      if(this.settings.clipTechnique == 'ellipsis') {
        this.el.addClass(this.prefix+'-clip-ellipsis')
          .append('<span class="'+this.prefix+'-clip-ellipsis-end">...</span>')
      } else if(this.settings.clipTechnique == 'fade') {
        this.el.addClass(this.prefix+'-clip-fade')
          .append('<span class="'+this.prefix+'-clip-fade-end">','<span class="'+this.prefix+'-clip-fade-start">');
      }
    },

    // Attach the hover event
    attachEvent: function() {
      // Attach the mouse on and out events
      var that = this,
          duration = that.calculateDuration(),
          hoverTarget = that.getHoverTarget(),
          textIndent = that.calculateTextIndent(),
          animate = that.animationMethod();

      hoverTarget.hover(function() {
        animate['mouseenter']();
      }, function() {
        animate['mouseleave']();
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
      clipTechnique: 'ellipsis',// Technique to clip the end of the text
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
