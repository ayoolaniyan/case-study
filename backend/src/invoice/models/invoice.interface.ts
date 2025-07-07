import { ICompany } from "../../company/models/company.interface";

export interface IInvoice {
    invoiceNumber: string;
    description: string;
    issueDate: Date;
    dueDate: Date;
    status: "paid" | "draft" | "overdue" | "cancelled";
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPartialInvoiceWithId extends Partial<IInvoice> {
    _id: string;
}
