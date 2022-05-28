const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// User Register and Auto Login API
router.post('/register', async (req, res) => {
    const {
        username,
        password,
        firstname,
        lastname,
        phoneNuber,
    } = req.body

    // hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Check username 
    const checkUsername = await User.findOne({
        username: username
    })
    if (!username || !password) {
        return res
            .status(400)
            .json({
                message: "please complete information!"
            })
    } else {
        if (checkUsername) {
            return res
                .status(400)
                .json({
                    message: username + "already exists"
                })
        }
        if (username.length < 8 || password.length < 8) {
            return res
                .status(422)
                .json({
                    message: "username and password must be 8 characters"
                })
        }
    }

    const user = new User({
        username: username,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
        phoneNuber: phoneNuber
    })
    try {
        const insertUsertoDatabase = user.save()
            .then(async(result) => {
                const validUsername = await User.findOne({ username: username })
                const validPassword = await bcrypt.compare(password, validUsername.password)
                if (!validUsername || !validPassword) {
                    return res
                        .status(400)
                        .json({
                            message: "username or password is invalid"
                        })
                }
                if(validUsername && validPassword){
                    let payload = {_id: validUsername._id, per_mis:"user"}
                    const accToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
                    const refToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_LIFT,
                        {
                            algorithm:"HS2565",
                            expiresIn: 300,
                        })
                    res.json({
                        AccessToken: accToken,
                        RefreshToken: refToken,
                        message: "register and login success",
                        username: username,
                    })
                }
                else{
                    return res
                        .status(422)
                        .json({
                            error:"เกิดข้อผิดพลาด"
                        })
                }
            })
            .catch((err) =>{
                console.log(err)
                res.status(400).json({
                    error: error
                })
            })
    }catch(err){
        console.log("error register", err)
        res.status(400).json(err)
    }
});

module.exports = router