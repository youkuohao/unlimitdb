import React, {Component} from 'react'
import {Link} from 'react-router'

class Location extends Component {
  render (){


    return (

      <div className="container width-max" style="padding-top: 20px;">

        <div className="paper">

          <div className="title">
            <h4><a href="{conf.hrefPrefix}/host/{host._id}">{host.hostname}</a></h4>
          </div>

          <div>
          </div>

          <h5 className="">
            添加一个Page
          </h5>

          <div className="location-wrap">

            <div className="form">

              <div className="form-group row">
                <div className="col-xs-12">
                  <label className="pull-left">/</label>
                  <div className="pull-left">
                    <input
                      className="form-control"
                      name="pathname"
                      id="pathnameInput"
                      type="text"
                      placeholder="请输入正则表达式"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-xs-12">
                  <label className="pull-left">是否跨域</label>
                  <div className="pull-left active">
                    <input type="checkbox" name="cors" />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>类型</label>

                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#locationContentHTML"
                       aria-controls="locationContentHTML"
                       data-toggle="tab"
                    >
                      <input type="radio" />HTML
                    </a>
                  </li>
                  <li>
                    <a href="#locationContentAPI"
                       aria-controls="locationContentAPI"
                       data-toggle="tab"
                    >
                      <input type="radio" />API
                    </a>
                  </li>
                  <li>
                    <a href="#locationContentJSON"
                       aria-controls="locationContentJSON"
                       data-toggle="tab"
                    >
                      <input type="radio" />JSON
                    </a>
                  </li>
                  <li>
                    <a
                      href="#locationContentRedirect"
                      aria-controls="locationContentRedirect"
                      data-toggle="tab"
                    >
                      <input type="radio" />Redirect
                    </a>
                  </li>
                  <li>
                    <a
                      href="#locationContentProxy"
                      aria-controls="locationContentProxy"
                      data-toggle="tab"
                    >
                      <input type="radio" />Proxy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#locationContentFile"
                      aria-controls="locationContentFile"
                      data-toggle="tab"
                    >
                      <input type="radio" />File
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane active" id="locationContentHTML">
                    <input
                      type="hidden"
                      name="type"
                      value="html"
                    />
                      <label>HTML</label>
                      <div>
                        <select name="contentType">
                          <option value="text">text</option>
                          <option value="file">file</option>
                        </select>
                      </div>
                      <div>
                        <textarea
                          className="form-control"
                          name="content"
                          placeholder="直接输入HTML代码"
                        />
                      </div>
                  </div>

                  <div  className="tab-pane" id="locationContentAPI">
                    <input
                      type="hidden"
                      name="type"
                      value="api"
                    />
                      <label>API url</label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          name="content"
                        />
                      </div>
                  </div>
                  <div className="tab-pane" id="locationContentJSON">
                    <input
                      type="hidden"
                      name="type"
                      value="json"
                    />
                      <label>json</label>
                      <div>
                        <textarea
                          className="form-control"
                          name="content"
                          placeholder="直接输入JSON代码"
                        />
                      </div>
                  </div>
                  <div className="tab-pane" id="locationContentRedirect">
                    <input
                      type="hidden"
                      name="type"
                      value="redirect" />
                      <label>url</label>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          name="content"
                        />
                      </div>
                  </div>
                  <div className="tab-pane" id="locationContentProxy">
                    <input type="hidden" name="type" value="proxy"/>
                      <label>反向代理</label>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          name="content"
                        />
                      </div>
                  </div>
                  <div className="tab-pane" id="locationContentFile">
                    <input type="hidden" name="type" value="file" />
                      <label>文件代理</label>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          name="content"
                          placeholder="请输入服务器真实路径"
                        />
                      </div>
                  </div>
                </div>

              </div>


              <div className="form-group row">
                <div className="col-sm-offset-2 col-sm-4 form-error"></div>
              </div>

              <div className="form-group row">
                <div className="col-sm-4">
                  <button className="btn btn-submit btn-primary btn-block">提交</button>
                </div>
              </div>

            </div>

          </div>

        </div>



      </div>


    )
  }
}

export default Location