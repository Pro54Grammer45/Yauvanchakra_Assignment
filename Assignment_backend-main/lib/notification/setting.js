import { mongo_connection } from "../../config/db.js"; // CCDev
import Setting from "../../models/Setting.js";

const getGlobalSetting = async (data) => {
  try {
    console.log("getGlobalSetting>");

    const globalSetting = await Setting.findOne({
      name: "globalSetting",
    });
    return globalSetting?.setting;
  } catch (err) {
    console.log("err when getting global setting", err.message);
  }
};

const getStoreCustomizationSetting = async (data) => {
  try {
    const storeCustomizationSetting = await Setting.findOne({
      name: "storeCustomizationSetting",
    });
    return storeCustomizationSetting?.setting;
  } catch (err) {
    console.log("err when storeCustomizationSetting setting", err.message);
  }
};

export { getGlobalSetting, getStoreCustomizationSetting };
