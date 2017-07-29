import Fetch from "@shared/fetch"
const {API_HOST} = global

/**
 * 删除host
 * @returns {function()}
 */
const deleteHost = (driveId) => async (dispatch, getState) => {
  const {account: {token}} = getState();
  const result = await new Fetch(`${API_HOST}/seashell/drive/remove`, {
    driveId,
    token
  }).post();

  if (result.error) return console.log(result.error)

  dispatch({
    type: 'host__remove',
    payload: {driveId}
  })

};

export default deleteHost;