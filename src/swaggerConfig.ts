const options = {
	definition: {
		openapi: '3.1.0',
		info: {
			title: 'Re:Mind API Swagger',
			version: '0.1.0',
			description: 'This is the documentation for Re:Mind RESTful API.',
			// license: {
			// 	name: '',
			// 	url: '',
			// },
			// contact: {
			// 	name: '',
			// 	url: '',
			// 	email: '',
			// },
		},
		servers: [
			{
				url: 'http://localhost:3001',
			},
		],
	},
	apis: ['./routes/**/*.ts', './entities/*.ts'],
}

export default options
