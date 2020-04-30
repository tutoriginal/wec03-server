const config = {
	api: {
		uid: process.env.API_UID,
		secret: process.env.API_SECRET
	},
	mongo: {
		uri: process.env.MONGO_URI
	},
	server: {
		port: 1942
	}
};

module.exports = config;