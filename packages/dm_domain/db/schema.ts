import { DataTypes } from "sequelize";
import { sequelize } from "./database";

const Timestamps = {
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
};

export const User = sequelize.define("user", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ...Timestamps,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // Money is stored in cents.
    money: {
        type: DataTypes.BIGINT({ unsigned: true }),
        allowNull: false,
        defaultValue: 0,
    },
    role: {
        type: DataTypes.ENUM("USER", "ADMIN"),
        allowNull: false,
        defaultValue: "USER",
    },
    last_active: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    experience_points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    is_banned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

export const Vehicle = sequelize.define("vehicle", {
    vehicle_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ...Timestamps,
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    plate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color_hex: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export const WeaponUnlock = sequelize.define("weapon_unlock", {
    weapon_unlock_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ...Timestamps,
    weapon_hash: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    active_tint_unlock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export const TintUnlock = sequelize.define("tint_unlock", {
    tint_unlock_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ...Timestamps,
    tint_index: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_mk2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export const Team = sequelize.define("team", {
    team_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ...Timestamps,
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    color_hex: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

sequelize.sync();
