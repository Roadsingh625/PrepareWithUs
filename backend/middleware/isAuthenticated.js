const jwt = require('jsonwebtoken')
const User = require('../model/user')
const isAuthenticated = (req, res, next) => {
    const { token } = req.headers
    jwt.verify(token,"Pasowrd1232", (err, userToken) => {
        if (err)
            res.status(401).json({ msg: "Invalid User" })
        else {
            req.user = userToken
            next()
        }
    })

}
module.exports = { isAuthenticated }