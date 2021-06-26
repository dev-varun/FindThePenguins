var maxPenguins=20;
var maxYeti=3;
var curscore=0;
$(document).ready( function() {
   
	$('#title')[0].append($('<span id="score"></span>')[0])
	$('#score')[0].append($('<span>Score:</span>')[0])
	$('#score')[0].append($('<span id="sc">0</span>')[0])
	$('#score')[0].append($('<span><br>High:</span>')[0])
	$('#score')[0].append($('<span id="hsc">0</span>')[0])
	$('#hsc')[0].innerText=localStorage.getItem('hsc')||0;
    
	function updateScore(curscore){
		$('#sc')[0].innerText=curscore;
		if (curscore>(localStorage.getItem('hsc')||0)){
		localStorage.setItem('hsc',curscore);
		(new Audio("hscr.mp3")).play();
		}
		$('#hsc')[0].innerText=localStorage.getItem('hsc')||0;
	}
    
	reseter=function(){localStorage.setItem('hsc',0);updateScore(0);location.reload();}
	$('#title')[0].append($('<input/>',{id:'reset',type:'button',value:'Reset Scores',click:reseter})[0]);
	 $('[id^=penguin]').each(function (i,e){e.remove()});
	var randomBoxes=1+Math.floor(Math.random()*maxPenguins);
	for(var y=0;y<randomBoxes;y++)
		$('#gameholder').append($('<div id="penguin'+(1+y%8)+'"></div>'))
	var randomBoxesX=0+Math.floor(Math.random()*maxYeti);
	for(var y=0;y<randomBoxesX;y++)
		$('#gameholder').append($('<div id="yeti"></div>'))
	 $('[id^=penguin]').each(function (i,e){
		e.onclick=(function(t){
			if (e.isclicked!="1")
			{
				updateScore(++curscore);
				
				$(e).css('background-image', 'url(images/penguin_'+e.id.slice(-1)+'.png)');
				(new Audio("scr.mp3")).play();
			}
			e.isclicked="1";
		});
	 });
	 //for each yeti click
    $("#yeti").mousedown(function() {
		$('#yeti').css('background-image', 'url(images/yeti.png)');
        document.getElementById('gameholder').className ='classname';
         $("body").css("background-color","RED");
		(new Audio("lose.mp3")).play();
		//updateScore(0);
        setTimeout( function() {
		alert("Yaaaarrrr! \nYour score : "+curscore);
		location.reload();
		},300 );
    });
	
	//shuffle peg and yetis
	$('[id^=penguin]').each(function (i,e){e.classList.add('rando')});
	$('#yeti').each(function (i,e){e.classList.add('rando')});
	rray=$('.rando');// array of peg and yetis
	$('[id^=penguin]').each(function (i,e){e.classList.remove('rando')});
	$('#yeti').each(function (i,e){e.classList.remove('rando')});
	//now we have the array to shuffle
	var currentIndex = rray.length, temporaryValue, randomIndex ;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		rray[randomIndex].before(rray[currentIndex]);  
		temporaryValue = rray[currentIndex];		 
		rray[currentIndex] = rray[randomIndex];		
		rray[randomIndex] = temporaryValue;	
  }

});