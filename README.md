**Cryptocurrency Dashboard**

A web application to view real-time cryptocurrency data, including market trends, price changes, and detailed information for individual coins. Built with React.js and integrated with the CoinGecko API.

**Features**

**Dashboard View**

 Displays a list of cryptocurrencies with:
 
   - Coin name and symbol
   - Current price
   - 24-hour price change percentage
   - Market capitalization
     
 Search bar for filtering cryptocurrencies by name or symbol.
 
 Pagination or infinite scrolling for easier navigation.
 
**Coin Detail View**
 
Detailed information about a selected cryptocurrency, including:

  - Full description
  - Market cap rank
  - Trading volume
  - Price history with customizable timeframes (1 day, 7 days, 1 month, 3 months, 1 year)
  - Interactive line chart for price history (using Chart.js or Recharts).
  - Back button to return to the dashboard.
   
**Additional Features**

  - Tooltips for displaying additional information about metrics.
  - Dynamic data refresh with a refresh button.
  - Error handling for failed API requests.
   
**Technologies Used**

  - Frontend: React.js, React Router, React Icons, Axios
  - Charting: Chart.js or Recharts
  - Data Source: CoinGecko API
  - Styling: CSS or preferred UI library
   
**Getting Started**

**Prerequisites**

  - Node.js (>=14.0.0)
  - npm (>=6.0.0) or yarn
  - 
**Installation**

1. Clone the repository:

 - git clone https://github.com/your-username/crypto-dashboard.git
 - cd crypto-dashboard
  
2. Install dependencies:
   
 - npm install # or
 - yarn install
  
3. Start the development server:

 - npm start # or
 - yarn start
  
4. Open the app in your browser:

 - http://localhost:3000
  
**Project Structure**

src/
├── components/

│   ├── Dashboard.js       // Main dashboard view

│   ├── CoinDetail.js      // Coin detail view

│   └── Chart.js           // Line chart for price history

├── services/

│   └── api.js             // API calls to CoinGecko

├── App.js                 // Main app component

├── index.js               // Entry point

└── styles/                // Stylesheets (if used)

**Environment Variables**

To access the CoinGecko API, you might need to configure environment variables. Create a .env file in the root directory:


 - REACT_APP_COINGECKO_API_URL=https://api.coingecko.com/api/v3
  
**Usage**

1. Dashboard:

  - View a list of cryptocurrencies.
  - Search for specific coins.
  - Click on a coin to view more details.
   
2. Coin Details:

  - Check price history over various timeframes.
  - View detailed statistics like market cap and trading volume.
  - Navigate back to the dashboard with the Back button.

   
**Scripts**

 - npm start: Run the development server.
 - npm build: Build the app for production.
 - npm test: Run tests (if implemented).
 - npm lint: Check code for linting issues (if ESLint is configured).
  
**Known Issues**

 - Ensure your internet connection is stable for fetching real-time data.
 - API rate limits from CoinGecko may result in temporary unavailability.
  
**Contributing**

 - Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:

  - git checkout -b feature-name
3. Make your changes and commit:

  - git commit -m "Add feature-name"
   
4. Push to the branch:

  - git push origin feature-name
   
5. Open a pull request.

   
**License**

 - This project is licensed under the MIT License.

**Acknowledgments**

  - CoinGecko API for providing cryptocurrency data.
  - React ecosystem and open-source libraries.
