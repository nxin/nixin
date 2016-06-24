$(function() {

    /*$('.product').on("click", ".button--detail", function (e) {
        e.preventDefault();

        $.ajax({
            type: "GET",
            url: "detail.html",
            data: {},
            success: function (data) {
                console.log(data);
                $('#popup').html(data).show();
            }
        });
    });*/


    function init(target, target_type, custom_options) {

        var options = null;

        switch (target_type) {

            case 'single-image':

                options = {

                    type: 'image',
                    removalDelay: 300,
                    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    callbacks: {
                        beforeOpen: function () {
                            // just a hack that adds mfp-anim class to markup
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    },
                    midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                    image: {
                        verticalFit: true,
                        titleSrc: function (item) {
                            return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
                        }
                    }
                };

                break;

            case 'group-image':

                options = {

                    delegate: 'a',
                    type: 'image',
                    closeBtnInside: false,
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function () {
                            // just a hack that adds mfp-anim class to markup
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    },
                    closeOnContentClick: true,
                    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                };

                break;

            case 'group-inline':

                options = {

                    delegate: 'a',
                    closeBtnInside: true,
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function () {
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    },
                    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                };

                break;

            case 'gallery-image':

                options = {

                    type: 'image',
                    delegate: 'a:not(.trigger-content)', /* it delegate if is not trigger-content */
                    removalDelay: 300,
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    tLoading: '', // remove text from preloader
                    /* don't add this part, it's just to disable cache on image and test loading indicator */
                    callbacks: {
                        beforeChange: function () {
                            this.items[0].src = this.items[0].src + '?=' + Math.random();
                        },
                        beforeOpen: function () {

                            // just a hack that adds mfp-anim class to markup
                            /*this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');*/
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    },
                    midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                    image: {
                        verticalFit: true,
                        titleSrc: 'title' // Attribute of the target element that contains caption for the slide.
                        // Or the function that should return the title. For example:
                        // titleSrc: function(item) {
                        //   return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                        // }
                        //
                    },
                    gallery: {
                        enabled: true, // set to true to enable gallery

                        preload: [0, 2], // read about this option in next Lazy-loading section

                        navigateByImgClick: true,

                        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

                        tPrev: 'Previous (Left arrow key)', // title for left button
                        tNext: 'Next (Right arrow key)' // title for right button
                        // tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
                    }
                };

                break;

            case 'with-alert':

                options = {

                    type: 'inline',
                    callbacks: {
                        open: function () {

                            // this part overrides "close" method in MagnificPopup object
                            $.magnificPopup.instance.close = function () {

                                if (!confirm('Are you sure?')) {
                                    return;
                                }

                                // "proto" variable holds MagnificPopup class prototype
                                // The above change that we did to instance is not applied to the prototype,
                                // which allows us to call parent method:
                                $.magnificPopup.proto.close.call(this);

                            };
                            // you may override any method like so, just note that it's applied globally

                        }
                    }
                };

                break;

            case 'hinge':

                options = {

                    mainClass: 'mfp-with-fade',
                    removalDelay: 1000, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeClose: function () {
                            this.content.addClass('hinge');
                        },
                        close: function () {
                            this.content.removeClass('hinge');
                        }
                    },
                    midClick: true
                };

                break;

            case 'iframe':

                options = {
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: true,
                    fixedContentPos: false
                };

                break;

            default:

                options = {
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false
                };

        }

// set custom options
        if (custom_options !== undefined) {

            options = $.extend(options, custom_options);
        }

// Eccezione
        if (target_type === 'gallery-inline') {

            target.click(function () {

                var items = [];
                $($(this).attr('href')).find('.popup-content').each(function () {
                    items.push({
                        src: $(this)
                    });
                });

                $.magnificPopup.open({
                    items: items,
                    gallery: {
                        enabled: true
                    }
                });
            });
        }

        else {
            target.magnificPopup(options);
        }

    }


    function open(target, custom_options) {

        var options = {
            items: {
                src: $(target),
                type: 'inline'
            }
        };

        if (custom_options !== undefined) {

            options = $.extend(options, custom_options);
        }

        $.magnificPopup.open(options);
    }

    function close(target, custom_options) {

        var options = {
            items: {
                src: $(target),
                type: 'inline'
            }
        };

        if (custom_options !== undefined) {

            options = $.extend(options, custom_options);
        }

        $.magnificPopup.close(options);
    }


    $('.product').on('click', ".js-button--detail", function (e) {
        e.preventDefault();

        open('.js-popup--detail');

        $carouselPopup = $(".js-carousel--popup");

        $carouselPopup.find(".js-carousel__items").slick({
            autoplay: false,
            autoplaySpeed: 2000,
            dots: true,
            infinite: false,
            speed: 200,
            slidesToShow: 9,
            slidesToScroll: 9,
            variableWidth: false,
            lazyLoad: 'ondemand',
            cssEase: 'ease-in-out',
            mobileFirst: true,
            centerMode: false,
            prevArrow: $carouselPopup.find(".js-carousel__prev"),
            nextArrow: $carouselPopup.find(".js-carousel__next"),
            responsive: [
                {
                    breakpoint: 0,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false
                    }
                },
                {
                    breakpoint: 321,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: false
                    }
                },
                {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 1281,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5
                    }
                },
                {
                    breakpoint: 1921,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5
                    }
                }
            ]
        });

    });


});