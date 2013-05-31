(function($){

	$.fn.scrollingText = function(options) {

		var settings = $.extend({
			duration: '3000',
			hoverElement: 'self',
			complete: null
		}, options)

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
				getHoverElement: function() {
					if(settings.hoverElement == 'parent') {
						return this.elContainer;
					} else {
						return this.el;
					}
				},
				attachHover: function() {
					var elToChange = this.el;
					this.getHoverElement().hover(function() {
						elToChange.css({
								'-webkit-transition-property': 'text-indent',
								'-webkit-transition-duration': settings.duration + 'ms',
								'text-indent': -(scrollText.getElWidth() - scrollText.getContainerWidth()) + 'px'
							})
						}, function() {
							elToChange.css({
								'-webkit-transition-duration': settings.duration/4  + 'ms',
								'text-indent': '0'
							})
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