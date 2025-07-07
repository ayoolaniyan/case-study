import { Application } from "express";
import { container } from "./container.config";
import { InvoiceRouter } from "../invoice/invoice.router";
import { CompanyRouter } from "../company/company.router";

export function addRoutes(app: Application): Application {
    const invoiceRouter: InvoiceRouter = container.get<InvoiceRouter>(InvoiceRouter);
    const companyRouter: CompanyRouter = container.get<CompanyRouter>(CompanyRouter);

    app.use("/invoice", invoiceRouter.router);
    app.use("/company", companyRouter.router);

    return app;
}
