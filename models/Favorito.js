import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Favorito = db.define('favoritos', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    idProducto: {
        type: DataTypes.STRING
    }
})


export default Favorito