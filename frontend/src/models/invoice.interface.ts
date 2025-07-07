export interface IInvoice {
    _id?: string;
    invoiceNumber: string;
    description: string;
    issueDate: Date;
    dueDate: Date;
    status: "paid" | "draft" | "overdue" | "cancelled";
    amount: number;
}
