import React, {Component} from 'react'

class HostList extends Component {
  render(){


    return (
      <div class="container width-max" style="padding-top: 20px;">


        <div class="paper">

          <div class="title">
            <h4 class="">
              域名列表
              <small style="margin-left: 20px;">
                <a href="{{conf.hrefPrefix}}/host/new" class="btn btn-xs btn-primary">添加</a>
              </small>
            </h4>
          </div>

          <div class="host-list"></div>

        </div>

      </div>

    )

  }
}

export default HostList