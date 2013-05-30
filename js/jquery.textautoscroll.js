(function($){

	$.fn.scrollingText = function(options) {

		var settings = $.extend({
			duration: '3000',
			complete: null
		}, options)

		return this.each(function() {
			var scrollText = {
				el: $(this),
				elContainer: $(this).parent(),
				getElWidth: function() {
					return this.el.css('position','absolute').width()
				},
				getContainerWidth: function() {
					return this.elContainer.width()
				},
				attachHover: function() {
					var elToChange = this.el;
					this.elContainer.hover(function() {
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
			scrollText.init();
		})
	}
}(jQuery));