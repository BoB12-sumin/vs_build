import React from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

import "./App.css";
//import Pallete from "./components/Palette";

function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram = $(go.Diagram, {
    "undoManager.isEnabled": true,
    //layout: new go.TreeLayout({ angle: 90, layerSpacing: 35 }),
    "clickCreatingTool.archetypeNodeData": {
      key: 4,
      text: "CAT",
      color: "lightblue",
      source: "img/cat.png",
    },
    model: new go.GraphLinksModel({
      linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    "Auto",
    { background: "#44CCFF" },
    new go.Binding("location", "loc", go.Spot.Center).makeTwoWay(
      go.Point.stringify
    ),
    $(
      go.Picture,
      {
        margin: 10,
        width: 50,
        height: 50,
        background: "lightblue",
        portId: "",
        cursor: "pointer",
        fromLinkable: true,
        fromLinkableSelfNode: true,
        fromLinkableDuplicates: true,
        toLinkable: true,
        toLinkableSelfNode: true,
        toLinkableDuplicates: true,
      },
      new go.Binding("source").makeTwoWay()
    ),
    $(
      go.TextBlock,
      "Default Text",
      { stroke: "white", font: "bold 12px sans-serif" },
      new go.Binding("text").makeTwoWay()
    )
  );

  diagram.linkTemplate = $(
    go.Link,
    {
      routing: go.Link.Orthogonal,
      corner: 5,
      relinkableFrom: true,
      relinkableTo: true,
    },
    $(go.Shape, { strokeWidth: 3, stroke: "#555" })
    //$(go.Shape, { toArrow: "Standard", stroke: null })
  );

  diagram.addDiagramListener("ObjectSingleClicked", function (e) {
    const node = e.subject.part;
    if (node instanceof go.Node) {
      console.log(node.data);
    }
  });

  return diagram;
}

function App() {
  return (
    <div className="App">
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={[
          {
            key: 0,
            loc: "0 0",
            text: "1",
            source: "img/cat.png",
          },
          {
            key: 1,
            loc: "0 100",
            text: "2",
            source: "img/icon2.png",
          },
          {
            key: 2,
            loc: "150 0",
            text: "3",
            source: "img/icon1.png",
          },
        ]}
        linkDataArray={[
          { key: -1, from: 0, to: 1 },
          { key: -2, from: 0, to: 2 },
          { key: -3, from: 2, to: 2 },
        ]}
        //onModelChange={handleModelChange}
      />
    </div>
  );
}

export default App;
