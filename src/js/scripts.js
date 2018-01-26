(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    // Bio Expander
    (function(global, factory){
  		    if ( typeof define === 'function' && define.amd ) {
  		       define(['jquery'], factory);
  		    }
  		    else {
  		       factory(jQuery);
  		    }
    		})(this, function($) {
    		    var defaultSettings = {
    		        prefix: "imagelistexpander-"
    		    };
			      var wherewewere;
    		    var waitForFinalEvent = (function () {
    		        var timer = null;
    		        return function (callback, uniqueId) {
    		            if (timer) {
    		                clearTimeout(timer);
    		            }
    		            timer = setTimeout(callback, 500);
    		        };
    		    })();
		        var imageListExpander = function(list, _settings) {
		            var settings = $.extend({}, defaultSettings, _settings),
		                $list = $(list),
		                $items = $list.find('.'+ settings.prefix +'item'),
		                $trigger = $list.find('.'+ settings.prefix +'trigger'),
		                $closeTrigger = $list.find('.'+ settings.prefix +'trigger-close'),
        		        initialize = function() {
        		            $(window).bind('resize', resizeWindow);
        		            $trigger.bind('click', clickItem);
        		            $closeTrigger.bind('click', clickCloseTrigger);
        		        },
        		        resizeWindow = function() {
        		            waitForFinalEvent(function() {
        		                $items.filter('.active').each(function() {
        		                    var
        		                    $item = $(this),
        		                    $expanderContents = $item.find('.'+ settings.prefix +'expander-contents'),
        		                    $expander = $item.find('.'+ settings.prefix +'expander'),
        		                    expanderHeight = $expanderContents.outerHeight();

        		                    $item.css(
      		                        'height',
      		                        $item.find('.' + settings.prefix + 'contents').outerHeight() + expanderHeight);

        		                    $expander.css('max-height', expanderHeight);
        		                });
        		            });
        		        },
        		        clickItem = function() {
        		            var $item = $(this).parents('.'+ settings.prefix +'item');

        		            if ($item.hasClass('active')) {
        		                hideItems($item);
        		            } else {
        		                showItem($item);

                            $('.expander-michael').removeClass("shown");
                            $('.expander-david').removeClass("shown");

                						setTimeout(function(){
                							var gohere = $('.gallery-items').find('.active');

                							// if (Modernizr.mq('only all and (max-width: 768px)')) {
                              if ($(window).width() < 768) {
                								// console.log("smaller");
                								$('html, body').animate({
                									scrollTop: gohere.offset().top+200
                								}, 500);
                							} else{
                								// console.log("larger");
                								$('html, body').animate({
                									scrollTop: gohere.offset().top+400
                								}, 500);
                							}

                							wherewewere = $($item).offset().top-100;
                						}, 500);

                      }
        		        },
        		        clickCloseTrigger = function() {
        		            hideItems($items);
              					$('html, body').animate({
              						scrollTop: wherewewere
              					}, 500);
                    },
		                showItem = function($item) {

		                    hideItems($item.siblings());

		                    var $expanderContents = $item.find('.'+ settings.prefix +'expander-contents'),
		                        $expander = $item.find('.'+ settings.prefix +'expander'),
                            expanderHeight = $expanderContents.outerHeight();

        		            $item.addClass('active').css(
        		                'height',
        		                $item.find('.' + settings.prefix + 'contents').outerHeight() + expanderHeight + 60);

                        $expander.css('max-height', expanderHeight);
        		        },
        		        hideItems = function($targetItems) {
					              //console.log("hide");
		                    $targetItems = $targetItems.filter('.active');

		                    var $expanders = $targetItems.find('.'+ settings.prefix +'expander');

        		            $targetItems.each(function() {
        		                var $item = $(this);
        		                $item.css(
        		                    'height',
        		                    $item.find('.' + settings.prefix + 'contents').outerHeight()
        		                );
        		            });


        		            $targetItems.removeClass('active');
        		            $expanders.css('max-height', 0);

        		        };

		            initialize();
		        };

    		    $.fn.imagelistexpander = function(settings) {
    		        $(this).each(function() {
    		            imageListExpander(this, settings || {});
    		        });
    		    };

  		    return $;
    		});

        $('.gallery-items').imagelistexpander({
	        prefix: "gallery-"
  	    });

  });

})(jQuery, window, document);
