function update_flyoutcart() {
    jQuery.ajax({
        url: '/frontapi.asp',
        dataType: 'json',
        type: 'GET',
        cache: false,
        data: {
            module: 'cartajax',
        },
        success: function (data) {
            if (data.ItemsInCart != undefined) {
                if (data.ItemsInCart.length > 0) {
                    jQuery('#floating-cart').fadeIn(300);
                }
            }
        },
        error: function (objError) {
            //alert('Error');
            return;
        }
    });
}

function addcart_callback(productDiv, data) {
    jQuery(productDiv).addClass('ajaxcart-complete');
    setTimeout(function () { jQuery(productDiv).removeClass('ajaxcart-complete'); }, 1000);

    var itemsInCart = 0;
    var subtotal = 0;

    jQuery(data.ItemsInCart).each(function (index, item) {
        itemsInCart += item.qty;
        subtotal += (item.price * item.qty);
    });
	//minicart - subtotal
    subtotal = subtotal.toFixed(jQuery('body').data('decimal'));
    jQuery('.minicart-items').text(itemsInCart);
    update_flyoutcart();

    var currency = jQuery('body').data('currency');
    jQuery('.minicart-subtotal').text(currency + subtotal);
   
}

function mailinglist_callfront(form) {
    jQuery(form).find('.mailinglist-input').prop('disabled', true);
    jQuery(form).find('.mailinglist-submit').prop('disabled', true);
    jQuery(form).find('#mailing-btn-txt').addClass('hidden');
    jQuery(form).find('#mailing-btn-load').removeClass('hidden');

    jQuery('#mailinglist-response').slideUp(300);
    jQuery('#mailinglist-response div').addClass('hidden');
}

function mailinglist_response(form, response) {

    jQuery(form).find('.mailinglist-input').prop("disabled", false);
    jQuery(form).find('.mailinglist-submit').prop("disabled", false);


    if (response == 1 || response == 3) {
        jQuery('#mailinglist-response .mailinglist-subscribed').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
    }
    else if (response == -1) {
        jQuery('#mailinglist-response .mailinglist-unsubscribed').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
    }
    else if (response == 2) {
        jQuery('#mailinglist-response .mailinglist-error').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
    }

    jQuery(form).find('#mailing-btn-txt').removeClass('hidden');
    jQuery(form).find('#mailing-btn-load').addClass('hidden');

}

function moveMenu() {
    var respWidth = window.innerWidth;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari/") !== -1 && ua.indexOf("chrom") === -1) {
        respWidth = jQuery(window).width();
    }

    if (respWidth < 767) {
        jQuery('#menulinks').appendTo('#mobile-menulinks');
        jQuery('#categories').appendTo('#mobile-categories');
        jQuery('.site-header .search-form-col').insertBefore('.site-header .right-header');
        
    }
    else {
        jQuery('#menulinks').appendTo('#menulinks-outer');
        jQuery('#categories').appendTo('#navbar');
        jQuery('.site-header .search-form-col').insertBefore('.site-header .logo-holder');
    }

    if (respWidth < 1024) {
        jQuery('#navbar').appendTo('.tablet-cat-menu');
    }
    else {
        jQuery('#navbar').appendTo('.navbar.navbar-inverse');
    }
}

jQuery(document).ready(function () {
	
	jQuery(".logo").clone().appendTo(".footer-logo-img");

    update_flyoutcart();

    jQuery('#mobile-menu-trigger').click(function (e) {
        e.preventDefault();

        jQuery('#mobile-menu').show(0, function () {
            jQuery('body').addClass('menu-open');
        });
    });

    jQuery('.mobile-menu-close').click(function (e) {
        e.preventDefault();

        jQuery('body').removeClass('menu-open');
        setTimeout(function () {
            jQuery('#mobile-menu').hide(0);
        }, 250);
    });


    var respWidth = window.innerWidth;
    if (respWidth >= 767) {
    	jQuery('.navbar .dropdown').hover(function () {
    		jQuery(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown('fast');

    	}, function () {
    		jQuery(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp('fast');

    	});
		
		jQuery('.header-cat').hover(function () {
			jQuery('.head-cat-dropdown').slideDown();

		}, function () {
			jQuery('.head-cat-dropdown').slideUp();

		});

    	jQuery('.navbar .dropdown > a').click(function () {
    		location.href = this.href;
    	});
    }

});

jQuery(window).load(function () {
    moveMenu();
});
jQuery(window).resize(function () {
    moveMenu();
});

jQuery(function ($) {
	$('.navbar .dropdown').hover(function () {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();

	}, function () {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();

	});
	
	$('.header-cat').hover(function () {
		$('.head-cat-dropdown').slideDown();

	}, function () {
		$('.head-cat-dropdown').slideUp();

	});

	$('.navbar .dropdown > a').click(function () {
		location.href = this.href;
	});

});


jQuery(document).ready(function(){

    jQuery(".subcat-dropdown").click(function(){
        jQuery(this).siblings(".dropdown-menu").toggle();
    });

    jQuery("#contn-shopping").click(function(){
        jQuery(".c-menu__close").click();
    });
    
    $('.cart-icon').hover(function () {
        $(this).find('.viewcart-dropdown').first().stop(true, true).delay(0).fadeIn();

    }, function () {
        $(this).find('.viewcart-dropdown').first().stop(true, true).delay(100).fadeOut();

    });

    
    jQuery(".cart-icon").hover(function(){
        
    setTimeout(function(){ 

    jQuery.ajax({
        url: '/frontapi.asp?module=cartajax',
        success: function (data) {
            var obj = JSON.parse(data);
            if(typeof obj.ItemsInCart === 'undefined'){
                return;
            }
            var cartHolderOpen = "<div class='col-group prod-item'>";
            var cartHolder = "</div>";


            var cartImageOpen = "<div class='dd-cart-img'>";
            var cartNameOpen = "<div class='dd-cart-name'>";
            var cartQtyOpen = "<div class='dd-cart-qty'> <div class='dd-cart-dd'>Qty</div><div class='dd-cart-dt'>";
            var cartPriceOpen = "<div class='dd-cart-price'><div class='dd-cart-dd'>Price</div><div class='dd-cart-dt'>";

            jQuery(".cart-dd-checkout").find('.prod-item').remove();

            for(x = 0; x < obj.ItemsInCart.length; x++){
                var structure = cartHolderOpen + cartImageOpen + "<img src='" + obj.ItemsInCart[x].thumbnail + "'>" + cartHolder + cartNameOpen + obj.ItemsInCart[x].name + cartHolder + cartQtyOpen + obj.ItemsInCart[x].qty + cartHolder + cartHolder + cartPriceOpen + "$" + obj.ItemsInCart[x].price + cartHolder + cartHolder + cartHolder;

                jQuery(structure).prependTo(".cart-dd-checkout");

            }

        }
    });
    
    }, 0);  
        
    });
});


    
//grab an empty div to get mini cart format
var baseItem = $('.cart-item0');
jQuery('#open-cart').click(function(e) {
    updatecart_callback();
});

function updatecart_callback() {
    setTimeout(function() {
        jQuery.ajax({
            url: '/frontapi.asp?module=cartajax',
            success: function(data) {
                console.log(data)
                var obj = JSON.parse(data);
                console.log(obj.ItemsInCart);
                var totalItems = obj.ItemsInCart.length;
                //var cartHolderOpen = "<div class='col-group prod-item'>";
                //var cartHolder = "</div>";
                jQuery('.cart-items-container').empty();
                //build cart containers for each item in list
                for (var x = 0; x < totalItems; x++) {
                    jQuery(baseItem).clone().addClass('cart-item').appendTo('ul.cart-items .cart-items-container');
                }
                //replace empty containers with cart data
                for (var z = 0; z < totalItems; z++) {
                    //var cartImage = obj.ItemsInCart[x].thumbnail;
                    var cartName = obj.ItemsInCart[z].name;
                    var cartQty = obj.ItemsInCart[z].qty;
                    var cartPrice = obj.ItemsInCart[z].price;
                    jQuery('.cart-item:eq(' + z + ') .item-fullname').html(cartName);
                    jQuery('.cart-item:eq(' + z + ') .item-qty').html(cartQty);
                    jQuery('.cart-item:eq(' + z + ') .item-price').html(cartPrice);
                }
            }
        });
    }, 300);
}

/* animations */

function initAnimations() {

    
    var waypoints = jQuery('.tc-animate-me').waypoint({
        handler: function(direction) {
            if(window.innerWidth < 1200) return;
            element = jQuery(this.element);
            var animateClass = jQuery(element).data('animation');
            jQuery(element).addClass('animated '+animateClass);
        },
        offset: '80%'
    });

}
jQuery(document).ready(function(e) {
    initAnimations();
});
jQuery(window).resize(function(e) {
    initAnimations();
});