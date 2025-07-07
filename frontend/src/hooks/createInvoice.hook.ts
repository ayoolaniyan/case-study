import { useMutation } from "@tanstack/react-query";
import type { IInvoice } from "../models/invoice.interface";
import type { IResponse } from "../models/response.interface";

const createInvoice = async (invoice: IInvoice) => {

    const response = await fetch(`${import.meta.env.BACKEND_API_URL}invoice/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
}

export function useCreateInvoice() {
    return useMutation({
        mutationFn: createInvoice,
        onSuccess: (response: IResponse<IInvoice>) => {
            console.log(response);
        },
        onError: (error) => {
            console.error("Error creating invoice: ", error);
        },
    });
}
