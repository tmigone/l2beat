import { Logger } from '@l2beat/common'
import { RpcTransactionApi } from '@l2beat/config'
import { ProjectId } from '@l2beat/types'
import { providers } from 'ethers'

import { Config } from '../config'
import { TransactionCountSyncConfig } from '../config/Config'
import { Clock } from '../core/Clock'
import { RpcTransactionUpdater } from '../core/transaction-count/RpcTransactionUpdater'
import { BlockTransactionCountRepository } from '../peripherals/database/BlockTransactionCountRepository'
import { createMultiProvider } from '../peripherals/ethereum/createMultiProvider'
import { EthereumClient } from '../peripherals/ethereum/EthereumClient'
import { EthereumProvider } from '../peripherals/ethereum/types'
import { assert } from '../tools/assert'

export function createLayer2RpcTransactionUpdaters(
  config: Config,
  blockTransactionCountRepository: BlockTransactionCountRepository,
  clock: Clock,
  logger: Logger,
) {
  assert(config.transactionCountSync)
  const rpcUpdaters: RpcTransactionUpdater[] = []

  for (const project of config.projects) {
    if (project.transactionApi?.type === 'rpc') {
      const l2Provider = createL2Provider(
        project.transactionApi,
        project.projectId,
        config.transactionCountSync,
      )

      const ethereumClient = new EthereumClient(
        l2Provider,
        logger,
        project.transactionApi.callsPerMinute,
      )

      const transactionUpdater = new RpcTransactionUpdater(
        ethereumClient,
        blockTransactionCountRepository,
        clock,
        logger,
        project.projectId,
        {
          assessCount: project.transactionApi.assessCount,
          workQueueSizeLimit: config.transactionCountSync.rpcWorkQueueLimit,
          workQueueWorkers: config.transactionCountSync.rpcWorkQueueWorkers,
        },
      )

      rpcUpdaters.push(transactionUpdater)
    }
  }

  return rpcUpdaters
}

export function createEthereumTransactionUpdater(
  config: TransactionCountSyncConfig,
  blockTransactionCountRepository: BlockTransactionCountRepository,
  clock: Clock,
  logger: Logger,
  apiKey: string,
) {
  const provider = new providers.AlchemyProvider('mainnet', apiKey)
  const client = new EthereumClient(provider, logger)
  const updater = new RpcTransactionUpdater(
    client,
    blockTransactionCountRepository,
    clock,
    logger,
    ProjectId.ETHEREUM,
    {
      startBlock: 8929324,
      workQueueSizeLimit: config.rpcWorkQueueLimit,
      workQueueWorkers: config.rpcWorkQueueWorkers,
    }, // TODO: make it cleaner, we already have a min timestamp in config
  )
  return updater
}

function createL2Provider(
  rpc: RpcTransactionApi,
  projectId: ProjectId,
  config: TransactionCountSyncConfig,
): EthereumProvider {
  switch (rpc.provider) {
    case 'alchemy':
      return createMultiProvider(
        (projectId === ProjectId('arbitrum')
          ? config.arbitrumAlchemyApiKeys
          : projectId === ProjectId('optimism')
          ? config.optimismAlchemyApiKeys
          : []
        ).map((key) => new providers.AlchemyProvider(rpc.networkName, key)),
      )
    case 'jsonRpc':
      return new providers.JsonRpcProvider({
        url: rpc.url,
        timeout: 10000,
      })
    default:
      throw new Error('Unknown provider')
  }
}
