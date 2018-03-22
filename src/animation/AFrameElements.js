import 'aframe'
import React, { Component } from 'react';

export class AFrameElements extends Component {
  render() {
    return (
      <div>
        <a-marker id="marker" preset="hiro">
          <a-box position='0 0.5 0'></a-box>
        </a-marker>
        <a-box id="money" position='0 0 0'></a-box>
        <a-entity id="camera" camera></a-entity>
      </div>
    )
  };
}