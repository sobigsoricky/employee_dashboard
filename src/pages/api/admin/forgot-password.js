import Admin from "@/models/adminModel";
import connectDB from "@/config/db";
import bcryptjs from 'bcryptjs'

connectDB()

export default async function handler(req, res) {
    const { data } = JSON.parse(req.body)
    try {
        const { email, password } = data

        // check if user exist
        const user = await Admin.findOne({ email })

        console.log(user)

        if (!user) {
            res.status(400).json({ message: 'User does not exist.', success: false })
        }

        // hash new password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // update password
        user.password = hashedPassword

        await user.save();

        return res.status(200).json({ message: 'Password updated successfully.', success: true });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}