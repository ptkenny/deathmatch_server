import fs from "fs";

const WEAPON_DATA = JSON.parse(fs.readFileSync("/server/weapon_data.json").toString());

export const getAllWeaponData = () => WEAPON_DATA;

export const getWeaponGroups = () => {
    const weaponData = getAllWeaponData();
    return new Set(weaponData.map((weapon: any) => weapon.Group));
};

export const getWeaponDataByHash = (hash: string) => {
    const weaponData = getAllWeaponData();
    // Based on key
    return weaponData[hash];
};

export const getWeaponDataFromHashKey = (hashKey: string) => {
    const weaponData = getAllWeaponData();
    return weaponData.find((weapon: any) => weapon.HashKey === hashKey);
};

export const getWeaponDataByGroup = (group: string) => {
    const weaponData = getAllWeaponData();
    return weaponData.filter((weapon: any) => weapon.Group === group);
};
