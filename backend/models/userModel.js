import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_staff: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10); //whatever number you want
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

beforeCreate: async function(user) {
    const salt = await bcrypt.genSalt(10); //whatever number you want
    user.password = await bcrypt.hash(user.password, salt);
}
User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

**/
export default User;
