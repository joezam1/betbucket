import React, {Component} from 'react'
import {login, resetPassword} from '../helpers/auth'
import firebase from '../config/constants'
import {Link} from 'react-router-dom'
import Home from './Home'

function setErrorMsg(error){
  return {
    loginMessage:error
  }
}

export default class Login extends Component{
  state ={
    loginMessage: null
  }
  LoginUser =(event)=>{
    event.preventDefault()
    let emailEncoded =  (require('js-htmlencode').htmlEncode(`${this.email.value}`)).trim()
    let resultEmail = document.getElementById('resultEmail')
    let passwordEncoded = (require('js-htmlencode').htmlEncode(`${this.pw.value}`)).trim()
    let resultPassword = document.getElementById('resultPassword')
    let validation = 0

    console.log('emailClassValue:',emailEncoded)
    console.log('pwdClassValue:',passwordEncoded)

    function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(email)
    }
    function validatePassword(pwd) {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
      return strongRegex.test(pwd);
    }
    //isValidEmail BEGIN====
    if (validateEmail(emailEncoded)) {
      validation++
      resultEmail.innerText =''
    } else {
      resultEmail.innerText =require('js-htmlencode').htmlDecode(`${ emailEncoded} is not valid :( `)
      resultEmail.style.color ="red"
      console.log('resultEmail.innerText',resultEmail.innerText)
    }
    //isValidEmail END======
    //isValidPassword BEGIN===
    if (validatePassword(passwordEncoded)) {
      validation++
      resultPassword.innerText =''
    } else {
      resultPassword.innerText =require('js-htmlencode').htmlDecode(`${ passwordEncoded} is not strong :( `)
      resultPassword.style.color ="red"
      console.log('resultPassword.innerText',resultPassword.innerText)
    }
    //isValidPassword END=====
    if(validation === 2){
      console.log('inside validation')
        login(emailEncoded,passwordEncoded)
        .catch((error)=>{
          this.setState(setErrorMsg('Invalid username/password.'))
        })
        //Validated User
        console.log('login-loginUser- userIsValid')
      }
  }

  resetPassword =()=>{
    resetPassword(this.email.value)
    .then(() =>this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}`)))
    .catch((error) => this.setState(setErrorMsg(`Email Address not found.`)))
  }

  render (){
    //Styles BEGIN==
    const divStyle = {
      float:'right',
      position: 'relative',
      top: '-20px',

    };
    //Styles END====
    return (
      <div className="col-sm-6 col-sm-offset-3">
      <h1>Login</h1>
      <form onSubmit={this.LoginUser}>
      <div className='form-group'>
      <label> Email </label>
      <input className = "form-control" ref={(email) => this.email = email} placeholder="Email"/>
      <span id="resultEmail"></span>
      </div>

      <div className="form-group">
      <label> Password </label>
      <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw } />
      <span id="resultPassword"></span>
      </div>
      {
        this.state.loginMessage &&
        <div className="alert alert-danger" role="alert" >
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span className="sr-only">Error: </span>
        &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot password?</a>
        </div>
      }
        <div className="btn-toolbar">
          <button type="submit" className="btn btn-primary" > Login </button>
          <Link to="/" className="btn btn-default">Cancel </Link>
        </div>
     </form>
     &nbsp;
    <span style={divStyle}> Not a member yet?   <Link to="/register" className="btn-link">Register </Link>
    </span>
     </div>
    )
  }
}
