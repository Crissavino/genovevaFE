// setTimeout(() => {
    (function ($) {
        if ($.fn.owlCarousel) {
            $('.popular-products-slides').owlCarousel({
                items: 4,
                margin: 30,
                // loop: true,
                nav: false,
                dots: false,
                autoplay: true,
                autoplayTimeout: 5000,
                smartSpeed: 1000,
                responsive: {
                    0: {
                        items: 1
                    },
                    576: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    }
                }
            });
            // }, 1000);
            // setTimeout(() => {
            $('.product_thumbnail_slides').owlCarousel({
                items: 1,
                margin: 0,
                // loop: true,
                nav: true,
                navText: ["<img src='assets/template/img/core-img/long-arrow-left.svg' style='z-index: 10;' alt=''>", "<img src='assets/template/img/core-img/long-arrow-right.svg' alt=''>"],
                dots: false,
                autoplay: true,
                autoplayTimeout: 3000,
                smartSpeed: 1000
            });
        }
    })(jQuery);
// }, 1000);
