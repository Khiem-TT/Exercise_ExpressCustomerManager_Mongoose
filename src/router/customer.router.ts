import {Router} from "express";

const customerRouter = Router();
import {Customer} from "../models/schemas/customer.model";
import multer from "multer";
import {CustomerController} from "../controllers/customer.controller";

const upload = multer();

customerRouter.get('/create', (req, res) => {
    res.render('createCustomer');
});

customerRouter.post('/create', upload.none(), CustomerController.createCustomer);

customerRouter.get('/list', CustomerController.getListCustomer);

customerRouter.get('/update/:id', CustomerController.getUpdateCustomerPage);

customerRouter.post('/update/:id', upload.none(), CustomerController.updateCustomer);

customerRouter.get('/delete/:id', CustomerController.deleteCustomer);
export default customerRouter;