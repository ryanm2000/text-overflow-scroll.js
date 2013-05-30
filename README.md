#Text Auto Scroll#

##What is it?##
A jQuery plugin that grabs a piece of single-line text, and on hover will scroll it so you can read it all. Pretty simple.

##How to use it##
Include a reference to the plugin file, then simple call:
    ```javascript
    $(function() {
        $(.autoscroll).scrollingText({duration: 2500});
    });

##Options##
At this time, there is only one option you can use here:
    ```javascript
    duration // Dictates the speed at which the scrolling animation happens.

