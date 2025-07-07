import { model, Model, Schema } from "mongoose";
import { IInvoice } from "./invoice.interface";

const invoiceSchema: Schema<IInvoice> = new Schema(
    {
        invoiceNumber: {
            type: String,
            required: [true, "Invoice number is required"],
            trim: true,
            maxlength: [100, "Invoice number can not be more than 100 characters."]
        },
        description: {
            type: String,
            required: false,
            trim: true,
            maxlength: [200, "Description can not be more than 200 characters."]
        },
        issueDate: {
            type: Date,
            required: [true, "Issue date is required"],
        },
        dueDate: {
            type: Date,
            required: [true, "Due date is required"],
        },
        status: {
            type: String,
            required: [true, "Invoice status is required"],
            enum: ["paid", "draft", "overdue", "cancelled"],
            default: "draft",
        },
        amount: {
            type: Number,
            required: [true, "Invoice amount is required"],
            trim: true
        }
    },
    { timestamps: true }
);

export const Invoice: Model<IInvoice> = model("Invoice", invoiceSchema);
