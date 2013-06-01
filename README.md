Text Auto Scroll
=================

What is it?
-----------------
A jQuery plugin that grabs a piece of single-line text, and on hover will scroll it so you can read it all. Pretty simple.

Here is an example: https://dl.dropboxusercontent.com/u/24880508/TextAutoScroller/demo.html


How to use it
-----------------
Include a reference to the plugin file, then simple call:
 > ```javascript
 > $(function() {
 >     $('.autoscroll').scrollingText();
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
 > speed				// 'slow', 'medium', or 'fast' - Speed in which you want the animation to run
 > hoverElement		// 'self' or 'parent' - Determines which element the hover even gets attached to
 > easing					// 'linear', 'ease-in-out', etc.  - Easing function

