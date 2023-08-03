const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { genneralAcccessToken, genneralRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({ email: email })
            if (checkUser !== null) {
                resolve({
                    status: "ok",
                    message: "Email đã tồn tại",
                })
            }

            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })

            if (createdUser) {
                resolve({
                    status: 'Ok',
                    message: "User created successfully",
                    data: createdUser
                })
            }
        } catch (err) {
            reject(err);
        }
    })
}


const loginUser = (UserLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = UserLogin
        try {
            const checkUser = await User.findOne({ email: email })
            if (checkUser === null) {
                resolve({
                    status: "ok",
                    message: "Người dùng không tồn tại",
                })
            }


            const comparePassword = bcrypt.compareSync(password, checkUser.password)


            if (!comparePassword) {
                resolve({
                    status: "ok",
                    message: "Mật khẩu hoặc tài khoản không đúng",
                })
            }

            const access_token = await genneralAcccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            })


            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            })

            resolve({
                status: 'Ok',
                message: "Thành công",
                access_token,
                refresh_token
            })
        } catch (err) {
            reject(err);
        }
    })
}


const UpdateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });

            if (checkUser === null) {
                resolve({
                    status: "ok",
                    message: "Người dùng không tồn tại",
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'Ok',
                message: "Thành công",
                data: updatedUser
            })
        } catch (err) {
            reject(err);
        }
    })
}


const DeteleUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });

            if (checkUser === null) {
                resolve({
                    status: "ok",
                    message: "Người dùng không tồn tại",
                })
            }

            await User.findByIdAndDelete(id);

            resolve({
                status: 'Ok',
                message: "Thành công",
            })
        } catch (err) {
            reject(err);
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();

            resolve({
                status: 'Ok',
                message: "Thành công",
                data: allUser
            })
        } catch (err) {
            reject(err);
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ _id: id });

            if (user === null) {
                resolve({
                    status: "ok",
                    message: "Người dùng không tồn tại",
                })
            }


            resolve({
                status: 'Ok',
                message: "Thành công",
                data: user
            })
        } catch (err) {
            reject(err);
        }
    })
}


module.exports =
{
    createUser,
    loginUser,
    UpdateUser,
    DeteleUser,
    getAllUser,
    getDetailsUser
}
