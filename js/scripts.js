$(document).ready(function () {
	$('.burger').click(function(e){
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");

        $('.menu-links').toggleClass('active');
        $('body').on('click', function (e) {
            var div = $('.menu-links, .burger');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('active');
            }
        });
    });

    $('.anchor[href^="#"]').click(function () {
        if($(window).innerWidth() <= 1000) {
           $('.menu-links').removeClass('active'); 
           $('.burger').removeClass('active');
        }
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-150;
        $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
        return false;
    });

    function OpenPopup(popupId) {
        $('body').removeClass('no-scrolling');
        $('.popup').removeClass('js-popup-show');
        popupId = '#' + popupId;
        $(popupId).addClass('js-popup-show');
        $('body').addClass('no-scrolling');
    }
    $('.pop-op').click(function (e) {
        e.preventDefault();
        let data = $(this).data('popup');
        OpenPopup(data);
    });
    function closePopup() {
        $('.js-close-popup').on('click', function (e) {
            e.preventDefault();
            $('.popup').removeClass('js-popup-show');
            $('body').removeClass('no-scrolling');
        });
    }
    closePopup();
    function clickClosePopup(popupId) {
        popupId = '#' + popupId;
        $(popupId).removeClass('js-popup-show');
        $('body').removeClass('no-scrolling');
    }

    function maskInit() {
        $(".phone-mask").inputmask({
            mask:"+7(999)999-99-99",
            "clearIncomplete": true
        });

        $(".card-mask").inputmask({
            mask:"9999-9999-9999-9999",
            "clearIncomplete": true
        });
    }
    maskInit();

    function checkValidate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    name: {
                        required: true 
                    },
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    message: {
                        required: true 
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    phone: '???????????????????????? ??????????',
                    email: '???????????????????????? e-mail'
                } 
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    }
    checkValidate();

    if($('.select').length > 1) {
        $('select').each(function() {
            let $this = $(this).not('.select-search');
            let parent = $(this).not('.select-search').parents('.select');
            $this.select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: parent
            });
        });
        $('.select-search').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                dropdownParent: parent
            });
        });
    } else {
        $('select').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
    }

    // ???????????????????????????? ????????????
    $('#restore-password .btn').click(function(e){
        e.preventDefault();
        if($('#restore-password form').valid()) {
            $('#restore-password .btn').addClass('disabled');
            $('.clock-text, .after-send').show();
            $('.before-send').hide();
            let dt = new Date();
            let time = dt.getFullYear() + '/' + (dt.getMonth()+1) + '/' + dt.getDate() + ' ' + dt.getHours() + ":" + (dt.getMinutes()+1) + ":" + dt.getSeconds();
            $('.clock').parent().show();
            $('.clock').countdown(time)
            .on('update.countdown', function(event) {
                $(this).html(event.strftime('%M:%S'));
            })
            .on('finish.countdown', function(event) {
                $(this).parent().hide();
                $('.after-send').hide();
                $('.before-send').show();
                $('#restore-password .btn').removeClass('disabled');
            });
        }
    });

    function openAccordion() {
        var wrap = $('.accordion-wrap');
        var accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
          var $this = $(this);
          var $parent = $(this).parent();
          var content = $this.next();

          if (content.is(':visible')) {
            $this.removeClass('active');
            $parent.removeClass('active');
            content.slideUp('fast');
          } else {
            $this.addClass('active');
            $parent.addClass('active');
            content.slideDown('fast');
          }

        });
    }
    openAccordion();

    $('.tab-trigger').click(function(){
        $('.tab-trigger').removeClass('active');
        var tab = $(this).data('tab');
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.tab-item').removeClass('active');
        $('.tab-item.' + tab).addClass('active');
    });

    function test() {
        let question_number = $('.test-question-wrapper.active').data('question');
        let question_result = 0;
        let answer_result = 0;

        $('.question-field').find('input[type="radio"]').on('click', function() {
            testBtnCheck();
        });

        $('.test-btn').on('click', function() {
            if(question_number <= 3) {
                answer_result = parseInt($('.test-question-wrapper.active .question-checkbox input:checked').val());
            } else {
                answer_result = parseInt($('.test-question-wrapper-area.active .question-area-field').val());
            }
            question_result = question_result + answer_result;

            $('.test-question-title[data-question="'+ question_number +'"]').removeClass('active');
            $('.test-question-wrapper[data-question="'+ question_number +'"]').removeClass('active');
            question_number = question_number+1;
            $(this).addClass('disabled');
            $('.test-question-title[data-question="'+ question_number +'"]').addClass('active');
            $('.test-question-wrapper[data-question="'+ question_number +'"]').addClass('active');

            if(question_number > 4) {
                let result_number = question_result;
                $('.test-form').hide();
                $('.test-result[data-result="'+ result_number +'"]').addClass('active');
            }
        });

        let question_area_result = 0;
        let answer_area_result = 0;

        $('.sort-element').on('click', function() {
            $('.sort-element').removeClass('click');
            $(this).addClass('click');

            if($('.sort-element').hasClass('click')) {
                $('.question-area').on('click', function() {
                    let question_area = $(this).data('area');
                    let question_area_click = $('.sort-element.click').data('area-click');
                    $(this).append($('.sort-element.click'));
                    $('.sort-element.click').removeClass('click');
                    if(question_area == question_area_click) {
                        answer_area_result = answer_area_result+1;
                    }
                    if(answer_area_result == 6) {
                        $('.question-area-field').val('1');
                        $('.test-btn').removeClass('disabled');
                    }
                    if($('.question-area-sort').find('.sort-element').length == 0) {
                        $('.test-btn').removeClass('disabled');
                    }

                    $('.question-area .sort-element').one('click', function() {
                        let question_area = $(this).parents('.question-area').data('area');
                        let question_area_click = $(this).data('area-click');
                        $('.question-area-sort').append($(this));
                        $(this).removeClass('click');
                        if(question_area == question_area_click) {
                            answer_area_result = answer_area_result-1;
                        }
                        if(answer_area_result < 6) {
                            $('.question-area-field').val('0');
                            $('.test-btn').addClass('disabled');
                        }
                    });
                });
            }
        });
    }

    test();

    function testBtnCheck() {
        if($('.question-field').find('input[type="radio"]').is(':checked')) {
            $('.test-btn').removeClass('disabled');
        }
    }

    if($('#video').length) {
        var overlay = document.getElementById('overlay');
        var vid = document.getElementById('video');

        if(overlay.addEventListener) {
            overlay.addEventListener("click", play, false)
        } else if(overlay.attachEvent) {
            overlay.attachEvent("onclick", play)
        }

        function play() { 
            if (vid.paused){
                vid.play(); 
                overlay.className = "o";
            }else {
                vid.pause(); 
                overlay.className = "";
            }
        }
    }

});

( function() {

    var youtube = document.querySelectorAll( ".youtube" );
    
    for (var i = 0; i < youtube.length; i++) {
        
        var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/maxresdefault.jpg";
        
        var image = new Image();
            image.src = source;
            image.addEventListener( "load", function() {
                youtube[ i ].appendChild( image );
            }( i ) );
    
            youtube[i].addEventListener( "click", function() {

                var iframe = document.createElement( "iframe" );

                    iframe.setAttribute( "frameborder", "0" );
                    iframe.setAttribute( "allowfullscreen", "" );
                    iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1&enablejsapi=1" );

                    this.innerHTML = "";
                    this.appendChild( iframe );
            } );    
    };
    
} )();