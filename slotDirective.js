//this will represent the clickable timeslot.
ninetofiveapp.directive('slot', function() {
  return {
	template: '<div data-toggle="modal" data-target="#myModal" ng-click="open(slot)">&nbsp</div>'
  };
});