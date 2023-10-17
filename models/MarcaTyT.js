import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const MarcaTyT = db.define('marcastyt',{
    nombre:{
        type:DataTypes.STRING(30),
        allowNull:false
    }
});

export default MarcaTyT;