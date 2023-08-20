const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        LoyaltyProgram: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "exchange_rate",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "balance",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "needed",
                  type: "uint256",
                },
              ],
              name: "ERC20InsufficientBalance",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "ERC20InvalidReceiver",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "ERC20InvalidSender",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "WrongAddress",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "customer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "pointsEarned",
                  type: "uint256",
                },
              ],
              name: "PointsEarned",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "seller",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "pointsGranted",
                  type: "uint256",
                },
              ],
              name: "PointsGranted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "seller",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "pointsReturned",
                  type: "uint256",
                },
              ],
              name: "PointsReturned",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "customer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "pointsRedeemed",
                  type: "uint256",
                },
              ],
              name: "RewardRedeemed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "seller",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "customer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "pointsEarned",
                  type: "uint256",
                },
              ],
              name: "SellerPointsEarned",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "customer",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "seller",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "pointsRedeemed",
                  type: "uint256",
                },
              ],
              name: "SellerRewardRedeemed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "seller",
                  type: "address",
                },
              ],
              name: "addSeller",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "exchangeRate",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "seller",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "grantPoints",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "isSeller",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "pointsToRedeem",
                  type: "uint256",
                },
              ],
              name: "redeemReward",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "seller",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "pointsToRedeem",
                  type: "uint256",
                },
              ],
              name: "redeemSellerReward",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "pointsToReturn",
                  type: "uint256",
                },
              ],
              name: "returnPoints",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "customer",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "rewardPoints",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "customer",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "sellerRewardPoints",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
