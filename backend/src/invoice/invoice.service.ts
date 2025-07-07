import { injectable } from "inversify";
import { IInvoice } from "./models/invoice.interface";
import { Invoice } from "./models/invoice.schema";
import { FilterQuery, Model } from "mongoose";
import { IInvoicePagination } from "./models/invoicePagination.interface";

@injectable()
export class InvoiceService {
    private invoiceModel: Model<IInvoice> = Invoice;

    public async createInvoice(data: IInvoice) {
        return await new this.invoiceModel(data).save();
    }

    public async getInvoices(pagination: IInvoicePagination) {
        return await this.invoiceModel
            .find()
            .limit(pagination.limit)
            .skip(pagination.page - 1)
            .sort({
                createdAt: pagination.order === "asc" ? 1 : -1,
            });
    }

    public async countDocuments(filter?: FilterQuery<IInvoice>) {
        return await this.invoiceModel.countDocuments(filter);
    }
    // public async getInvoices() {
    //     return await this.invoiceModel.find();
    // }

    public async getInvoiceById(_id: string) {
        return await this.invoiceModel.findById(_id);
    }
}
