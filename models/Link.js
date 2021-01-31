const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    initial: { type: String, required: true },
    short: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'User', required: true }
});

module.exports = model('Link', schema);