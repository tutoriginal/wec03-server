const production = {
	api: {
		uid: process.env.API_UID,
		secret: process.env.API_SECRET
	},
	mongo: {
		uri: process.env.MONGO_URI
	},
	server: {
		port: process.env.PORT
	},
	save: process.env.SAVE,
	timeout: process.env.TIMO,
	log: process.env.LOG

};

const developement = {
	api: {
		uid: process.env.API_UID,
		secret: process.env.API_SECRET
	},
	mongo: {
		uri: process.env.MONGO_URI
	},
	server: {
		port: process.env.PORT
	},
	save: process.env.SAVE,
	timeout: process.env.TIMO,
	log: process.env.LOG

}

module.exports = process.env.NODE_ENV == 'production' ? production : developement;
