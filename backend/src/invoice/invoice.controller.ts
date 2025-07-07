import { inject } from "inversify";
import { InvoiceService } from "./invoice.service";
import { IInvoice } from "./models/invoice.interface";
import { Response, Request } from "express";
import { Document } from "mongoose";
import { matchedData } from "express-validator";
import { GetInvoicesProvider } from "./providers/getInvoices.provider";

export class InvoiceController {
    constructor(
        @inject(InvoiceService) private invoiceService: InvoiceService,
        @inject(GetInvoicesProvider) private getInvoicesProvider: GetInvoicesProvider
    ) { }

    public async handlePostInvoice(
        req: Request<{}, {}, IInvoice>,
        res: Response
    ): Promise<Document> {
        const validatedData: IInvoice = matchedData(req);
        try {
            return await this.invoiceService.createInvoice(validatedData);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async handleGetInvoices(
        req: Request,
        res: Response
    ): Promise<{ data: IInvoice[]; meta: {} }> {
        const validatedData = matchedData(req);

        try {
            const invoices: { data: IInvoice[]; meta: {} } =
                await this.getInvoicesProvider.findAllInvoices(validatedData);
            return invoices;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
