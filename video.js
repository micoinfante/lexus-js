		(function (document) { 
		var video = document.getElementById("video"); //right video
		var reverseVideo = document.getElementById("video-reverse");
		var prev = document.getElementById("back");
		var next = document.getElementById("next");
		var index = 0;
		var length = 5;
		var stopPoint = [6.65, 1, 2.5, 4, 5, 6.65];
		var reverseStopPoint = [6.65, 5.66667, 4.166667, 2.66667, 1.66667, 6.65];
		// var stopPoint = [18.63, 4, 8, 13.00, 18.08, 18.63];
		// var reverseStopPoint = [18.33, 10.66667, 10.66667, 5.66667, 5.66667, 18.63];
		var playing = false;
		var timer = 0;
		var status = false;
		var currentStopPoint = 0;
		var player = "";

		prev.addEventListener("click", prevAction);
        next.addEventListener("click", nextAction);

		function prevAction() {
			var t = 0;
			if (index === 0) {
				t = length - 1;
			} else {
				t = index - 1;
			}
			playAnimation(t, false);
		}

		function nextAction() {
			var t = 0;
			if (index === length - 1) {
				t = 0;
			} else {
				t = index + 1;
			}
			playAnimation(t, true)
		}

		function playAnimation(t) {
			var cue = t;
			console.log(arguments.length);
			status = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];

			if (!playing) {
				
				currentStopPoint = status ? stopPoint[t] : reverseStopPoint[t];
				if(status) {
					video.style.display = "block";
					reverseVideo.style.display = "none";
					currentStopPoint = stopPoint[t];
					player = video;

				}else {
					video.style.display = "none";
					reverseVideo.style.display = "block";
					currentStopPoint = reverseStopPoint[t];
					player = reverseVideo;
				}
				player.play();
				clearInterval(timer);
				timer = setInterval(function() {
					if(player.currentTime >= currentStopPoint) {
						player.pause();
						videoSetTime(cue);
						videoReverseSetTime(cue);
	               
	                clearInterval(timer);
	                playing = false;
					}
                    }, 30);
				index = t;
			}
		}

	function videoSetTime(t) {
		var t = t;
		if(0 === t ) {
			video.currentTime = 0;
		} else {
			video.currentTime = stopPoint[t];
		}
	}

	function videoReverseSetTime(t) {
		if(0 === t ) {
			reverseVideo.currentTime = 0;
		} else {
			reverseVideo.currentTime = reverseStopPoint[t];
		}
	}
	})(document);