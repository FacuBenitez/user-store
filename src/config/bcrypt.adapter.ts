import bcrypt, { hashSync } from 'bcryptjs';

export const bcryptAdapter = {
    
    hash: (password: string) => {
        const salt = bcrypt.genSaltSync();
        return  hashSync(password, salt);
    },

    compare: (password: string, hash: string) => {
        return bcrypt.compareSync(password, hash);
    }
}