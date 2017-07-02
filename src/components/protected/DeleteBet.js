import React, {Component} from 'react'


export default class DeleteBet extends Component{
  constructor(props){
    super(props)
    this.state={
    }
    this.deleteBet = this.deleteBet.bind(this)
    this.cancelDeleteBet = this.cancelDeleteBet.bind(this)
  }
  //==
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

  //==

  deleteBet(event){
    console.log('deleteBet EventTarget',event.target)
    const tg = event.target
    console.log('deleteBet-eventTarget',tg)
    const targetKeyId = tg.dataset.keyid
    console.log('deleteBet-targetKeyId',targetKeyId)
    const gameId = tg.dataset.gameid
    console.log("deleteBet-GameId",gameId)
    this.props.onDeleteBet(targetKeyId)
  }

  cancelDeleteBet(event){
    console.log('DeleteBet-cancelDeleteBet-EventTarget',event.target)
    const tg = event.target
    this.props.onCancelDeletionBet(true)
  }

  render(){
//==
const backgroundStyle = {
  backgroundColor:'#282828',
  backgroundSize:'16px 16px',
  height:this.state.windowHeight,
  left: -100,
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
  top:'-200px',
  width:400,
  zIndex:50,
}
const btnPositioning ={
  float:'left',
  position:'relative',
  top:'20px',
  left:-3,
}

    console.log('DeleteBet-render-BetId',this.props.deleteBetId)
    console.log('DeleteBet-render-GameId',this.props.deleteGameId)
    console.log('DeleteBet-render-GameName',this.props.deleteGameName)
    console.log('DeleteBet-render-PlayersInGameList',this.props.deletePlayersInGameList)
    console.log('DeleteBet-render-SubIndexPlayer',this.props.deleteSubIndexPlayer)
    console.log('DeleteBet-render-PlayerName',this.props.deletePlayerName)
    console.log('DeleteBet-render-CurrencyCode',this.props.deleteCurrencyCode)
    console.log('DeleteBet-render-AmountBet',this.props.deleteAmountBet)
    console.log('DeleteBet-render-Username',this.props.deleteUsername)
    console.log('DeleteBet-render-UserId',this.props.deleteUserId)
    return(

    <div>
      <div style={backgroundStyle}> </div>

        <div style={editWindowStyle}>
          <h2>Your Bet to be deleted</h2>
          <div className='form-group'>
              Selected Game:{this.props.deleteGameName}
          </div>
          <div key={this.props.deleteBetId}
               data-betId={this.props.deleteBetId}
               data-gameId={this.props.deleteGameId}
               data-keyId={this.props.deleteKeyId}
               className="playerClass"
            >
            <div className='form-group'>
              <span>{'Selected Player: '+this.props.deletePlayerName}</span>
            </div>
            <div className='form-group'>
              <span>{'Amount bet: '+this.props.deleteCurrencyCode}</span>
              <span>{' $ '+this.props.deleteAmountBet}</span>
            </div>
              <div className='form-group'>
            <span>{'Bettor: '+this.props.deleteUsername}</span>
            </div>

          </div>
          <div className='form-group btn-toolbar' style={btnPositioning}>
            <button data-betId={this.props.deleteBetId}
                    data-gameId={this.props.deleteGameId}
                    data-keyId={this.props.deleteKeyId}
                    className='btn btn-primary'
                    onClick={this.deleteBet}>
              Delete Bet
            </button>
            <button data-betId={this.props.deleteBetId}
                    data-gameId={this.props.deleteGameId}
                    data-keyId={this.props.deleteKeyId}
                    className="btn btn-default CancelBetClass"
                    onClick={this.cancelDeleteBet}
                    >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

}
