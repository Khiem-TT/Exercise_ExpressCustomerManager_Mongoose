import {Customer} from "../models/schemas/customer.model";
import CustomerRouter from "../router/customer.router";
import e from "express";

export class CustomerController {
    static async createCustomer(req, res) {
        try {
            const newCustomer = new Customer(req.body);
            const customer = await newCustomer.save();
            if (customer) {
                res.render('success');
            } else {
                res.render('error');
            }
        } catch (err) {
            res.render('error');
        }
    }

    static async getListCustomer(req, res) {
        try {
            let page = +req.query.page;
            page = page ? page : 1;
            let limit = 2;
            let offset = Math.ceil((page - 1) * limit);
            const customers = await Customer.find();
            const customerLimit = await Customer.find().limit(limit).skip(offset);
            let totalPage = Math.ceil(customers.length / limit);
            res.render('listCustomer', {customerLimit: customerLimit, numberPage: totalPage, currentPage: page});
        } catch (err) {
            res.render('error');
        }
    }

    static async getUpdateCustomerPage(req, res) {
        try {
            const customer = await Customer.findOne({_id: req.params.id});
            if (customer) {
                res.render('updateCustomer', {customer: customer});
            } else {
                res.render('error');
            }
        } catch (err) {
            res.render('error');
        }
    }

    static async updateCustomer(req, res) {
        try {
            const customer = await Customer.findOne({_id: req.params.id});
            const {name, code, email, phone} = req.body;
            customer.name = name;
            customer.code = code;
            customer.email = email;
            customer.phone = phone;
            await customer.save();
            if (customer) {
                res.render('success');
            } else {
                res.render('error');
            }
        } catch (err) {
            res.render('error');
        }
    }

    static async deleteCustomer(req, res) {
        try {
            const customer = await Customer.findOne({_id: req.params.id});
            if (customer) {
                await customer.deleteOne({_id: req.params.id});
                res.status(200).json({message: 'success!'});
            } else {
                res.render('error');
            }
        } catch (err) {
            res.render('error');
        }
    }
}