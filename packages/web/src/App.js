import React, { Component } from "react";
import { Menu, Image } from "semantic-ui-react";
import { Boxscore } from "./components/Boxscore";
import barstoolLogo from "./assets/barstool.png";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      league: null,
      isLoading: true,
      data: {}
    };
  }

  componentDidMount = async () => {
    await this.getData("NBA");
    //this.startFetchInterval();
  };

  handleItemClick = async (e, { name }) => {
    if (this.state.league !== name) {
      await this.setState({ isLoading: true });
      //clearInterval(this.interval);
      await this.getData(name);
    }
    await this.setState({ league: name });
    //this.startFetchInterval();
  };

  /* startFetchInterval = () => {
    this.interval = setInterval(async () => {
      await this.getData(this.state.league);
    }, 10000);
  }; */

  getData = async league => {
    var url = process.env.REACT_APP_API_URL + league.toLowerCase();
    console.log("fetching data from url: ", url)
    var body = await fetch(url).then(res => res.json());
    console.log("body = ", body);
    var data = body;
    var isLoading = false;
    return await this.setState({
      league,
      isLoading,
      data
    });
  };

  render() {
    const { league, data, isLoading } = this.state;
    return (
      <div className="App">
        <Menu pointing className="App-menu" inverted fixed="top">
          <Menu.Item header style={{ padding: "15px 48px 15px 32px" }}>
            <Image src={barstoolLogo} size="small" style={{ padding: "0px" }} />
          </Menu.Item>
          <Menu.Item
            name="NBA"
            active={league === "NBA"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="MLB"
            active={league === "MLB"}
            onClick={this.handleItemClick}
          />
        </Menu>
        <Boxscore isLoading={isLoading} league={league} data={data} />
      </div>
    );
  }
}

export default App;
