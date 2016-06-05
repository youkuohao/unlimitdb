import { handleActions } from 'redux-actions'
import defaultsDeep from 'lodash.defaultsdeep'
import defaults from 'lodash.defaults'

const initialState = {
  hostList: [],
  locationList: [],

  hostId: '',
  host: {},
  location: {},

  // 正在加载详情
  loadingHostDetail: true,

  loadingLocationList: true
}

export default handleActions({
  'HOST_LIST_UPDATE' (state, action) {
    return defaults({
      hostId: action.hostId,
      hostList: action.hostList
    }, state)
  },

  'UPDATE_LOCATION_LIST' (state, action) {
    return defaults({
      loadingLocationList: false,
      locationList: action.locationList,
      host: action.host,
      hostId: action.hostId
    }, state)
  },

  'UPDATE_LOCATION_DETAIL' (state, action) {
    return defaults({
      host: action.host,
      location: action.location
    }, state)
  }

}, initialState)
