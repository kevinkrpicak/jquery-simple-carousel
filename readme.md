#jQuery-simple-carousel

##Description
**Author**: Kevin Krpicak <kevink@ydekproductions.com>
**Version**: 1.0


A simple carousel slideshow plugin I made for a friend not too long ago.
note: This was intended for webkit use only, but I also made it for firefox.


##Usage
Include jquery 1.8 and jquery.simple-carousel file.
Call simpleCarousel() on a jquery element.

```javacript
<script src="js/jquery.min.js"></script>
    <script src="js/jquery.simple-carousel.js"></script>

<script>
    $(function(){
        // use simpleCarousel plugin
        $('#slideshow').simpleCarousel({
            // user-defined class on the focused element
            focusedClass:'.my-focused-class',
            initCallback: function(){
                // Initial user-defined functions what carousel is being built.

                // example use
                this.$el.find('.play_button').on('click', function(e){
                    e.stopPropagation();
                    console.log('clicked play button on ', $(this).closest('.slideshow_item').text() );
                });
            },
            focusCallback:function(el){
                // User-defined callback for each element when brought into focus
                // el = the dom element in focus

                // example
                var id = $(el).data('someid');
                console.log('id', id);
            }
        });
    });
</script>
```

and now the dom.
```html
<section id="slideshow">
    <a href="#" class="prev">prev</a>
    <a href="#" class="next">next</a>
    <ul class="slideshow_list">
        <li class="slideshow_item" style="background:yellow;" data-someid="asf1">
            Item 1
            <a href="#" class="play_button">Play</a>
        </li>
        <li class="slideshow_item" style="background:red;" data-someid="asf2">
            Item 2
            <a href="#" class="play_button">Play</a>
        </li>
        <li class="slideshow_item" style="background:blue;" data-someid="asf3">
            Item 3
            <a href="#" class="play_button">Play</a>
        </li>
        <li class="slideshow_item" style="background:teal;" data-someid="asf4">
            Item 4
            <a href="#" class="play_button">Play</a>
        </li>
        <li class="slideshow_item" style="background:purple;" data-someid="asf5">
            Item 5
            <a href="#" class="play_button">Play</a>
        </li>
    </ul>
</section>
```

##License
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public Licensealong with this program.  If not, see <http://www.gnu.org/licenses/>.