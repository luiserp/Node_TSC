import jwt from "jsonwebtoken";

export const generearJWT = ( uid:string )=>{
    return new Promise( (res, rej) => {

        const payload = { uid }

        jwt.sign(payload, process.env.SECRETKEY || 'SECRETKEY159!', {
            expiresIn: '4h'
        }, (err, token) =>{
            if(err){
                rej(err);                
            }
            res(token)
        });
    });
}