import { handleActions } from 'redux-actions'


const initialState = {
  currentDriveId: '',

  driveUserState: 0, // 0 not init, 1 querying 2 ready 3 mutating
  driveUserError: '',
  driveUserAdmin: {},
  driveUserList: [],

  hostList: [],
  hostListState: 0, // 0=not init, 1=loading, 2=ready

  locationState: 0, // 0=not init, 1=loading, 2=ready
  locations: {},
};

export default handleActions({
  host__stateUpdate (state, action) {
    return Object.assign({}, state, action.payload)
  },

  host__hostListUpdate (state, action) {
    return Object.assign({}, state, action.payload, {
      hostListState: 2,
    })
  },

  host__switchCurrent (state, action) {
    return Object.assign({}, state, action.payload, {locationState: 0})
  },

  host__add (state, action) {
    const nextHostList = state.hostList.concat({
      hostname: action.payload.hostname
    });
    return Object.assign({}, state, {hostList: nextHostList})
  },

  host__remove (state, action) {
    const nextHostList = state.hostList.filter(item => {
      return item.hostname !== action.payload.hostname
    });
    return Object.assign({}, state, {hostList: nextHostList})

  },

  host__locationUpdate (state, action) {
    return Object.assign({}, state, action.payload, {
      locationState: 2
    })
  },

  host__locationEdit (state, action) {
    const newLocationItem = action.payload.nextLocation;
    const nextLocations = Object.assign({}, state.locations, {
      [newLocationItem.pathname]: newLocationItem
    });
    return Object.assign({}, state, {
      locations: nextLocations
    })
  },

  host__locationAdd (state, action) {
    const newLocationItem = action.payload.nextLocation;
    const nextLocations = Object.assign({}, state.locations, {
      [newLocationItem.pathname]: newLocationItem
    });
    return Object.assign({}, state, {
      locations: nextLocations
    })
  },

  host__driveUserUpdate (state, action) {
    const {driveUserState, driveUserError='', driveUserList, driveUserAdmin} = action.payload;
    return Object.assign({}, state, {driveUserState, driveUserError},
      driveUserList ? {driveUserList} : {},
      driveUserAdmin ? {driveUserAdmin} : {}
    )
  },

}, initialState)