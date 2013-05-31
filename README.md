Text Auto Scroll
=================

What is it?
-----------------
A jQuery plugin that grabs a piece of single-line text, and on hover will scroll it so you can read it all. Pretty simple.

Here is an example:


How to use it
-----------------
Include a reference to the plugin file, then simple call:
 > ```javascript
 > $(function() {
 >     $('.autoscroll').scrollingText({duration: 2500});
 > });


Browser Support
-----------------
- Chrome 26+
- Firefox 16+
- Opera 12.1+
- Internet Explorer 10+


Options
-----------------
 > ```javascript
 > duration				// Integer in milliseconds - Dictates the speed at which the scrolling animation happens.
 > hoverElement		// 'self' or 'parent' - Determines which element the hover even gets attached to

