var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var	Sequelize = require('sequelize')

var app = express()

app.use(express.static(__dirname + '/app'))
app.use(cors())
app.use(bodyParser.json())

var	sequelize = new Sequelize('nodespa', 'root', '', { dialect : 'mysql', port : 3306}) 

var Facultate = sequelize.define('facultate', {
	numeFacultate : {
		type : Sequelize.STRING,
		validate : {
			len : [1,300]
		},
		allowNull: false
	},
	specializare : {
		type : Sequelize.STRING,
		validate : {
			 len : [1,100]
		},
		allowNull: false
	},
	oras : {
	    type : Sequelize.STRING,
	    validate : {
	        len : [3,50]
	    },
	    allowNull: false
	}
})

var Student = sequelize.define('student',{
	numeStudent : {
		type : Sequelize.STRING,
		validate : {
			 len : [1,200]
		},
		allowNull: false
	},
	an : {
		type : Sequelize.INTEGER,
		validate : {
			len : [1, 2]
		},
		allowNull: false
	},
	telefon : {
	    type : Sequelize.STRING,
	    validate : {
	        len : [6,10]
	    },
	    allowNull: false
	},
	email : {
		type : Sequelize.STRING,
		validate : {
			isEmail:true
		},
		
	}
})

Facultate.hasMany(Student, {foreignKey : 'idFacultate'})
Student.belongsTo(Facultate, {foreignKey : 'idFacultate'})

app.get('/create', function(req, res){
	sequelize
		.sync({ 
			force: true             
		})
		.then(function(){
			res.status(201).send('created')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.get('/facultati', function(req, res) {
	Facultate
		.findAll({attributes : ['id','numeFacultate','specializare', 'oras']})
		.then(function(facultati){
			res.status(200).send(facultati)
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.get('/facultati/:id', function(req, res) {
	var id = req.params.id
	Facultate
		.find({where : {id : id},attributes : ['id','numeFacultate','specializare', 'oras']})
		.then(function(facultate){
			res.status(200).send(facultate)
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.post('/facultati',function(req,res){
	Facultate
		.create(req.body)
		.then(function(){
			res.status(201).send('created')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.put('/facultati/:id',function(req,res){
	var id = req.params.id
	Facultate
		.find({where : {id : id}})
		.then(function(facultate){
			return facultate.updateAttributes(req.body)
		})
		.then(function(){
			res.status(201).send('updated')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.delete('/facultati/:id',function(req,res){
	var id = req.params.id
	Facultate
		.find({where : {id : id}})
		.then(function(facultate){
			facultate.destroy()
		})
		.then(function(){
			res.status(201).send('updated')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})



app.get('/facultati/:id/studenti', function(req, res) {
	var id = req.params.id
	Facultate
		.find({where : {id : id}, include : [Student]})
		.then(function(facultate){
			return facultate.getStudents()          
		})
		.then(function(studenti){
			console.warn(studenti)
			res.status(200).send(studenti)
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('error')
		})
})





app.post('/facultati/:id/studenti', function(req, res) {
	var id = req.params.id
	Facultate
		.find({where : {id : id}})
		.then(function(facultate){
			return Student.create({
				numeStudent : req.body.numeStudent,
				an : req.body.an,
				telefon : req.body.telefon,
				email : req.body.email,
				idFacultate : facultate.id
			})
		})
		.then(function(studenti){
			res.status(201).send('created')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('error')
		})
})


app.put('/facultati/:id/studenti/:sId', function(req, res) {
	var sId = req.params.sId
	Student
		.find({where : {id : sId}})
		.then(function(student){
			student.numeStudent = req.body.numeStudent
			student.an = req.body.an
			student.telefon = req.body.telefon
			student.email = req.body.email
			return student.save(['numeStudent', 'an', 'telefon', 'email'])     
		})
		.then(function(){
			res.status(201).send('updated')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})


app.delete('/facultati/:id/studenti/:sId', function(req, res) {
	var sId = req.params.sId
	Student
		.find({where : {id : sId}})
		.then(function(student){
			student.destroy()
		})
		.then(function(){
			res.status(201).send('deleted')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.listen(8080)