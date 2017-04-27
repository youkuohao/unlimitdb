import Joi from 'joi'
import getMongodb from '../../mongodb'

export const validate = query => Joi.validate(query, Joi.object().keys({
  limit: Joi.number().default(20),
  fields: Joi.array().default(['appName', 'permissions'])
}), {allowUnknown: true})


/**
 * get app list
 * @returns {Promise}
 */
export default query => (dispatch, getCtx) => new Promise(async (resolve, reject) => {
  const validated = validate(query);
  if (validated.error) return reject(validated.error);
  const {limit, fields} = validated.value
  const filter = {}

  const {session} = getCtx().request.headers;
  if (!session) return reject(new Error('PERMISSION_DENIED'))
  filter.adminId = session.userId;
  try {
    const db = (await getMongodb()).collection('app');
    const data = await db.find(filter, {fields}).limit(limit).toArray();
    resolve({data})
  } catch(e){
    reject(e)
  }
});