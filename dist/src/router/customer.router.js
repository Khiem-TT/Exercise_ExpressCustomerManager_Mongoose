"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerRouter = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const customer_controller_1 = require("../controllers/customer.controller");
const upload = (0, multer_1.default)();
customerRouter.get('/create', (req, res) => {
    res.render('createCustomer');
});
customerRouter.post('/create', upload.none(), customer_controller_1.CustomerController.createCustomer);
customerRouter.get('/list', customer_controller_1.CustomerController.getListCustomer);
customerRouter.get('/update/:id', customer_controller_1.CustomerController.getUpdateCustomerPage);
customerRouter.post('/update/:id', upload.none(), customer_controller_1.CustomerController.updateCustomer);
customerRouter.get('/delete/:id', customer_controller_1.CustomerController.deleteCustomer);
exports.default = customerRouter;
//# sourceMappingURL=customer.router.js.map