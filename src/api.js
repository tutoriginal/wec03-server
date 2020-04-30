/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   api.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ancoulon <ancoulon@student.s19.be>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/30 12:24:13 by ancoulon          #+#    #+#             */
/*   Updated: 2020/04/30 16:50:51 by ancoulon         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const config = require('../config');
const request = require('request');

const token_url = "https://api.intra.42.fr/oauth/token?client_id=" + config.api.uid + "&client_secret=" + config.api.secret + "&grant_type=client_credentials"

function requestToken(callback) {
	request.post(token_url, (err, res) => {
		if (err) return callback(null);
		return callback(JSON.parse(res.body).access_token);
	});
}

function SearchUser(login, callback) {
	requestToken(token => {
		if (token) {
			request.get('https://api.intra.42.fr/v2/campus/12/users?filter[login]=' + login + "&access_token=" + token,
				(err, res) => {
					if (err) return callback(true, null);
					return callback(false, JSON.parse(res.body).length > 0);
				});
		} else {
			return callback(true, null);
		}
	});
}

module.exports.SearchUser = SearchUser;
