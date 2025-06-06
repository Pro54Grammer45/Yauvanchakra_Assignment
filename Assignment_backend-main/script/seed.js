import 'dotenv/config';
import  connectDB  from '../config/db.js';

import Admin from '../models/Admin.js';
import adminData from '../utils/admin.js';

import Customer from '../models/Customer.js';
import customerData from '../utils/customers.js';

import Coupon from '../models/Coupon.js';
import couponData from '../utils/coupon.js';

import Product from '../models/Product.js';
import productData from '../utils/products.js';

import Order from '../models/Order.js';
import orderData from '../utils/orders.js';

import Category from '../models/Category.js';
import categoryData from '../utils/categories.js';

import Language from '../models/Language.js';
import languageData from '../utils/language.js';

import Currency from '../models/Currency.js';
import currencyData from '../utils/currency.js';

import Attribute from '../models/Attribute.js';
import attributeData from '../utils/attributes.js';

import Setting from '../models/Setting.js';
import settingData from '../utils/settings.js';

connectDB();
const importData = async () => {
  try {
    await Language.deleteMany();
    await Language.insertMany(languageData);

    await Currency.deleteMany();
    await Currency.insertMany(currencyData);

    await Attribute.deleteMany();
    await Attribute.insertMany(attributeData);

    // await Customer.deleteMany();
    // await Customer.insertMany(customerData);

    await Admin.deleteMany();
    await Admin.insertMany(adminData);

    await Category.deleteMany();
    await Category.insertMany(categoryData);

    await Product.deleteMany();
    await Product.insertMany(productData);

    await Coupon.deleteMany();
    await Coupon.insertMany(couponData);

    // await Order.deleteMany();
    // await Order.insertMany(orderData);

    // await Setting.deleteMany();
    // await Setting.insertMany(settingData);

    console.log("data inserted successfully!");
    process.exit();
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

importData();
