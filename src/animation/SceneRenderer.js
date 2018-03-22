/* globals THREE, requestAnimationFrame */
// More global here, this time from three.js
// requestAnimationFrame is from the window object though: https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame

import React, { Component } from 'react';
import initializeRenderer from './initializeRenderer';
import { initializeArToolkit, getMarker } from './ARToolkit';
// import detectEdge from './utils/detectEdge';

const { Camera, DoubleSide, Group, Mesh, MeshBasicMaterial, PlaneGeometry, Scene, Texture } = THREE;

class SceneRenderer extends Component {
  getRandomNumber(x) {
    return Math.floor(Math.random() + x);
  }
  
  glassFill = 0.1;
  
  setGlassFill(part) {
    const glass = this.markerRoot;
    glass.object3D.children[1].children[0].scale.set(1, part, 1);
    glass.object3D.children[1].children[0].position.set(0, -1 + part, 0);
    this.glassFill = part;
  }
  
  throwAnimation() {
    // let scene = this.scene;
    // let target = this.markerRoot
    // let element = document.createElement('a-entity');
  
    // element.setAttribute('bill', '');
  
    // scene.append(element);
  
    // element.object3D.position.set(0, 0, 0);
  
    // const stepX = target.object3D.position.x / 3;
    // const stepY = target.object3D.position.y / 3;
    // const stepZ = target.object3D.position.z / 3;
  
    // let track = document.createElement('a-curve');
    // track.setAttribute('class', `track`);
    // scene.appendChild(track);
    // let point1 = document.createElement('a-curve-point');
    // point1.setAttribute('position', '0 0 0');
    // track.appendChild(point1);
    // let point2 = document.createElement('a-curve-point');
    // point2.setAttribute('position', `${this.getRandomNumber(stepX - 0.5)} ${this.getRandomNumber(stepY - 0.5)} ${this.getRandomNumber(stepZ - 0.5)}`);
    // track.append(point2);
    // let point3 = document.createElement('a-curve-point');
    // point3.setAttribute('position', `${this.getRandomNumber(stepX * 2 - 0.5)} ${this.getRandomNumber(stepY * 2 - 0.5)} ${this.getRandomNumber(stepZ * 2 - 0.5)}`);
    // track.append(point3);
    // let point4 = document.createElement('a-curve-point');
    // point4.setAttribute('position', `${target.object3D.position.x} ${target.object3D.position.y} ${target.object3D.position.z}`);
    // track.appendChild(point4);
  
    // element.setAttribute(`alongpath`, `curve: .track; dur: 1000; loop: false`);
  
    setTimeout(() => {
      this.setGlassFill(this.glassFill + 0.1);
      // element.object3D.position.set(0, 0, 0);
      // element.removeAttribute('alongpath');
      // scene.removeChild(track);
      // scene.removeChild(element);
    }, 1000);
  }

  componentDidMount() {
    const {
      blackImage,
      coordX,
      coordZ,
      image,
      onMarkerFound,
      opacity,
      scaleX,
      scaleY,
      rotation,
    } = this.props;

    // initializeRenderer instanciate a new WebGlRenderer from three.js with some options
    // for opacity, size, etc.
    const renderer = this.renderer = initializeRenderer(this.canvas);

    const scene = new Scene();
    const camera = new Camera();
    scene.add(camera);

    const markerRoot = new Group();
    scene.add(markerRoot);
    const onRenderFcts = []; // Array of functions called for each rendering frames
    const arToolkitContext = initializeArToolkit(renderer, camera, onRenderFcts);
    const marker = getMarker(arToolkitContext, markerRoot);

    var geometry = new THREE.PlaneGeometry(2, 1);
    var texture = new THREE.TextureLoader().load('dollarbill.jpg');
    // immediately use the texture for material creation
    var material = new THREE.MeshBasicMaterial({
      map: texture
    });

    const loader = new THREE.ObjectLoader();
    loader.load('beer.json', (beerObj) => {
      console.log(' I have beer', beerObj);
      // this.el.setObject3D('beer', beerObj);
      markerRoot.add(beerObj);
    });

    material.side = THREE.DoubleSide;

    texture.needsUpdate = true; // This instruct three.js to update this object at next render

    // From the new plane and material, instantiate a three.js mesh
    this.mesh = new Mesh(geometry, this.material);

    // Instruct arToolKit to display this image at the hiro marker position
    // markerRoot.add(this.mesh);

    // at each frame render, update the scene
    onRenderFcts.push(function () {
      renderer.render(scene, camera);
    });

    // run the rendering loop
    var lastTimeMsec = null;

    function animate(nowMsec) {
      // keep looping
      requestAnimationFrame(animate);
      // measure time
      lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
      const deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
      lastTimeMsec = nowMsec;
      // call all registered update functions
      onRenderFcts.forEach(onRenderFct => {
        onRenderFct(deltaMsec / 1000, nowMsec / 1000);
      });
    }

    requestAnimationFrame(animate);
  }

  componentWillUnmount() {
    this.renderer.dispose();
  }

  storeRef = node => {
    this.canvas = node;
  }

  render() {
    return (
      <canvas id="root" ref={this.storeRef} onClick={this.throwAnimation} />
    );
  }
}

export {
  SceneRenderer
}