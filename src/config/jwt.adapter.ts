
import { envs } from "./envs"

import jwt from 'jsonwebtoken'


export class JwtAdapter {


    static generateToken( payload: any, duration: string = '2' ) {
       
        return new Promise((resolve) => {

            jwt.sign(
                payload,
                envs.JWT_SEED,
                {
                    expiresIn: duration + 'd'
                },
                (err, token) => {
                    if(err) {
                        console.log(err);
                        resolve(null)
                    }
                    resolve(token)
                })
            
        })


    }


    static validateToken< T >( token: string ):Promise < T | null > {
        
        return new Promise((resolve) => {
            jwt.verify(
                token,
                envs.JWT_SEED,
                (err, decoded) => {
                    if(err) {
                      return resolve(null)
                    }
                    resolve(decoded as T)
                }
            )
        })


    }


}