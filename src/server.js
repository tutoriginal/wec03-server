/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ancoulon <ancoulon@student.s19.be>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/30 12:10:36 by ancoulon          #+#    #+#             */
/*   Updated: 2020/05/04 13:37:27 by ancoulon         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

require('dotenv').config();
const config = require('../config');
const net = require('net');
const mongoose = require('mongoose');
const api = require('./api');
const Entry = require('./Entry');

mongoose.connect(config.mongo.uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const server = net.createServer(socket => {

	var to = config.timeout ? setTimeout(() => {
		socket.write('too late\n');
		socket.end();
	}, config.timeout) : null;

	var user = {
		login: null,
		hash: null,
		code: null,
	}

	socket.on('data', data => {

		const message = data.toString();

		switch (message.substring(0, 2)) {

			case '? ':
				const content = message.substr(2).split(' ');
				if (content.length != 2) return endConnection(socket, 'invalid data');
				const hash = parseInt(content[1]);
				if (isNaN(hash)) return endConnection(socket, 'invalid data');
				api.SearchUser(content[0], (err, valid) => {
					if (err) return endConnection(socket, 'internal error');
					if (!valid) return endConnection(socket, 'invalid data');
					user.login = content[0];
					user.hash = hash;
					user.code = parseInt(Math.random() * 46340, 10);
					socket.write('= ' + user.code + '\n');
				});
				break;

			case '! ':
				if (!user.login) return endConnection(socket, 'invalid data');
				var res = parseInt(message.substr(2).split(' '));
				if (res === NaN) return endConnection(socket, 'invalid data');
				if (res != Math.pow(user.code, 2)) return endConnection(socket, 'invalid data');
				if (config.log) console.log("new valid entry by: " + user.login + " with hash: " + user.hash);
				if (!config.save) return endConnection(socket, 'success');
				Entry.findOneAndUpdate({ login: user.login }, { hash: user.hash, created_at: Date.now() }, (err0, doc0) => {
					if (err0) return endConnection(socket, 'internal error');
					if (doc0) return endConnection(socket, 'success');
					Entry.create({ login: user.login, hash: user.hash, created_at: Date.now() }, (err1, doc1) => {
						if (err1) return endConnection(socket, 'internal error');
						return endConnection(socket, 'success');
					});
				});
				break;

			default:
				endConnection(socket, 'invalid data');
				break;

		}

		socket.on('end', () => {
			clearTimeout(to);
			return;
		});

		socket.on('close', () => {
			clearTimeout(to);
			return;
		});

		socket.on('error', () => {
			clearTimeout(to);
			return;
		});

	});

});

server.listen(config.server.port);

function endConnection(socket, message) {
	socket.write(message + '\n');
	socket.end();
}
