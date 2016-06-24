$(function() {

    $(".js-carousel").each(function(){

        var $this = $(this);
        var slick = $this.find(".js-carousel__items").slick({
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
            prevArrow: $this.find(".js-carousel__prev"),
            nextArrow: $this.find(".js-carousel__next"),
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
                        slidesToShow: 6,
                        slidesToScroll: 6
                    }
                },
                {
                    breakpoint: 1921,
                    settings: {
                        slidesToShow: 9,
                        slidesToScroll: 9
                    }
                }
            ]
        });

    });

});