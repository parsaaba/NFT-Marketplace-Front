/* eslint no-param-reassign: 0 */
import getAxios from '~/plugins/axios'
import TokenModel from '~/components/model/token'
import BigNumber from '~/plugins/bignumber'

const ZERO = new BigNumber(0)

export default {
  namespaced: true,

  state: () => {
    return {
      erc20Tokens: [],
      selectedERC20Token: null,
    }
  },

  mutations: {
    erc20Tokens(state, tokens) {
      state.erc20Tokens = tokens
    },
    selectedERC20Token(state, token) {
      state.selectedERC20Token = token
    },
  },

  getters: {
    erc20Tokens(state) {
      return state.erc20Tokens
    },
    selectedERC20Token(state) {
      if (!state.selectedERC20Token && state.erc20Tokens) {
        return state.erc20Tokens[0]
      }
      return state.selectedERC20Token
    },
    totalCurrencyBalance(state, getters, rootState, rootGetters) {
      const network = rootGetters['network/selectedNetwork']
      const tokens = state.erc20Tokens
      const tokensBalance = []
      tokens.reduce((a, t) => {
        const v = t.getBalance(network.chainId)
        tokensBalance.push(v)
        return a.plus(v)
      }, ZERO)
      return tokensBalance
    },
  },

  actions: {
    async fetchERC20Tokens({ commit }) {
      const response = await getAxios().get('erc20tokens/')
      if (response.status === 200 && response.data.data.erc20Tokens) {
        const erc20Tokens = response.data.data.erc20Tokens
        const tokens = []
        erc20Tokens.forEach((token) => tokens.push(new TokenModel(token)))
        commit('erc20Tokens', tokens)
      }
    },

    async fetchBalances(
      { rootGetters, state, dispatch },
      payload = { refresh: false },
    ) {
      const tokens = state.erc20Tokens
      const networks = rootGetters['network/networks']

      for (let i = 0; i < tokens.length; i++) {
        await dispatch(
          'trunk/loadTokenBalance',
          {
            token: tokens[i],
            refresh: payload.refresh,
            network: networks.main,
          },
          { root: true },
        )
        await dispatch(
          'trunk/loadTokenBalance',
          {
            token: tokens[i],
            refresh: payload.refresh,
            network: networks.matic,
          },
          { root: true },
        )
      }
    },

    async reloadBalances({ dispatch }) {
      dispatch('trunk/resetBalances', {}, { root: true })
      await dispatch('fetchBalances')
    },
  },
}
