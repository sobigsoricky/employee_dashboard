import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: [true, 'Provide team name.']
    },
    members: [
        {
            type: String
        }
    ],
    managers: [
        {
            type: String
        }
    ],
    teamDesc: {
        type: String,
    }
})

const Team = mongoose.models.teams || mongoose.model('teams', teamSchema)

export default Team