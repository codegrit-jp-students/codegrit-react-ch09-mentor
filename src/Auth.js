import { Component } from 'react'

class Auth extends Component {
  state = {
    me: JSON.parse(localStorage.getItem('me')),
    isLoggedIn: localStorage.getItem('isLoggedIn')
  }
  login = (values) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (values.email === "test@test.com" &&
          values.password === "password") {
          const me = {
            email: "test@test.com",
            authToken: 'test',
            name: "テストユーザー",
            username: "testuser"
          }
          localStorage.setItem('me', JSON.stringify(me))
          localStorage.setItem('isLoggedIn', true)
          this.setState({
            me,
            isLoggedIn: true
          });
          resolve({
            success: true,
            message: 'ログインに成功しました。'
          })
        } else {
          reject({
            success: false,
            message: 'ログイン情報に誤りがあります。。'
          })
        }
      }, 1000)
    })
  }
  logout = (e = null) => {
    if (e) e.preventDefault()
    localStorage.removeItem('me')
    this.setState({
      me: null, 
      isLoggedIn: false
    })
  }
  getMe = () => {
    return localStorage.getItem('me')
  }
  render() {
    // childrenに対してファンクションとstateを渡す。
    const handleProps = {
      login: this.login,
      logout: this.logout,
      ...this.state
    }
    return this.props.children(handleProps)
  }
}

export default Auth;