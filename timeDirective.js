//this will show the time of the slot.
ninetofiveapp.directive('timeslot', function() {
  return {
	template: '{{slot.time}}'
  };
});