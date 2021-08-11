'use strict';

const moment = require('moment');
module.exports = app => {
    const DataTypes = app.Sequelize;
    const t_user = app.model.define('t_user', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: ''
        },
        password: {
            type: DataTypes.STRING(16),
            allowNull: false,
            defaultValue: ''
        },
        last_login_time: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        Inviter: {
            type: DataTypes.STRING(11),
            allowNull: true,
            defaultValue: ''
        },
        key: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        created_at: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            get() { return this.getDataValue('updated_at') == null ? null : moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss'); }
        },
        updated_at: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            get() { return this.getDataValue('updated_at') == null ? null : moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss'); }
        },
        deleted_at: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    }, {
        tableName: 't_user', // 表名
        freezeTableName: false, // 给表名加复数
        timestamps: true, // 启用时间戳
        paranoid: true, // 开启假删除
        underscored: true, //将自动设置所有属性的字段参数为下划线命名方式.
    });
    return t_user;
};
