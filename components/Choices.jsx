import React from "react";
import Header from './Header.jsx';
import Card from './Card.jsx';
import treeRebalancer from "../model/treeRebalancer";

const Choices = React.createClass({
  getInitialState: function(){
    return {
      Trello: this.props.Trello,
      rootNode: null,
      currentNodeIndex: 1,
      rightNode: null
    }
  },
  endChoices: function(rootNode){
    this.props.setSortedRootNode(rootNode);
  },
  startChoices: function(rootNode){
    this.setState({rootNode: rootNode})
    this.choicesCycle();
  },
  getChoice: function (compareNode) {
    this.setState({
      rightNode: compareNode
    });
  },
  getLeftNode: function() {
    return this.props.nodes[this.state.currentNodeIndex];
  },
  choicesCycle: function () {
    var index = this.state.currentNodeIndex
    if (index < this.props.nodes.length) {
      this.setState({currentNodeIndex: this.state.currentNodeIndex +1});
      this.getChoice(this.state.rootNode);
    } else {
      this.endChoices(this.state.rootNode);
    }
  },
  handleClick: function (button) {
    if (button == "left_button") {
      this.setState({rightNode: this.state.rootNode.goLeft(this.state.rightNode)});
    } else if (button == "right_button") {
      this.setState({rightNode: this.state.rootNode.goRight(this.state.rightNode)});
    }
    if (this.state.rootNode.isPositioned) {
      var oldRoot = this.state.rootNode;
      this.setState({
        rootNode: treeRebalancer(oldRoot),
        currentNodeIndex: this.state.currentNodeIndex +1
      });
      this.choicesCycle();
    } else {
      this.getChoice(this.state.rootNode, this.state.rightNode);
    }
  },
  render: function() {
    if (this.state.leftNode == null || this.state.rightNode == null) {
      return (<span>Loading...</span>);
    }
    return (
        <div id="second_div" className={"centered_content"}>
          <div className={"row choices--title"}>
            <p>Select the highest priority card</p>
          </div>
          <div className={"centered_content row choices--container"}>
            <Card id="left_button" data={this.state.leftNode.value} onClick={() => {this.handleClick('left_button')}}/>
            <Card id="right_button" data={this.state.rightNode.value} onClick={() => {this.handleClick('right_button')}}/>
          </div>
          <div className={"row logout--header"}>
            <Header />
          </div>
        </div>
    )
  }
})

export default Choices
