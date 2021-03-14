import React, { Component } from "react";
export default class TitlebarComponent extends Component<{ title: string }, {}> {
  render() {
    return (
      <div className="w-screen h-8 bg-gray-100 flex justify-between items-center pl-3 grid-cols-2 draggable">
        <div className="arcade text-xs">{ this.props.title }</div>
        <div className="flex not-draggable"></div>
      </div>
    );
  }
}