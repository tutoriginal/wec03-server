const config = {
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
	timeout: ParseInt(process.env.TIMO),
	log: process.env.LOG

};


module.exports = config;
