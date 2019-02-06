import React from "react";
import BotsCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'
import BotSpecs from '../components/BotSpecs'


const API = 'https://bot-battler-api.herokuapp.com/api/v1/bots'

class BotsPage extends React.Component {

  state = {
    allBots: [],
    botArmy: [],
    renderSpec: false
  }

  componentDidMount() {
    return fetch(API)
    .then(res => res.json())
    .then(data => this.setState({ allBots: data }))
  }

  toggleArmy = (bot) => {
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

  handleClick = (bot) => {
    this.setState({
      renderSpec: bot
    })
  }

  renderCollection = () => this.setState({renderSpec: false})

  render() {
    return (
      <div>
        <YourBotArmy allBots={this.state.botArmy} handleClick={this.toggleArmy} />
        {this.state.renderSpec === false
        ? 
        <BotsCollection allBots={this.state.allBots} handleClick={this.handleClick} />
        :
        <BotSpecs bot={this.state.renderSpec} renderCollection={this.renderCollection} toggleArmy={this.toggleArmy} />
        }
      </div>
    )
  }

}

export default BotsPage;
