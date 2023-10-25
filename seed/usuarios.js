import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre:'Jared',
        email: 'thespian517@gmail.com',
        password: bcrypt.hashSync('password',10),
        confirmado: 1,
        tipo: 1
    }
]

export default usuarios;