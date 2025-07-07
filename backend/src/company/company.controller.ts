import { inject } from "inversify";
import { ICompany } from "./models/company.interface";
import { Response, Request } from "express";
import { matchedData } from "express-validator";
import { CompanyService } from "./company.service";
import { Document } from "mongoose";
import { GetCompanyProvider } from "./providers/getCompanies.provider";

export class CompanyController {
    constructor(
        @inject(CompanyService) private companyService: CompanyService,
        @inject(GetCompanyProvider) private getCompanyProvider: GetCompanyProvider
    ) { }

    public async handlePostCompany(
        req: Request<{}, {}, ICompany>,
        res: Response
    ): Promise<Document> {
        const validatedData: ICompany = matchedData(req);
        try {
            return await this.companyService.createCompany(validatedData);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async handleGetCompanies(
        req: Request,
        res: Response
    ): Promise<{ data: ICompany[]; meta: {} }> {
        const validatedData = matchedData(req);

        try {
            const companies: { data: ICompany[]; meta: {} } =
                await this.getCompanyProvider.findCompanies(validatedData);
            return companies;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
