import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Laptop = db.define('laptops',{

    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    procesador: {
        type: DataTypes.STRING(30),
        allowNull: false        
    },
    grafica:{
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
    interfaz:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    precio:{
        type: DataTypes.DOUBLE,
        allowNull: false
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

export default Laptop