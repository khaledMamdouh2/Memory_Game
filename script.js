var images = new Array("girl.png","mario.png","Mickey-Mouse.png","minions.png","picatcho.png","Spongebob.png");
			var used,gameOn,first_clicked,previous_pic,solved,interval,counter;
			var hiddenPics = new Array(12);
			
			function shufflePics () {
				var new_pic ; 
				var index;
				for(i=0; i<12; i++){
					new_pic = false;
					while(!new_pic){
						index = Math.round(Math.random()*5);
						if(used[index]<2){
							hiddenPics[i] = index;
							new_pic = true;
							used[index]++;
						}
					}
				}
			}
			function start_game () {
				if(!gameOn){
					used = new Array(6).fill(0);
					first_clicked = true;
					gameOn = true;
					counter=1;
					solved = 0;
					shufflePics();
					interval = setInterval(function () {
						counter++;
					},1000);
				}

			}

			function end_game () {
				document.getElementById("resultTime").innerHTML = counter+" Seconds";
				$("#resultContainer").fadeIn(500);
				for(i=0; i<12; i++)
					document.images[i].src="qMark.png";
				gameOn = false;
				
			}
			function hideModal (){
				$("#resultContainer").fadeOut();	
			}
			function replaceImage (imageIndex) {
				if(gameOn && /qMark/.test(document.images[imageIndex].src)){
					document.images[imageIndex].src=images[hiddenPics[imageIndex]];
					if(first_clicked){
						first_clicked = false;
						previous_pic = imageIndex;	
					}
					else{
						first_clicked = true;
						if(hiddenPics[imageIndex] != hiddenPics[previous_pic]){
							gameOn=false;
							setTimeout(function(){
								document.images[imageIndex].src = "qMark.png";
								document.images[previous_pic].src = "qMark.png";
							},500);
							gameOn=true;
						}
						else{
							if(++solved==6){
								clearInterval(interval);
								setTimeout(function () {
									end_game();
								},2000);
							}
								
						}
					}
				}
			}