var vm = new Vue({

	el: '#content',

	// capture which input is active
	data: {
		selected: 'to',
		timeUnit: 'days',
		diffStart: '',
		diffEnd: '',
		diffPlus: '',
		diffMinus: '',
		result: ''
	},

	methods: {
		dateToDate: function() {
			var startDate = moment(this.diffStart);
			var endDate = moment(this.diffEnd);

			this.result = endDate.diff(startDate, 'days') + ' days';

			$( "#result" ).show();
		},
		datePlus: function() {
			
		},
		dateMinus: function() {
			
		}
	}
});