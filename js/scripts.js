$(window).load(function() {
	
	// scroll to top on mobile devices
	if ($(".row").width() <= 320){
    	$('html, body').animate({scrollTop:0}, 100);
    }
	
});

$(function(){
	
	
	var parts = [{}];
    for (var i = 1; i <= 4; i++) {
        var wheel = {};
        for (var j = 0; j < 6; j++) {
            wheel[j] = '<img src="images/sphere.png" />'
        }
        parts[0][i] = wheel;
    }

    $('#profiles').scroller({
        display: 'inline',
        wheels: parts,
        width: 100,
        height: 167,
        showLabel: false,
        rows: 6,
        onChange: showProfile
    }).scroller('setValue', [2,4,1,5], true);
	
	
	
	function showProfile(valueText, inst){
		console.log(valueText);
		
		var label = $("#profiles-label"),
			parts = valueText.split(" ");
		
		if (parts[0] == parts[1] && parts[0] == parts[2] && parts[0] == parts[3]){
			label.html("match!");
		}
		else {
			label.html("");
		}
	}
	
	
	
	
	
	$(".test").on("click", function(){
		showModal();
		
		return false;
	});
	
	var modalCover = $("#modal-cover"),
		modalContent = $("#modal-content");
    
    function showModal(template, data){
    	template = "";
    	data = "";
    	
    	modalCover.show().transition({
			left: "0%"
		}, 1500, function(){
			modalContent.show();
			modalCover.transition({
				left: "-200%"
			}, 1500, function(){
				modalCover.hide();
			});
		});
    }
    
    
    
    
    // parallax items
    
    // standard values
    var windowPosition = $(window).scrollTop(),
    	screenRatio = $("#content").width() / $("#content").height();
    
    // welcome page
    var welcomePage = $("#welcome"),
    	welcomeItems = [],
    	welcomeItemsNumber = 200,
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
    	welcomePage.append("<div class='item item-" + i + " tsype-" + Math.floor(Math.random()*4+1) + "' style='background-size: " + (Math.random()*20 + 5 + ((i < 3) ? 30 : 0))/20 + "%;'></div>");
    	
    	var starterOffset = (Math.random() * steps) + steps / 4;
    	//starterOffset = 0;
    	
    	/*		0: id		1: rate		2: path offset x		3: path offset y		*/
    	welcomeItems[i] = [".item-"+i, (Math.random()*90 + 10) / 100, Math.random()*12 + starterOffset, Math.random()*12 + starterOffset];
    }
    
    // intial positions
    positionWelcomeItems();
    
    // scroll event
    $(window).on("scroll", function(){
    	positionWelcomeItems();
    });
    
    // resize event
    $(window).on("resize", function(){
    	screenRatio = $("#content").width() / $("#content").height();
    	
    	positionWelcomeItems();
    });
    
    function positionWelcomeItems(){
    	windowPosition = $(window).scrollTop();
    	
    	for (i = 0; i <= welcomeItems.length-1; i++){
    		$(welcomeItems[i][0]).css({
    			"background-position": parallaxPath(windowPosition, welcomePath, welcomeItems[i][1], "x", xOffset, welcomeItems[i][2]) + "% " + (parallaxPath(windowPosition, welcomePath, welcomeItems[i][1]+0.5, "y", yOffset, welcomeItems[i][3]) - (windowPosition * 0.02) * screenRatio) + "%"
    		});
    	}
    }
    
    function parallaxPath(position, path, rate, axis, mainOffset, pathOffset){
    	if (position >= 0){
        	return path[Math.floor((position * rate) + pathOffset) % path.length][((axis == "y") ? 1 : 0)] * ((axis == "y") ? screenRatio : 1) + mainOffset;
    	}
    }
    
});







