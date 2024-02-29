import mongoose from 'mongoose'

const coloumSchema = new mongoose.Schema({
    columnName: {
        type: String,
        required: [true, 'Column is required.']
    },

    color: {
        type: String,
    },

    tasks: [{ type: String }]
})

const Column = mongoose.models.columns || mongoose.model('columns', coloumSchema);

export default Column