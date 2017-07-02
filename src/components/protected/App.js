import React, { Component } from 'react';
import _ from 'lodash'
import DisplayAllGames from './DisplayAllGames'
import DisplayAllBets from './DisplayAllBets'
import firebaseDb from '../../config/database'
import firebase from '../../config/constants'
const BetsListLocal = firebaseDb.ref('BetsList')
export default class App extends Component {
  constructor(props){
    super(props)

    this.state ={
      displayGameAndBettingSection: true,
      games: [
        {id:1, type:'Tennis', playersInGame:[{subId:1, player:'Roger Federer'},{subId:2, player:'Novak Djokovic'}], text:' Roger Federer vs Novak Djokovic', display:true},
        {id:2, type:'NRL', playersInGame:[{subId:1, player:'Rabbithos'},{subId:2, player:'Panthers'}], text:' Rabbithos Vs Panthers', display:true},
        {id:3, type:'Horse Racing', playersInGame:[
            {subId:1, player:'BIG ORANGE'},
            {subId:2, player:'OUR IVANHOWE'},
            {subId:3, player:'CURREN MIROTIC'},
            {subId:4, player:'BONDI BEACH'},
            {subId:5, player:'EXOSPHERIC'},
            {subId:6, player:'HARTNELL'},
            {subId:7, player:'WHO SHOT THEBARMAN'},
            {subId:8, player:'WICKLOW BRAVE'},
            {subId:9, player:'ALMOONQITH'},
            {subId:10, player:'GALLANTE'},
            {subId:11, player:'GRAND MARSHALE'},
            {subId:12, player:'JAMEKA'},
            {subId:13, player:'HEARTBREAK CITY'},
            {subId:14, player:'SIR JOHN HAWKWOOD'},
            {subId:15, player:'EXCESS KNOWLEDGE'},
            {subId:16, player:'BEAUTIFUL ROMANCE'},
            {subId:17, player:'ALMANDIN'},
            {subId:18, player:'ASSIGN'},
            {subId:19, player:'GREY LION'},
            {subId:20, player:'OCEANOGRAPHER'},
            {subId:21, player:'SECRET NUMBER'},
            {subId:22, player:'PENTATHLON'},
            {subId:23, player:'QEWY'},
            {subId:24, player:'ROSE OF VIRGINIA'},
          ], text:' Melbourne Cup', display:true},
        {id:4, type:'A-League Soccer', playersInGame:[{subId:1, player:'Wellington Phoenix'},{subId:2, player:'Adelaide United'}], text:' Wellington Phoenix vs Adelaide United', display:true},
        {id:5, type:'Rugby Union', playersInGame:[{subId:1, player:'Waratahs'},{subId:2, player:'Sharks'}], text:' Waratahs Vs Sharks', display:true},
        {id:6, type:'Tennis Wimbledon', playersInGame:[{subId:1, player:'A. Sabalenka'},{subId:2, player:'I. Khromacheva'}], text:'A. Sabalenka vs I. Khromacheva', display:true},
        {id:7, type:'A-League Soccer', playersInGame:[{subId:1, player:'Western Sydney Wanderers FC'},{subId:2, player:'Perth Glory'}], text:'Western Sydney Wanderers FC vs Perth Glory', display:true},
        {id:8, type:'Rugby Union', playersInGame:[{subId:1, player:'Highlanders'},{subId:2, player:'Melbourne Rebels'}], text:' Highlanders Vs Melbourne Rebels', display:true},
      ],
      bets:[]
    }

      this.processSelectedGame = this.processSelectedGame.bind(this)
      this.processReturnToAllGamesAndBets = this.processReturnToAllGamesAndBets.bind(this)
      this.processCreatedNewBetMain = this.processCreatedNewBetMain.bind(this)
      this.processUpdatedBetMain = this.processUpdatedBetMain.bind(this)
      this.processCancellationUpdatedBetMain = this.processCancellationUpdatedBetMain.bind(this)
      this.processDeletedBetMain = this.processDeletedBetMain.bind(this)
      this.processCancellationDeletedBetMain = this.processCancellationDeletedBetMain.bind(this)
  }
  //==Firebase BEGIN=========
  componentDidMount(){
    BetsListLocal.on('value',snapshot =>{
      console.log('App-ComponentDidMount-BetsListLocal.snapshot',snapshot.val())
      let betsArrayMap = _.map(snapshot.val(), (bet,id)=>(
         {
           keyId: id,
           betId:bet.betId,
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
      console.log('App-ComponentDidMount-BetsArrayMap',betsArrayMap)
      this.setState({
        Bets: betsArrayMap
      })
    })
      console.log('App-ComponentDidMount-this.state',this.state)
  }
  //==Firebase END===========
  processSelectedGame(index){
    console.log('App-processSelectedBet-buttonIndex',index)
    const length = this.state.games.length

    console.log('App-processSelectedBet-arrayLength: ',length)
    for(let i=0; i<length ; i++){
      console.log('App-processSelectedBet-gamesArrayElements ',this.state.games[i])
      if(this.state.games[i].id === parseInt(index)){
        this.state.games[i].display = true
      }else {
          this.state.games[i].display = false
      }
    }
    this.setState({
      displayGameAndBettingSection: false,
      games: this.state.games
    })
    console.log('ProtectedApp-processCreatedNewBetMain- userIsValid')
  }

  processReturnToAllGamesAndBets(status){
    console.log('App-processReturnToAllGamesAndBets-stateus',status)
    const length = this.state.games.length

    console.log('App-processReturnToAllGamesAndBets-arrayLength: ',length)
    for(let i=0; i<length ; i++){
      console.log('App-processReturnToAllGamesAndBets-gamesArrayElements ',this.state.games[i])

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
    console.log('App-processCreatedNewBetMain-arrayLength: ',length)
    for(let i=0; i<length ; i++){
      console.log('App-processCreatedNewBetMain-gamesArrayElements ',this.state.games[i])
      this.state.games[i].display = true
    }
    console.log('App-processCreatedNewBetMain-gameId', gameId)
    let gamesArrayLength=this.state.games.length
    let gameName = ''
    let playerName = ''

    for(let i=0; i<gamesArrayLength;i++){
      if(this.state.games[i].id=== parseInt(gameId)){
        gameName = this.state.games[i].text
        let lengthPlayersArray = this.state.games[i].playersInGame.length
        for(let a=0; a<lengthPlayersArray; a++){
            if(this.state.games[i].playersInGame[a].subId ===parseInt(subIndexPlayer)){
              playerName = this.state.games[i].playersInGame[a].player
              break;
            }
        }
      }
    }
    let betsArrayLength = this.state.Bets.length
    console.log('App-processCreatedNewBetMain-lastIndex',betsArrayLength)
    let newBetId = ((this.state.Bets[betsArrayLength-1] === undefined)? 1 : this.state.Bets[betsArrayLength-1].betId + 1)
    console.log('App-processCreatedNewBetMain-GameName',gameName)
    console.log('App-processCreatedNewBetMain-subIndexPlayer', subIndexPlayer)
    console.log('App-processCreatedNewBetMain-PlayerName',playerName)
    console.log('App-processCreatedNewBetMain-currencyCode',currencyCode)
    console.log('App-processCreatedNewBetMain-amountBet', amountBet)
    console.log('ProtectedApp-processCreatedNewBetMain- userIsValid')
    let userAuthed = {
      Name: null,
      Email: null,
      PhotoUrl:null,
      EmailVerified:null,
      Uid: null,
    }
    console.log('ProtectedApp-processCreatedNewBetMain- userAuthed1',userAuthed)
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
          console.log('ProtectedApp-processCreatedNewBetMain-user',user)
          console.log('ProtectedApp-processCreatedNewBetMain-userUid',user.uid)
          console.log('ProtectedApp-processCreatedNewBetMain- userAuthed3',userAuthed)
          const newBet = {
            betId:parseInt(newBetId),
            gameId:parseInt(gameId),
            gameName:gameName,
            subIndexPlayer: parseInt(subIndexPlayer),
            playerName:playerName,
            currencyCode: currencyCode,
            amountBet: amountBet,
            username: userAuthed.Email,
            userId:userAuthed.Uid,
            editBet:false,
          }
          console.log('ProtectedApp-processCreatedNewBetMain- newBet',newBet)
          //Remote Resources
          BetsListLocal.push(newBet)
        }
        console.log('ProtectedApp-processCreatedNewBetMain- userAuthed2',userAuthed)
      } else {
        // No user is signed in.
          console.log('ProtectedApp-processCreatedNewBetMain-No user is signed in.')
      }
    })

    this.setState({
      displayGameAndBettingSection:true,
      games: this.state.games,
      bets: this.state.bets,
    })
    console.log('App-processCreatedNewBetMain-thisState',this.state)
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
    console.log('App-processUpdatedBetMain Method BEGIN')
    console.log('App-displayGamesSection',this.state.displayGamesSection)
    console.log('App-displayBettingSection',this.state.displayBettingSection)
    console.log('App-gamesArray',this.state.games)
    console.log('App-BetsArray',this.state.Bets)
    console.log('App-processUpdatedBetMain Method END')
  }

  processCancellationUpdatedBetMain(status){
    console.log('App-processCancellationUpdatedBetMain-stateeeus',status)
    const length = this.state.games.length
    console.log('App-processCancellationUpdatedBetMain-arrayLength: ',length)
    for(let i=0; i<length ; i++){
      console.log('App-processCancellationUpdatedBetMain-gamesArrayElements ',this.state.games[i])
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
    console.log('App-processDeletedBetMain Method BEGIN')
    console.log('App-displayGamesSection',this.state.displayGamesSection)
    console.log('App-displayBettingSection',this.state.displayBettingSection)
    console.log('App-gamesArray',this.state.games)
    console.log('App-betsArray',this.state.Bets)
    console.log('App-processDeletedBetMain Method END')
  }

  processCancellationDeletedBetMain(status){
    console.log('App-processCancellationDeletedBetMain-statuuus',status)
    const length = this.state.games.length
    console.log('App-processCancellationDeletedBetMain-arrayLength: ',length)
    for(let i=0; i<length ; i++){
      console.log('App-processCancellationDeletedBetMain-gamesArrayElements ',this.state.games[i])
      this.state.games[i].display = true
    }
    this.setState({
      displayGameAndBettingSection: true,
      games: this.state.games
    })
  }

  render() {
    //Styles BEGIN==
    const styleBets = {
       position: 'absolute',
       top: '350px'
    }

    const styleGames ={
      border:'5px solid #C0C0C0',
      borderRadius:'15px',
      height: '200px',
      padding: '20px',
      position: 'absolute',
      top: '140px',
      width: '750px',
    }

    const divStyleGamesScrollable = {
      height: '160px',
      overflowY: 'auto',
      padding: '20px',
    };
    //Styles END====


    console.log('App-render-BetsObjectCollection',this.state.Bets)
    let betArrayValues =_.values(this.state.Bets)
    console.log('App-render-BetsArrayValues',betArrayValues)
    let betArrayMap = _.map(this.state.Bets, (bet,id)=>(
       {
         id: id,
         betId:bet.betId,
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
    console.log('App-render-BetsArrayMap',betArrayMap)
    let arrayFilterByDisplayElement = (arrayElement) =>{
      return arrayElement.display===true
    }
    let renderingArray = this.state.games.filter(arrayFilterByDisplayElement)
    console.log("App-render-filtered Bets", renderingArray)

    console.log('App-Render-state.DisplayGamesSection',this.state.displayGamesSection)
    console.log('App-Render-state.BettingSection',this.state.displayBettingSection)
    console.log('App-Render-state.(full state)',this.state)
    if(this.state.displayGameAndBettingSection===true){
      return (
        <div className="App">
          <h2>Super Betting Bucket</h2>
          <div style={styleGames}>
          <div style={divStyleGamesScrollable}>

              {_.map(this.state.games,(game, id)=>(
                <DisplayAllGames
                    key={game.id}
                    gameId={game.id}
                    gameText={game.text}
                    gameDisplay={game.display}
                    gamePlayersArray={game.playersInGame}
                    gameType ={game.type}
                    gameDisplay={game.display}
                    gameButtonText={'Select your Bet'}
                    displayCancelButton={false}
                    onSelectedGame={this.processSelectedGame}
                    >
                </DisplayAllGames>
             ))}

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
           gameDisplay={game.display}
           gamePlayersArray={game.playersInGame}
           gameType ={game.type}
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
