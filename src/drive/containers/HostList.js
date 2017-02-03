import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Card from 'react-sea/lib/Card'
import Button from 'react-sea/lib/Button'
import Paper from 'react-sea/lib/Paper'
import Modal from 'react-modal'
import Input from 'react-sea/lib/Input'
import { StyleSheet, css } from 'aphrodite'
import {setTitle} from '../store/nav'
import {createHost, getHostList, deleteHost} from '../store/host'

class HostList extends Component {

  state = {
    hostName: '',
    modalOpen: false,
    page: 1
  };

  componentWillMount = ()=>{
    const {getHostList, setTitle} = this.props;
    setTitle('域名列表');
    getHostList(this.state.page)
  };

  createHost = () => {
    this.props.createHost({hostName: this.state.hostName})
  };

  handleClickOpenModal = () => {
    this.setState({
      modalOpen: true
    })
  };

  cancel = () => {
    this.setState({
      modalOpen: false
    })
  };

  _deleteHost = (host) => {
    console.log(host);
    this.props.deleteHost(host.hostname)
  };

  render(){
    const {hostList} = this.props.host;

    return (
      <div style={{padding: '20px 0', margin: '0 auto', maxWidth: 1000}}>
        <Card>
          <div className={css(styles.titlebar)}>
            <div style={{float: 'left'}}>域名列表</div>
            <div style={{float: 'left'}}>
              <Button size="small" onClick={this.handleClickOpenModal}>添加</Button>
            </div>
          </div>
          <div className={css(styles.hostList)}>
            {(() => {
              return hostList.map((item, index)=>{
                return (
                  <div className={css(styles.hostItem)} key={index}>
                    <Link to={`/${item.hostname}/file`} style={{float: 'left'}}>
                      <div>{item.hostname}</div>
                    </Link>
                    <div className={css(styles.buttons)} style={{float: 'left'}}>
                      <Button onClick={(e) => this._deleteHost(item)} type="danger" size="small">删除</Button>
                    </div>
                  </div>
                )
              })
            })()}
          </div>
        </Card>

        <Modal
          style={customStyles}
          contentLabel="ADD_HOST"
          isOpen={this.state.modalOpen}>
          <Paper>
            {/*<div>添加一个域名</div>*/}
            <div>
              <Input
                label="添加域名"
                name="hostname"
                id="input-hostname"
                type="text"
                style={{marginBottom: 20}}
                onChange={(e)=>{this.setState({hostName: e.target.value})}}
                value={this.state.hostName}
                placeholder="请输入域名"  />
              <div style={{textAlign: 'right'}}>
                <Button style={{width: 100, marginRight: 10}} type="secondary" onClick={this.cancel}>取消</Button>
                <Button style={{width: 100}} onClick={this.createHost}>提交</Button>
              </div>
            </div>
          </Paper>
        </Modal>
      </div>

    )
  }
}

const customStyles = {
  overlay : {
    position : 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '380px',
    padding: '0px',
    borderRadius: 0,
    border:0,
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const styles = StyleSheet.create({
  titlebar: {
    marginBottom: 20,
    ':after': {
        clear: 'both',
        content: '',
        display: 'table'
      }
  },

  hostItem: {
    padding: 20,
    height: 60,
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',

    ':after': {
      clear: 'both',
      content: '',
      display: 'table'
    }
  }


});

export default module.exports = connect(
  (state) => ({
    host: state.host
  }),
  (dispatch) => bindActionCreators({
    createHost, getHostList, deleteHost, setTitle
  }, dispatch)
)(HostList)