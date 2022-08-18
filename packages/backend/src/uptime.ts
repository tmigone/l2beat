import { ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'

const arbitrumUrl = 'https://arb1.arbitrum.io/rpc'
const provider = new ethers.providers.JsonRpcProvider(arbitrumUrl)

const usdcAddress = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
const poolAddress = '0x17c14D2c404D167802b16C450d3c99F88F2c4F4d'
const usdcContract = new ethers.Contract(
  usdcAddress,
  ['function balanceOf(address _owner) public view returns (uint256 balance)'],
  provider,
)
usdcContract
  .balanceOf(poolAddress)
  .then(Number)
  .then((balance) => console.log(`USDC balance ${balance}`))
  .catch(console.error)

const wethAddress = '0x82af49447d8a07e3bd95bd0d56f35241523fbab1'
const l2BeatAddress = '0x41626BA92c0C2a1aD38fC83920300434082B1870'
provider
  .estimateGas({
    to: wethAddress,
    from: l2BeatAddress,
    // `function deposit() payable`
    data: '0xd0e30db0',
    value: parseUnits('1.0', 'wei'),
  })
  .then(Number)
  .then((price) => console.log(`Estimated price ${price}`))
  .catch(console.error)
