(function($){

	$.fn.scrollingText = function(options) {

		// Combine global settings and user settings
		var settings = $.extend({
			speed: 'medium',					// Speed in which you want the animation to run
			hoverElement: 'self',			// Element to hook the hover event to
			easing: 'ease-out',				// Easing function to use
			clipTechnique: 'fade',// Technique to clip the end of the text
			complete: null						// Placeholder for callback
		}, options);

		// Apply styles to animate and text indent the text
		var applyActiveStyles = function(elToChange, textIndent, duration) {
			elToChange.css({
				'transition': 'text-indent ' + duration + 'ms ' + settings.easing,
				'text-indent': - textIndent + 'px'
			}).addClass('active');
		}

		// Reset/remove previously added styles
		var removeActiveStyles = function(elToChange, duration) {
			elToChange.css({
				'transition': duration /3  + 'ms',
				'text-indent': '0'
			}).removeClass('active');
		}

		return this.each(function() {
			var scrollText = {
				el: $(this),
				elContainer: $(this).parent(),
				// Get the width of the scrolling element
				getElWidth: function() {
					calcWidth = this.el.css('position','absolute').width();
					this.el.css('position','relative');
					return calcWidth;
				},
				// Get the width of the direct parent of the scrolling element
				getContainerWidth: function() {
					return this.elContainer.width()
				},
				// Determine which element will receive the hover event
				getHoverTarget: function() {
					if(settings.hoverElement == 'parent') {
						return this.elContainer;
					} else {
						return this.el;
					}
				},
				// Calculate how far the text needs to indent
				calculateTextIndent : function() {
					return this.getElWidth() - this.getContainerWidth();
				},
				calculateDuration: function() {
					if(settings.speed == 'fast') {
						return this.el.text().length * 42;
					} else if (settings.speed == 'slow') {
						return this.el.text().length * 105;
					} else {
						return this.el.text().length * 68;
					}
				},
				attachClipEffect: function() {
					if(settings.clipTechnique == 'ellipsis') {
						this.el.append('<span class="autoscroll-clip-ellipsis">...</span>')
					} else if(settings.clipTechnique == 'fade') {
						this.el.addClass('autoscroll-clip-fade');
					}
				},
				// Attach the hover event
				attachEvent: function() {
					this.getHoverTarget().hover(function() {
						applyActiveStyles(scrollText.el, scrollText.calculateTextIndent(), scrollText.calculateDuration());
						}, function() {
							removeActiveStyles(scrollText.el, scrollText.calculateDuration());
						});
				},
				// Roll Out!
				init: function() {
					if(this.getElWidth() > this.getContainerWidth()) {
						this.attachClipEffect();
						this.attachEvent();
					}
				}
			}
			scrollText.init();
			window.scrollText = scrollText;
		})

	}
}(jQuery));