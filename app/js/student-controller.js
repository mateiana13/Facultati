/*global angular*/
var app = angular.module("studentController",["ui.router"]);

var SERVER = 'https://testam-ceva-ana-matei.c9.io'

app.controller('studentController', function($scope, $http, $state, $stateParams){
	$scope.constructor = function(){
		$http.get(SERVER + '/facultati/' + $stateParams.idFacultate)
			.then(function(response) {     
			    console.log(response.data)
				$scope.facultate = response.data
				return $http.get(SERVER + '/facultati/' + $stateParams.idFacultate + '/studenti')
			})
			.then(function(response){
			console.log(response.data)
			$scope.facultate.studenti = response.data
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'error'
			})		  	
	}

	$scope.addStudent = function(student){
		$http.post(SERVER + '/facultati/' + $stateParams.idFacultate + "/studenti",student)
			.then(function(response) {     
				$state.go($state.current, {}, {reload: true})
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'could not add student'
			})		
	}

    $scope.deleteStudent = function(student){
		$http.delete(SERVER + '/facultati/' + $stateParams.idFacultate + "/studenti/" + student.id)
			.then(function(response) {     
				$state.go($state.current, {}, {reload: true})
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'could not delete student'
			})		
	}
	
	$scope.selected = {}
	$scope.getTemplate = function(student) {
		if (student.id === $scope.selected.id){
			return 'edit'
		}  
		else{ 
			return 'display'
		}
	}
	
	$scope.editStudent = function (student) {  
	    $scope.selected = angular.copy(student)
	}
	
	 $scope.saveStudent = function(student){
		$http.put(SERVER + '/facultati/' + $stateParams.idFacultate + '/studenti/' + student.id, student)
			.then(function(response) {     
				$state.go($state.current, {}, {reload: true})
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'could not save student'
			})		
	}

	$scope.constructor();
})
