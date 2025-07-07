import { IInvoice } from "../../invoice/models/invoice.interface";

export interface ICompany {
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    // invoices: IInvoice[];
}

export interface IPartialCompanyWithId extends Partial<ICompany> {
    _id: string;
}
