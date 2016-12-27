var ninetofiveapp = angular.module('ninetofiveapp',['ui.bootstrap']);
ninetofiveapp.controller('Controller',['$scope','$uibModal','$http', function($scope, $uibModal,$http){
    
	$scope.slots = [];
	$http.get('/getslots').then(function(result){$scope.slots= result.data;});

//$scope slots = [{name:'',phone:'', time:'9:00am'},{name:'',phone:'', time:'10:00am'},{name:'',phone:'', time:'11:00am'},{name:'',phone:'', time:'12:00pm'},{name:'',phone:'', time:'1:00pm'},{name:'',phone:'', time:'2:00pm'},{name:'',phone:'', time:'3:00pm'},{name:'',phone:'', time:'4:00pm'},{name:'',phone:'', time:'5:00pm'}];

	 $scope.open = function(slot) {

		var modalInstance = $uibModal.open({
		  templateUrl: 'myModalContent.html',
		  controller: 'ModalInstanceCtrl',
		  resolve: {selectedslot:slot,updatevalues:{name:slot.name,phone:slot.phone,time:slot.time}}
		});

		modalInstance.result.then(function(updates) {
			$http.post('/updateslot',{name:updates[1].name,phone:updates[1].phone,time:updates[1].time}).then(function(){
				$scope.updates = updates;
				$scope.updates[0].name= $scope.updates[1].name;
				if($scope.updates[1].phone == null){
					$scope.updates[1].phone= "";
				}
				$scope.updates[0].phone= $scope.updates[1].phone;
			
			});
		});
	  };
}]);
ninetofiveapp.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, selectedslot,updatevalues) {
  $scope.selectedslot = selectedslot;
  $scope.updatevalues = updatevalues;
  $scope.ok = function() {
    $uibModalInstance.close([selectedslot,updatevalues]);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});