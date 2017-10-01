/* 
 * MonkeyType 1.0.0
 * Copyright 2017 Michal Barcikowski
 * Available via the MIT or new BSD @license. 
 * Project: https://github.com/bartonus/monkey-type
 */

(function(jq){

	var monkeyType = function(text, speed){

		// monkey element verification
		this.elementId = $(this).attr('id');
		if (!this.elementId == true) {
			alert("No 'ID' attribute for monkeyType element. Define it, and try again.");
			return false;
		}

		// set text
		this.typeThis = text;

		// set speed
		if (speed == 'fast') this.speed = 0.3;
		else if (speed == 'medium') this.speed = 0.6;
		else if (speed == 'vfast') this.speed = 0.1;
		else this.speed = 1;

		// monkey definition
		this.monkeyTypeDefinition = [100,200,200,400,50,100,20,20,100,50,50,400];
		this.monkeyOnSpaceThinking = [300,600,1000,2000];
		
		// others
		this.delay = 0;
		this.charIndex = 0;

		// add class to object
		$(this).addClass('monkey-type');
		
		/* FUNCTIONS */
		
		this.beMoreMonkey = function(from, to){
			return Math.floor((Math.random() * to) + from);
		}

		this.typeItNow = function ()
		{
			for(var i = 0; i < this.typeThis.length; i++)
			{
				if (this.typeThis[i] != ' ')
				{
					var delayIt = this.monkeyTypeDefinition[this.beMoreMonkey(0, this.monkeyTypeDefinition.length)];
				}
				else
				{
					var delayIt = this.monkeyOnSpaceThinking[this.beMoreMonkey(0, this.monkeyOnSpaceThinking.length)];
				}

				delayIt = delayIt * this.speed;

				this.delay += delayIt;

				this.writeChar(this.typeThis[i], this.delay);
			}
		}

		this.writeChar = function(char, delay) {
			setTimeout("$('#"+this.elementId+"').append('"+char+"');", delay);
		}

		this.typeItNow();

	}

	$.fn.monkeyType = monkeyType;

})(jQuery);