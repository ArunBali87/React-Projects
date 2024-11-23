import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../Dashboard.css";

const Dashboard = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCryptos = async (reset = false) => {
    try {
      setLoading(true);
      setError(null); // Reset error before fetching
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: reset ? 1 : page,
          },
        }
      );
      setCryptos(reset ? response.data : [...cryptos, ...response.data]);
      if (reset) setPage(1);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
  }, [page]);

  const handleSearch = (query) => setSearchQuery(query);

  const handleRefresh = () => {
    fetchCryptos(true); // Reset to the first page and reload data
  };

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleRowClick = (id) => {
    navigate(`/coin/${id}`);
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Cryptocurrency Dashboard</h1>
      </header>
      <div className="controls">
        <SearchBar onSearch={handleSearch} />
        <button onClick={handleRefresh} className="refresh-button">
          <img src={require("../refresh.svg").default} />
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {filteredCryptos.map((crypto) => (
            <tr
              key={crypto.id}
              onClick={() => handleRowClick(crypto.id)}
              className="clickable-row"
            >
              <td>{crypto.market_cap_rank}</td>
              <td>{crypto.name}</td>
              <td>{crypto.symbol.toUpperCase()}</td>
              <td>${crypto.current_price.toLocaleString()}</td>
              <td
                className={
                  crypto.price_change_percentage_24h >= 0
                    ? "positive"
                    : "negative"
                }
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>${crypto.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="loadmore-div">
        {!error && (
          <button onClick={loadMore} className="load-more">
            Load More
          </button>
        )}
        {loading && <div className="loading">Loading...</div>}
      </div>
    </div>
  );
};

export default Dashboard;
