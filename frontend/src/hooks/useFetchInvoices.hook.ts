import { useQuery } from "@tanstack/react-query";
import type { IInvoice } from "../models/invoice.interface";
import type { IResponse } from "../models/response.interface";

const fetchInvoices = async (): Promise<IResponse<IInvoice[]>> => {
    const url = new URL(`http://localhost:3001/invoice`);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export function useFetchInvoices(params = {}) {
    return useQuery({
        queryKey: ["fetchInvoices", params],
        queryFn: fetchInvoices,
    });
}
