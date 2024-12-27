import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { hooks } from "@api";
import { FadeLoader } from "react-spinners";

export function PieChart() {
  const { data: inventories, isLoading } = hooks.useGetAllInventoriesQuery();

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
      },
      labels: [],
      legend: {
        position: "bottom",
        labels: {
          colors: "#FFFFFF",
        },
      },
      title: {
        text: "Stock Distribution by Product",
        align: "center",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#FFFFFF",
        },
      },
      dataLabels: {
        style: {
          colors: ["#FFFFFF"],
        },
      },
      tooltip: {
        theme: "dark",
      },
    },
  });

  useEffect(() => {
    if (inventories?.data) {
      const filteredInventories = inventories.data.filter(
        (inventory) => inventory.quantity > 0,
      );

      const labels = filteredInventories.map(
        (inventory) => inventory.product.name,
      );
      const series = filteredInventories.map((inventory) => inventory.quantity);

      setChartData((prev) => ({
        ...prev,
        series,
        options: {
          ...prev.options,
          labels,
        },
      }));
    }
  }, [inventories]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg">
        {isLoading ? (
          <div className="loader">
            <FadeLoader color="#FAF7F7" loading={true} size={50} />
          </div>
        ) : chartData.series.length === 0 ? (
          <div className="text-white">
            No inventory stock data available to display.
          </div>
        ) : (
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="pie"
            height="400"
          />
        )}
      </div>
    </div>
  );
}
