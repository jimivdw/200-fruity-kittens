import 'aframe'
import React, { Component } from 'react';
import { Scene, Entity } from 'react-aframe-ar';

var s = document.createElement("script");
s.type = "text/javascript";
s.src = "https://cdn.rawgit.com/jeromeetienne/AR.js/1.5.0/aframe/build/aframe-ar.js";
document.getElementsByTagName("body")[0].append(s);

var s = document.createElement("script");
s.type = "text/javascript";
s.src = "https://rawgit.com/protyze/aframe-curve-component/master/dist/aframe-curve-component.min.js";
document.getElementsByTagName("body")[0].append(s);

var s = document.createElement("script");
s.type = "text/javascript";
s.src = "https://rawgit.com/protyze/aframe-alongpath-component/master/dist/aframe-alongpath-component.min.js";
document.getElementsByTagName("body")[0].append(s);

export class Deposit extends Component {
  getRandomNumber(x) {
    return Math.floor(Math.random() + x);
  }

  calcDistance(source, destination) {
    var dx = 0 - destination.x;
    var dy = 0 - destination.y;
    var dz = 0 - destination.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  throwAnimation() {
    let scene = document.getElementsByTagName('a-scene')[0];
    let target = document.getElementsByTagName('a-marker')[0];
    let element = document.createElement('a-entity');

    element.setAttribute('bill', '');

    scene.append(element);

    element.object3D.position.set(0, 0, 0);

    const stepX = target.object3D.position.x / 3;
    const stepY = target.object3D.position.y / 3;
    const stepZ = target.object3D.position.z / 3;

    let track = document.createElement('a-curve');
    track.setAttribute('class', `track`);
    scene.appendChild(track);
    let point1 = document.createElement('a-curve-point');
    point1.setAttribute('position', '0 0 0');
    track.appendChild(point1);
    let point2 = document.createElement('a-curve-point');
    point2.setAttribute('position', `${this.getRandomNumber(stepX - 0.5)} ${this.getRandomNumber(stepY - 0.5)} ${this.getRandomNumber(stepZ - 0.5)}`);
    track.append(point2);
    let point3 = document.createElement('a-curve-point');
    point3.setAttribute('position', `${this.getRandomNumber(stepX * 2 - 0.5)} ${this.getRandomNumber(stepY * 2 - 0.5)} ${this.getRandomNumber(stepZ * 2 - 0.5)}`);
    track.append(point3);
    let point4 = document.createElement('a-curve-point');
    point4.setAttribute('position', `${target.object3D.position.x} ${target.object3D.position.y} ${target.object3D.position.z}`);
    track.appendChild(point4);

    element.setAttribute(`alongpath`, `curve: .track; dur: 500; loop: false`);

    setTimeout(() => {
      element.object3D.position.set(0, 0, 0);
      element.removeAttribute('alongpath');
      scene.removeChild(track);
    }, 2000);
  }

  componentDidMount() {
    const sceneElement = document.getElementsByTagName('a-scene')[0];
    sceneElement.setAttribute('embedded', '');
    sceneElement.setAttribute('arjs', '');
/* hoi */
    sceneElement.append()
        <a-marker id="marker" preset="hiro">
          <a-box position='0 0.5 0'></a-box>
        </a-marker>
        <a-box id="money" position='0 0 0'></a-box>
        <a-entity id="camera" camera></a-entity>
      </div>
    );
  }

  render() {
    return (
      <div id="cover" onClick={this.throwAnimation}>
        <Scene>
          {this.elements}
        </Scene>
      </div>
    );
  }
};

