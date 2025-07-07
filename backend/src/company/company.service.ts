import { injectable } from "inversify";
import { Model } from "mongoose";
import { ICompany } from "./models/company.interface";
import { Company } from "./models/company.schema";
import { ICompanyPagination } from "./models/companyPagination.interface";

@injectable()
export class CompanyService {
    private companyModel: Model<ICompany> = Company;

    public async createCompany(data: ICompany) {
        return await new this.companyModel(data).save();
    }

    public async getCompanies(pagination: ICompanyPagination) {
        return await this.companyModel
            .find()
            .limit(pagination.limit)
            .skip(pagination.page - 1)
            .sort({
                createdAt: pagination.order === "asc" ? 1 : -1,
            });
    }

    // public async getCompanies() {
    //     return await this.companyModel.find();
    // }

    public async getCompanyById(_id: string) {
        return await this.companyModel.findById(_id);
    }
}
