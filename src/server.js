/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ancoulon <ancoulon@student.s19.be>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/30 12:10:36 by ancoulon          #+#    #+#             */
/*   Updated: 2020/04/30 17:44:01 by ancoulon         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

require('dotenv').config();
const config = require('../config');
const net = require('net');
const mongoose = require('mongoose');
const api = require('./api');
const Entry = require('./Entry');

mongoose.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const server = net.createServer(socket => {

	var to = setTimeout(() => {
		socket.write('too late\n');
		socket.end();
	}, 3000);

	socket.on('close', () => {
		clearTimeout(to);
		return;
	});

	var login = null;
	var hash = null;
	var code = null;
	var res = null;

	socket.on('data', data => {

		const message = data.toString();

		if (message.startsWith('? ')) {

			const content = message.substr(2).split(' ');
			login = content[0];
			hash = parseInt(content[1]);

			if (!login || !hash || hash === NaN) {
				socket.write('invalid data\n');
				return socket.end();
			}

			api.SearchUser(login, (err, valid) => {
				if (err) {
					socket.write('internal error\n');
					return socket.end();
				} else if (!valid) {
					socket.write('invalid data\n');
					return socket.end();
				} else {
					code = parseInt(Math.random() * 46340, 10);
					socket.write('= ' + code + '\n');
				}
			});

		} else if (message.startsWith('! ') && login) {

			res = parseInt(message.substr(2).split(' '));
			if (res === NaN) {
				socket.write('invalid data\n');
				return socket.end();
			}

			if (res == Math.pow(code, 2)) {

				Entry.findOneAndUpdate({ login: login }, { hash: hash, created_at: Date.now() }, (err, doc) => {
					if (err) {
						socket.write('internal error\n');
						return socket.end();
					} else if (doc) {
						socket.write('success\n');
						return socket.end();
					} else {
						Entry.create({ login: login, hash: hash, created_at: Date.now() }, (err2, doc2) => {
							if (err) {
								socket.write('internal error\n');
								return socket.end();
							} else {
								socket.write('success\n');
								return socket.end();
							}
						});
					}
				});

			} else {
				socket.write('invalid data\n');
				return socket.end();
			}

		} else {
			socket.write('invalid data\n');
			return socket.end();
		}

	});
});

server.listen(config.server.port);
