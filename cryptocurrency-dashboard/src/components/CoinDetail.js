import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  ArcElement,
  BarElement,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  FaDollarSign,
  FaChartLine,
  FaCoins,
  FaBackward,
  FaArrowLeft,
} from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "../CoinDetail.css";

// Register the required components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  ArcElement,
  BarElement,
  Legend
);

const truncateHtml = (html, maxLength) => {
  if (html.length <= maxLength) return html;
  return html.substring(0, maxLength) + "...";
};

const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [timeframe, setTimeframe] = useState("7"); // Default to 7 days
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function
  const fetchCoinData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error before fetching
      const coinResponse = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      const chartResponse = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
          params: { vs_currency: "usd", days: timeframe },
        }
      );

      setCoin(coinResponse.data);
      setChartData({
        labels: chartResponse.data.prices.map(([timestamp]) =>
          new Date(timestamp).toLocaleDateString()
        ),
        datasets: [
          {
            label: "Price",
            data: chartResponse.data.prices.map(([, price]) => price),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      });
    } catch (error) {
      setError("Failed to fetch coin data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [timeframe]);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const handleRefresh = () => {
    fetchCoinData();
  };

  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState("Read More...");

  const handleClick = () => {
    setIsActive(!isActive);
    setButtonText(
      buttonText === "Read More..." ? "Read Less..." : "Read More..."
    );
  };

  if (loading) return <div className="loadCoinDetails">Loading...</div>;
  if (error) return <div className="loadCoinDetails-error">{error}</div>;

  // Prevent rendering until `coin` is fully loaded
  if (!coin) return <div>Loading coin data...</div>;

  const descriptionHtml = truncateHtml(
    coin.description?.en || "No description available."
  );
  return (
    <div className="coin-detail">
      <header style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          style={{
            background: "transparent",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
          }}
        >
          <FaArrowLeft />
        </button>
        <h1>
          <b>{coin.name}</b> Details
        </h1>
      </header>
      <div className="body-para">
        <div className="bp-first">
          <p
            className={isActive ? "readall-data" : ""}
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
          <a className="readmore-details" onClick={handleClick}>
            {buttonText}
          </a>
        </div>
        <div className="bp-second">
          {/* <p>
            <b>Market Cap Rank:</b> {coin.market_cap_rank}
          </p>
          <p>
            <b>Trading Volume:</b> $
            {coin.market_data?.total_volume?.usd?.toLocaleString() || "N/A"}
          </p> */}
          {/* Market Cap */}
          <div
            data-tooltip-id="tooltip"
            data-tooltip-content="Market cap rank of the coin."
          >
            <FaCoins style={{ marginRight: "8px", color: "#FFD700" }} /> Market
            Cap Rank: {coin.market_cap_rank}
          </div>
          <div
            data-tooltip-id="tooltip"
            data-tooltip-content="24-hour trading volume."
          >
            <FaDollarSign style={{ marginRight: "8px", color: "#FFD700" }} />{" "}
            Trading Volume: ${coin.market_data?.total_volume?.usd}
          </div>
          <div
            data-tooltip-id="tooltip"
            data-tooltip-content="Price change in the last 24 hours."
          >
            <FaChartLine style={{ marginRight: "8px", color: "#FFD700" }} /> 24h
            Change: {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
          </div>
          <ReactTooltip id="tooltip" place="top" effect="solid" />
        </div>
      </div>
      <div className="controls">
        <div className="timeframe-buttons">
          <button onClick={() => handleTimeframeChange("1")}>1 Day</button>
          <button onClick={() => handleTimeframeChange("7")}>7 Days</button>
          <button onClick={() => handleTimeframeChange("30")}>1 Month</button>
          <button onClick={() => handleTimeframeChange("90")}>3 Months</button>
          <button onClick={() => handleTimeframeChange("365")}>1 Year</button>
        </div>
        <button onClick={handleRefresh} className="refresh-button">
          <img src={require("../refresh.svg").default} />
        </button>
      </div>
      <div className="graphParent">
        {chartData && <Line data={chartData} />}
      </div>
    </div>
  );
};

export default CoinDetail;
