import { match, when } from 'match-when'
import { push } from 'react-router-redux'
import { api, client } from '../api'

const initialState = {
  loginChecked: false,
  logged: false,
  email: '',
  registerVerifyCodeCount: 0,
  registerError: '',
  loginError: '',
  resetPasswordError: '',
  profile: {},
  questions: [],
  title: '',
  token: '',
  key: '',
  description: '初始值'
}


export default (state=initialState, action) => match(action.type, {

  [when('@@account/logout')]: () => {
    return Object.assign({}, initialState, {
      loginChecked: true
    })
  },

  [when('@@account/checkedLogin')]: () => {
    return Object.assign({}, state, action.payload, {
      loginChecked: true
    })
  },

  [when('@@account/resetPasswordError')]: () => {
    return Object.assign({}, state, {
      resetPasswordError: action.error
    })
  },

  [when('@@account/resetPasswordSuccess')]: () => {
    return Object.assign({}, state, {
      resetPasswordError: '',
      logged: true
    })
  },

  [when('@@account/registerError')]: () => {
    return Object.assign({}, state, {
      registerError: action.error
    })
  },

  [when('@@account/registerSuccess')]: () => {
    return Object.assign({}, state, {
      registerError: '',
      logged: true
    })
  },

  [when('@@account/loginError')]: () => {
    return Object.assign({}, state, {
      loginError: action.error
    })
  },

  [when('@@account/loginSuccess')]: () => {
    return Object.assign({}, state, {
      loginError: '',
      email: action.payload.email,
      token: action.payload.token,
      logged: true
    })
  },

  [when('@@account/updateRegisterVerifyCodeCount')]: () => {
    return Object.assign({}, state, {
      registerVerifyCodeCount: action.count
    })
  },

  [when('@@account/helpQuestionUpdate')]: () => {
    return Object.assign({}, state, {
      questions: action.questions || []
    })
  },

  [when()]: state
})




/**
 * 检查登录
 * @returns {function()}
 */
export const checkLogin = () => async (dispatch, getState) => {
  const userToken = localStorage.__SMILE_TOKEN || null
  if (!userToken) {
    return dispatch({
      type: "@@account/checkedLogin",
      payload: {
        logged: false
      }
    })
  }

  const res = await client.query(`async (db) => {
    return await db.session(db.getState().params)
  }`, {
    token: userToken
  })

  const result = await res.json()

  if (result.error) {
    return dispatch({
      type: '@@account/checkedLogin',
      payload: {
        logged: false
      }
    })
  }

  if (result.logged) {
    dispatch({
      type: '@@account/checkedLogin',
      payload: {
        logged: true,
        email: result.email,
        token: userToken,
        profile: result
      },
    })
  } else {
    dispatch({
      type: '@@account/checkedLogin',
      payload: {
        logged: false,
      },
    })
  }
}


/**
 * 获取授权码
 * @returns {function()}
 */
export const getAuthCodeAndRedirect = () => async (dispatch, getState) => {
  const { __SMILE_TOKEN = null } = localStorage
  const { redirectUrl } = getState().account
  const res = await api.mutateCreateAuthCode({
    token: userToken
  })

  if (res.error) return console.log(res.error)
  location.href = `${redirectUrl}?code=${res.code}`

}




export const login = (formData) => async (dispatch, getState) => {
  const res = await client.query(`
  async (db) => {
    return db.login(db.getState().params)
  }`, formData)
  const result = await res.json()

  if (result.error) {
    return dispatch({
      type: "@@account/loginError",
      error: result.error
    })
  }
  console.log(result)
  localStorage.__SMILE_TOKEN = result.token
  dispatch({
    type: '@@account/loginSuccess',
    payload: {
      token: result.token,
      email: result.email
    }
  })
}


export const logout = () => async (dispatch, getState) => {
  console.log('正在登出系统...')
  const result = await api.mutateDeleteToken({
    token: localStorage.__SMILE_TOKEN
  })

  if (result.error) return console.log(result.error)
  localStorage.clear()
  dispatch({
    type: '@@account/logout'
  })
  dispatch(push('/'))
}



export const queryOneByEmail = ({ email, driveId }) => async (dispatch, getState) => {
  const { account: { token } } = getState()
  const result = await api.accountQueryOne({
    token, email
  })
  if (result.error) return alert(result.error)
  // todo 将结果放到搜索框提示菜单
}




/**
 * 发送验证码
 * @param form
 * @returns {function()}
 */
export const sendVerifyCode = (form) => async (dispatch, getState) => {
  const { registerVerifyCodeCount } = getState().account
  if (registerVerifyCodeCount > 0) return console.log('count not finish.')
  const countdown = (count) => {
    dispatch({
      type: '@@account/updateRegisterVerifyCodeCount',
      count: count
    })
    if (count > 0) {
      count--
      setTimeout(() => { countdown(count) }, 1000)
    }
  }

  const result = await api.mutateCreateVerificationCode({
    email: form.email
  })

  if (result.error) return console.log(result.error)
  countdown(60)
}
