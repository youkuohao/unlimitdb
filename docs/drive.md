# drive

一个drive包含：
  * 一个数据库空间
    * 一个存储空间
  * 一个服务名
    * 起多个服务（自动负载均衡）
  * 一个到多个域名
    * 自动分配一个二级域名
    * 静态文件代理 （存储空间的/public目录）
    