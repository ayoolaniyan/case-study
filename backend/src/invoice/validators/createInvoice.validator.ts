import { checkSchema } from "express-validator";

export const createInvoiceValidator = checkSchema({
    invoiceNumber: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Invoice number is required",
        isString: true,
        isLength: {
            options: {

            },
            errorMessage: "Invoce number can not be more than 100 characters"
        },
        trim: true,
    },
    description: {
        in: ["body"],
        optional: true,
        errorMessage: "Invoice description is required",
        isString: true,
        trim: true,
    },
    issueDate: {
        in: ["body"],
        errorMessage: "Issue date must be a valid ISO8601 string",
        isISO8601: true,
    },
    dueDate: {
        in: ["body"],
        errorMessage: "Due date must be a valid ISO8601 string",
        isISO8601: true,
    },
    status: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Invoice Status must be one of the specified values",
        isIn: {
            options: [["paid", "draft", "overdue", "cancelled"]]
        },
    },
    amount: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Invoice Amount must be specified",
        isFloat: true
    },
});
