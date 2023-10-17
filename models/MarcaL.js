import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const MarcaL = db.define('marcasLaptop',{
    nombre:{
        type:DataTypes.STRING(30),
        allowNull:false
    }
});

export default MarcaL;