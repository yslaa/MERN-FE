import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { hooks } from "@api";
import { FadeLoader } from "react-spinners";

export function BarChart() {
  const { data: transactions, isLoading } = hooks.useGetAllTransactionsQuery();

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Revenue",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 400,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Year",
          style: {
            color: "#FFFFFF",
          },
        },
        labels: {
          style: {
            colors: "#FFFFFF",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#FFFFFF",
          },
          formatter: function (val) {
            return `Php ${Math.round(val).toLocaleString()}`;
          },
        },
      },
      title: {
        text: "Yearly Revenue (Completed Transactions)",
        align: "center",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#FFFFFF",
        },
      },
      legend: {
        position: "bottom",
        labels: {
          colors: "#FFFFFF",
        },
      },
      grid: {
        borderColor: "#333333",
      },
      tooltip: {
        theme: "dark",
      },
    },
  });

  useEffect(() => {
    if (transactions?.data) {
      const completedTransactions = transactions.data.filter(
        (transaction) => transaction.status === "Completed",
      );

      const yearlyRevenue = completedTransactions.reduce((acc, transaction) => {
        const year = new Date(transaction.createdAt).getFullYear();
        acc[year] = (acc[year] || 0) + transaction.totalPrice;
        return acc;
      }, {});

      const categories = Object.keys(yearlyRevenue);
      const seriesData = Object.values(yearlyRevenue);

      setChartData((prev) => ({
        ...prev,
        series: [{ ...prev.series[0], data: seriesData }],
        options: {
          ...prev.options,
          xaxis: { ...prev.options.xaxis, categories },
        },
      }));
    }
  }, [transactions]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg">
        {isLoading ? (
          <div className="loader">
            <FadeLoader color="#FAF7F7" loading={true} size={50} />
          </div>
        ) : chartData.series[0].data.length === 0 ? (
          <div className="text-white">
            No revenue data available to display.
          </div>
        ) : (
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height="400"
          />
        )}
      </div>
    </div>
  );
}
