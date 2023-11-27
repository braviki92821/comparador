import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const SO = db.define('sistemaOperativo',{
    nombre: {
        type:DataTypes.STRING(30),
        allowNull:false
    },
    tipo: {
        type:DataTypes.STRING(30),
        allowNull:false
    },
});

export default SO;