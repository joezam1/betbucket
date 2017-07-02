import React, {Component} from 'react'
import CurrencySelector from './CurrencySelector'

export default class UpdateBet extends Component{
  constructor(props){
    super(props)
    this.state={
      currencyCode:'',
      windowHeight: props.height,
      windowWidth: props.width,
    }
    this.currencySelected = this.currencySelected.bind(this)
    this.updateBet = this.updateBet.bind(this)
    this.cancelUpdateBet = this.cancelUpdateBet.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  componentWillMount(){
     this.updateDimensions()
  }
  updateDimensions() {
       this.setState({
          windowHeight: window.innerHeight + 'px',
         windowWidth: window.innerWidth + 'px',
       })
   }
   componentDidMount() {
       window.addEventListener("resize", this.updateDimensions);
   }
   componentWillUnmount() {
       window.removeEventListener("resize", this.updateDimensions);
   }



  currencySelected(value){
    console.log('currencySel',value)
    this.setState({
      currencyCode: value
    })
    return value
  }
  updateBet(event){
    console.log('updateBet-updateBet-EventTarget',event.target)
    const tg = event.target
    const targetKeyId = tg.dataset.keyid
    console.log('updateBet-updateBet-betId',targetKeyId)
    const gameId = tg.dataset.gameid
    console.log("updateBet-updateBet-GameId",gameId)
    const playersArray = document.getElementsByClassName('selectedPlayerClass')
    console.log('updateBet-updateBet-selectedPlayerClass-Array',playersArray)
    const amountBetList = document.getElementsByClassName('amountBet')
    console.log('updateBet-updateBet-amountBet',amountBetList[0].value)
    const betPlaced = amountBetList[0].value
    //==
    const betPlacedEncoded = (require('js-htmlencode').htmlEncode(betPlaced)).trim()
    const resultValidationSelectedPlayer = document.getElementById('resultValidationSelectedPlayer')
    const resultValidationCurrency = document.getElementById('resultValidationCurrency')
    const resultValidationAmountBet = document.getElementById('resultValidationAmountBet')

    let playersListLength = playersArray.length
    let valueSubIndex = 0
    let playerSelectedCounter=0;
    let errorMessage = ''
    let stateBet =''
    //==
    let length = playersArray.length
    let playerSelectedName = ''
    let playerSubId = 0
    for(let i=0; i<length; i++){
      if(playersArray[i].checked ===true){
          playerSubId = playersArray[i].dataset.subid
          console.log('updateBet-updateBet-PlayerSubId',playerSubId)
          playerSelectedName=playersArray[i].value
          console.log('updateBet-updateBet-playerSelectedName',playerSelectedName)
          break;
      }
      else{
        playerSelectedCounter++
      }
    }
    //==

    console.log('UpdateBet-updateBet-playersListLength',playersListLength)
    console.log('UpdateBet-updateBet-playerSelectedCounter',playerSelectedCounter)
    if(playersListLength === playerSelectedCounter){
      errorMessage ='* player Not Selected \n'
      resultValidationSelectedPlayer.innerText = '* player Not Selected \n'
      resultValidationSelectedPlayer.style.color = 'red'
    }
    else{
      resultValidationSelectedPlayer.innerText =''
    }

    console.log('UpdateBet-updateBet-currencyCode',this.state.currencyCode)
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
      this.props.onUpdateBet(targetKeyId, gameId, playerSubId,this.state.currencyCode, betPlaced)
    }
    else{
      console.log('CreateBet-CreateBet-ErrorMessage',errorMessage)
    }
    //==
  }
  cancelUpdateBet(event){
    console.log('updateBet-cancelupdateBet-EventTarget',event.target)
    const tg = event.target
  this.props.onCancelUpdateBet(true)
  }

  updateBetBackgroundStyle(){
    const background = document.getElementById('backgroundDiv')
    console.log('UpdateBet-render-background',background)
  }

  render(){
    console.log('UpdateBet-render-windowHeight',this.state.windowHeight)
    console.log('UpdateBet-render-windowWidth',this.state.windowWidth)
    const radioInLine ={
      position:'relative',
      padding:'20px',
      marginLeft: '20px',
    }
    const styleCurrencySelector ={
      float:'left',
      left:0,
      position:'relative',
      top:'20px'
    }
    const styleAmountBet ={
      float:'left',
      left:-15,
      position:'relative',
      top:'20px',
    }
    const btnPositioning ={
      float:'left',
      position:'relative',
      top:'20px',
      left:-3,
    }
    const backgroundStyle = {
      backgroundColor:'#282828',
      backgroundSize:'16px 16px',
      height:(this.state.windowHeight),
      left: -50,
      opacity:0.4,
      position:'absolute',
      top:-300,
      width:this.state.windowWidth,

      zIndex:20,
    }

    const editWindowStyle = {
      backgroundColor: 'white',
      border:'5px solid #C0C0C0',
      borderRadius: 15,
      height: 550,
      left: 50,
      opacity:1,
      overflowY: 'auto',
      padding:'20px 20px 20px 40px',
      position:'absolute',
      textAlign: 'left',
      top:-250,
      width:400,
      zIndex:50,
    }

    console.log('UpdateBet-render-KeyId',this.props.updateKeyId)
    console.log('UpdateBet-render-BetId',this.props.updateBetId)
    console.log('UpdateBet-render-GameId',this.props.updateGameId)
    console.log('UpdateBet-render-GameName',this.props.updateGameName)
    console.log('UpdateBet-render-PlayersInGameList',this.props.updatePlayersInGameList)
    console.log('UpdateBet-render-SubIndexPlayer',this.props.updateSubIndexPlayer)
    console.log('UpdateBet-render-PlayerName',this.props.updatePlayerName)
    console.log('UpdateBet-render-CurrencyCode',this.props.updateCurrencyCode)
    console.log('UpdateBet-render-AmountBet',this.props.updateAmountBet)
    console.log('UpdateBet-render-Username',this.props.updateUsername)
    console.log('UpdateBet-render-UserId',this.props.updateUserId)
    console.log('UpdateBet-render-EditBet',this.props.updateEditBet)
    return(

      <div>
      <div style={backgroundStyle}> </div>
      <div style={editWindowStyle}>
        <div className='form-group'>
        <h2>    Game: {this.props.updateGameName}</h2>
        </div>
        <div className='form-group'>
           <div key={this.props.updateBetId} data-keyId={this.props.updateKeyId} data-gameId={this.props.updateGameId} className="playerClass">  </div>
        </div>
        <div className='form-group'>
          <span>{"Selected Player: "+this.props.updatePlayerName}</span>
        </div>
        <div className='form-group'>
          <span>{"Amount Bet: "+this.props.updateCurrencyCode}
           {' $ '+this.props.updateAmountBet}</span>
        </div>
        <div className='form-group'>
          <span>{"Bettor Username: "+this.props.updateUsername}</span>
        </div>
        <hr/>

        <div><h3>Update Your Bet</h3>
          <ul>{this.props.updatePlayersInGameArray.map(playerElem =>(
              <li key={playerElem.subId}>
                <div key={playerElem.subId}
                     data-subId={playerElem.subId}
                     data-gameId={this.props.gameId}
                     className="playerClass">
                  <span>{playerElem.player}</span>
                  <input data-subId={playerElem.subId}
                         data-gameId={this.props.gameId}
                         type="radio" name="player"
                         value={playerElem.subId}
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
          <div className='form-group  col-xs-9' style={styleAmountBet}>
          <input data-betId={this.props.updateBetId}
                 data-gameId={this.props.updateGameId}
                 data-keyId={this.props.updateKeyId}
                 type="text"
                 defaultValue={this.props.updateAmountBet}
                 className="amountBet"
                 className='form-control amountBet'
                 />
          <span id="resultValidationAmountBet"></span>
       </div>

       <div className='form-group btn-toolbar' style={btnPositioning}>
          <button data-betId={this.props.updateBetId}
                  data-gameId={this.props.updateGameId}
                  data-keyId={this.props.updateKeyId}
                  className='btn btn-primary'
                  onClick={this.updateBet}>
            Update Bet
          </button>
          <button data-betId={this.props.updateBetId}
                  data-gameId={this.props.updateGameId}
                  data-keyId={this.props.updateKeyId}
                  onClick={this.cancelUpdateBet}
                  className="btn btn-default CancelBetClass">
            Cancel
          </button>
      </div>
    </div>
  </div>
</div>
    )
  }

}
