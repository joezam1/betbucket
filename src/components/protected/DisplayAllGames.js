import React , {Component} from 'react'
import CreateBet from './CreateBet'

const isDevelopment = false
export default class DisplayAllGames extends Component{
  constructor(props){
    super(props)
    this.state = {
      statusBet:'',
      gameId:0,
    }
    this.displaySingleGameScreen = this.displaySingleGameScreen.bind(this)
    this.returnToDisplayGameAndBettingSection = this.returnToDisplayGameAndBettingSection.bind(this)
    this.processCreatedBet = this.processCreatedBet.bind(this)
  }

  displaySingleGameScreen(event){
    const target = event.target
    const index = target.dataset.tag
    const elem = document.getElementById('gameTextID')
    if(isDevelopment){
        console.log('DisplayAllGames-displayBettingScreen-EventTarget',event.target)
        console.log('DisplayAllGames-displayBettingScreen-EventTargetIndex',index)
        console.log('DisplayAllGames-displayBettingScreen-TargetElementById',elem)
    }
    this.props.onSelectedGame(index)
    this.setState({
      statusBet:'create',
      gameId:index
    })
    if(isDevelopment){
      console.log('DisplayAllGames-displayBettingScreen-stateAfter',this.state)
    }
  }

  returnToDisplayGameAndBettingSection(){
      this.props.onReturnToAllGamesAndBets(true)
  }

  processCreatedBet(indexGame, valueSubIndex,currencyCode, betPlaced, errorMessage, stateBet){
    if(isDevelopment){
      console.log('DisplayAllGames-processCreatedBet-indexGame',indexGame)
      console.log('DisplayAllGames-processCreatedBet-valueSubIndex',valueSubIndex)
      console.log('DisplayAllGames-processCreatedBet-currencyCode',currencyCode)
      console.log('DisplayAllGames-processCreatedBet-betPlaced',betPlaced)
      console.log('DisplayAllGames-processCreatedBet-errorMessage',errorMessage)
      console.log('DisplayAllGames-processCreatedBet-statusBet',stateBet)
    }
      if(errorMessage ===''){
          this.props.onCreateNewBetMain(indexGame, valueSubIndex,currencyCode, betPlaced, errorMessage, stateBet)
      }
      else{
        this.setState({
          statusBet:stateBet,
          gameId:indexGame,
        })
      }
  }

  render(){

    const styleObj0 ={
      borderTop:'1px solid white',
      display: 'inline-block',
      height: 20,
      width: 550,
    }
    const btnBetPositioning ={
      marginLeft:'50px',
      margin:'20px',
      position:'relative',
      top: '20px',
    }
    if(this.state.statusBet ==='create'){
        return (
          <div>
            <div>
              <h2>This is My Betting Bucket Selection</h2>
                { (isDevelopment)? console.log('DisplayAllBets-Render-playersInGameArray',this.props.gamePlayersArray):""}
                  <CreateBet
                      key={this.props.gameId}
                      gameId={this.props.gameId}
                      gameAwayTeamCityAndName={this.props.gameAwayTeamCityAndName}
                      gameHomeTeamCityAndName={this.props.gameHomeTeamCityAndName}
                      gameText={this.props.gameText}
                      gameDisplay={this.props.gameDisplay}
                      gameType ={this.props.gameType}
                      playersInGameArray={this.props.gamePlayersArray}
                      onCreatedBet={this.processCreatedBet}
                      >
                  </CreateBet>
            </div>
          </div>
        )
    }
    else if(this.state.statusBet ===''){
      if(this.props.displayCancelButton===true){
        return(
          <ul>
            <li id='gameTextID' style={styleObj0} data-tag={ this.props.gameId}>
             {"Type: "+ this.props.gameType}
             {"- Game: "+ this.props.gameText}
             <div style={btnBetPositioning} className="btn-toolbar">

             <button className="btn btn-primary"
                     key={this.props.gameId}
                     id={this.props.gameId}
                     data-tag={this.props.gameId}
                     onClick={this.displaySingleGameScreen}>
                       {this.props.gameButtonText}
            </button>
            <button className="btn btn-default"
                    id={this.props.gameId}
                    data-tag={this.props.gameId}
                    onClick={this.returnToDisplayGameAndBettingSection}>
                      Cancel
           </button>

           </div>
            {(isDevelopment) ? console.log('DisplayAllGames-render-gameId',this.props.gameId):""}
           </li>
          </ul>
        )
      }
      else{
        return(
          <ul>
            <li id='gameTextID' data-tag={ this.props.gameId}>
             {"Type: "+this.props.gameType}
             {" - Game: "+ this.props.gameText}

             <button className="btn btn-primary btn-xs pull-right"
                     key={this.props.gameId}
                     id={this.props.gameId}
                     data-tag={this.props.gameId}
                     onClick={this.displaySingleGameScreen}
                     >
                       {this.props.gameButtonText}
            </button>
           </li>
          </ul>
        )
      }
    }
  }
}
