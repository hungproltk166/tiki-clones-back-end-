const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: "Error",
                message: "Lỗi"
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "Error",
                message: "Lỗi nhập email"
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: "Error",
                message: "Xác nhận mật khẩu không khớp"
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}


const loginUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: "Error",
                message: "Lỗi"
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "Error",
                message: "Lỗi nhập email"
            })
        }
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}


const UpdateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(404).json({ message: "UserID not found" })
        }

        const response = await UserService.UpdateUser(userId, data)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}

const DeteleUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(404).json({ message: "UserID not found" })
        }

        const response = await UserService.DeteleUser(userId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}


const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(404).json({ message: "UserID not found" })
        }

        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}


const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1]
        if (!token) {
            return res.status(404).json({ message: "The token is reqired" })
        }

        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}



module.exports =
{
    createUser,
    loginUser,
    UpdateUser,
    DeteleUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}