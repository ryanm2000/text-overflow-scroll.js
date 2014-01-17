
(function($){

  var timer;

  var ScrollText = function(el, settings) {
    this.el = el;                   // Text element to be scrolled
    this.container = el.parent();   // ..and its parent
    this.settings = settings;       // User controlled settings
    this.prefix = settings.prefix;
    this.duration;                  // How long the scroll should last
    this.textIndent;                // How wide the text is
    this.hoverTarget;               // When this element is hovered, scroll
    this.timer;                     // Used to settimeout trigger a scrollComplete
  };

  ScrollText.prototype = $.extend({

    scrollStart: function() {
      var that = this,
          easing = that.settings.easing,
          duration = that.duration,
          textIndent = that.textIndent;
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

    scrollCancel: function() {
      var that  = this;
      // Clear the timer
      window.clearTimeout(timer);
      // Reset styles
      that.el.css({
        'transition': (that.duration /3)  + 'ms',
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
      var that = this;
      if(that.settings.speed == 'fast') {
        return that.el.text().length * 42;
      } else if (that.settings.speed == 'slow') {
        return that.el.text().length * 105;
      } else {
        return that.el.text().length * 68;
      }
    },

    animations: {
      'css': {
        in: function() {
          this.scrollStart();
        },
        out: function() {
          this.scrollCancel();
        }
      },
      'js': {
        in: function() {
          this.el.stop().animate({ textIndent: - this.textIndent }, this.duration, this.settings.easing, this.scrollCancel);
        },
        out: function() {
          this.el.stop().animate({ textIndent: 0 }, this.duration/3, this.settings.easing);
        }
      }
    },

    modernAnimation: function(duration, textIndent) {
      var that = this;
      that.scrollStart();
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

    animationMethod: function(duration, textIndent) {
      // Logic to determine whether to use CSS animations or the JS fallbacks
      var that = this;
      if(typeof Modernizr != 'undefined' && Modernizr.cssanimations) { // If modernizr is present and cssanims are available
        return {
          'mouseenter': function() {that.animations.css.in.call(that)}, // call passes in 'that' as the current 'this' context to give the animations access to the correct 'this' context
          'mouseleave': function() {that.animations.css.out.call(that)}
        }
      } else {
        return {
          'mouseenter': function() {that.animations.js.in.call(that)},
          'mouseleave': function() {that.animations.js.out.call(that)}
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
          animate = that.animationMethod(duration, textIndent);

      hoverTarget.hover(function() {
        animate['mouseenter']();
      }, function() {
        animate['mouseleave']();
      });
    },



    // Roll Out!
    init: function() {
      if(this.getWidth() > this.getContainerWidth()) {

        // Determine some values to be used later
        this.duration = this.calculateDuration(),
        this.hoverTarget = this.getHoverTarget(),
        this.textIndent = this.calculateTextIndent(),

        // Make it work
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
