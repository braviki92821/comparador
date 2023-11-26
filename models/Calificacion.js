import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Calificacion = db.define('calificaciones', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    valor: {
        type: DataTypes.INTEGER,
    },
    opinion: {
        type: DataTypes.TEXT
    }
})


export default Calificacion