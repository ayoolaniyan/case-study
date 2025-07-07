import { inject, injectable } from "inversify";
import { CompanyService } from "../company.service";
import { ICompanyPagination } from "../models/companyPagination.interface";
import { ICompany } from "../models/company.interface";

@injectable()
export class GetCompanyProvider {
    constructor(@inject(CompanyService) private companyService: CompanyService) { }

    public async findCompanies(pagination: Partial<ICompanyPagination>): Promise<{ data: ICompany[]; meta: {} }> {
        const companies: ICompany[] = await this.companyService.getCompanies({
            limit: pagination.limit ?? 10,
            page: pagination.page ?? 1,
            order: pagination.order ?? "asc",
        });
        console.log(companies);

        return {
            data: companies,
            meta: {},
        };

    }
}
