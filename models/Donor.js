import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Donor = sequelize.define('Donor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bloodGroup: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  region: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  verificationStatus: {
    type: DataTypes.STRING,
    defaultValue: 'Pending' // Requires admin approval to become 'Active'/'Verified'
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'donors',
  timestamps: true
});

export default Donor;