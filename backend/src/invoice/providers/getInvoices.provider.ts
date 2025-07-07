import { inject, injectable } from "inversify";
import { InvoiceService } from "../invoice.service";
import { IInvoicePagination } from "../models/invoicePagination.interface";
import { IInvoice } from "../models/invoice.interface";

@injectable()
export class GetInvoicesProvider {
    constructor(@inject(InvoiceService) private invoiceService: InvoiceService) { }

    public async findAllInvoices(pagination: Partial<IInvoicePagination>): Promise<{ data: IInvoice[]; meta: {} }> {
        const invoices: IInvoice[] = await this.invoiceService.getInvoices({
            limit: pagination.limit ?? 10,
            page: pagination.page ?? 1,
            order: pagination.order ?? "asc",
        });
        console.log(invoices);

        const ovedueInvoices = await this.invoiceService.countDocuments({ status: "overdue" });

        const paidInvoices = await this.invoiceService.countDocuments({ status: "paid" });

        const cancelledInvoices = await this.invoiceService.countDocuments({ status: "cancelled" });

        const draftInvoices = await this.invoiceService.countDocuments({ status: "draft" });

        return {
            data: invoices,
            meta: { ovedueInvoices, paidInvoices, cancelledInvoices, draftInvoices },
        };

    }
}
