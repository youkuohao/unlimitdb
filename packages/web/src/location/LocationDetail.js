import React, {Component} from "react"
import {TabBar, TabPane} from "@react-web/tabs"
import Input from "@react-web/input"
import Button from "@react-web/button"
import Checkbox from "@react-web/checkbox"
import {StyleSheet, css} from "aphrodite"

const bodyTypes = ['HTML', 'JSON', 'API', 'PROXY', 'SEASHELL', 'REDIRECT', 'FILE']

class LocationDetail extends Component {

  static defaultProps = {
    onChange: () => {}
  };

  changeState = (changePart) => {
    this.props.onChange(changePart);
  };

  render() {
    const {isOpen, pathname, content, cors, type} = this.props;
    if (!isOpen) return null;
    return (
      <div className={css(styles.detail)}>
        <div>
          {/*路由匹配*/}
          <div>
            <Input
              label={'路由'}
              noBorder={true}
              inlineGroup={true}
              value={pathname}
              onChange={(e) => {this.changeState({pathname: e.target.value})}}
              type="text"
              placeholder="请输入正则表达式"/>
          </div>
          {/*跨域*/}
          <div>
            <div>
              <label>跨域</label>
              <Checkbox
                label="是"
                checked={cors}
                onChange={(e)=>{this.changeState({cors: e.target.value})}}/>
            </div>
          </div>
          {/*类型*/}
          <div>
            <label>类型</label>
            <div style={{width: '100%', height: '50px', position: 'relative'}}>
              <TabBar
                activeKey={type.toUpperCase()}
                onSwitchKey={(key) => this.changeState({type: key})}>
                {bodyTypes.map(type => (
                  <TabPane key={type}>{type}</TabPane>
                ))}
              </TabBar>
            </div>
            <div>
              <label>{type}</label>
              <div>
                <Input
                  type="text"
                  onChange={(e)=>{this.changeState({content: e.target.value})}}
                  value={content}
                  name="content"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  detail: {
    width: '100%',
  }
});


export default LocationDetail
