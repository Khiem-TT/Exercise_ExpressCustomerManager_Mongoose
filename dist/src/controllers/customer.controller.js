"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const customer_model_1 = require("../models/schemas/customer.model");
class CustomerController {
    static async createCustomer(req, res) {
        try {
            const newCustomer = new customer_model_1.Customer(req.body);
            const customer = await newCustomer.save();
            if (customer) {
                res.render('success');
            }
            else {
                res.render('error');
            }
        }
        catch (err) {
            res.render('error');
        }
    }
    static async getListCustomer(req, res) {
        try {
            let page = +req.query.page;
            page = page ? page : 1;
            let limit = 2;
            let offset = Math.ceil((page - 1) * limit);
            const customers = await customer_model_1.Customer.find();
            const customerLimit = await customer_model_1.Customer.find().limit(limit).skip(offset);
            let totalPage = Math.ceil(customers.length / limit);
            res.render('listCustomer', { customerLimit: customerLimit, numberPage: totalPage, currentPage: page });
        }
        catch (err) {
            res.render('error');
        }
    }
    static async getUpdateCustomerPage(req, res) {
        try {
            const customer = await customer_model_1.Customer.findOne({ _id: req.params.id });
            if (customer) {
                res.render('updateCustomer', { customer: customer });
            }
            else {
                res.render('error');
            }
        }
        catch (err) {
            res.render('error');
        }
    }
    static async updateCustomer(req, res) {
        try {
            const customer = await customer_model_1.Customer.findOne({ _id: req.params.id });
            const { name, code, email, phone } = req.body;
            customer.name = name;
            customer.code = code;
            customer.email = email;
            customer.phone = phone;
            await customer.save();
            if (customer) {
                res.render('success');
            }
            else {
                res.render('error');
            }
        }
        catch (err) {
            res.render('error');
        }
    }
    static async deleteCustomer(req, res) {
        try {
            const customer = await customer_model_1.Customer.findOne({ _id: req.params.id });
            if (customer) {
                await customer.deleteOne({ _id: req.params.id });
                res.status(200).json({ message: 'success!' });
            }
            else {
                res.render('error');
            }
        }
        catch (err) {
            res.render('error');
        }
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map