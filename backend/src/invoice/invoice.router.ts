import express, { Request, Response, Router } from "express";
import { inject } from "inversify";
import { InvoiceController } from "./invoice.controller";
import { createInvoiceValidator } from "./validators/createInvoice.validator";
import { IInvoice } from "./models/invoice.interface";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export class InvoiceRouter {
    public router: Router;

    constructor(
        @inject(InvoiceController) private invoiceController: InvoiceController
    ) {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.post(
            "/create",
            createInvoiceValidator,
            async (req: Request<{}, {}, IInvoice>, res: Response) => {
                const result = validationResult(req);
                if (result.isEmpty()) {
                    const newInvoice = await this.invoiceController.handlePostInvoice(req, res);
                    res.status(StatusCodes.CREATED).json(newInvoice);
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json(result.array());
                }
            }
        );

        this.router.get("/", async (req: Request, res: Response) => {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const allInvoices = await this.invoiceController.handleGetInvoices(req, res);
                res.json(allInvoices);
            } else {
                res.status(StatusCodes.BAD_REQUEST).json(result.array());
            }

        });

    }
}
