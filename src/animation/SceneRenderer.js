/* globals THREE, requestAnimationFrame */
// More global here, this time from three.js
// requestAnimationFrame is from the window object though: https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame

import React, { Component } from 'react';
import initializeRenderer from './initializeRenderer';
import { initializeArToolkit, getMarker } from './ARToolkit';
import { depositMoney } from '../firebase/db';
// import detectEdge from './utils/detectEdge';

const { Camera, DoubleSide, Group, Mesh, MeshBasicMaterial, PlaneGeometry, Scene, Texture } = THREE;


const EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity 
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity 
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity 
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity 
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}


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
    let steps = 60;

    const renderer = this.renderer;


    let i = 0;
    let animate = function animate() {

      const stepX = this.markerRoot.position.x / steps;
      const stepY = this.markerRoot.position.y / steps;
      const stepZ = this.markerRoot.position.z / steps;

      const ef = 1;//EasingFunctions.easeInOutCubic(1/i); //easing factor

      if(i === steps) {
        this.bill.position.set(0, 0, 0);
      } else {
        requestAnimationFrame(animate.bind(this));
        i++;
        const rand = 1 ;//+ (-1 + Math.random() * 2) * 0.1;   
        this.bill.position.set((stepX * i) * ef, (stepY * i)  * ef, (stepZ * i) * ef);
        // this.bill.rotation.set();

      }
    }.bind(this);

    animate();
  
    setTimeout(() => {
      this.setGlassFill(this.glassFill + 0.1);
    }, 1000);
  }

  componentWillUnmount() {
    console.log('jeje');
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
    const getVideoContainer = () => {
      return this.videoContainer;
    };
    const arToolkitContext = initializeArToolkit(renderer, this.camera, onRenderFcts, getVideoContainer);
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

  storeCanvasRef = node => {
    this.canvas = node;
  }

  storeVideoContainerRef = node => {
    this.videoContainer = node;
  }

  render() {
    return [
      <canvas style={{top: "100px !important"}} id="root" ref={this.storeCanvasRef} onClick={this.throwAnimation}></canvas>,
      <div ref={this.storeVideoContainerRef}></div>,
    ];
  }
}

export {
  SceneRenderer
}