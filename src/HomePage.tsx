import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import PredictionCard from "./Component/PredictionCard.js";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import PredictionPage from './PredictionPage';
import './App.css';


//////////////////Web3 Imports///////////////////////
import { useAccount, useConnect, useDisconnect, useReadContract, useReadContracts, useWriteContract } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { formatEther, parseEther } from 'viem';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const liquiditySectionRef = useRef<HTMLDivElement | null>(null);
  const swapSectionRef = useRef<HTMLDivElement | null>(null);
  const predictionSectionRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  ////////////////Web3 Constants///////////////////

  const ROUTER_ADDRESS = '0xEC9Bf10d059Aa5307F1B721eA3036477127Df4bd';
  const ROUTER_ABI =  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_factory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_WETH",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "WETH",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountADesired",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBDesired",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountAMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "addLiquidity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountTokenDesired",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountTokenMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETHMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "addLiquidityETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountToken",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "factory",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveOut",
          "type": "uint256"
        }
      ],
      "name": "getAmountIn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveOut",
          "type": "uint256"
        }
      ],
      "name": "getAmountOut",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        }
      ],
      "name": "getAmountsIn",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        }
      ],
      "name": "getAmountsOut",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveB",
          "type": "uint256"
        }
      ],
      "name": "quote",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountAMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "removeLiquidity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountTokenMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETHMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "removeLiquidityETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountToken",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountTokenMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETHMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "approveMax",
          "type": "bool"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "removeLiquidityETHWithPermit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountToken",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountAMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "approveMax",
          "type": "bool"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "removeLiquidityWithPermit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapETHForExactTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOutMin",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapExactETHForTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountOutMin",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapExactTokensForETH",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountOutMin",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapExactTokensForTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountInMax",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapTokensForExactETH",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountInMax",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapTokensForExactTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]

  const TOKEN_SWAP_ADDRESS = '0xEC9Bf10d059Aa5307F1B721eA3036477127Df4bd';
  const TOKEN_SWAP_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_factory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_WETH",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "WETH",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountADesired",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBDesired",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountAMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "addLiquidity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountTokenDesired",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountTokenMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETHMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "addLiquidityETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountToken",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "factory",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveOut",
          "type": "uint256"
        }
      ],
      "name": "getAmountIn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveOut",
          "type": "uint256"
        }
      ],
      "name": "getAmountOut",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        }
      ],
      "name": "getAmountsIn",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        }
      ],
      "name": "getAmountsOut",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveB",
          "type": "uint256"
        }
      ],
      "name": "quote",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountAMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "removeLiquidity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountTokenMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETHMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "removeLiquidityETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountToken",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountTokenMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETHMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "approveMax",
          "type": "bool"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "removeLiquidityETHWithPermit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountToken",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountAMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "approveMax",
          "type": "bool"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "removeLiquidityWithPermit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapETHForExactTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOutMin",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapExactETHForTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountOutMin",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapExactTokensForETH",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountOutMin",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapExactTokensForTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountInMax",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapTokensForExactETH",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountInMax",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapTokensForExactTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ] as const;

  const TOKEN_A_ADDRESS = '0x81960374004ca95499a720027f76c04871e0DFC2';
  const TOKEN_B_ADDRESS = '0x63599aE00A7A43FaDBc2B72E1390ccbCdd0d455B';

  ////////////////Web3 Hooks///////////////////////
  const { address, isConnected, chain } = useAccount();
	const { connect } = useConnect();
	const { disconnect } = useDisconnect();
	const { data: writeContractResult, writeContract, isPending: isWritePending, error: writeError } = useWriteContract();
	const { writeContractAsync } = useWriteContract();
	const [isCalculating, setIsCalculating] = useState(false);

  ////////////////Contract Component States///////////////////////
  const [tokenAAmount, setTokenAAmount] = useState('');
	const [tokenBAmount, setTokenBAmount] = useState('');
	const [swapFromAmount, setSwapFromAmount] = useState('');
	const [swapFromToken, setSwapFromToken] = useState(TOKEN_A_ADDRESS);
	const [swapToToken, setSwapToToken] = useState(TOKEN_B_ADDRESS);
  const [swapToAmount, setSwapToAmount] = useState('');

  /////////////////Web3 Functions///////////////////////
  const { data: amountOutData, refetch: refetchAmountsOut } = useReadContract({
		abi: TOKEN_SWAP_ABI,
		address: TOKEN_SWAP_ADDRESS as `0x${string}`,
		functionName: 'getAmountsOut',
		args: [
			tokenAAmount ? parseEther(tokenAAmount) : BigInt(0),
			[TOKEN_A_ADDRESS as `0x${string}`, TOKEN_B_ADDRESS as `0x${string}`],
		],
		query: {
			enabled: false // We'll manually trigger this when needed
		}
	});

  const { data: amountOutDataSwap, refetch: refetchAmountsOutSwap } = useReadContract({
		abi: TOKEN_SWAP_ABI,
		address: TOKEN_SWAP_ADDRESS as `0x${string}`,
		functionName: 'getAmountsOut',
		args: [
			swapFromAmount ? parseEther(swapFromAmount) : BigInt(0),
			[TOKEN_A_ADDRESS as `0x${string}`, TOKEN_B_ADDRESS as `0x${string}`],
		],
		query: {
			enabled: false // We'll manually trigger this when needed
		}
	});

  const handleAddLiquidity = async () => {
		if (!isConnected || !address) {
			alert("Please connect your wallet first.");
			return;
		}
		if (!tokenAAmount || !tokenBAmount || isNaN(parseFloat(tokenAAmount)) || isNaN(parseFloat(tokenBAmount)) || parseFloat(tokenAAmount) <= 0 || parseFloat(tokenBAmount) <= 0) {
			alert("Please enter valid, positive amounts for both tokens.");
			return;
		}
		if (!ROUTER_ADDRESS || !TOKEN_A_ADDRESS || !TOKEN_B_ADDRESS) {
			alert("Contract details or token addresses are missing.");
			return;
		}

		console.log(`Attempting to add liquidity: ${tokenAAmount} Token A (${TOKEN_A_ADDRESS}), ${tokenBAmount} Token B (${TOKEN_B_ADDRESS})`);


		alert("Placeholder: In a real app, ensure token approvals are confirmed before proceeding."); // Remove this in production


		// Assuming approvals are done (needs proper implementation)
		try {
			// --- TODO: Adjust functionName and args based on your actual contract ---

			const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now
			const amountADesired = parseEther(tokenAAmount); // Assumes 18 decimals
			const amountBDesired = parseEther(tokenBAmount); // Assumes 18 decimals
			// WARNING: Slippage calculation below is basic (1%). Needs proper price ratio check.
			const amountAMin = parseEther((parseFloat(tokenAAmount) * 0.99).toString());
			const amountBMin = parseEther((parseFloat(tokenBAmount) * 0.99).toString());

			const tx = await writeContractAsync({
				abi: ROUTER_ABI,
				address: ROUTER_ADDRESS as `0x${string}`,
				functionName: 'addLiquidity', // Replace with your contract's exact function name
				args: [
					TOKEN_A_ADDRESS as `0x${string}`, // Example arg: tokenA
					TOKEN_B_ADDRESS as `0x${string}`, // Example arg: tokenB
					amountADesired,
					amountBDesired,
					amountAMin,
					amountBMin,
					address, // Recipient of LP tokens
					BigInt(deadline)
				],

				// chainId: chain?.id // Optional: specify chain if needed
			});

			console.log("Transaction", tx);
			console.log("Add liquidity transaction sent...");
			// Clear inputs on successful send (optional)
			// setTokenAAmount('');
			// setTokenBAmount('');

		} catch (error) {
			console.error("Error preparing add liquidity transaction:", error);
			alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
		}
	};

  const handleSwap = async () => {
		if (!isConnected || !address) {
			alert("Please connect your wallet first.");
			return;
		}
		if (!swapFromAmount || isNaN(parseFloat(swapFromAmount)) || parseFloat(swapFromAmount) <= 0 || !swapFromToken || !swapToToken) {
			alert("Please enter a valid positive amount and ensure both tokens are selected.");
			return;
		}

		if (swapFromToken === swapToToken) {
			alert("Cannot swap a token for itself.");
			return;
		}

		console.log(`Attempting to swap ${swapFromAmount} ${swapFromToken} for ${swapToToken}`);


		// }
		alert("Placeholder: In a real app, ensure token approval is confirmed before proceeding."); // Remove this in production


		try {

			const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
			const amountIn = parseEther(swapFromAmount); // Assumes 18 decimals

			const amountOutMin = parseEther("0"); // TODO: Replace with slippage calculation

			writeContract({
				abi: TOKEN_SWAP_ABI,
				address: TOKEN_SWAP_ADDRESS as `0x${string}`,
				functionName: 'swapExactTokensForTokens', // Replace with your contract's function name
				args: [
					amountIn,
					amountOutMin,
					[swapFromToken as `0x${string}`, swapToToken as `0x${string}`], // path (can be longer if multi-hop)
					address, // recipient
					BigInt(deadline),
				],
				// --- TODO: Add `value` if swapping FROM native currency (e.g., ETH) ---

			});
			console.log("Swap transaction sent...");
			// Clear input on successful send (optional)
			// setSwapFromAmount('');

		} catch (error) {
			console.error("Error preparing swap transaction:", error);
			alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
		}
	};


  useEffect(() => {
    // Navbar background change on scroll
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      if (window.scrollY > 100) {
        nav.style.backgroundColor = "rgba(10, 10, 20, 0.9)";
        (nav.style as any).backdropFilter = "blur(10px)";
      } else {
        nav.style.backgroundColor = "transparent";
        (nav.style as any).backdropFilter = "none";
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.from('.hero-text span', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      });

      gsap.from('.hero-description', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.8,
        ease: 'elastic.out(1, 0.5)'
      });

      gsap.from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.5,
        repeat: -1,
        yoyo: true
      });

      // Section animations
      ScrollTrigger.create({
        trigger: liquiditySectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from('.liquidity-description', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          });
          gsap.from('.liquidity-card', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
          });
        }
      });

      ScrollTrigger.create({
        trigger: swapSectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from('.swap-description', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          });
          gsap.from('.swap-card', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
          });
        }
      });

      ScrollTrigger.create({
        trigger: predictionSectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from('.prediction-card', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      });

    }, mainRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
		if (!tokenAAmount || tokenAAmount === '0' || tokenAAmount === '') {
			setTokenBAmount('');
			return;
		}
		const calculateTokenBAmount = async () => {
			try {
				setIsCalculating(true);
				await refetchAmountsOut();

				if (amountOutData && amountOutData.length > 1) {
					const amountB = formatEther(amountOutData[1]);
					setTokenBAmount(amountB);
				}
			} catch (error) {
				console.error("Error calculating Token B amount:", error);
				setTokenBAmount('');
			} finally {
				setIsCalculating(false);
			}
		};

		const debounceTimer = setTimeout(() => {
			calculateTokenBAmount();
		}, 500); // Debounce to avoid too many requests

		return () => clearTimeout(debounceTimer);
	}, [tokenAAmount, amountOutData, refetchAmountsOut]);

  useEffect(() => {
		if (!swapFromAmount || swapFromAmount === '0' || swapFromAmount === '') {
			setTokenBAmount('');
			return;
		}

    console.log("Swap From Amount:", swapFromAmount);
    console.log("Swap to amount:", swapToAmount);
    console.log(swapFromAmount);
		const calculateTokenBAmount = async () => {
			try {
				setIsCalculating(true);
				await refetchAmountsOutSwap();
        console.log("fetched amount", amountOutDataSwap);
				if (amountOutDataSwap && amountOutDataSwap.length > 1) {
					const amountB = formatEther(amountOutDataSwap[1]);
					setSwapToAmount(amountB);
				}
			} catch (error) {
				console.error("Error calculating Token B amount:", error);
				setSwapToAmount('');
			} finally {
				setIsCalculating(false);
			}
		};

		const debounceTimer = setTimeout(() => {
			calculateTokenBAmount();
		}, 500); // Debounce to avoid too many requests

		return () => clearTimeout(debounceTimer);
	}, [swapFromAmount, amountOutDataSwap, refetchAmountsOutSwap]);


  const scrollToSection = (ref: any) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth'
    });
  };

  const handlePredictionCardClick = (asset: string) => {
    navigate(`/prediction/${encodeURIComponent(asset)}`);
  };

  return (
    <>
    <div ref={mainRef} className="app-container">
      {/* Navbar */}
      <nav ref={navRef} className="navbar">
        <div className="nav-content">
          <div className="nav-logo">WEB3</div>
          <div className="nav-links">
            <button onClick={() => scrollToSection(heroRef)}>Home</button>
            <button onClick={() => scrollToSection(liquiditySectionRef)}>Liquidity</button>
            <button onClick={() => scrollToSection(swapSectionRef)}>Swap Tokens</button>
            <button onClick={() => scrollToSection(predictionSectionRef)}>Prediction</button>
          </div>
        </div>
      </nav>

      <video autoPlay muted loop className="background-video">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-woman-using-her-credit-card-41596-large.mp4" type="video/mp4" />
      </video>

      {/* Hero Section */}
      <div ref={heroRef} className="hero-section">
        <div className="content-container">
          <header className="hero">
            <h1 className="hero-text">
              WEB3 REVOLUTION
            </h1>
            <p className="hero-description">
              The next evolution of the internet is here. Experience decentralized finance with our cutting-edge platform.
            </p>
            <div className="scroll-indicator">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
          </header>
        </div>
      </div>

      {/* Liquidity Section */}
      <div ref={liquiditySectionRef} className="section-container">
        <div className="content-container">
          <div className="section-content">
            <div className="liquidity-description">
              <h2>Liquidity Pools</h2>
              <p>
                Provide liquidity to decentralized exchanges and earn passive income through trading fees and yield farming rewards. 
                Our platform offers competitive APYs and minimal impermanent loss protection.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">$42.8B</div>
                  <div className="stat-label">Total Value Locked</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">1.2M</div>
                  <div className="stat-label">Active Providers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">12-48%</div>
                  <div className="stat-label">Average APY</div>
                </div>
              </div>
            </div>
            <div className="liquidity-card section-card">
              <div className="card-content">
                <h2>Add Liquidity</h2>
                <p>Provide liquidity to earn passive income through trading fees and rewards</p>
                <div className="card-actions">
                  <input type="number" placeholder="Token Amount" onKeyUp={(e) => {setTokenAAmount(e.target.value)}} />
                  <input type="number" placeholder="Token Amount" value={tokenBAmount}/>
                  <button className="action-btn pulse" onClick={handleAddLiquidity}>Add Liquidity</button>
                </div>
                <div className="card-stats">
                  <div className="stat">
                    <span className="value">$42.8B</span>
                    <span className="label">Total Locked</span>
                  </div>
                  <div className="stat">
                    <span className="value">12-48%</span>
                    <span className="label">APY Range</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Section */}
      <div ref={swapSectionRef} className="section-container">
        <div className="content-container">
          <div className="section-content reverse">
            <div className="swap-description">
              <h2 className="gradient-text">Token Swaps</h2>
              <p className="glow-text">
                Trade tokens instantly with optimal pricing and minimal slippage. 
                Our advanced routing algorithm scans multiple DEXs to find you the best rates.
              </p>
              <div className="stats-grid">
                <div className="stat-item pulse-glow">
                  <div className="stat-value">$1.2B</div>
                  <div className="stat-label">24h Volume</div>
                </div>
                <div className="stat-item pulse-glow">
                  <div className="stat-value">0.05%</div>
                  <div className="stat-label">Average Fee</div>
                </div>
                <div className="stat-item pulse-glow">
                  <div className="stat-value">12s</div>
                  <div className="stat-label">Avg. Swap Time</div>
                </div>
              </div>
            </div>
            
            <div className="swap-card section-card neo-glass">
              <div className="card-content">
                <h2 className="card-title">Swap Tokens</h2>
                <p className="card-subtitle">Get the best rates across DeFi</p>
                
                <div className="card-actions">
                  <div className="swap-input-container neo-inset">
                    <input type="number" placeholder="0.0" className="swap-amount-input" onKeyUp={(e) => {setSwapFromAmount(e.target.value)}} />
                    <div className="token-select-wrapper">
                      <select className="token-select-right">
                        <option value="ETH">ETH</option>
                        <option value="BTC">BTC</option>
                        <option value="USDC">USDC</option>
                        <option value="DAI">DAI</option>
                      </select>
                      <div className="token-icon eth-icon"></div>
                    </div>
                  </div>
                  
                  <div className="swap-arrow-container">
                    <div className="swap-arrow-circle">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="swap-arrow-icon">
                        <path d="M12 4V20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="swap-input-container neo-inset">
                    <input type="number" placeholder="0.0" className="swap-amount-input" value={swapToAmount}  />
                    <div className="token-select-wrapper">
                      <select className="token-select-right">
                        <option value="USDC">USDC</option>
                        <option value="ETH">ETH</option>
                        <option value="BTC">BTC</option>
                        <option value="DAI">DAI</option>
                      </select>
                      <div className="token-icon usdc-icon"></div>
                    </div>
                  </div>
                  
                  <button className="action-btn gradient-pulse">
                    <span>Swap Now</span>
                  </button>
                </div>
                
                <div className="rate-info">
                  <span className="rate-label">Best rate:</span>
                  <span className="rate-value">1 ETH = 1,850.42 USDC</span>
                </div>
                
                <div className="card-stats">
                  <div className="stat">
                    <span className="value">0.05%</span>
                    <span className="label">Fee</span>
                  </div>
                  <div className="stat">
                    <span className="value">$1.2B</span>
                    <span className="label">Volume 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Section */}
      

{/* // Inside your component's return statement: */}
<div ref={predictionSectionRef} className="section-container full-width">
  <div className="content-container">
    <h2 className="section-title">Prediction Markets</h2>
    <p className="section-subtitle">Trade on future price movements with AI-powered insights</p>
    
    <div className="prediction-cards-container">
      <PredictionCard
        assetPair="ETH/USDT"
        currentPrice="$3,427.52"
        priceChange={2.4}
        timeRemaining="3h 45m"
        progress={65}
        volume="$1.2B"
      />
      
      <PredictionCard
        assetPair="BTC/USDT"
        currentPrice="$63,851.20"
        priceChange={1.8}
        timeRemaining="5h 12m"
        progress={40}
        volume="$3.8B"
      />
      
      <PredictionCard
        assetPair="SOL/USDT"
        currentPrice="$142.75"
        priceChange={-3.2}
        timeRemaining="7h 30m"
        progress={25}
        volume="$850M"
      />
    </div>
  </div>
</div>
    </div>
    </>
  );
}