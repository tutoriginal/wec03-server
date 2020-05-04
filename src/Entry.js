/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Entry.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ancoulon <ancoulon@student.s19.be>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/30 14:32:16 by ancoulon          #+#    #+#             */
/*   Updated: 2020/05/02 11:35:53 by ancoulon         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
	login: {
		type: String,
		required: true
	},
	hash: {
		type: Number,
		required: true
	},
	created_at:
	{
		type: Date,
		required: true
	}
}, { collection: 'entries' });

module.exports = mongoose.model("Entry", entrySchema);