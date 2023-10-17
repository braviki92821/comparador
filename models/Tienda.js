import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Tienda = db.define('tiendas',{
    nombre:{
        type:DataTypes.STRING(30),
        allowNull:false
    }
});

export default Tienda;