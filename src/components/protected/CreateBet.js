import React, {Component} from 'react'
import CurrencySelector from './CurrencySelector'
export default class CreateBet extends Component{

  constructor(props){
    super(props)
    this.state={
      currencyCode:''
    }
    this.createBet = this.createBet.bind(this)
    this.currencySelected = this.currencySelected.bind(this)
  }

createBet(event){
  console.log('CreateBet-createBet-EventTarget',event.target)
  const tg = event.target
  console.log('CreateBet-createBet-eventTarget',tg)
  const indexGame = tg.dataset.id
  console.log('CreateBet-createBet-indexGame',indexGame)
  const playersList = document.getElementsByClassName('selectedPlayerClass')
  console.log('CreateBet-createBet-selectedPlayerClass',playersList)
  const amountBetList = document.getElementsByClassName('amountBet')
  console.log('CreateBet-createBet-amountBet',amountBetList[0].value)
  const betPlaced = amountBetList[0].value
  const betPlacedEncoded = (require('js-htmlencode').htmlEncode(betPlaced)).trim()
  const resultValidationSelectedPlayer = document.getElementById('resultValidationSelectedPlayer')
  const resultValidationCurrency = document.getElementById('resultValidationCurrency')
  const resultValidationAmountBet = document.getElementById('resultValidationAmountBet')


  let playersListLength = playersList.length
  let valueSubIndex = 0
  let playerSelectedCounter=0;
  let errorMessage = ''
  let stateBet =''
  for(let i=0; i<playersListLength; i++){
    if(playersList[i].checked ===true){
        const subId = playersList[i].dataset.subid
        console.log('CreateBet-createBet-subId',subId)
        valueSubIndex =playersList[i].value
        console.log('CreateBet-createBet-valueSubIndex',valueSubIndex)
        break;
    }
    else{
      playerSelectedCounter++
    }
  }
  console.log('CreateBet-createBet-playersListLength',playersListLength)
  console.log('CreateBet-createBet-playerSelectedCounter',playerSelectedCounter)
  if(playersListLength === playerSelectedCounter){
    errorMessage ='* player Not Selected \n'
    resultValidationSelectedPlayer.innerText = '* player Not Selected \n'
    resultValidationSelectedPlayer.style.color = 'red'
  }
  else{
    resultValidationSelectedPlayer.innerText =''
  }

  console.log('CreateBet-createBet-currencyCode',this.state.currencyCode)
  if(this.state.currencyCode ===''){
    errorMessage += '* Currency Not Selected\n'
    resultValidationCurrency.innerText = '* Currency Not Selected\n'
    resultValidationCurrency.style.color = 'red'

  }else{
    resultValidationCurrency.innerText = ''
  }
  //Test for Money BEGIN====
  if(betPlacedEncoded ===''){
    errorMessage +='* Bet Amount not placed \n'
    resultValidationAmountBet.innerText = '* Bet Amount not placed \n'
    resultValidationAmountBet.style.color = 'red'
  }else {
    var regex  = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/ ///^\d+(?:\.\d{0,2})$/
    if (!regex.test(betPlacedEncoded)){
      errorMessage+='* The '+betPlacedEncoded+' Amount is not valid \n'
      resultValidationAmountBet.innerText = '* The '+require('js-htmlencode').htmlDecode(betPlacedEncoded)+' Amount is not valid'
      resultValidationAmountBet.style.color = 'red'

    }
    else{
      resultValidationAmountBet.innerText = ''
    }
  }
  //Test for Money END======

  if(errorMessage ===''){
    stateBet = 'create'
  }
  else{
    stateBet = ''
  }

  if(errorMessage ===''){
      this.props.onCreatedBet(indexGame, valueSubIndex,this.state.currencyCode, betPlaced, errorMessage, stateBet)
  }
  else{

    console.log('CreateBet-CreateBet-ErrorMessage',errorMessage)
  }


}

currencySelected(value){
  console.log('currencySel',value)
  this.setState({
    currencyCode: value
  })
  return value
}

  render(){
    const radioInLine ={
      position:'relative',
      padding:'20px',
      marginLeft: '20px',
    }
    const styleCurrencySelector ={
      float:'left',
      left:30,
      position:'relative',
      top:'20px'
    }
    const styleAmountBet ={
      float:'left',
      left:-135,
      position:'relative',
      top:'60px',
    }
    const btnPositioning ={
      float:'left',
      position:'relative',
      top:'120px',
      left:-193,
    }
//==
const backgroundStyle = {
  backgroundColor: 'grey',
  height: 300,
  opacity:1,
  position:'absolute',
  top:0,
  width:'100%',
  zIndex:20,
}

const editWindowStyle = {
  backgroundColor: 'white',
  borderWidth: 1,
  borderColor:'black',
  height: 250,
  opacity:1,
  position:'absolute',
  top:50,
  width:200,
  zIndex:50,
}
//==

    console.log(this.props.playersInGame)
    return(
      <div>
        <div className='form-group'>
           Game: {this.props.gameType +'-' +this.props.gameText}
        </div>

        <ul>{this.props.playersInGameArray.map(player=>(
            <li key={player.subId}>
              <div key={player.subId} data-subId={player.subId} data-gameId={this.props.gameId} className='form-group playerClass'>
                <span>{player.player}</span>
                <input data-subId={player.subId}
                       data-gameId={this.props.gameId}
                       type="radio"
                       name="player"
                       value={player.subId}
                       className="selectedPlayerClass"
                       style={radioInLine}
                       />
              </div>
            </li>
            ))}

        </ul>
  <span id="resultValidationSelectedPlayer"></span>
        <div className='form-group'  style={styleCurrencySelector} >
          <CurrencySelector selectedCurrency={this.currencySelected}/>
          <span id="resultValidationCurrency"></span>
        </div>
        <div className='form-group  col-xs-3' style={styleAmountBet}>
           <input data-id={this.props.gameId}
                  data-gameId={this.props.gameId}
                  type="text" placeholder='Amount $'
                  className='form-control amountBet'
                  />
           <span id="resultValidationAmountBet"></span>
        </div>

        <div className='form-group' style={btnPositioning}>
           <button
                 data-id={this.props.gameId}
                 data-gameId={this.props.gameId}
                 onClick={this.createBet}
                 className='btn btn-primary'
                 >
             Place Bet
           </button>
        </div>
    </div>
    )
  }
}
