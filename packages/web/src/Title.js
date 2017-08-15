import React, {Component} from "react"
import {Link} from "react-router-dom"
import {css, StyleSheet} from "aphrodite"
import Logo from './smile'
import DropDown, {DropDownContent, DropDownTrigger} from "@react-web/dropdown"

class Title extends Component {

  static defaultProps = {
    color: '#666',
    style: {},
    title: "右括号"
  };

  closeContent = () => {
    this.dropDown.toggle(false)
  };

  render() {
    const {title, color, style} = this.props;
    return (
      <DropDown ref={ref => this.dropDown = ref} className={css(styles.title)} style={style}>
        <DropDownTrigger>
          <div style={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}}>
            <Logo color={color} />
            <div style={{color, userSelect: 'none'}}>{title}</div>
          </div>
        </DropDownTrigger>
        <DropDownContent>
          <div className={css(styles.title__content)}>
            <div className={css(styles.triangle)} />
            <Link onClick={this.closeContent} className={css(styles.link)} to="/">消息</Link>
            <Link onClick={this.closeContent} className={css(styles.link)} to="/drive">空间</Link>
            <Link onClick={this.closeContent} className={css(styles.link)} to="/account">账号</Link>
          </div>
        </DropDownContent>
      </DropDown>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    display: 'flex',
    cursor: 'pointer'
  },

  title__content: {
    display: 'flex',
    position: 'relative',
    alignSelf: 'center',
    flexDirection: 'column',
  },

  triangle: {
    position: 'absolute',
    left: '50%',
    width: 0,
    height: 0,
    marginLeft: '-10px',
    marginTop: '-20px',
    border: '10px solid transparent',
    borderBottomColor: '#FFF'
  },

  link: {
    padding: '0 20px',
    height: '30px',
    color: '#555',
    lineHeight: '30px',
    textDecoration: 'none',
    ':hover': {
      backgroundColor: '#1077ff',
      color: '#222'
    }
  }
});

export default module.exports = Title;
