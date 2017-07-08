import React, { Component } from 'react';
import _ from 'lodash'
import base64 from 'base-64'
import $ from 'jquery'
import utf8 from 'utf8'

import DisplayAllGames from './DisplayAllGames'
import DisplayAllBets from './DisplayAllBets'
import {fbDb} from '../../config/constants'
import firebase from '../../config/constants'
const BetsListLocal = fbDb.ref('BetsList')

const isDevelopment = false
export default class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      dataGames:undefined,
      displayGameAndBettingSection: true,
      games: [],
      Bets:[],
      userEmail:undefined,
      windowHeight: props.height,
      windowWidth: props.width,
    }

      this.processSelectedGame = this.processSelectedGame.bind(this)
      this.processReturnToAllGamesAndBets = this.processReturnToAllGamesAndBets.bind(this)
      this.processCreatedNewBetMain = this.processCreatedNewBetMain.bind(this)
      this.processUpdatedBetMain = this.processUpdatedBetMain.bind(this)
      this.processCancellationUpdatedBetMain = this.processCancellationUpdatedBetMain.bind(this)
      this.processDeletedBetMain = this.processDeletedBetMain.bind(this)
      this.processCancellationDeletedBetMain = this.processCancellationDeletedBetMain.bind(this)
      this.updateDimensions = this.updateDimensions.bind(this)
  }
  //==External Calls BEGIN=========
  componentDidMount(){
    window.addEventListener("resize", this.updateDimensions);
    //==Firebase BEGIN=========
    BetsListLocal.on('value',snapshot =>{
      if(isDevelopment){
        console.log('App-ComponentDidMount-BetsListLocal.snapshot',snapshot.val())
      }
      let betsArrayMap = _.map(snapshot.val(), (bet,id)=>(
         {
           keyId: id,
           gameId:bet.gameId,
           gameName:bet.gameName,
           subIndexPlayer: bet.subIndexPlayer,
           playerName:bet.playerName,
           currencyCode: bet.currencyCode,
           amountBet: bet.amountBet,
           username: bet.username,
           userId:bet.userId,
           editBet:bet.editBet,
         }
      ))
      if(isDevelopment){
        console.log('App-ComponentDidMount-BetsArrayMap',betsArrayMap)
      }
      this.setState({
        Bets: betsArrayMap
      })
    })
    //==Firebase END===========
    if(isDevelopment){
      console.log('App-ComponentDidMount-this.state',this.state)
    }
    //==SportsFeedAPIFeed BEGIN======

    this.setState({dataGames: undefined});
    const username = ''
    const password = ''
    const uri = 'https://www.mysportsfeeds.com/api/feed/pull/nba/2017-playoff/full_game_schedule.json'
    if(isDevelopment){
      console.log(btoa(username + ":" + password))
    }
    $.ajax({
      type: "GET",
      url: uri,
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
      cache: false,
      success: function(data) {
        this.setState({dataGames: data.fullgameschedule.gameentry});
        if(isDevelopment){
          console.log('componentDidMount.data',data)
          console.log('componentAfter-data',this.state.dataGames)
        }
        //Update Data feed
        let apiArrayLength = data.fullgameschedule.gameentry.length
        let localArrayLength = this.state.games.length
        if(isDevelopment){
          console.log('App-ComponentDidMount-api array length',apiArrayLength)
          console.log('App-ComponentDidMount-local array length', localArrayLength)
        }
        let counter = 0
        for(let i=0; i<apiArrayLength; i++){
          for(let j=0; j<localArrayLength; j++){
              if(data.fullgameschedule.gameentry[i].id !== this.state.games[j].id){
                counter++
              }
              else{
                continue;
              }
          }
          if(counter === localArrayLength){
            let newGame =
              {
                id:data.fullgameschedule.gameentry[i].id,
                type:'NBA',
                playersInGame:[
                  {
                    subId:data.fullgameschedule.gameentry[i].awayTeam.ID,
                    player:data.fullgameschedule.gameentry[i].awayTeam.City +' '+
                           data.fullgameschedule.gameentry[i].awayTeam.Name
                  },
                  {
                    subId:data.fullgameschedule.gameentry[i].homeTeam.ID,
                    player:data.fullgameschedule.gameentry[i].homeTeam.City +' '+
                           data.fullgameschedule.gameentry[i].homeTeam.Name
                  }
                ],
                date:data.fullgameschedule.gameentry[i].date,
                location:data.fullgameschedule.gameentry[i].location,
                time:data.fullgameschedule.gameentry[i].time,
                text: data.fullgameschedule.gameentry[i].awayTeam.City +' '+
                      data.fullgameschedule.gameentry[i].awayTeam.Name +' Vs '+
                      data.fullgameschedule.gameentry[i].homeTeam.City +' '+
                      data.fullgameschedule.gameentry[i].homeTeam.Name +' - Stadium: '
                      +data.fullgameschedule.gameentry[i].location+' - on: '
                      +data.fullgameschedule.gameentry[i].date +' at '
                      +data.fullgameschedule.gameentry[i].time,
                display:true,
              }

              this.state.games.push(newGame)
            }
            counter=0
          }
          this.setState({
            games: this.state.games
          })

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    //==SportsFeedAPIFeed END========
    //==FirebaseUser BEGIN===========
    var user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      this.setState({
           userEmail: user.email
       })
    } else {
      // No user is signed in.
    }
    if(isDevelopment){
      console.log('App-ComponentDidMount--authUserEmail',this.state.userEmail)
    }
    //==FirebaseUser END=============
  }
  //==External Calls END===========

  processSelectedGame(index){
    const length = this.state.games.length
    if(isDevelopment){
      console.log('App-processSelectedBet-buttonIndex',index)
      console.log('App-processSelectedBet-arrayLength: ',length)
    }
    for(let i=0; i<length ; i++){
      if(isDevelopment){
        console.log('App-processSelectedBet-gamesArrayElements ',this.state.games[i])
      }
      if(this.state.games[i].id === index.toString()){
        this.state.games[i].display = true
      }else {
          this.state.games[i].display = false
      }
    }
    this.setState({
      displayGameAndBettingSection: false,
      games: this.state.games
    })
    if(isDevelopment){
      console.log('ProtectedApp-processCreatedNewBetMain-userIsValid')
    }
  }

  processReturnToAllGamesAndBets(status){
    const length = this.state.games.length
    if(isDevelopment){
      console.log('App-processReturnToAllGamesAndBets-status',status)
      console.log('App-processReturnToAllGamesAndBets-arrayLength: ',length)
    }
    for(let i=0; i<length ; i++){
      if(isDevelopment){
        console.log('App-processReturnToAllGamesAndBets-gamesArrayElements ',this.state.games[i])
      }
      this.state.games[i].display = true
    }
    this.setState({
      displayGameAndBettingSection: true,
      games: this.state.games
    })
  }

  processCreatedNewBetMain(gameId,subIndexPlayer,currencyCode, amountBet){
    //We Redisplay all the games
    const length = this.state.games.length
    if(isDevelopment){
      console.log('App-processCreatedNewBetMain-arrayLength: ',length)
    }
    for(let i=0; i<length ; i++){
      if(isDevelopment){
        console.log('App-processCreatedNewBetMain-gamesArrayElements ',this.state.games[i])
      }
      this.state.games[i].display = true
    }
    if(isDevelopment){
      console.log('App-processCreatedNewBetMain-gameId', gameId)
    }
    let gamesArrayLength=this.state.games.length
    let gameName = ''
    let playerName = ''

    for(let i=0; i<gamesArrayLength;i++){
      if(this.state.games[i].id=== gameId.toString()){
        gameName = this.state.games[i].text
        let lengthPlayersArray = this.state.games[i].playersInGame.length
        for(let a=0; a<lengthPlayersArray; a++){
            if(this.state.games[i].playersInGame[a].subId ===subIndexPlayer){
              playerName = this.state.games[i].playersInGame[a].player
              break;
            }
        }
      }
    }
    let betsArrayLength = this.state.Bets.length
    if(isDevelopment){
      console.log('App-processCreatedNewBetMain-lastIndex',betsArrayLength)
      console.log('App-processCreatedNewBetMain-GameName',gameName)
      console.log('App-processCreatedNewBetMain-subIndexPlayer', subIndexPlayer)
      console.log('App-processCreatedNewBetMain-PlayerName',playerName)
      console.log('App-processCreatedNewBetMain-currencyCode',currencyCode)
      console.log('App-processCreatedNewBetMain-amountBet', amountBet)
      console.log('ProtectedApp-processCreatedNewBetMain- userIsValid')
    }
    let userAuthed = {
      Name: null,
      Email: null,
      PhotoUrl:null,
      EmailVerified:null,
      Uid: null,
    }
    if(isDevelopment){
      console.log('ProtectedApp-processCreatedNewBetMain- userAuthed1',userAuthed)
    }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        if (user != null) {
          userAuthed.Name = user.displayName;
          userAuthed.Email = user.email;
          userAuthed.PhotoUrl = user.photoURL;
          userAuthed.EmailVerified = user.emailVerified;
          userAuthed.Uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
          if(isDevelopment){
            console.log('ProtectedApp-processCreatedNewBetMain-user',user)
            console.log('ProtectedApp-processCreatedNewBetMain-userUid',user.uid)
            console.log('ProtectedApp-processCreatedNewBetMain- userAuthed3',userAuthed)
         }
          const newBet = {
            gameId:gameId.toString(),
            gameName:gameName,
            subIndexPlayer: subIndexPlayer.toString(),
            playerName:playerName,
            currencyCode: currencyCode,
            amountBet: amountBet,
            username: userAuthed.Email,
            userId:userAuthed.Uid,
            editBet:false,
          }
          if(isDevelopment){
            console.log('ProtectedApp-processCreatedNewBetMain- newBet',newBet)
          }
          //Remote Resources
          BetsListLocal.push(newBet)
        }
        if(isDevelopment){
          console.log('ProtectedApp-processCreatedNewBetMain- userAuthed2',userAuthed)
        }
      } else {
        // No user is signed in.
        if(isDevelopment){
          console.log('ProtectedApp-processCreatedNewBetMain-No user is signed in.')
        }
      }
    })

    this.setState({
      displayGameAndBettingSection:true,
      games: this.state.games,
      Bets: this.state.Bets,
    })
    if(isDevelopment){
      console.log('App-processCreatedNewBetMain-thisState',this.state)
    }
  }

   processUpdatedBetMain(allBetsArray, targetKeyId, updatedObject){
    BetsListLocal.child(targetKeyId).child('subIndexPlayer').transaction((currentValue) => (currentValue = updatedObject.subIndexPlayer))
    BetsListLocal.child(targetKeyId).child('playerName').transaction((currentValue) => (currentValue = updatedObject.playerName))
    BetsListLocal.child(targetKeyId).child('currencyCode').transaction((currentValue) => (currentValue = updatedObject.currencyCode))
    BetsListLocal.child(targetKeyId).child('amountBet').transaction((currentValue) => (currentValue = updatedObject.amountBet))
    this.setState({
      displayGamesSection: true,
      displayBettingSection: false,
      games: this.state.games,

    })
    if(isDevelopment){
      console.log('App-processUpdatedBetMain Method BEGIN')
      console.log('App-displayGamesSection',this.state.displayGamesSection)
      console.log('App-displayBettingSection',this.state.displayBettingSection)
      console.log('App-gamesArray',this.state.games)
      console.log('App-BetsArray',this.state.Bets)
      console.log('App-processUpdatedBetMain Method END')
    }
  }

  processCancellationUpdatedBetMain(status){
    const length = this.state.games.length
    if(isDevelopment){
      console.log('App-processCancellationUpdatedBetMain-stateeeus',status)
      console.log('App-processCancellationUpdatedBetMain-arrayLength: ',length)
    }
    for(let i=0; i<length ; i++){
      if(isDevelopment){
        console.log('App-processCancellationUpdatedBetMain-gamesArrayElements ',this.state.games[i])
      }
      this.state.games[i].display = true
    }
    this.setState({
      displayGameAndBettingSection: status,
      games: this.state.games
    })
  }

  processDeletedBetMain(allBetsArray, targetKeyId){
    BetsListLocal.child(targetKeyId).remove()
    this.setState({
      displayGamesSection: true,
      displayBettingSection: false,
      games: this.state.games,
    })
    if(isDevelopment){
      console.log('App-processDeletedBetMain Method BEGIN')
      console.log('App-displayGamesSection',this.state.displayGamesSection)
      console.log('App-displayBettingSection',this.state.displayBettingSection)
      console.log('App-gamesArray',this.state.games)
      console.log('App-betsArray',this.state.Bets)
      console.log('App-processDeletedBetMain Method END')
    }
  }

  processCancellationDeletedBetMain(status){
    const length = this.state.games.length
    if(isDevelopment){
      console.log('App-processCancellationDeletedBetMain-status',status)
      console.log('App-processCancellationDeletedBetMain-arrayLength: ',length)
    }
    for(let i=0; i<length ; i++){
      if(isDevelopment){
        console.log('App-processCancellationDeletedBetMain-gamesArrayElements ',this.state.games[i])
      }
      this.state.games[i].display = true
    }
    this.setState({
      displayGameAndBettingSection: true,
      games: this.state.games
    })
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

   componentWillUnmount() {
       window.removeEventListener("resize", this.updateDimensions);
   }

  render() {
    //Styles BEGIN==
    const styleBets = {
       position: 'relative',
       top:'10px',
       width: '750px',
    }

    const styleGames ={
      border:'5px solid #C0C0C0',
      borderRadius:'15px',
      height: '200px',
      padding: '20px',
      position: 'relative',
      top:'-5px',
      width: '750px',
    }

    const divStyleGamesScrollable = {
      height: '160px',
      overflowY: 'auto',
      padding: '20px',
    };

    if(isDevelopment){
      console.log('App-render-windowWidth',this.state.windowWidth)
      console.log('App-render-styleGames',styleGames)
      console.log('App-render-BetsObjectCollection',this.state.Bets)
    }
    //Styles END====
    let betArrayValues =_.values(this.state.Bets)
    let arrayFilterByDisplayElement = (arrayElement) =>{
      return arrayElement.display===true
    }
    let renderingArray = this.state.games.filter(arrayFilterByDisplayElement)
    if(isDevelopment){
      console.log('App-render-BetsArrayValues',betArrayValues)
      console.log("App-render-filtered Bets", renderingArray)
      console.log('App-Render-state.DisplayGamesSection',this.state.displayGamesSection)
      console.log('App-Render-state.BettingSection',this.state.displayBettingSection)
      console.log('App-Render-state.(full state)',this.state)
    }
    if(this.state.displayGameAndBettingSection===true){
      return (
        <div className="App">
          <span> Hello: {this.state.userEmail}</span>
          <h2>Super Betting Bucket</h2>
          <div style={styleGames}>
          <div style={divStyleGamesScrollable}>
          { (this.state.games !== undefined) ? this.state.games.map(game =>(
                <DisplayAllGames
                    key={game.id}
                    gameId={game.id}
                    gameText={game.text}
                    gameAwayTeamCityAndName={game.playersInGame[0].player}
                    gameHomeTeamCityAndName={game.playersInGame[1].player}
                    gamePlayersArray={game.playersInGame}
                    gameLocation={game.location}
                    gameDate={game.date}
                    gameTime={game.time}
                    gameType ={game.type}
                    gameDisplay={game.display}
                    gameButtonText={'Select your Bet'}
                    displayCancelButton={false}
                    onSelectedGame={this.processSelectedGame}
                    >
                </DisplayAllGames>
              )) :" Loading Data..."
           }
          </div>
          </div>
            <div style={styleBets}>
               <h3> Placed Bets</h3>
                 <DisplayAllBets
                     gamesArray={this.state.games}
                     betsArray ={this.state.Bets}
                     onUpdateBetMain = {this.processUpdatedBetMain}
                     onCancellationUpdateBetMain = {this.processCancellationUpdatedBetMain}
                     onDeleteBetMain = {this.processDeletedBetMain}
                     onCancellationDeleteBetMain = {this.processCancellationDeletedBetMain}
                   >
                 </DisplayAllBets>
             </div>
        </div>
      );
    }
    else if(this.state.displayGameAndBettingSection===false){
      return (
        <div> <h3>Place your bet Here</h3>
        {renderingArray.map(game =>(
       <DisplayAllGames
           key={game.id}
           gameId={game.id}
           gameText={game.text}
           gameAwayTeamCityAndName={game.playersInGame[0].player}
           gameHomeTeamCityAndName={game.playersInGame[1].player}
           gameLocation={game.location}
           gameDate={game.date}
           gameTime={game.time}
           gameDisplay={game.display}
           gamePlayersArray={game.playersInGame}
           gameType ={game.type}
           gameDisplay={game.display}
           gameButtonText={'Confirm and Make a Bet'}
           displayCancelButton={true}
           onSelectedGame={this.processSelectedGame}
           onReturnToAllGamesAndBets ={this.processReturnToAllGamesAndBets}
           onCreateNewBetMain = {this.processCreatedNewBetMain}>
       </DisplayAllGames>
     ))}
     </div>
      )
    }
    else {
      return(
        <div>  'Nothing to render' </div>
      )
    }
  }
}
