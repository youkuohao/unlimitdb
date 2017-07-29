import Fetch from '@shared/fetch'
const {API_HOST} = global

const methodTypes = ['getMore', 'getLatest']

export default (driveId, topicId) => async (dispatch,getState) => {

  const handleError = (e) => process.nextTick(() => {
    console.log(e);
    dispatch({
      type: "topic__currentStateUpdate",
      payload: {
        currentState: 3
      }
    })
  })

  const { account: {token}, topic: {current}} = getState();

  dispatch({
    type: "topic__currentStateUpdate",
    payload: {currentState: 1}
  })

  let result = null;
  try {
    result = await new Fetch(`${API_HOST}/seashell/topic/get`, {
      token,
      driveId,
      topicId: topicId
    }).post();
    if (result.error) return handleError(result.error)
  } catch(e){
    return handleError(e)
  }

  dispatch({
    type: "topic__currentTopicUpdate",
    payload: result
  })


}
