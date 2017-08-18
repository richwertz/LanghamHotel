$(function() {
  'use strict';
  var topoffset = 38;
  
  var isTouch = 'ontouchstart' in document.documentElement;
  
  /////////////////
  //window height//
  /////////////////
  
  var wheight = $(window).height(); //get height of the window

  $('.fullheight').css('height', wheight);
  
  $(window).resize(function() {
    var wheight = $(window).height();
    $('.fullheight').css('height', wheight);
 }); //on resize

//////////////////////
//Animated Scrolling//
//////////////////////
  
// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
	// On-page links
	if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
		// Figure out element to scroll to
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		// Does a scroll target exist?
		if (target.length) {
			// Only prevent default if animation is actually gonna happen
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top - topoffset + 1
			}, 1000, function() {
				// Callback after animation
				// Must change focus!
				var $target = $(target);
				$target.focus();
				if ($target.is(':focus')) { // Checking if the target was focused
					return false;
				} else {
					$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
					$target.focus(); // Set focus again
				}
			});
		}
	}
});

////////////////////////
//highlight navigation//
////////////////////////

$(window).scroll(function() {
	var windowpos = $(window).scrollTop() + topoffset;
	$('nav li a').removeClass('active');
	
	if (windowpos > $('#hotelinfo').offset().top) {
		//check to see if the position of the window is past a certain element
		//checking the position of every object from the top
		$('nav li a').removeClass('active');
		//and if the position of the current window is bigger than that,
		//then make sure to remove any other elements that have been highlighted
		//so if you go to the second nav link, then remove the highlight from the first one
		$('a[href$="#hotelinfo"]').addClass('active');
		//find the element with an href of #hotelinfo- the class we're checking
		//and then add the class of active
	} //windowpos #hotelinfo
	
	if (windowpos > $('#rooms').offset().top) {
		$('nav li a').removeClass('active');
		$('a[href$="#rooms"]').addClass('active');
	} //windowpos #rooms

	if (windowpos > $('#dining').offset().top) {
		$('nav li a').removeClass('active');
		$('a[href$="#dining"]').addClass('active');
	} //windowpos #dining

	if (windowpos > $('#events').offset().top) {
		$('nav li a').removeClass('active');
		$('a[href$="#events"]').addClass('active');
	} //windowpos #events

	if (windowpos > $('#attractions').offset().top) {
		$('nav li a').removeClass('active');
		$('a[href$="#attractions"]').addClass('active');
	} //windowpos #attractions

	
}); //window scroll

  ///////////////
  //ScrollMagic//
  ///////////////
  
  // set up ScrollMagic
  
  var controller = new ScrollMagic({
  	globalSceneOptions: {
  		triggerHook: 'onLeave'
  	}
  });
  
  //////////////////
  //pin navigation//
  //////////////////
  
  var pin = new ScrollScene({
  	triggerElement: '#nav',
  }).setPin('#nav').addTo(controller);
  
  /*
  To get the navigation to stick to the top, use a technique called pinning.
  Pinning allows you to take an element and pin it to a position in the screen and it's actually quite easy to do.
  So, I'm going to set it up right after my controller. 
  We of course always have to set up the controller first and after we do that, we can do some of the magic. 
  So right after Scroll Magic, we're going to create another variable called pin.
  and then, we're going to set up a new scroll screen.
  
  So this is going to be new ScrollScene. And in here, we're going to pass it some setup parameters. 
  And we need to tell it what we need to pin, so we'll say 
  triggerElement and then specify that we want the element with the ID of nav, which is our navigation. 
  And that needs to go in quotes. And then we say setPin, which is another one of the methods.
  
  And then pass it along the navigation and addTo controller. 
  So what's the difference between this nav right here and this other one down here? 
  Well, the first one is the triggerElement. 
  That means that when it notices that we go past a certain position, and in this case when we get to this nav, 
  I want you to set the pin as the nav or pin the nav itself. 
  So in this case, they happen to be the same thing, but they could definitely be different elements. 
  Say when you were scrolling at this point, you could pin something else on screen and make it stick that was later on.
  
  So maybe as you scroll up, this item right here could remain in place. 
  But in this case, they're pretty much both the same thing and that's all we need to do for that effect. 
  So let's go ahead and save this, make sure that your gulp process is running. 
  I know that it's running because I didn't wait there for nothing to happen. 
  And there it is, you can see that it started the JavaScript task and then it finished it. 
  It means that everything's running just fine. 
  And now, as I scroll up, once I get to that navigation, it's going to stick in place.  
  */

//if (!isTouch) {
	
	///////////////////
	//Room Animations//
	///////////////////

	var roomOrig = { //room origin
		//the roomOrig variable is equal to an object
		//the object has some defaults.
	  	bottom: -700,
	  	opacity: 0,
	  	scale: 0
	};
	  
	var roomDest = { //room destination
	  	repeat: 1,
	  	yoyo: true,
	  	bottom: 0,
	  	opacity: 1,
	  	scale: 1,
	  	ease: Back.easeOut
	  	//all of these defaults can be reviewed at
	  	//the GreenSock website in the TweenMax application
	};

	var roomTween = TweenMax.staggerFromTo(
		//tween an element using staggerFromTo movement from TweenMax
		//and the element I want to move is '#piccadilly .content'
		'#piccadilly .content',
		1, roomOrig, roomDest
	);

	var pin = new ScrollScene ({
		triggerElement: '#piccadilly',
		offset: -topoffset,
		duration: 500
		//the duration element is going to control how the scroll affects the animation
		//If we didn't have this, then the animation would happen like the animation for attractions.
	})	.setPin('#piccadilly')
		.setTween(roomTween)
		.addTo(controller);
		
	var roomTween = TweenMax.staggerFromTo(
		'#cambridge .content',
		1, roomOrig, roomDest
	);
	var pin = new ScrollScene ({
		triggerElement: '#cambridge',
		offset: -topoffset,
		duration: 500
	})	.setPin('#cambridge')
		.setTween(roomTween)
		.addTo(controller);


	var roomTween = TweenMax.staggerFromTo(
		'#westminster .content',
		1, roomOrig, roomDest
	);
	var pin = new ScrollScene ({
		triggerElement: '#westminster',
		offset: -topoffset,
		duration: 500
	})	.setPin('#westminster')
		.setTween(roomTween)
		.addTo(controller);
		

	var roomTween = TweenMax.staggerFromTo(
		'#oxford .content',
		1, roomOrig, roomDest
	);
	var pin = new ScrollScene ({
		triggerElement: '#oxford',
		offset: -topoffset,
		duration: 500
	})	.setPin('#oxford')
		.setTween(roomTween)
		.addTo(controller);
		

	var roomTween = TweenMax.staggerFromTo(
		'#victoria .content',
		1, roomOrig, roomDest
	);
	var pin = new ScrollScene ({
		triggerElement: '#victoria',
		offset: -topoffset,
		duration: 500
	})	.setPin('#victoria')
		.setTween(roomTween)
		.addTo(controller);
		

	var roomTween = TweenMax.staggerFromTo(
		'#manchester .content',
		1, roomOrig, roomDest
	);
	var pin = new ScrollScene ({
		triggerElement: '#manchester',
		offset: -topoffset,
		duration: 500
	})	.setPin('#manchester')
		.setTween(roomTween)
		.addTo(controller);

	
//} //not a touch device
  
/////////////////////////
//attractions animation//
/////////////////////////
  
var attractionstween = TweenMax.staggerFromTo('#attractions article', 1, { 
  	opacity: 0, scale: 0 
  }, { 
  	delay: 1, opacity: 1, scale: 1, ease: Back.easeOut 
  });
  
  var schene = new ScrollScene({
  	triggerElement: '#attractions',
  	offset: -topoffset
  }).setTween(attractionstween).addTo(controller);
}); //on load