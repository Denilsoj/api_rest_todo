import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

export default class User extends Model {

    static init(sequelize){
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Campo nome tem que ter entre 3 a 255 caracteres',
                    },
                },
            },
            email: {
                type: Sequelize.STRING,
                allowNull: '',
                unique: {
                    msg: 'Email já existe',
                },
                validate: {
                    isEmail: 'Email inválido',
                }
            }, 
            password_hash: {
                type: Sequelize.STRING, 
                allowNull: '',
            }, 
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue: '', 
                validate: {
                    len: {
                        args: [3, 50], 
                        msg: 'A senha tem quer entre 3 a 50 caracteres'
                    }
                }
            }

        }, {
            sequelize
        });
        
        this.addHook('beforeCreate', async (user) => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8);
            }

        })

        return this;
    }

}