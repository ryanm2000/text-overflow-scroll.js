(function($){

	$.fn.scrollingText = function(options) {

		// Combine global settings and user settings
		var settings = $.extend({
			duration: '3000',					// Duration of animation in milliseconds
			hoverElement: 'self',			// Element to hook the hover event to
			easing: 'ease-in-out',		// Easing function to use
			complete: null						// Placeholder for callback
		}, options);

		// Apply styles to animate and text indent the text
		var applyActiveStyles = function(elToChange, textIndent) {
			elToChange.css({
				'transition': 'text-indent ' + settings.duration + 'ms ' + settings.easing,
				'text-indent': - textIndent + 'px'
			});
		}

		// Reset/remove previously added styles
		var removeActiveStyles = function(elToChange) {
			elToChange.css({
				'transition': settings.duration /2  + 'ms',
				'text-indent': '0'
			})
		}

		return this.each(function() {
			var scrollText = {
				el: $(this),
				elContainer: $(this).parent(),
				// Get the width of the scrolling element
				getElWidth: function() {
					calcWidth = this.el.css('position','absolute').width();
					this.el.css('position','static');
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
				// Attach the hover event
				attachEvent: function() {
					this.getHoverTarget().hover(function() {
						applyActiveStyles(scrollText.el, scrollText.calculateTextIndent());
						}, function() {
							removeActiveStyles(scrollText.el);
						});
				},
				// Roll Out!
				init: function() {
					if(this.getElWidth() > this.getContainerWidth()) {
						this.attachEvent();
					}
				}
			}
			scrollText.init();
		})

	}
}(jQuery));