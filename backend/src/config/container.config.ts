import { Container } from "inversify";
import { InvoiceController } from "../invoice/invoice.controller";
import { InvoiceRouter } from "../invoice/invoice.router";
import { InvoiceService } from "../invoice/invoice.service";
import { CompanyController } from "../company/company.controller";
import { CompanyRouter } from "../company/company.router";
import { CompanyService } from "../company/company.service";
import { GetInvoicesProvider } from "../invoice/providers/getInvoices.provider";
import { GetCompanyProvider } from "../company/providers/getCompanies.provider";

export const container: Container = new Container();

container.bind(InvoiceController).toSelf().inTransientScope();
container.bind(InvoiceRouter).toSelf().inTransientScope();
container.bind(InvoiceService).toSelf().inSingletonScope();
container.bind(GetInvoicesProvider).toSelf().inSingletonScope();

container.bind(CompanyController).toSelf().inTransientScope();
container.bind(CompanyRouter).toSelf().inTransientScope();
container.bind(CompanyService).toSelf().inSingletonScope();
container.bind(GetCompanyProvider).toSelf().inSingletonScope();
