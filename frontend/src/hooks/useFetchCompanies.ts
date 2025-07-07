import { useQuery } from "@tanstack/react-query";
import type { IResponse } from "../models/response.interface";
import type { ICompany } from "../models/company.interface";

const fetchCompanies = async (): Promise<IResponse<ICompany[]>> => {
    const url = new URL(`http://localhost:3001/company`);

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

export function useFetchCompanies(params = {}) {
    return useQuery({
        queryKey: ["fetchCompanies", params],
        queryFn: fetchCompanies,
    });
}
