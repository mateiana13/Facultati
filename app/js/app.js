/*global angular*/
var app = angular.module("myApp", [
	'ui.router',
	'facultateController',
	'studentController'
	])
 
app.config(function($stateProvider, $urlRouterProvider) {   	
	$urlRouterProvider.otherwise("/facultati")
	$stateProvider
		.state('facultati', {
			url: "/facultati",
			templateUrl:'templates/facultate.html',
			controller:'facultateController'
		})
		.state('studenti', {
			url: "/facultati/:idFacultate",
			templateUrl:'templates/student.html',
			controller:'studentController'
		})
})
