Text-overflow-scroll.js
=======================

What is it?
-----------------
A jQuery plugin that grabs a single line of text, and on hover will scroll it so you can read it all. Pretty simple.

Here is an example: https://dl.dropboxusercontent.com/u/24880508/TextAutoScroller/demo.html

Dependencies
-----------------
- jQuery
- Modernizr (Will work without it, but wont use CSS3 transitions)


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
- Internet Explorer 8+ (In progress)


Options
-----------------
 > ```javascript
 > prefix: 'overflow-scroll',  // To prevent naming collisions
 > speed: 'medium',            // Speed in which you want the animation to run
 > hoverElement: 'self',       // Element to hook the hover event to
 > easing: 'ease-out',         // Easing function to use
 > clipTechnique: 'ellipsis'   // Technique to clip the end of the text

