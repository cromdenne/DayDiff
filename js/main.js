var vm = new Vue({

	el: '#content',

	// capture which input is active
	data: {
		operation: 'to',
		timeUnit: 'days',
		diffStart: '',
		diffEnd: '',
		diffInterval: '',
		result: ''
	},

	methods: {
		calculate: function() {
			if (this.operation === 'to') {
				this.result = dateDiff(this.diffStart, this.diffEnd);
			} else if (this.operation === 'plus') {
				this.result = datePlus(this.diffStart, this.diffInterval, this.timeUnit);
			} else if (this.operation === 'minus') {
				this.result = dateMinus(this.diffStart, this.diffInterval, this.timeUnit);
			}

			$( "#result" ).show();
		}
	}
});

function dateDiff(startDate, endDate) {
	var start = moment(startDate);
	var end = moment(endDate);
	var result;

	result = end.diff(start, 'days') + ' days';
	return result;
};

function datePlus(startDate, plusTime, timeUnit) {
	var start = moment(startDate);
	var result;

	result = start.add(plusTime, timeUnit);
	return result.format("M/D/YYYY");
};

function dateMinus(startDate, minusTime, timeUnit) {
	var start = moment(startDate);
	var result;

	result = start.subtract(minusTime, timeUnit);
	return result.format("M/D/YYYY");
};