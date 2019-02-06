import React from "react";
import BotsCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'
import BotSpecs from '../components/BotSpecs'
import Search from '../components/Search'

const API = 'https://bot-battler-api.herokuapp.com/api/v1/bots'

class BotsPage extends React.Component {

  state = {
    allBots: [],
    botArmy: [],
    renderSpec: false,
    filteredBots: []
  }

  componentDidMount() {
    return fetch(API)
    .then(res => res.json())
    .then(data => this.setState({ 
      allBots: data,
      filteredBots: data
     }))
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

  handleSearch = (event) => {
    event.preventDefault()
    const searchTerm = event.target.value.toLowerCase()
    const filteredBots = this.state.allBots.filter(bot => bot.name.toLowerCase().includes(searchTerm))
    this.setState({ filteredBots: filteredBots })
  }

  renderCollection = () => this.setState({renderSpec: false})

  render() {
    return (
      <div>
        <Search onChange={this.handleSearch} />
        <YourBotArmy allBots={this.state.botArmy} handleClick={this.toggleArmy} />
        {this.state.renderSpec === false
        ? 
        <BotsCollection allBots={this.state.filteredBots} handleClick={this.handleClick} />
        :
        <BotSpecs bot={this.state.renderSpec} renderCollection={this.renderCollection} toggleArmy={this.toggleArmy} />
        }
      </div>
    )
  }

}

export default BotsPage;
