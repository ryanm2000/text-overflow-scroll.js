Text Auto Scroll
=================

What is it?
A jQuery plugin that grabs a piece of single-line text, and on hover will scroll it so you can read it all. Pretty simple.


How to use it
-----------------

Include a reference to the plugin file, then simple call:
 > $(function() {
 >     $('.autoscroll').scrollingText({duration: 2500});
 > });
NOTE: As this is a v0.1, it currently only works in webkit based browsers.


Options
-----------------

At this time, there is only one option you can use here:
 > duration // Dictates the speed at which the scrolling animation happens.

