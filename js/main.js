// set up vue for inputs and calculations
var vm = new Vue({

	el: '#content',

	// capture which input is active
	data: {
		operation: 'to',
		timeUnit: 'days',
		diffStart: "",
		diffEnd: "",
		diffInterval: '0',
		result: '',
		errorOne: '',
		errorTwo: ''
	},

	mounted: function() {
		// bind datepickers to date inputs
	    $('#diff-start').datetimepicker({
	    	format: 'L',
	    });
	    $('#diff-end').datetimepicker({
    		format: 'L',
    	});
    },

    beforeUpdate: function() {
    	// prevent clear of start date on model change
    	var modelDateStart = $('#diff-start').data("DateTimePicker").date();

    	if (modelDateStart != null) {
    		this.diffStart = modelDateStart.format("MM/DD/YYYY");
    	}
    },

    updated: function() {
    	// re-bind datepicker to end input
    	$('#diff-end').datetimepicker({
    		format: 'L',
    	});
    },

	methods: {
		validate: function() {
			var errorFree = 0;

			// store start date to vue model
			var modelDateStart = $('#diff-start').data("DateTimePicker").date();

			// check start date input
			if (modelDateStart == null) {
				this.errorOne = "We need a date!";
			}
			else {
				this.errorOne = "";
				errorFree++;
			}

			// check end date / interval input
			if (this.operation === "to") {
				// store end date to vue model
				var modelDateEnd = $('#diff-end').data("DateTimePicker").date();
				// if no input, ask for input
				if (modelDateEnd == null) {
					this.errorTwo = "We need a date!";
				}
				// if no problems with input, clear error and calculate
				else {
					this.errorTwo = "";
					errorFree++;
				}
			}
			else if (this.operation === "plus" || this.operation === "minus") {
				// if no input or non-numerical input, ask for input
				if (!this.diffInterval || !$.isNumeric(this.diffInterval)) {
					this.result = "";
					this.errorTwo = "We need a number!";
				}
				// if no problems with input, clear error and calculate
				else {
					this.errorTwo = "";
					errorFree++;
				}
			}

			// if both inputs are error-free, calculate
			if (errorFree >= 2) {
				this.calculate();
			}
		},
		calculate: function() {
			// store start date to vue model
			var modelDateStart = $('#diff-start').data("DateTimePicker").date();

			if (modelDateStart != null) {
				this.diffStart = modelDateStart.format("MM/DD/YYYY");
			}

			if (this.operation === 'to') {
				// store end date to vue model
				var modelDateEnd = $('#diff-end').data("DateTimePicker").date();
				if (modelDateEnd != null) {
					this.diffEnd = modelDateEnd.format("MM/DD/YYYY");
				}
				this.result = dateDiff(this.diffStart, this.diffEnd);
			} else if (this.operation === 'plus') {
				this.result = datePlus(this.diffStart, this.diffInterval, this.timeUnit);
			} else if (this.operation === 'minus') {
				this.result = dateMinus(this.diffStart, this.diffInterval, this.timeUnit);
			}

			$("#result").show();
		}
	}
});

function dateDiff(startDate, endDate) {
	var start = moment(startDate, "MM-DD-YYYY");
	var end = moment(endDate, "MM-DD-YYYY");
	
	var result = end.diff(start, 'days');
	if (result === 1 || result === -1) {
		return result + ' day';
	} else {
		return result + ' days';
	}
};

function datePlus(startDate, plusTime, timeUnit) {
	var start = moment(startDate, "MM-DD-YYYY");
	var result;

	result = start.add(plusTime, timeUnit);
	return result.format("MM/DD/YYYY");
};

function dateMinus(startDate, minusTime, timeUnit) {
	var start = moment(startDate, "MM-DD-YYYY");
	var result;

	result = start.subtract(minusTime, timeUnit);
	return result.format("MM/DD/YYYY");
};