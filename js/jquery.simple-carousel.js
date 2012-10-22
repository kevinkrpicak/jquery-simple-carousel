/*
 * jQuery simple-carousel plugin
 * v1.0
 *
 * author Kevin Krpicak
 *
 */

(function($){
    $.fn.simpleCarousel = function(options){

        // Create some defaults, extending them with any options that were provided
        var settings = $.extend({
            'focusedClass': '',
            'previousButton': '.prev',
            'nextButton': '.next',
            // keep the following in css for now
            // 'offsetOneScale': 0.79,
            // 'offsetTwoScale': 0.65,
            // 'offsetOneTranslateX': '197px',
            // 'offsetTwoTranslateX': '400px',
            initCallback:function(){},
            focusCallback: function(el){}
        }, options);

        return this.each(function(){
            var self = this;
            var main = function(){
                this.init();
            };

            var px = function(num){
                return num + "px";
            };

            var clip = function(string, prefix){
                return string.replace(prefix, "");
            };

            main.prototype = {
                el: self,
                $el: $(self),
                listParentClass:        'slideshow_list',
                itemClass:              'slideshow_item',
                activeClass:            'simple-carousel-focused',
                offsetLeftOneClass:     'simple-carousel-offset-left-1',
                offsetLeftTwoClass:     'simple-carousel-offset-left-2',
                offsetRightOneClass:    'simple-carousel-offset-right-1',
                offsetRightTwoClass:    'simple-carousel-offset-right-2',

                index: 0,
                interval: null,
                n: 0,

                init:function(){
                    var self = this;

                    this.$listParent = this.$el.find('.'+this.listParentClass).eq(0);
                    this.$items = this.$el.find('.'+this.itemClass);
                    this.addCSS();
                    this.n = this.$items.length;

                    // previous, next buttons
                    this.$prev = this.$el.find(settings.previousButton);
                    this.$next = this.$el.find(settings.nextButton);

                    this.events();

                    // get things rolling
                    this.run();

                    // user-defined init
                    settings.initCallback.apply(this);
                },

                addCSS:function(){
                    this.$el.css({
                        'overflow': 'hidden',
                        'position': 'relative'
                    });
                    this.$listParent.css({
                        'position': 'relative',
                        'height': px(this.$items.height())
                    });
                    this.$items.css({
                        'position': 'absolute',
                        'top': '50%',
                        'left': '50%',
                        'margin-top': '-' + px(this.$items.height()/2),
                        'margin-left': '-' + px(this.$items.width()/2),
                        '-moz-transition': '-moz-transform 0.3s ease-out, z-index 0.25s ease-out',
                        '-webkit-transition': '-webkit-transform 0.3s ease-out, z-index 0.25s ease-out'
                    });
                },

                run:function(){
                    this.$items.eq(this.index).click();
                },

                events:function(){
                    var self = this;
                    this.$items.on('click', function(){
                        self.setFocus(this, $(this).index(), self.$items);
                    });

                    if(this.$prev.length && this.$next.length){
                        this.$prev.on('click', function(e){
                            e.preventDefault();
                            self.setFocus(null, self.getIndex(self.index, '-1'), self.$items);
                        });
                        this.$next.on('click', function(e){
                            e.preventDefault();
                            self.setFocus(null, self.getIndex(self.index, '+1'), self.$items);
                        });
                    }
                },

                getIndex:function(index, offset){
                    switch(offset){
                        case '-2':
                            switch(index){
                                case 1: index = this.n-1; break;
                                case 0: index = this.n-2; break;
                                default: index -= 2; break;
                            }
                        break;
                        case '-1':
                            if(index === 0){
                                index = this.n-1;
                            }else{
                                index--;
                            }
                        break;
                        case '+1':
                            if(index === this.n-1){
                                index = 0;
                            }else{
                                index++;
                            }
                        break;
                        case '+2':
                            switch(index){
                                case this.n-2: index = 0; break;
                                case this.n-1: index = 1; break;
                                default: index += 2; break;
                            }
                        break;
                    }

                    return index;
                },

                setFocus:function(el, index, $list){
                    this.index = index;
                    if(!el){
                        el = this.$el.find('.'+this.itemClass)[this.index];
                    }

                    var classes;

                    classes = [
                        clip(settings.focusedClass, "."),
                        this.activeClass,
                        this.offsetLeftOneClass,
                        this.offsetLeftTwoClass,
                        this.offsetRightOneClass,
                        this.offsetRightTwoClass
                    ].join(" ");
                    // remove all classes
                    $list.removeClass(classes);

                    // append classes
                    // maybe find a better way for this?
                    $list.eq(this.getIndex(index, '-1')).addClass(this.offsetLeftOneClass);
                    $list.eq(this.getIndex(index, '+1')).addClass(this.offsetRightOneClass);

                    if(this.n > 3){
                        $list.eq(this.getIndex(index, '-2')).addClass(this.offsetLeftTwoClass);
                        $list.eq(this.getIndex(index, '+2')).addClass(this.offsetRightTwoClass);
                    }

                    if(settings.focusedClass.length){
                        classes = [
                            clip(settings.focusedClass, "."),
                            this.activeClass
                        ].join(" ");
                    }else{
                        classes = this.activeClass;
                    }
                    $(el).addClass(classes);

                    // user defined callback
                    settings.focusCallback.apply(this, [el]);
                }
            };

            new main();

        }); // end of this.each

    };
})(jQuery);