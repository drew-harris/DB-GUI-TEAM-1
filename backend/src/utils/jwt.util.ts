import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config()

const privateKey = process.env.PRIVATE_KEY 

export function signJwt(object: Object) {
    
    return jwt.sign(object, privateKey)
}

export function verifyJWT(token: string) {

    try {
        const decoded = jwt.verify(token, privateKey)

        return {
            valid: true,
            decoded
        }
    } catch (e) {
        console.log(e)

        return {
            valid: false,
            decoded: null
        }
    }
}