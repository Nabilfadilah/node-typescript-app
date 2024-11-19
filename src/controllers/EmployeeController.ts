import { RequestHandler } from "express";
import { EmployeeModel } from "../models/EmployeeModel";

class EmployeeController {
    // Get all employees
    getAllEmployee: RequestHandler = async (req, res) => {
        try {
            const employees = await EmployeeModel.find();
            res.status(200).json({ data: employees });
        } catch (error) {
            res.sendStatus(400);
        }
    };

    // Get employee by ID
    getEmployee: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const employee = await EmployeeModel.findById(id);
            if (!employee) {
                res.status(404).json({ message: "Employee not found" });
            } else {
                res.status(200).json({ data: employee });
            }
        } catch (error) {
            res.sendStatus(400);
        }
    };

    // Create employee
    createEmployee: RequestHandler = async (req, res) => {
        try {
            const { name, email, mobile, dob, doj } = req.body;
            const employee = new EmployeeModel({ name, email, mobile, dob, doj });
            await employee.save();
            res.status(201).json({ message: "Employee Created", data: employee });
        } catch (error) {
            res.sendStatus(400);
        }
    };

    // Update employee
    updateEmployee: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, mobile, dob, doj } = req.body;

            const employee = await EmployeeModel.findById(id);
            if (!employee) {
                res.status(404).json({ message: "Employee not found" });
            } else {
                employee.name = name;
                employee.email = email;
                employee.mobile = mobile;
                employee.dob = dob;
                employee.doj = doj;
                await employee.save();
                res.status(200).json({ message: "Employee Updated", data: employee });
            }
        } catch (error) {
            res.sendStatus(400);
        }
    };

    // Delete employee
    deleteEmployee: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const employee = await EmployeeModel.findByIdAndDelete(id);
            if (!employee) {
                res.status(404).json({ message: "Employee not found" });
            } else {
                res.status(200).json({ message: "Employee Deleted" });
            }
        } catch (error) {
            res.sendStatus(400);
        }
    };
}

export default new EmployeeController();
