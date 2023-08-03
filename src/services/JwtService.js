const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const genneralAcccessToken = (payload) => {
    const access_Token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '30s' })
    return access_Token
}

const genneralRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    return refresh_token
}



const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("token", token)
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: "Error",
                        message: "The authentication token",
                    })
                }
                const { payload } = user
                const access_token = await genneralAcccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
                })
                resolve({
                    status: 'Ok',
                    message: "Thành công",
                    access_token
                })
            })

        } catch (err) {
            reject(err);
        }
    })
}




module.exports = {
    genneralAcccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}