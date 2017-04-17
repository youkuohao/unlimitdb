import Joi from 'joi'
import getMongodb from '../../mongodb'
import {ObjectId} from 'mongodb'

export const validate = query => Joi.validate(query, Joi.object().keys({
  keywords: Joi.string().default(''),
  tags: Joi.string().default(''),
  limit: Joi.number().default(20),
  driveId: Joi.string(),
  parentId: Joi.string().allow(null),
  replaceWithFileMetaIfIsFile: Joi.boolean().default(false),
  fields: Joi.array().default(['name', 'type']),
}), {allowUnknown: true})

export default query => (dispatch, getCtx) => new Promise(async (resolve, reject) => {
  const validated = validate(query);
  if (validated.error) return reject(validated.error);
  const {keywords, tags, limit, fields, parentId, driveId, replaceWithFileMetaIfIsFile} = validated.value;
  try {
    const filedb = (await getMongodb()).collection('file');
    if (parentId) {
      const parentMeta = await filedb.findOne({_id: ObjectId(parentId)})
      if (!parentMeta) return reject(new Error('PARENT_NOT_EXIST'))
      if (parentMeta.type === 1) {
        if (replaceWithFileMetaIfIsFile) return resolve({...parentMeta, isFile: true})
        return reject(new Error('ILLEGAL_PARENT'))
      }
    }
    const keywordRegex = keywords.split(' ').join('|');
    const filter = {
      driveId,
      parentId,
      $or: []
    }

    if (tags) filter.$or.push({tags: {$regex: tags.split(',').join('|')}})
    if (keywords) {
      filter.$or.push({name: {$regex: keywordRegex}})
      filter.$or.push({tags: {$regex: keywordRegex}})
    }

    if (filter.$or.length === 0) delete filter.$or

    const data = await filedb.find(filter, fields).limit(limit).toArray()
    resolve({data})
  } catch(e){
    return reject(e)
  }
})