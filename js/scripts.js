$(window).load(function() {
	
	// scroll to top on mobile devices
	if ($(".row").width() <= 320){
    	$('html, body').animate({scrollTop:0}, 100);
    }
	
});

$(function(){
	
	var bodyParts = ['head','shoulders','legs','feet'],
		teamOrder = [
			[5,3,2,4,1,6],
			[1,4,3,2,5,6],
			[6,5,1,2,4,3],
			[4,3,5,6,1,2]
		];
	
	var parts = [{}];
    for (var i = 0; i < 4; i++) {
        var wheel = {};
        for (var j = 0; j < 6; j++) {
            wheel[j] = '<img src="images/team/team-' + bodyParts[i] + '-0' + teamOrder[i][j] + '.png" />'
        }
        parts[0][i] = wheel;
    }

    $('#profiles').scroller({
        display: 'inline',
        wheels: parts,
        width: 100,
        height: 16.666666667,
        showLabel: false,
        rows: 6,
        onChange: showProfile
    }).scroller('setValue', [2,4,2,3], true);
	
	function showProfile(valueText, inst){
		console.log(valueText);
		
		var label = $("#profiles-label"),
			parts = valueText.split(" ");
		
		if (teamOrder[0][parts[0]] == teamOrder[1][parts[1]] && teamOrder[0][parts[0]] == teamOrder[2][parts[2]] && teamOrder[0][parts[0]] == teamOrder[3][parts[3]]){
			label.html("match!");
		}
		else {
			label.html("");
		}
	}
    
    
    
    
    // parallax items
    
    // standard values
    var windowPosition = $(window).scrollTop(),
    	screenRatio = $("#content").width() / $("#content").height();
    
    // welcome page
    var welcomePage = $("#welcome"),
    	welcomeItems = [],
    	welcomeItemsNumber = 150,
    	welcomePath = [],
    	steps = 400,
    	radius = 15,
    	xOffset = 30,
    	yOffset = (50 - ((radius * screenRatio) * 1));
    
    // create path
    for (var i = 0; i < steps * 2; i++) {
    	if (i < steps){
    		welcomePath[i] = [(radius * Math.sin(2 * Math.PI * i / steps)), (radius * Math.cos(2 * Math.PI * i / steps))];
    	}
    	else {
    		welcomePath[i] = [(radius * Math.sin(2 * Math.PI * i / steps)), (radius * Math.cos(2 * Math.PI * i / steps) * -1 + radius * 2)];
    	}
    }
    
    // populate parallax items
    for (i = 0; i <= welcomeItemsNumber; i++){
    	welcomePage.append("<div class='item item-" + i + "' style='background-size: " + (Math.random()*20 + 5 + ((i < 3) ? 30 : 0))/20 + "%;'></div>");
    	
    	var starterOffset = (Math.random() * steps) + steps / 4;
    	//starterOffset = 0;
    	
    	/*		0: id		1: rate		2: path offset x		3: path offset y		*/
    	welcomeItems[i] = [".item-"+i, (Math.random()*90 + 10) / 100, Math.random()*12 + starterOffset, Math.random()*12 + starterOffset];
    }
    
    // intial positions
    var throttledWelcomeParallax = _.throttle(positionWelcomeItems, 1);
    
    throttledWelcomeParallax();
    
    // scroll event
    $(window).on("scroll", function(){
    	throttledWelcomeParallax();
    });
    
    // resize event
    $(window).on("resize", function(){
    	screenRatio = $("#content").width() / $("#content").height();
    	
    	throttledWelcomeParallax();
    });
    
    var constant1;
    
    function positionWelcomeItems(){
    	windowPosition = $(window).scrollTop();
    	constant1 = (windowPosition * 0.02) * screenRatio;
    	
    	for (i = 0; i <= welcomeItems.length-1; i++){
    		$(welcomeItems[i][0]).css({
    			"background-position": parallaxPath(windowPosition, welcomePath, welcomeItems[i][1], "x", xOffset, welcomeItems[i][2]) + "% " + (parallaxPath(windowPosition, welcomePath, welcomeItems[i][1]+0.5, "y", yOffset, welcomeItems[i][3]) - constant1) + "%"
    		});
    	}
    }
    
    function parallaxPath(position, path, rate, axis, mainOffset, pathOffset){
    	if (position >= 0){
        	return path[Math.floor((position * rate) + pathOffset) % path.length][((axis == "y") ? 1 : 0)] * ((axis == "y") ? screenRatio : 1) + mainOffset;
    	}
    }
    
    
    
    
    // about page
    var aboutPage = $("#about"),
    	aboutPagePosition = aboutPage.position().top,
    	aboutIpad = $("#about .item-ipad"),
		aboutPencil = $("#about .item-pencil");
	
	var throttledAboutParallax = _.throttle(positionAboutItems, 1);
	
	throttledAboutParallax();
	
	$(window).on("scroll", function(){
		throttledAboutParallax();
	});
	
	function positionAboutItems(){
		newPencilPosition = (((windowPosition - aboutPagePosition) * 0.6) - aboutPage.height()*0.1) * screenRatio;
		console.log(newPencilPosition);
		
		if (newPencilPosition > (30 * screenRatio)){
			newPencilPosition = (30 * screenRatio);
		}
		
		aboutPencil.css({
			"background-position": (newPencilPosition * -0.1) + 95 + "% " + newPencilPosition + "%"
		});
	}
    
    
});







