import mongoose from 'mongoose';

const workReportSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    cc: [
        {
            type: String,
            required: true
        }
    ],
    work: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const WorkReport = mongoose.models.WorkReport || mongoose.model('WorkReport', workReportSchema);

export default WorkReport;
