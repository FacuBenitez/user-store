import { Request,Response } from "express"
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain"
import { AuthService } from "../services/auth.service"



export class AuthController {
    
    constructor(
        public readonly authService:AuthService
    ) {
    }

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message })
        }
        else{

            return res.status(500).json({ message: 'Internal server error' })
        }
    }

 
    registerUser = (req: Request, res: Response ) => {
        const [error, registerDto] = RegisterUserDto.create(req.body)

        if (error) return res.status(400).json(error)

        this.authService.registerUser(registerDto!)
        .then( (user) => res.json(user) )
        .catch( error => this.handleError(error, res) );
    }

    loginUser = (req: Request, res: Response ) => {
        const [error, loginUserDto] = LoginUserDto.login(req.body)
        if (error) return res.status(400).json(error)

        this.authService.loginUser(loginUserDto!)
        .then( (user) => res.json(user) )
        .catch( error => this.handleError(error, res) );
        

    }

    validateEmail = (req: Request, res: Response ) => {

        const { token } = req.params

        this.authService.validateEmail( token )
        .then( () => res.json('Email was validated successfully') )
        .catch( error => this.handleError(error, res) );

    }
     
}