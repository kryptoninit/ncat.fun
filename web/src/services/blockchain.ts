import { Contract, ethers, getDefaultProvider } from 'ethers';
import Web3 from 'web3';

export const nodeURL = "https://bsc-dataseed.binance.org/";
const abi = require("./NCAT.json");
const nftAbi = require("./NCATNFT.json");
const poundAbi = require("./NCATPOUND.json");
const contract = '0x0cF011A946f23a03CeFF92A4632d5f9288c6C70D';
export const nftAddress = '0x00d540dec7ea96BE8c4208e97274380597AED4a8';
export const nftPoundAddress = '0x9bC84d544340f6963f09CE8C55aAbaf03DF680cA';
export const defaultProvider = getDefaultProvider(nodeURL);
// const web3 = new Web3(new Web3.providers.HttpProvider(nodeURL, { timeout: 10000 }))
export const ipfsDirHash = "QmYfpLftJytwGyeisa9SXpG4pVHezekfM8kuHX9FNCgEmx"
const roContract = new Contract(contract, abi, defaultProvider);

export const getBalance = (address: any): Promise<number> => {
    return roContract.balanceOf(address);
};

// export const createNCATContractInstanceWeb3 = () => {
//     return new web3.eth.Contract(abi, contract);
// }

// export const createNFTContractInstanceWeb3 = () => {
//     return new web3.eth.Contract(nftAbi, nftAddress);
// }

// export const createPoundContractInstanceWeb3 = () => {
//     return new web3.eth.Contract(poundAbi, nftPoundAddress);
// }


export const createNCATContractInstance = (signer: any) => {
    return new Contract(contract, abi, signer);
}

export const createNFTContractInstance = (signer: any): Contract => {
    return new Contract(nftAddress, nftAbi, signer);
}

export const createPoundContractInstance = (signer: any): Contract => {
    return new Contract(nftPoundAddress, poundAbi, signer);
}

// NCAT Token functions

export const getAllowance = async (contract: Contract, owner: any, spender: any): Promise<any> => {
    try {
        const allowance = await contract.allowance(owner, spender);
        return allowance
    } catch (e) {
        console.log(e)
    }

    return 0;
}

export const getDecimals = async (contract: Contract): Promise<number> => {
    try {
        const decimals = await contract.decimals();
        return decimals
    } catch (e) {
        console.log(e)
    }

    return 0;
}

export const approveNCAT = async (contract: Contract, spender: any, limit = ethers.constants.MaxUint256) => {
    const estimatedGas = await contract.estimateGas.approve(spender, limit);

    const txResp = await contract.approve(spender, limit);
    const receipt = await txResp.wait();
    return receipt.transactionHash;
}

// Pound Contract functions

export const getSwapCost = async (contract: Contract): Promise<number> => {
    const cost = await contract.swapCost();
    return cost;
}

export const commitSwapNCAT = async (contract: Contract, numberOfNFT: any) => {
    const estimatedGas = await contract.estimateGas.commitSwapNcat(numberOfNFT);

    const txResp = await contract.commitSwapNcat(numberOfNFT);
    const receipt = await txResp.wait();
    return receipt.transactionHash;
}

export const revealNCATs = async (contract: Contract) => {
    const estimatedGas = await contract.estimateGas.revealNcats();

    const txResp = await contract.revealNcats();
    const receipt = await txResp.wait();
    return receipt.transactionHash;
}

// NFT Contract functions

export const balanceOf = async (contract: Contract, owner: any) => {
    const balance = await contract.balanceOf(owner);
    return balance;
}

export const tokenOfOwnerByIndex = async (contract: Contract, owner: any, index: number) => {
    const tokenId = await contract.tokenOfOwnerByIndex(owner, index);
    return tokenId;
}