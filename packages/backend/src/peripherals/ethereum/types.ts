import { Bytes, EthereumAddress } from '@l2beat/types'
import { providers } from 'ethers'

export type BlockTag = bigint | 'earliest' | 'latest' | 'pending'

export interface CallParameters {
  from?: EthereumAddress
  to: EthereumAddress
  gas?: bigint
  gasPrice?: bigint
  value?: bigint
  data?: Bytes
}

export interface EthereumProvider {
  call: providers.Provider['call']
  getBlock: providers.Provider['getBlock']
  getBlockNumber: providers.Provider['getBlockNumber']
  getLogs: providers.Provider['getLogs']
}
