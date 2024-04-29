import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })
    
    res.cookie('jwt',token,{
        // name of cookie is jwt
        // value of cookie is token
        // options for the cookie
        // To change this cookie, we need to send a new cookie with the same name
        maxAge: 15*24*60*60*1000, //15days; this is in milliseconds
        httpOnly: true, //so that the cookie cannot be accessed by client side scripts
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development', //cookie will only be set in https in production
    })
}  

export default generateTokenAndSetCookie;