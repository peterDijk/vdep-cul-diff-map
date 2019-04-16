import React, { Component } from "react";
import { Chart } from "react-google-charts";
import "./App.css";
import CSVReader from "react-csv-reader";
import { initData } from "./mapData";

type State = {
  mapData: string[][];
  allData: string[][];
};

class App extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      mapData: [["Land", "Sleutel"]],
      allData: initData
    };
  }

  handleCsv = (json: any) => {
    this.setState({ allData: json });
  };

  setKey = (index: any) => {
    const mapData: any = [];

    this.state.allData.map((row, allIndex) => {
      if (allIndex > 0) {
        mapData.push([row[0], parseInt(row[index])]);
      }
    });
    mapData[0][0] = "Land";
    mapData[0][1] = this.state.allData[0][index];
    this.setState({ mapData });
  };

  render() {
    console.log(JSON.stringify(this.state.allData));
    return (
      <div className="App">
        <CSVReader label="select csv" onFileLoaded={this.handleCsv} />
        {this.state.allData[0].map((key, index) => {
          return (
            index !== 0 && (
              <div
                key={index}
                style={{
                  cursor: "pointer",
                  display: "inline-block"
                }}
                onClick={() => this.setKey(index)}
              >
                {key} |
              </div>
            )
          );
        })}
        <Chart
          width={"90%"}
          height={"80%"}
          chartType="GeoChart"
          data={this.state.mapData}
          // Note: you will need to get a mapsApiKey for your project.
          // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
          // mapsApiKey="YOUR_KEY_HERE"
          rootProps={{ "data-testid": "1" }}
          options={{
            colorAxis: {
              colors: ["#00AEED", "#0183B7", "#7CC04E"]
            },
            defaultColor: "#f5f5f5"
          }}
        />
      </div>
    );
  }
}

export default App;
