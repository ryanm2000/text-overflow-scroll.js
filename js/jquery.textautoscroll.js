(function($){

	$.fn.scrollingText = function(options) {

		// Combine global settings and user settings
		var settings = $.extend({
			duration: '3000',
			hoverElement: 'self',
			easing: 'ease-in-out',
			complete: null
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
				'duration': settings.duration/4  + 'ms',
				'text-indent': '0'
			})
		}

		return this.each(function() {
			var scrollText = {
				el: $(this),
				elContainer: $(this).parent(),
				getElWidth: function() {
					calcWidth = this.el.css('position','absolute').width();
					this.el.css('position','static');
					return calcWidth;
				},
				getContainerWidth: function() {
					return this.elContainer.width()
				},
				getHoverTarget: function() {
					if(settings.hoverElement == 'parent') {
						return this.elContainer;
					} else {
						return this.el;
					}
				},
				calculateTextIndent : function() {
					return this.getElWidth() - this.getContainerWidth();
				},
				attachHover: function() {
					this.getHoverTarget().hover(function() {
						applyActiveStyles(scrollText.el, scrollText.calculateTextIndent());
						}, function() {
							removeActiveStyles(scrollText.el);
						});
				},
				init: function() {
					if(this.getElWidth() > this.getContainerWidth()) {
						this.attachHover();
					}
				}
			}
			window.scrollText = scrollText;
			scrollText.init();
		})

	}
}(jQuery));