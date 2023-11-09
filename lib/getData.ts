const Auth = Buffer.from(
  process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_KEY_SECRET
).toString("base64");

// The chain ID of the supported network
const chainId = 1;

const axios = require("axios");
require("dotenv").config();

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

    return data;
  } catch (error) {
    console.log("Server responded with:", error);
  }
};

// {
//   low: {
//     suggestedMaxPriorityFeePerGas: '3.384',
//     suggestedMaxFeePerGas: '3.384000007',
//     minWaitTimeEstimate: 15000,
//     maxWaitTimeEstimate: 30000
//   },
//   medium: {
//     suggestedMaxPriorityFeePerGas: '3.492',
//     suggestedMaxFeePerGas: '3.49200001',
//     minWaitTimeEstimate: 15000,
//     maxWaitTimeEstimate: 45000
//   },
//   high: {
//     suggestedMaxPriorityFeePerGas: '3.528',
//     suggestedMaxFeePerGas: '3.528000012',
//     minWaitTimeEstimate: 15000,
//     maxWaitTimeEstimate: 60000
//   },
//   estimatedBaseFee: '0.000000007',
//   networkCongestion: 0,
//   latestPriorityFeeRange: [ '3.6', '4.320000001' ],
//   historicalPriorityFeeRange: [ '3.6', '4.5' ],
//   historicalBaseFeeRange: [ '0.000000007', '0.000000007' ],
//   priorityFeeTrend: 'up',
//   baseFeeTrend: 'down'
// }
