import mock from 'better-mock/dist/mock.mp'

mock.mock('/mock/test','GET',{
	"code": 200,
	"msg": "success",
	"data|1-10": [{
		"id|+1": 1,
		"name": '@name'
	}]
})