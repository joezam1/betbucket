import React, {Component} from 'react'
import {auth} from '../helpers/auth'
import {Link} from 'react-router-dom'
function setErrorMsg(error){
  return {
    registerError: error.message
  }
}

const isDevelopment = false
export default class Register extends Component{
  state ={
    registerError: null
  }

  RegisterUser =(event)=>{
    event.preventDefault()
      let emailEncoded =(require('js-htmlencode').htmlEncode(`${this.email.value}`)).trim()
      let resultEmail = document.getElementById('resultEmail')
      let passwordEncoded = (require('js-htmlencode').htmlEncode(`${this.pw.value}`)).trim()
      let resultPassword = document.getElementById('resultPassword')
      let repeatPasswordEncoded = (require('js-htmlencode').htmlEncode(`${this.pwr.value}`)).trim()
      let resultRepeatPassword = document.getElementById('resultRepeatPassword')
      let validation = 0
      if(isDevelopment){
        console.log('Register-RegisterUser-emailClassValue:',emailEncoded)
        console.log('Register-RegisterUser-pwdClassValue:',passwordEncoded)
        console.log('Register-RegisterUser-pwdRepeatClassValue:',repeatPasswordEncoded)
      }

      //Authentication
      function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
      }
      function validatePassword(pwd) {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        return strongRegex.test(pwd);
      }
      function passwordsAreEqual(firstPwd,secondPwd){
        if(firstPwd.toString() !== '' && secondPwd.toString() !== ''){
          if(firstPwd.toString() === secondPwd.toString()){
            return true
          }
        }
        return false
      }

      //isValidEmail BEGIN====
      if (validateEmail(emailEncoded)) {
        validation++
        resultEmail.innerText =""
      } else {
        resultEmail.innerText =require('js-htmlencode').htmlDecode(`${ emailEncoded} is not valid :( `)
        resultEmail.style.color ="red"
        if(isDevelopment){
          console.log('Register-RegisterUser-resultEmail.innerText',resultEmail.innerText)
        }
      }
      //isValidEmail END======
      //isValidPassword BEGIN===
      if (validatePassword(passwordEncoded)) {
        validation++
        resultPassword.innerText =""
      } else {
        resultPassword.innerText =require('js-htmlencode').htmlDecode(`${ passwordEncoded} is not strong :( `)
        resultPassword.style.color ="red"
        if(isDevelopment){
          console.log('Register-RegisterUser-resultPassword.innerText',resultPassword.innerText)
        }
      }
      //isValidPassword END=====
      //isExactRepeatPassword BEGIN====
      if (passwordsAreEqual(passwordEncoded,repeatPasswordEncoded)) {
        validation++
        resultRepeatPassword.innerText =""
        if(isDevelopment){
          console.log('Register-RegisterUser-resultRepeatPassword.innerText',resultRepeatPassword.innerText)
        }

      } else {
        resultRepeatPassword.innerText = require('js-htmlencode').htmlDecode(`${ repeatPasswordEncoded} is not the same as the first password :( `)
        resultRepeatPassword.style.color ="red"
        if(isDevelopment){
          console.log('Register-RegisterUser-resultRepeatPassword.innerText',resultRepeatPassword.innerText)
        }
      }
      //isExactRepeatPassword END======

      if(validation === 3){
        auth(this.email.value, this.pw.value)
        .catch(e=>this.setState(setErrorMsg(e)))
    }
  }

  render (){
    return (
      <div className="col-sm-6 col-sm-offset-3">
      <h1> Register</h1>
      <form onSubmit={this.RegisterUser}>
      <div className="form-group">
      <label> Email </label>
      <input className="form-control" ref={(email) => this.email=email} placeholder="Email"/>
      <span id="resultEmail"></span>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
        <span id="resultPassword"></span>
      </div>
      <div className="form-group">
        <label>Repeat Password</label>
        <input type="password" className="form-control" placeholder="Repeat Password" ref={(pwr) => this.pwr = pwr} required/>
        <span id='resultRepeatPassword'></span><br/>
      </div>
      {
        this.state.registerError &&
        <div className="alert alert-danger" role="alert">
        <span className ="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span className="sr-only"> Error:</span>
        &nbsp;{this.state.registerError}
        </div>
      }
        <div className="btn-toolbar">
          <button type="submit" className="btn btn-primary">Register</button>
          <Link to="/" className="btn btn-default">Cancel </Link>
        </div>
      </form>
      </div>
    )
  }
}
