import express, { Request, Response, Router } from "express";
import { inject } from "inversify";
import { CompanyController } from "./company.controller";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { createCompanyValidator } from "./validators/createCompany.validator";
import { ICompany } from "./models/company.interface";

export class CompanyRouter {
    public router: Router;

    constructor(
        @inject(CompanyController) private companyController: CompanyController
    ) {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.post(
            "/create",
            createCompanyValidator,
            async (req: Request<{}, {}, ICompany>, res: Response) => {
                const result = validationResult(req);
                if (result.isEmpty()) {
                    const newCompany = await this.companyController.handlePostCompany(req, res);
                    res.status(StatusCodes.CREATED).json(newCompany);
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json(result.array());
                }
            }
        );

        this.router.get("/", async (req: Request, res: Response) => {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const allInvoices = await this.companyController.handleGetCompanies(req, res);
                res.json(allInvoices);
            } else {
                res.status(StatusCodes.BAD_REQUEST).json(result.array());
            }

        });

    }
}
