import React from "react";
import BotsCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'

const API = 'https://bot-battler-api.herokuapp.com/api/v1/bots'

class BotsPage extends React.Component {

  state = {
    allBots: [],
    botArmy: []
  }

  componentDidMount() {
    return fetch(API)
    .then(res => res.json())
    .then(data => this.setState({ allBots: data }))
  }

  handleClick = (bot) => {
    let newArray
    const army = this.state.botArmy
    if(army.includes(bot)) {
    army.splice(army.indexOf(bot), 1)
    newArray = army
    } else {
    newArray = [...army, bot]
    }
    this.setState({
      botArmy: newArray
    })
  }

  render() {
    return (
      <div>
        <YourBotArmy allBots={this.state.botArmy} handleClick={this.handleClick} />
        <BotsCollection allBots={this.state.allBots} handleClick={this.handleClick} />
      </div>
    );
  }

}

export default BotsPage;
