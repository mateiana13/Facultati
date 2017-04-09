/*global angular*/
var app = angular.module("facultateController",["ui.router"]);

var SERVER = 'https://testam-ceva-ana-matei.c9.io'

app.controller('facultateController', function($scope, $http, $state){
	$scope.constructor = function(){
		$http.get(SERVER + '/facultati')
			.then(function(response) {     
			    console.log(response.data)
				$scope.facultati = response.data
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'error'
			})		  	
	}

	$scope.addFacultate = function(facultate){
		$http.post(SERVER + '/facultati',facultate)
			.then(function(response) {     
				$state.go($state.current, {}, {reload: true})
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'could not add facultate'
			})		
	}

    $scope.deleteFacultate = function(facultate){
		$http.delete(SERVER + '/facultati/ ' + facultate.id)
			.then(function(response) {     
				$state.go($state.current, {}, {reload: true})
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'could not delete facultate'
			})		
	}
	
	$scope.selected = {}
	$scope.getTemplate = function(facultate) {
		if (facultate.id === $scope.selected.id){
			return 'edit'
		}  
		else{ 
			return 'display'
		}
	}
	
	$scope.editFacultate = function (facultate) {  
	    $scope.selected = angular.copy(facultate)
	}
	
	 $scope.saveFacultate = function(facultate){
		$http.put(SERVER + '/facultati/' + facultate.id, facultate)
			.then(function(response) {     
				$state.go($state.current, {}, {reload: true})
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'could not save facultate'
			})		
	}

	$scope.constructor();
})