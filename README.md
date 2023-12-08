
[![Gas API tutorial image 1](https://img.youtube.com/vi/74clgGR6rok/0.jpg)](https://www.youtube.com/watch?v=74clgGR6rok)

In this tutorial, we will learn how to build a Gas Tracker App using the Gas API, Next.js, and ShadcnUI. This application will enable dapp users to access recommended gas prices tailored to their transaction priority. Watch the YouTube video above for a brief introduction to the Gas API. 

Understanding Gas Prices
--------------------
'Gas' refers to a unit that measures the amount of computational effort required to execute operations, such as making transactions or running smart contracts. It's akin to fuel for a car -- necessary for the network to process and validate operations. Each transaction on Ethereum requires a specific amount of gas, determined by its complexity. Users set a gas price in Gwei (1 Gwei = 1 billionth of an Ether), representing the amount of Ether they are willing to pay per unit of gas.

Understanding gas prices is crucial in blockchain networks, as it helps users manage the cost of their transactions. Knowledge of current gas prices enables users to select the most economical time to initiate a transaction and determine its speed. Awareness of gas prices is also vital to prevent failed transactions, plan budgets, understand network congestion, and make informed investment decisions.

![Gas API tutorial image 1](https://images.ctfassets.net/9sy2a0egs6zh/4rVsrBM5eUvgT2b68DIQdA/e30bade0c4aa0cc62f409b623eb3596f/image3.png)

The MetaMask Gas API
--------------------

The MetaMask Gas API, available through Infura is a specialized tool designed to provide real-time gas price information for Ethereum Virtual Machine (EVM) compatible networks. It functions as an oracle, offering up-to-date data on the computational costs required for executing operations or transactions on these networks. The API empowers developers to create advanced gas estimation features, which can lead to cost savings on back-end transaction operations or enhance the user interface for users.

Prerequisites
-------------

-   A valid [Web3 API key](https://docs.infura.io/networks/ethereum/how-to/secure-a-project/project-id) and [API key secret](https://docs.infura.io/networks/ethereum/how-to/secure-a-project/project-secret).
-   Node.js and either npm or yarn installed.
-   Familiarity with Next.js and React.

Setting up Next.js + ShadcnUI
-----------------------------

First, ensure Node.js is installed on your machine. Once you have Node.js set up, start a new Next.js application by opening your terminal and executing the following command:

Copy

```
npx create-next-app@latest
```

After executing the command, not only will several prompts appear, but it will also generate a new directory under your specified project name - I used gastracker-app, thereby establishing the foundational structure of Next.js and installing essential dependencies. Now, proceed to your project's directory:

Copy

```
npx create-next-app@latest
✔ What is your project named? ... gastracker-app
✔ Would you like to use TypeScript? ... No / Yes
✔ Would you like to use ESLint? ... No / Yes
✔ Would you like to use Tailwind CSS? ... No / Yes
✔ Would you like to use `src/` directory? ... No / Yes
✔ Would you like to use App Router? (recommended) ... No / Yes
✔ Would you like to customize the default import alias (@/*)? ... No / Yes
```

Navigate into your new project directory and activate the Next.js application in development mode by using. You can then explore your application by navigating to http://localhost:3000 in your browser.

Copy

```
cd gastracker-app
npm run dev
```

Crafting the user interface
---------------------------

For our application, we will use a component library. Let's begin by installing ShadcnUI:

Copy

```
npx shadcn-ui@latest init
```

During the installation, you'll be guided through configuring the components.json file with the following prompts:

Copy

```
Would you like to use TypeScript (recommended)? no / yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › app/globals.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes
```

With that out of the way, let's also install the Shadcn UI's Card component:

Copy

```
npx shadcn-ui@latest add card
```

In this tutorial, we'll focus on using the Card component from Shadcn UI. To learn more about these components, visit the [Shadcn UI website](https://ui.shadcn.com/). With our front end now set up, we're ready to start working with the Gas API.

In the root directory, create a file named .env, where we will store the following credentials:

Copy

```
INFURA_API_KEY=
INFURA_API_KEY_SECRET=
```

Ensure you obtain the API_KEY and API_KEY_SECRET from your Infura dashboard. It's crucial to avoid pushing the API key to GitHub. In the root directory, check the .gitignore file to confirm that the necessary lines are included.

Copy

```
# Ignore environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

We will also be needing the `axios and the dotenv` packages:

Copy

```
npm install axios
npm install dotenv
```

Now, proceed to create a file named 'index.js' in the root of our gastracker-app and copy the following code into it:

Copy

```
const axios = require("axios");
require("dotenv").config();

const Auth = Buffer.from(
  process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_KEY_SECRET,
).toString("base64");

// The chain ID of the supported network
const chainId = 1;

(async () => {
  try {
    const { data } = await axios.get(
      `https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`,
      {
        headers: {
          Authorization: `Basic ${Auth}`,
        },
      },
    );
    console.log("Suggested gas fees:", data);
  } catch (error) {
    console.log("Server responded with:", error);
  }
})();
```

In another terminal window, run the following command.

Copy

```
node index.js
```

You should see the following:

Copy

```
Suggested gas fees: {
  low: {
    suggestedMaxPriorityFeePerGas: '0.05',
    suggestedMaxFeePerGas: '28.501086221',
    minWaitTimeEstimate: 15000,
    maxWaitTimeEstimate: 30000
  },
  medium: {
    suggestedMaxPriorityFeePerGas: '0.1',
    suggestedMaxFeePerGas: '38.508966399',
    minWaitTimeEstimate: 15000,
    maxWaitTimeEstimate: 45000
  },
  high: {
    suggestedMaxPriorityFeePerGas: '0.3',
    suggestedMaxFeePerGas: '48.666846576',
    minWaitTimeEstimate: 15000,
    maxWaitTimeEstimate: 60000
  },
  estimatedBaseFee: '28.451086221',
  networkCongestion: 0.7718,
  latestPriorityFeeRange: [ '0.05', '9.249760902' ],
  historicalPriorityFeeRange: [ '0.023435712', '56.009283908' ],
  historicalBaseFeeRange: [ '19.277073248', '31.361941035' ],
  priorityFeeTrend: 'down',
  baseFeeTrend: 'up'
}
```

If you observe the data displayed in the terminal, it indicates that we are successfully receiving responses from the API. The next step is to present this data on our frontend. You may now delete the index.js file.

Displaying gas data on the frontend
-----------------------------------

![Gas API tutorial image 2](https://images.ctfassets.net/9sy2a0egs6zh/6DcVOvAKow6wCWVxOGwBt9/cb4708b6b59b0e0cfdcdc521233d48a5/image2.png)

To establish custom types for use throughout the project, create a file named 'index.d.ts' in the root directory and include the following lines:

Copy

```
interface GasFeeEstimate {
    suggestedMaxPriorityFeePerGas: string;
    suggestedMaxFeePerGas: string;
    minWaitTimeEstimate: number;
    maxWaitTimeEstimate: number;
  }

  interface GasFeesApiResponse {
    low: GasFeeEstimate;
    medium: GasFeeEstimate;
    high: GasFeeEstimate;
    estimatedBaseFee: string;
    networkCongestion: number;
    latestPriorityFeeRange: string[];
    historicalPriorityFeeRange: string[];
    historicalBaseFeeRange: string[];
    priorityFeeTrend: 'up' | 'down';
    baseFeeTrend: 'up' | 'down';
  }
```

These TypeScript interface declarations in a global file define structures for gas fee estimates and API responses. They encompass details like fee suggestions, wait times, network congestion, and fee trends for different transaction priority levels on a blockchain network."

In the 'lib' folder, create a file named 'getData.ts' and add the following code:

Copy

```
const Auth = Buffer.from(
  process.env["INFURA_API_KEY"] + ":" + process.env["INFURA_API_KEY_SECRET"]
).toString("base64");

// The chain ID of the supported network
const chainId = 1;

export const getData = async () => {
  try {
    const res = await fetch(
      `https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`,
      {
        headers: {
          Authorization: `Basic ${Auth}`,
        },
      }
    );

    const data = await res.json();

    return data as GasFeesApiResponse;
  } catch (error) {
    console.log("Server responded with:", error);
  }
};
```

These codes fetch gas fee data from the Gas API:

1.  Authentication Setup: Creates a Buffer from the INFURA_API_KEY and INFURA_API_KEY_SECRET, which are set as environment variables. This Buffer is then converted into a base64 string (named 'Auth') for basic authentication in API requests.
2.  Chain ID Specification: Sets the variable chainId to 1, typically representing the Ethereum mainnet in blockchain contexts.
3.  getData Function: An asynchronous function designed to fetch gas fee data:

-   It utilizes fetch to make a GET request to the Infura API endpoint, retrieving suggested gas fees for the specified chainId.
-   It sets the Authorization header in the request using the Auth token created earlier.
-   If successful, parses the response as JSON and returns it as GasFeesApiResponse, aligning with the previously defined interface.
-   Logs any errors, such as network issues or server errors, to the console.

Chain ID Variability: The chainId can be adjusted based on the network for which the app is built. The Gas API on Infura supports most major EVM networks. For more information on supported networks, visit the [documentation](https://docs.infura.io/infura-expansion-apis/gas-api/supported-networks).

Working on the UI
-----------------

we've now reached the exciting part where we'll focus on the UI to display the data. Let's navigate to the components folder and create a component named 'GasCard.tsx'.

Copy

```
import { getData } from "@/lib/getData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const GasCard = async () => {
  const data = await getData();

  const renderGasFeeEstimateCard = (
    estimate: GasFeeEstimate,
    title: string
  ) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Max Priority Fee: {estimate.suggestedMaxPriorityFeePerGas}</p>
        <p>Max Fee Per Gas: {estimate.suggestedMaxFeePerGas}</p>
        <p>Min Wait Time: {estimate.minWaitTimeEstimate} seconds</p>
        <p>Max Wait Time: {estimate.maxWaitTimeEstimate} seconds</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.low &&
          renderGasFeeEstimateCard(data.low, "Low Gas Fee Estimate")}
        {data?.medium &&
          renderGasFeeEstimateCard(data.medium, "Medium Gas Fee Estimate")}
        {data?.high &&
          renderGasFeeEstimateCard(data.high, "High Gas Fee Estimate")}
      </div>
      <Card>
        <CardContent>
          <h2 className="font-semibold">Estimated Base Fee</h2>
          <p>Gas Price: {data?.estimatedBaseFee}</p>
          <h2 className="font-semibold">Network Congestion</h2>
          <p>{data?.networkCongestion}</p>
          <h2 className="font-semibold">Latest Priority Fee Range</h2>
          <p>{data?.latestPriorityFeeRange.join(" - ")}</p>
          <h2 className="font-semibold">Historical Priority Fee Range</h2>
          <p>{data?.historicalPriorityFeeRange.join(" - ")}</p>
          <h2 className="font-semibold">Historical Base Fee Range</h2>
          <p>{data?.historicalBaseFeeRange.join(" - ")}</p>
          <h2 className="font-semibold">Priority Fee Trend</h2>
          <p>{data?.priorityFeeTrend}</p>
          <h2 className="font-semibold">Base Fee Trend</h2>
          <p>{data?.baseFeeTrend}</p>
        </CardContent>
      </Card>
    </div>
  );
};
```

Let's see what happened here:

1.  Imports and Data Fetching:

-   The component imports the getData function for fetching gas fee data, along with various UI components like Card, CardContent, CardHeader, and CardTitle, which are part of the Shadcn UI we installed earlier.
-   Inside the GasCard component, the getData function is invoked to retrieve gas fee data.

1.  Rendering Gas Fee Estimates:

-   A function named renderGasFeeEstimateCard is defined, which renders a card UI for a specific gas fee estimate (GasFeeEstimate) and title (title).
-   This function constructs a Card component displaying details such as the max priority fee, max fee per gas, and estimated wait times.

1.  Component Structure:

-   The JSX structure of the GasCard component is outlined in the return statement. It employs a grid layout to exhibit cards for low, medium, and high gas fee estimates, which are conditionally displayed depending on data availability.
-   An additional card shows more information like the estimated base fee, network congestion, priority fee ranges (latest and historical), and trends in priority and base fees.

Now, the only step remaining is to import the GasCard.tsx into the page.tsx file. After this, all the data should be visible on our frontend.

![Gas tracker app frontend image](https://images.ctfassets.net/9sy2a0egs6zh/24smEt3ovOwKs1BJt7SeM6/189f5a8fd4c5a1a2ad976a4a8251a5ae/image2.png)

Get started using the Gas API
-----------------------------

Utilizing the [Gas API on Infura](https://www.infura.io/platform/gas-api/?utm_source=owned&utm_medium=referral&utm_campaign=2023_Nov_gas-api-open-beta_content_content) offers significant advantages for developers engaging with EVM-compatible networks. It provides real-time insights into the fluctuating gas market, allowing users to make well-informed decisions about their transaction fees. This is particularly beneficial for optimizing both the speed and cost-effectiveness of transactions.

This tutorial covers how to get started with the GasAPI and create a simple Gas Tracker App. You can find the code here: [GasAPI-Template on GitHub](https://github.com/meowyx/GasAPI-Template).

But we can do a lot more fun things with this; we can add ways to refresh GasData at certain times with a countdown, and we can also integrate the GasAPI into any existing application.I recommend checking out the following resources:

Gas API Docs: [Infura Gas API Documentation](https://docs.infura.io/infura-expansion-apis/gas-api)

EventSea: [A full-stack Events Dapp that creatively utilizes GasAPI: EventSea on GitHub](https://github.com/Consensys/eventsea)

Happy Building! 🚀
