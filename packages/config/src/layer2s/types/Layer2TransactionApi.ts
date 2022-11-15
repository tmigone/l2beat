import { UnixTime } from '@l2beat/types'

export type AssessCount = (count: number, blockNumber: number) => number

interface RpcTransactionApi {
  type: 'rpc'
  url?: string
  callsPerMinute?: number
  assessCount?: AssessCount
  startBlock?: number
}

interface AztecTransactionApi {
  type: 'aztec'
  url: string
  callsPerMinute?: number
}

export type StarkexProduct =
  | 'dydx'
  | 'sorare'
  | 'immutable'
  | 'myria'
  | 'deversifi'
interface StarkexApi {
  type: 'starkex'
  product: StarkexProduct
  sinceTimestamp: UnixTime
}

export type Layer2TransactionApi = { excludeFromActivityApi?: boolean } & (
  | RpcTransactionApi
  | StarkexApi
  | AztecTransactionApi
)
