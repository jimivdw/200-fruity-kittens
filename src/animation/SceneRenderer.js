/* globals THREE, requestAnimationFrame */
// More global here, this time from three.js
// requestAnimationFrame is from the window object though: https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame

import React, { Component } from 'react';
import initializeRenderer from './initializeRenderer';
import { initializeArToolkit, getMarker } from './ARToolkit';
// import detectEdge from './utils/detectEdge';

const { Camera, DoubleSide, Group, Mesh, MeshBasicMaterial, PlaneGeometry, Scene, Texture } = THREE;

class SceneRenderer extends Component {
  constructor(props) {
    super(props);
    this.throwAnimation = this.throwAnimation.bind(this);
    // this.onRenderFct = this.onRenderFct.bind(this);
  }

  markerRoot;
  scene;
  camera;
  bill;

  calcDistance(destination) {
    var dx = 0 - destination.x;
    var dy = 0 - destination.y;
    var dz = 0 - destination.z;
  
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  getRandomNumber(x) {
    return Math.floor(Math.random() + x);
  }
  
  glassFill = 0.1;
  billGeometry = new THREE.PlaneGeometry(2, 1);
  billTexture = new THREE.TextureLoader().load('dollarbill.jpg');
    // immediately use the texture for material creation
  billMaterial = new THREE.MeshBasicMaterial({
    map: this.billTexture
  });
  
  setGlassFill(part) {
    this.markerRoot.children[0].children[0].scale.set(1, part, 1);
    this.markerRoot.children[0].children[0].position.set(0, -1 + part, 0);
    this.glassFill = part;
  }
  
  throwAnimation() {
    let distance = this.calcDistance(this.markerRoot.children[0]);
    const stepX = this.markerRoot.position.x / 250.0;
    const stepY = this.markerRoot.position.y / 250.0;
    const stepZ = this.markerRoot.position.z / 250.0;

    const renderer = this.renderer;

    let i = 0;
    let interval = setInterval(() => {
      if(i === 250) {
        this.bill.position.set(0, 0, 0);
        clearInterval(interval);
      } else {
        i++;
        this.bill.position.set(stepX * i, stepY * i, stepZ * i);
      }
      
    }, 1)
  
    setTimeout(() => {
      this.setGlassFill(this.glassFill + 0.1);
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

    this.scene = new Scene();
    this.camera = new Camera();
    this.scene.add(this.camera);

    this.markerRoot = new Group();
    this.scene.add(this.markerRoot);
    const onRenderFcts = []; // Array of functions called for each rendering frames
    const arToolkitContext = initializeArToolkit(renderer, this.camera, onRenderFcts);
    const marker = getMarker(arToolkitContext, this.markerRoot);

    this.billMaterial.side = THREE.DoubleSide;
    this.billTexture.needsUpdate = true; // This instruct three.js to update this object at next render
    
    this.bill = new Mesh(this.billGeometry, this.billMaterial);

    this.scene.add(this.bill);

    const loader = new THREE.ObjectLoader();
    loader.load('beer.json', (beerObj) => {
      this.markerRoot.add(beerObj);
      beerObj.children[0].scale.set(1, 0, 1);
      beerObj.children[0].position.set(0, -1, 0);
    });

    // From the new plane and material, instantiate a three.js mesh
    const scene = this.scene;
    const camera = this.camera;
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
      <canvas id="root" ref={this.storeRef} onClick={this.throwAnimation}></canvas>
    );
  }
}

export {
  SceneRenderer
}