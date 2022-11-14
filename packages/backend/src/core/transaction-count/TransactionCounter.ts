import { json, ProjectId, UnixTime } from '@l2beat/types'

export interface DailyTransactionCount {
  timestamp: UnixTime
  count: number
}

export interface TransactionCounter {
  readonly projectId: ProjectId
  getDailyCounts(): Promise<DailyTransactionCount[]>
  getStatus(): Promise<json>
}
