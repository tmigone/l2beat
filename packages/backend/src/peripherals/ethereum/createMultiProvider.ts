import { providers } from 'ethers'

import { assert } from '../../tools/assert'
import { EthereumProvider } from './types'

export function createMultiProvider(
  _providers: providers.Provider[],
): EthereumProvider {
  assert(_providers.length > 0)

  let next = 0

  const getNext = () => {
    const provider = _providers[next]
    next = (next + 1) % _providers.length
    return provider
  }

  return {
    call: (...args) => getNext().call(...args),
    getBlock: (...args) => getNext().getBlock(...args),
    getBlockNumber: (...args) => getNext().getBlockNumber(...args),
    getLogs: (...args) => getNext().getLogs(...args),
  }
}
