import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data/mongo";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
        
    
    constructor(
        private readonly emailService:EmailService 
    ) { }


    public async registerUser (RegisterUserDto: RegisterUserDto) {
        
        const existUser = await UserModel.findOne({ email: RegisterUserDto.email });
        if (existUser) { throw CustomError.badRequest( 'The email already exist' ); }
        
        try {
            const user = new UserModel(RegisterUserDto);
            
            user.password = bcryptAdapter.hash( RegisterUserDto.password );
            
            await user.save();

            await this.sendEmailValidationLink( user.email );
            
            const { password, ...userEntity } = UserEntity.fromObject(user);

            const token = await JwtAdapter.generateToken({ id: user.id });
            if ( !token ) throw CustomError.internalServerError('Error while creating JWT');


            return{
                user: userEntity,
                token:token
            }

        } catch (error) {

            throw CustomError.internalServerError( `${error}` );
        }

    }

    public async loginUser(loginUserDto: LoginUserDto) {

        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) { throw CustomError.badRequest( 'The user does not exist' ); }

        const isValidPassword = bcryptAdapter.compare( loginUserDto.password, user.password );
       
       
        if (!isValidPassword) { throw CustomError.badRequest( 'The password is not valid' ); }

            const { password, ...userEntity } = UserEntity.fromObject(user);

            const token = await JwtAdapter.generateToken({id: user.id});

            if (!token) { throw CustomError.internalServerError( 'Token not generated' ); }

            return{
                user: userEntity,
                token:token,
            }

        
    }
    

    private sendEmailValidationLink = async( email:string ) => {
    
        const token = await JwtAdapter.generateToken( { email } );

        if (!token) { throw CustomError.internalServerError( 'Token not generated' ); }
        
        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

        const html = `
        <h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href="${ link }">Validate your email: ${ email }</a>
      `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody:html,
        }
        const isSent = await this.emailService.sendEmail(options);

        if (!isSent) { throw CustomError.internalServerError( 'Email not sent' ); } 

        return true;

    }


public validateEmail = async(token:string) => {

  const payload = await JwtAdapter.validateToken(token);
  console.log(payload);
  if ( !payload ) throw CustomError.unauthorized('Invalid token');

  const { email } = payload as { email: string };
  console.log(email)
  if ( !email ) throw CustomError.internalServerError('Email not in token');

  const user = await UserModel.findOne({ email });
  if ( !user ) throw CustomError.internalServerError('Email not exists');

  user.emailValidated = true;
  await user.save();

  return true;
}

}