(function (document) { 
	// selectors
	var video = document.getElementById("video"); //right video
	var reverseVideo = document.getElementById("video-reverse");
	var prev = document.getElementById("back");
	var next = document.getElementById("next");
	var index = 0;
	var length = 5;
	
	var playing = false;
	var timer = 0;
	var status = false;
	var currentStopPoint = 0;
	var player = "";
	var x = 0;

	var stopPoint = [18.63, 4, 8, 12, 18, 18.63];
	var reverseStopPoint = [18.63, 14.15, 10, 5.452, 5.45, 18.63];

	prev.addEventListener("click", prevAction);
    next.addEventListener("click", nextAction);

	function prevAction() {
		// -check if current index = 0, if yes play from begining
		// - if not get the starting point from reversePoints using the index - 1
		if (index === 0) {
			x = length - 1;
		} else {
			x = index - 1;		
		}
		console.log("passed index:", x);
		playAnimation(x, false);
	}

	video.addEventListener("canplay", function(){console.log("ready");}, false);
	// -check if current index = 0, if yes play from begining
	// - if not get the starting point from reversePoints using the index + 1
	function nextAction() {
		if (index === length - 1) {
			x = 0;
		} else {
			x = index + 1;
		}
		playAnimation(x, true)
	}
	function playAnimation(t) {
		var cue = t;
		console.log("Cue == passed time", cue);
		// argument[0] cue time. tells where to stop
		//argument[1]selector for which video to play
		status = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
		// if the video is paused/ not playing
		if (!playing) {
			if(status) {
				video.style.display = "block";
				reverseVideo.style.display = "none";
				currentStopPoint = stopPoint[cue];
				player = video;
			}else {
				video.style.display = "none";
				reverseVideo.style.display = "block";
				currentStopPoint = reverseStopPoint[cue];
				player = reverseVideo;
			}
			player.play();
			clearInterval(timer);
			// check the value of currenttime every 30ms
			// if the currentTime is greater than the currentStopPoint the video will pause
			timer = setInterval(function() {
				console.log("this is interval: ", timer);
				if(player.currentTime >= currentStopPoint) {
					player.pause();
					videoSetTime(cue);
					videoReverseSetTime(cue);
             	    clearInterval(timer);
                    playing = false;
				}
                }, 1000/35); //smoother checking 
			index = cue;
		}
	}

	function videoSetTime(t) {
		if( t == 0) {
			//resets the video
			video.currentTime = 0;
			// video.src = video.src;
		} else {
			console.log("setting start time of video to:", stopPoint[t]);
			video.currentTime = stopPoint[t];
			console.log("video's current time: ", video.currentTime);
			// video.src = video.src;
		}
	}
	function videoReverseSetTime(t) {
		if(t == 0 ) {
			reverseVideo.currentTime = 0;
			// reverseVideo.src = reverseVideo.src;
		} else {
			reverseVideo.currentTime = reverseStopPoint[t];
			// reverseVideo.src = reverseVideo.src
		}
	}
})(document);