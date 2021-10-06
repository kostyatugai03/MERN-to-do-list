const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    task: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    } 
})

module.exports = model('ToDoData', schema)