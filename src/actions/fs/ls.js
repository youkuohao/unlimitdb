import path from 'path'
import filesystem from 'level-filesystem'
import {connect, bindActionCreators} from 'action-creator'
import cat from './cat'

/**
 * @api {POST} /File/ls 获取文件列表
 * @apiGroup File
 * @apiName FileLs
 * @apiParam {string} token 令牌
 * @apiParam {string} hostname
 * @apiParam {string} pathname
 */
const ls = ({pathname, hostname}) => (ctx, getAction) => new Promise(async (resolve, reject) => {
  try {
    const fs = filesystem(ctx.db.fs);
    const directory = `${hostname}${pathname}`;
    const files = await new Promise((resolve, reject) => {
      fs.readdir(directory, (err, files) => {
        if (err) return reject(err);
        resolve(files)
      });
    });
    const stats = await Promise.all(files.map(filename => {
      return new Promise((resolve, reject) => {
        fs.lstat(`${directory}/${filename}`, (err, stat) => {
          if (err) return reject(err);
          resolve(stat);
        })
      })
    }));
    const ls = files.map((name, index) => {
      const stat = stats[index];
      return {
        name,
        stat,
        isFile: stat.isFile(),
        isDirectory: stat.isDirectory(),
      }
    });
    resolve({
      isFile: false,
      ls
    })
  } catch(e){
    if (e.message.search('ENOTDIR') == 0 || e.message.search('ENOENT') == 0) {
      try {
        const {cat} = getAction();
        const file = await cat({hostname, pathname});
        resolve(file)
      } catch(e){
        reject(e)
      }

    } else {
      reject(new Error('ENOENT'))
    }
  }
});


export default module.exports = connect(
  bindActionCreators({
    cat
  })
)(ls);