import React, {Component} from 'react'
import firebase from '../../config/constants'
import UpdateBet from './UpdateBet'
import DeleteBet from './DeleteBet'


export default class DisplayAllBets extends Component{
  constructor(props){
    super(props)

    this.state={
      keyId: '',
      betId: 0,
      gameId:0,
      gameName:'',
      playersInGameArray:[],
      subIndexPlayer:0,
      playerName:'',
      currencyCode: '',
      amountBet: '',
      username: '',
      userId:'',
      statusBet:'',
    }
    this.updateBet = this.updateBet.bind(this)
    this.processUpdatedBet = this.processUpdatedBet.bind(this)
    this.processCancellationUpdateBet = this.processCancellationUpdateBet.bind(this)
    this.deleteBet = this.deleteBet.bind(this)
    this.processDeletedBet = this.processDeletedBet.bind(this)
    this.processCancellationDeleteBet = this.processCancellationDeleteBet.bind(this)
  }

  InfiniteScroll = require('react-infinite-scroll')(React)
  updateBet(event){
    console.log('DisplayAllBets-updateBet-EventTarget',event.target)
    const target = event.target
    const targetKeyId = target.dataset.keyid
    console.log('DisplayAllBets-updateBet-targetKeyId',targetKeyId)
    console.log('DisplayAllBets-updateBet-stateBefore',this.state)
    this.findBetById(targetKeyId)
    this.setState({
        statusBet:'update'
    })
    console.log('DisplayAllBets-updateBet-stateAfter',this.state)
  }

  deleteBet(event){
    console.log('DisplayAllBets-deleteBet-EventTarget',event.target)
    const target = event.target
    const targetKeyId = target.dataset.keyid
    console.log('DisplayAllBets-deleteBet-targetIndex',targetKeyId)
    console.log('DisplayAllBets-deleteBet-stateBefore',this.state)
    this.findBetById(targetKeyId)
    this.setState({
        statusBet:'delete'
    })
    console.log('DisplayAllBets-deleteBet-StateAfter',this.state)
  }

  findBetById(index){
    let betsArray = this.props.betsArray
    let betsArrayLength = betsArray.length
    console.log('DisplayAllBets-findBetById-betsArrayLength',betsArrayLength)

    let gamesArray = this.props.gamesArray
    let gamesArrayLength = gamesArray.length
    console.log('DisplayAllBets-findBetById-gamesArrayLength',gamesArrayLength)
    let gamePlayers=[]
    for(let i=0; i<betsArrayLength; i++){
      if(betsArray[i].keyId === index.toString()){
        //We find the Corresponding Game
        for(let j=0; j<gamesArrayLength; j++){
            if(gamesArray[j].id === betsArray[i].gameId){
                gamePlayers = gamesArray[j].playersInGame
                break;
            }
        }
        console.log('DisplayAllBets-findBetById-insideLoop-betsArrayLength',betsArrayLength)
        console.log('DisplayAllBets-findBetById-betsArray',betsArray)
        console.log('DisplayAllBets-findBetById-gamePlayers',gamePlayers)

        this.setState({
          keyId: betsArray[i].keyId,
          betId: betsArray[i].betId,
          gameId:betsArray[i].gameId,
          gameName:betsArray[i].gameName,
          playersInGameArray:gamePlayers,
          subIndexPlayer:betsArray[i].subIndexPlayer,
          playerName:betsArray[i].playerName,
          currencyCode: betsArray[i].currencyCode,
          amountBet: betsArray[i].amountBet,
          username: betsArray[i].username,
          userId:betsArray[i].userId,
        })
        break;
      }
    }
    console.log('DisplayAllBets-findBetById-state',this.state)
}

processUpdatedBet(keyId, gameId,subIndexPlayer,currencyCode, amountBet){
  console.log('DisplayAllBets-processUpdatedBet-gameId', gameId)
  let lengthGamesArray=this.props.gamesArray.length
  let gameName = ''
  let playerName = ''
  for(let i=0; i<lengthGamesArray;i++){
    if(this.props.gamesArray[i].id=== parseInt(gameId)){
        gameName = this.props.gamesArray[i].text
      let lengthPlayersArray = this.props.gamesArray[i].playersInGame.length
      for(let a=0; a<lengthPlayersArray; a++){
          if(this.props.gamesArray[i].playersInGame[a].subId ===parseInt(subIndexPlayer)){
            playerName = this.props.gamesArray[i].playersInGame[a].player
            break;
          }
      }
    }
  }
  console.log('DisplayAllBets-processUpdatedBet-keyId',keyId)
  console.log('DisplayAllBets-processUpdatedBet-GameName',gameName)
  console.log('DisplayAllBets-processUpdatedBet-subIndexPlayer', subIndexPlayer)
  console.log('DisplayAllBets-processUpdatedBet-PlayerName',playerName)
  console.log('DisplayAllBets-processUpdatedBet-currencyCode',currencyCode)
  console.log('DisplayAllBets-processUpdatedBet-amountBet', amountBet)
  let updatedObject ={}
  let betsArrayLength = this.props.betsArray.length
  for(let c=0; c<betsArrayLength; c++){
     if(this.props.betsArray[c].keyId===(keyId).toString()){
       console.log('DisplayAllBets-processUpdatedBet-InsideLoopBetId', this.props.betsArray[c].keyId)
       this.props.betsArray[c].gameId = parseInt(gameId)
       this.props.betsArray[c].gameName =gameName
       this.props.betsArray[c].subIndexPlayer = parseInt(subIndexPlayer)
       this.props.betsArray[c].playerName = playerName
       this.props.betsArray[c].currencyCode = currencyCode
       this.props.betsArray[c].amountBet = amountBet
       //===
       updatedObject.gameId = parseInt(gameId)
       updatedObject.gameName =gameName
       updatedObject.subIndexPlayer = parseInt(subIndexPlayer)
       updatedObject.playerName = playerName
       updatedObject.currencyCode = currencyCode
       updatedObject.amountBet = amountBet
       //===
       break;

    }
  }
  this.setState({
    statusBet:''
  })
  console.log('DisplayAllBets-processUpdatedBet-AllBetsState', this.state)
  console.log('DisplayAllBets-processUpdatedBet-thisPropsBetsArray',this.props.betsArray)
  this.props.onUpdateBetMain(this.props.betsArray, keyId , updatedObject )
}

processCancellationUpdateBet(status){
  console.log('DisplayAllBets-processCancellationUpdateBet-status',Boolean(status))
  this.setState({
    statusBet:''
  })
  console.log('DisplayAllBets-processCancellationUpdateBet-AllBetsState', this.state)
  console.log('DisplayAllBets-processCancellationUpdateBet-thisPropsBetsArray',this.props.betsArray)
  this.props.onCancellationUpdateBetMain(status)
}

processDeletedBet(keyId){
  console.log('DisplayAllBets-processDeletedBet-betId', keyId)
  console.log('DisplayAllBets-processDeletedBet-BetArrray', this.props.betsArray)
  let indexToDelete = -1;
  let betsArrayLength = this.props.betsArray.length
  console.log('DisplayAllBets-processDeletedBet-BetArrrayLength', betsArrayLength)
  for(let c=0; c<betsArrayLength; c++){
     if(this.props.betsArray[c].keyId===(keyId).toString()){
       console.log('DisplayAllBets-processDeletedBet-InsideLoopBetId', this.props.betsArray[c].betId)
       indexToDelete = c
       break;
    }
  }
  if(indexToDelete !==-1){
    this.props.betsArray.splice(indexToDelete, 1);
    console.log('DisplayAllBets-processDeletedBet-BetArrrayAfter Splice',this.props.betsArray)
  }
  this.setState({
    statusBet:''
  })
  console.log('DisplayAllBets-processDeletedBet-AllBetsState', this.state)
  console.log('DisplayAllBets-processDeletedBet-thisPropsBetsArray',this.props.betsArray)
  this.props.onDeleteBetMain(this.props.betsArray, keyId)
}

processCancellationDeleteBet(status){
  console.log('DisplayAllBets-processCancellationDeleteBet-status',status)
  this.setState({
    statusBet:''
  })
  console.log('DisplayAllBets-processCancellationDeleteBet-AllBetsState', this.state)
  console.log('DisplayAllBets-processCancellationDeleteBet-thisPropsBetsArray',this.props.betsArray)
  this.props.onCancellationDeleteBetMain(status)
}

render(){
  var userAuthed = firebase.auth().currentUser
  //Styles BEGIN==
  const divStyleBetsMargins ={
    border:'5px solid #C0C0C0',
    borderRadius:'15px',
    height:'300px',
    padding: '20px',
  }
  const divStyleBetsScrollable = {
    height: '260px',
    overflowY: 'auto',
    float:'right',
    position: 'relative',
    padding: '20px',
    width:'700px',

  }

  const btnDeletePositioning ={
    marginLeft:'50px',
    margin:'20px',
    position:'relative',
    top: '20px',
  }
  console.log("DisplayAllBets-render-displayGamesArray",this.props.gamesArray)
  console.log("DisplayAllBets-render-playersInGameArray",this.state.playersInGameArray)
  console.log("DisplayAllBets-render-displayBetsArray",this.props.betsArray)
  console.log("DisplayAllBets-render-userAuthed",userAuthed.uid)
  let gamesArrayContainingBets=()=>{
    let filteredGamesArray =[]
    let counter=0
    for(let i=0; i<this.props.gamesArray.length; i++){
      for(let a =0; a<this.props.betsArray.length; a++){
        console.log('this.props.gamesArray[i].id',this.props.gamesArray[i].id)
        console.log('this.props.betsArray[a].gameId',this.props.betsArray[a].gameId)
        if(parseInt(this.props.gamesArray[i].id) === parseInt(this.props.betsArray[a].gameId)){
          counter++
        }
      }
      if(counter>0){
        console.log('counter',counter)
        console.log('gamesArray',this.props.gamesArray[i])
        filteredGamesArray.push(this.props.gamesArray[i])
      }
      counter = 0
    }
    return filteredGamesArray
  }

  let betsArrayDistributedByGameText=(id)=>{
    let filteredBetsArray =[]
    for(let a =0; a<this.props.betsArray.length; a++){
      if(id===this.props.betsArray[a].gameId){
        filteredBetsArray.push(this.props.betsArray[a])
      }
    }
    return filteredBetsArray
  }
   console.log('DisplayAllBets-Render-stateEditBet',this.state.editBet)
   console.log('DisplayAllBets-Render-BetId',this.state.betId)
   console.log('DisplayAllBets-Render-statusBet',this.state.statusBet)
   if(this.state.statusBet===''){
     console.log('DisplayAllBets-Render-allBets',this.state.betsArray)
     if(this.props.betsArray !==undefined){
       if(this.props.betsArray.length>0){

          return(
        <div style={divStyleBetsMargins}>
          <div style={divStyleBetsScrollable}>
            <div >{gamesArrayContainingBets().map( game=>(
              <div key={game.id}>{game.text}
                  <ul>{(betsArrayDistributedByGameText(game.id)).map(bet=>(
                    <li  id='betTextID' data-keyId={bet.keyId} key={bet.keyId} className='list-group-item'>
                    <div className='form-group'>
                      <span>
                          {"Selection: "+bet.playerName +" - Bet: "+bet.currencyCode+" $"+bet.amountBet +" - Bettor: "+bet.username}
                          {
                            (userAuthed.uid.toString() === bet.userId.toString()) ?
                            <div className="btn-toolbar pull-right" >
                              <button data-keyId={bet.keyId}
                                      className="btn btn-primary btn-xs"
                                      onClick={this.updateBet}
                                      >Edit Bet
                              </button>
                              <button  data-keyId={bet.keyId}
                                       className="btn btn-default btn-xs"
                                       onClick={this.deleteBet}
                                       > Remove Bet
                              </button>
                            </div>
                          :""
                          }
                    </span>
                    </div>
                    </li>
                  ))}
                </ul>
             </div>
             ))}
          </div>
        </div>
        </div>
          )
        }
        else{
          return(
            <div>No Bets Placed</div>
          )
        }
      }
      else{
        return(
          <div>Loading values...</div>
        )
      }
    }

    else if(this.state.statusBet==='update'){
    console.log('DisplayAllBets-Render-updateBet',this.state.statusBet)
      return(
        <div>
          {console.log('DisplayAllBets-Render-updateBet-stateGameName',this.state.gameName)}
          <UpdateBet
            updateKeyId ={this.state.keyId}
            updateBetId={this.state.betId}
            updateGameId={this.state.gameId}
            updateGameName={this.state.gameName}
            updatePlayersInGameArray={this.state.playersInGameArray}
            updateSubIndexPlayer={this.state.subIndexPlayer}
            updatePlayerName={this.state.playerName}
            updateCurrencyCode={this.state.currencyCode}
            updateAmountBet= {this.state.amountBet}
            updateUsername= {this.state.username}
            updateUserId={this.state.userId}
            updateEditBet={this.state.editBet}
            onUpdateBet={this.processUpdatedBet}
            onCancelUpdateBet={this.processCancellationUpdateBet}
            >
          </UpdateBet>
        </div>
      )
    }

    else if(this.state.statusBet==='delete'){
    console.log('DisplayAllBets-Render-deleteBet',this.state.statusBet)
      return(
        <div>
          {console.log('DisplayAllBets-Render-Delete-stateGameName',this.state.gameName)}
          <DeleteBet
            deleteKeyId={this.state.keyId}
            deleteBetId={this.state.betId}
            deleteGameId={this.state.gameId}
            deleteGameName={this.state.gameName}
            deletePlayersInGameArray={this.state.playersInGameArray}
            deleteSubIndexPlayer={this.state.subIndexPlayer}
            deletePlayerName={this.state.playerName}
            deleteCurrencyCode={this.state.currencyCode}
            deleteAmountBet= {this.state.amountBet}
            deleteUsername= {this.state.username}
            deleteUserId={this.state.userId}
            onDeleteBet={this.processDeletedBet}
            onCancelDeletionBet={this.processCancellationDeleteBet}
            >
          </DeleteBet>
        </div>
      )
    }
    else{
      console.log('DisplayAllBets-Render-end',this.state.statusBet)
      return(
        <div></div>
      )
    }
  }
}
