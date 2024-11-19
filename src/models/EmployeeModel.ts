import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    mobile: {
        type: String,
        require: true
    },
    dob: {
        type: String,
    },
    doj: {
        type: String,
    }
},
    {
        timestamps: true
    }
);

export const EmployeeModel = mongoose.model('Employee', EmployeeSchema);