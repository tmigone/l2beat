import assert from 'assert'
import { ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import fetch from 'node-fetch'

interface Config {
  name: string
  url: string
  usdcAddress: string
  poolAddress: string
  wethAddress: string
}

const l2BeatAddress = '0x41626BA92c0C2a1aD38fC83920300434082B1870'
const arbitrum: Config = {
  name: 'arbitrum',
  url: 'https://arb1.arbitrum.io/rpc',
  poolAddress: '0x17c14D2c404D167802b16C450d3c99F88F2c4F4d',
  usdcAddress: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  wethAddress: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
}

const optimism: Config = {
  name: 'optimism',
  url: 'https://mainnet.optimism.io',
  poolAddress: '0x85149247691df622eaf1a8bd0cafd40bc45154a9',
  usdcAddress: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  wethAddress: '0x4200000000000000000000000000000000000006',
}

async function testChain({
  poolAddress,
  url,
  usdcAddress,
  wethAddress,
  name,
}: Config) {
  console.log(`Testing ${name}`)
  const provider = new ethers.providers.JsonRpcProvider(url)
  const usdcContract = new ethers.Contract(
    usdcAddress,
    [
      'function balanceOf(address _owner) public view returns (uint256 balance)',
    ],
    provider,
  )
  await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    usdcContract
      .balanceOf(poolAddress)
      .then((balance: any) => console.log(`USDC balance ${Number(balance)}`)),
    provider
      .estimateGas({
        to: wethAddress,
        from: l2BeatAddress,
        // `function deposit() payable`
        data: '0xd0e30db0',
        value: parseUnits('1.0', 'wei'),
      })
      .then((price) => console.log(`Estimated price ${Number(price)}`)),
  ])
}

async function testdYdX() {
  console.log(`Testing dYdX`)
  const response = await fetch('https://api.dydx.exchange/v3/trades/BTC-USD')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  const latestAt = new Date(data?.trades?.[0]?.createdAt)
  assert(!isNaN(+latestAt), 'latest BTC-USD trade createdAt is not a date')
  console.log(`BTC-USD latest trade was at ${latestAt.toUTCString()}`)
  assert(Date.now() - +latestAt <= 60 * 60 * 1000)
}

async function main() {
  await testChain(arbitrum)
  await testChain(optimism)
  await testdYdX()
}

main().catch(console.error)
