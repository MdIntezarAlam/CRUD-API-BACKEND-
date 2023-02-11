import User from "../module/userModule.js"
import bcrypt from 'bcrypt'

//get all user
export const getAllUser = async (req, res) => {
    try {
        const user = await User.find()
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "user is...",
                user
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//signup user
export const postUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(421).json({
                success: false,
                message: "All field is required"

            })
        }
        let user = await User.findOne({ email })
        if (user) {
            return res.status(422).json({
                success: false,
                message: "This Email is Already exist"

            })
        }
        user = await new User({ name, email, password })
        await user.save()
        return res.status(200).json({
            success: false,
            message: "user added successfully",
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//update user by id
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(421).json({
                success: false,
                message: "All field is required"

            })
        }
        let user = await User.findByIdAndUpdate(id, { name, email, password })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "user updated succesfully..",
                user
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//delete  user by id

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        else {
            return res.status(200).json({
                success: true,
                message: "user deleted succesfully..",
                user
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(421).json({
                success: false,
                message: "All field is required"

            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(422).json({
                success: false,
                message: "user not found"
            })
        } else if (user) {
            const isMatchPassword = await bcrypt.compare(password, user.password)
            if (!isMatchPassword) {
                return res.status(422).json({
                    success: false,
                    message: "Invalid Login details"
                })
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: "user logined successfully",
                })
            }
        }

    } catch (error) {

    }
}