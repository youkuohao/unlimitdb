/**
 * 文件下载代理
 */
const handleFILE = (res, hostname, pathname, reqpath) => new Promise(async(resolve, reject) => {

  try {

    const result = await res.gateway.request('gateway/fs/cat', {
      hostname,
      pathname: `/public${reqpath}`
    });

    if (result.body.error) throw new Error(result.body.error);

    res.setHeader('CacheControl', true);
    res.setHeader('maxAge', 31536000000);
    res.setHeader('Expires', new Date(Date.now() + 31536000000));
    res.write(result.body.cat);
    res.end();

  } catch (e) {
    reject(new Error('NOT_FOUND'))
  }
});

export default handleFILE;