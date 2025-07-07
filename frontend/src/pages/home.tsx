import { useState, type FC, type ReactElement } from "react";
import Header from "../components/Header/Header";
import SelectMenu from "../components/SelectMenu/SelectMenu";
import { useFetchCompanies } from "../hooks/useFetchCompanies";
import type { ICompany } from "../models/company.interface";
import Card from "../components/Card/Card";

export const Home: FC = (): ReactElement => {

    const { data, isError, isSuccess, isPending, error } = useFetchCompanies();
    const companies = Array.isArray(data?.data) ? data.data as ICompany[] : [];
    const [selectedCompany, setSelectedCompany] = useState('');
    console.log("the data: ", data);

    return <>
    <Header title={"LOGO"} />
      <section className="section-hero">
        <div className="container">
            <SelectMenu 
            options={companies} 
            selectedId={selectedCompany} 
            onChange={(newId) => setSelectedCompany(newId)}
            />
        </div>
      </section>

      <section className="section-featured">
        <div className="container">
          <Card title="Title" description="Card Image" footer="footer text"/>
        </div>
      </section>

      <section className="section-featured">
        <div className="container">
          <Card title="Remaining spend" description="5 400/10 000kr" footer="based on your set limit"/>
        </div>
      </section>
    </>
}
