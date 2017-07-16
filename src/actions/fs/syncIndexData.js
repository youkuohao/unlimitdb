
/**
 * @private
 * 根据完整的路径，获取文件的索引信息
 * 
 * file 里保存的是文件信息和文件之间的关系，是一个tree
 * fileIndex 里保存路径 -> 文件信息的键值对
 */
export default ({fullPath}) => (dispatch, getCtx) => new Promise(async resolve => {
  const {db, config} = getCtx()
  try {
    const fileIndexDb = db.collection('fileIndex')
    const fileDb = db.collection('file')
    const paths = fullPath.split('/').filter(item => item !== '')
    
    if (paths.length === 1) {
      const indexData = {type: 2, updateTime: Date.now()}
      await fileIndexDb.findOneAndUpdate({_id: fullPath}, {$set: indexData})
      console.log('syncIndexData: only drive index, ', fullPath)
      return resolve({driveId: paths[0], type: 2})
    }
    
    const driveId = paths.shift();
    let indexData = null;
    let parentId = null;

    try {
      indexData = await walkLeftToRight(paths, fileDb, parentId, driveId);
    } catch(e){
      indexData = {error: 'NOT_FOUND'}
    }

    console.log('syncIndexData: ', indexData)
    indexData = {...indexData, updateTime: Date.now()}
    await fileIndexDb.findOneAndUpdate({_id: fullPath}, {$set: indexData})
    resolve(indexData)

  } catch(e){
    resolve({error: 'NOT_FOUND'})
  }
})

/**
 * 根据 [ 文件id, 父文件id和文件名 ] 更新索引
 * 先获取完整路径，再写入索引
 */
export const syncIndexDataByFile = ({file, fileId, driveId}) => (dispatch, getCtx) => new Promise(async (resolve, reject) => {
  const {db, config} = getCtx()
  try {
    const fileDb = db.collection('file')
    if (!file) {
      file = await fileDb.findOne({_id: fileId})
      if (!file) throw new Error('File not exist')
    }

    const indexData = {...file, updateTime: Date.now()}
    const fullPath = file.parentId === null ? 
      `/${driveId}/${file.name}` :
      await walkRightToLeft([file.name], fileDb, file._id, driveId)

    const fileIndexDb = db.collection('fileIndex')
    await fileIndexDb.insertOne({...indexData, _id: fullPath}, )
    resolve(file)

  } catch (e){
    reject(e)
  }
})

/**
 * 从左往右，一级目录一级目录查询（根据父文件夹id及该文件文件名），直到目标文件，
 * 找到目标文件后返回文件信息(id, parentId, name)
 * 找不到则返回错误信息'NOT_FOUND'
 * @param driveId
 */

const walkLeftToRight = (paths, file, parentId, driveId) => new Promise(async (resolve, reject) => {
  try {
    const name = paths.shift();
    let fields = [];
    if (paths.length === 0) fields = fields.concat(['tags', 'type']);
    const result = await file.findOne({driveId, name, parentId}, {fields});
    if (!result) return reject(new Error('NOT_FOUND'));
    result.fileId = result._id;
    if (paths.length === 0) return resolve(result);
    parentId = result.fileId;
    resolve(await walkLeftToRight(paths, file, parentId, driveId))
  } catch(e){
    reject(e)
  }
})

/**
 * 获取完整的路径
 */
const walkRightToLeft = (paths, filedb, id, driveId) => new Promise(async (resolve, reject) => {
  try {
    const result = await filedb.findOne({_id: id});
    if (result.parentId === null) return resulve(paths.join('/'));
    resolve(await walkLeftToRight(paths.unshift(result.name), filedb, result.parentId, driveId))
  } catch(e){
    reject(e)
  }
})
