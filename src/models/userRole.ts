import { Model, DataTypes, Sequelize } from 'sequelize';

 interface userRoleAttributes{
    role_id:number;
    user_id:number;
    created_at?: Date;
    updated_at?: Date;
    

 }

class UserRole extends Model<userRoleAttributes> implements userRoleAttributes {
public role_id!:number;
user_id!:number;
created_at?: Date;
updated_at?: Date;

static initialize(sequelize: Sequelize){
   UserRole.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            
          },
          role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Roles',
                key: 'id',
            },
          },
          created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
          updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
   },

   {
    modelName: 'UserRole',
    sequelize,
    timestamps: false, // Enable timestamps
    underscored: true,
    tableName: 'UserRoles', // Ensure this matches your actual table name
  
   },

);
}

}


export default UserRole;