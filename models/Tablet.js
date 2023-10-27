import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Tablet = db.define('tablets',{

    nombre:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    procesador:{
        type: DataTypes.STRING(30),
        allowNull: false   
    },    
    memoriaRam: {
        type: DataTypes.STRING(30),
        allowNull: false        
    },
    almacenamiento: {
        type: DataTypes.STRING(30),
        allowNull: false        
    },
    bateria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    camaraF:{
        type: DataTypes.STRING(30),
        allowNull: false        
    },
    camaraT:{
        type: DataTypes.STRING(30),
        allowNull: false        
    },
    precio:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    imagen:{
        type:DataTypes.STRING,
        allowNull:false
    },
    oferta:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    descuento: {
        type: DataTypes.INTEGER,
        defaultValue: 0  
    }   
    
},{
    scopes:{
        eliminarCreatedUpdated:{
            attributes:{
            exclude:['createdAt','updatedAt' ]
            }
        }
    }
});

export default Tablet