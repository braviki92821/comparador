import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Componente = db.define('componentes',{
    nombre:{
        type: DataTypes.STRING(100),
        allowNull:false
    },
    tipo: {
        type: DataTypes.STRING(30),
        allowNull:false
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
})

export default Componente