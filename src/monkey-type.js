/*
 * MonkeyType 1.7.0
 * Copyright 2017 Michal Barcikowski
 * Available via the MIT or new BSD @license.
 * Project: https://github.com/bartonus/monkey-type
 */

(function(jq){

	var monkeyDefaultOption = {

		monkeyText: null,					// if notdefined, text will taken from html tag
		speed: 'medium',					// ['vslow','slow','medium','fast','vfast'] speed of monkey type
		cursorType: 'insert',				// cursor type ['insert','replace']
		cursorStopAfter: true,				// turn cursor blinking off when monkey stop type
		startAfterScroll: true,				// start type when element visible on screen
		doItAfterFinish: function(){},		// do it after type finish

	};

	var monkeyType = function(option){

		// monkey element verification
		this.elementId = $(this).attr('id');
		if (!this.elementId == true) {
			alert("No 'ID' attribute for monkeyType element. Define it, and try again.");
			return false;
		}

		// monkey definition
		this.definitionMonkeyType = [100,200,200,400,50,100,20,20,100,50,50,400];
		this.definitionMonkeyOnSpaceThinking = [300,600,1000,2000];
		this.definitionSpeed = {'vslow': 1.5, 'slow': 1, 'medium': 0.6, 'fast': 0.3, 'vfast': 0.1};
		this.definitionCursorType = ['insert', 'replace'];

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

			// set cursor
			$(this).addClass('monkey-type-' + this.cursorType);

			// roll
			for(var i = 0; i < this.typeThis.length; i++)
			{
				// monkey definition
				if (this.typeThis[i] != ' ')
				{
					var delayIt = this.definitionMonkeyType[this.beMoreMonkey(0, this.definitionMonkeyType.length)];
				}
				else
				{
					var delayIt = this.definitionMonkeyOnSpaceThinking[this.beMoreMonkey(0, this.definitionMonkeyOnSpaceThinking.length)];
				}

				// write character
				delayIt = delayIt * this.speed;
				this.delay += delayIt;
				this.writeChar(this.typeThis[i], this.delay, ((i == (this.typeThis.length - 1)) ? true : false));
			}
		}

		this.writeChar = function(char, delay, lastChar) {

			// variables
			var putChar = char;
			var element = $('#' + this.elementId);
			var doItAfterFinish = this.doItAfterFinish;

			// add char to string
			setTimeout(function(){ element.append(putChar); }, delay);

			// do it on last char
			if (lastChar == true) {

				// do it after finish
				setTimeout(function(){doItAfterFinish(element);}, delay);

				// stop blinking
				if (this.cursorStopAfter == true)
				{
					setTimeout(function(){ element.removeClass('monkey-type-replace'); }, delay);
					setTimeout(function(){ element.removeClass('monkey-type-insert'); }, delay);
				}
			}
		}

		this.setTypeText = function(text) {
			this.typeThis = text.replace(/[^a-zA-Z0-9ęóąśłżźćń,.\(\)\[\]!@#;:'"\? -]/gi, ' ');
			$(this).html('');
		}

		this.elementInView = function() {

			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();
			var elementPosition = $('#' + this.elementId).offset().top;
			return (((elementPosition <= docViewBottom) && (elementPosition >= docViewTop)) ? true : false);
		}

		this.setOption = function(option) {

			// check option object
			if (option instanceof Object) {

				// set text
				if (option.monkeyText == '' || option.monkeyText == undefined || option.monkeyText == null) this.setTypeText($(this).html());
				else this.setTypeText(option.monkeyText);

				// set speed
				if (this.definitionSpeed[option.speed] > 0) {this.speed = this.definitionSpeed[option.speed]; }
				else this.speed = this.definitionSpeed[monkeyDefaultOption.speed];

				// set cursor
				if (this.definitionCursorType.indexOf(String(option.cursorType)) >= 0) this.cursorType = option.cursorType;
				else this.cursorType = monkeyDefaultOption.cursorType;

				// set cursor blinking after finish
				if (option.cursorStopAfter == false || option.cursorStopAfter == true) this.cursorStopAfter = option.cursorStopAfter;
				else this.cursorStopAfter =  monkeyDefaultOption.cursorStopAfter;

				// start type after scroll to it
				if (option.startAfterScroll == false || option.startAfterScroll == true) this.startAfterScroll = option.startAfterScroll;
				else this.startAfterScroll = monkeyDefaultOption.startAfterScroll;

				// set action after finish
				if (option.doItAfterFinish instanceof Function) this.doItAfterFinish = option.doItAfterFinish;
				else this.doItAfterFinish = monkeyDefaultOption.doItAfterFinish;
			}

			// set defaults
			else {
				this.setTypeText($(this).html());
				this.speed = this.definitionSpeed[monkeyDefaultOption.speed];
				this.cursorType = monkeyDefaultOption.cursorType;
				this.cursorStopAfter = monkeyDefaultOption.cursorStopAfter;
				this.startAfterScroll = monkeyDefaultOption.startAfterScroll;
				this.doItAfterFinish = monkeyDefaultOption.doItAfterFinish;
			}

		}

		this.setOption(option);

		// check doItAfterFinish
		if (this.startAfterScroll == true && this.elementInView() == false) {

			var that = this;
			var started = false;
			$(window).scroll(function(){

				if (started == false) {

					var windowHeight = $(window).height();
					var fromTop = $(window).scrollTop();
					var elementPosition = $('#'+that.elementId).offset().top;

					if (that.elementInView())
					{
						started = true;
						that.typeItNow();
					}

				}

			});

		}
		else {
			this.typeItNow();
		}

	}

	$.fn.monkeyType = monkeyType;

})(jQuery);