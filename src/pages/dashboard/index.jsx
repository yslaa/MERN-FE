import React from "react";
import { PieChart, BarChart, LineChart } from "@components";

export function Dashboard() {
  return (
    <section className="p-8">
      <h1 className="mb-8 text-3xl font-bold text-center">Dashboard</h1>
      <div className="flex flex-col gap-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-center">
              Stock Distribution by Product
            </h2>
            <PieChart />
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-center">
              Yearly Revenue (Completed Transactions)
            </h2>
            <BarChart />
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-center">
            Monthly Revenue (Completed Transactions)
          </h2>
          <LineChart />
        </div>
      </div>
    </section>
  );
}
