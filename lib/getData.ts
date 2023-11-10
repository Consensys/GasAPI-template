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
