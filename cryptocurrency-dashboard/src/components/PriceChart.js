import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const PriceChart = ({ coinId, timeframe }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: { vs_currency: "usd", days: timeframe },
          }
        );
        const prices = response.data.prices;
        setChartData({
          labels: prices.map(([timestamp]) =>
            new Date(timestamp).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Price (USD)",
              data: prices.map(([, price]) => price),
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchChartData();
  }, [coinId, timeframe]);

  return chartData ? <Line data={chartData} /> : <div>Loading Chart...</div>;
};

export default PriceChart;
