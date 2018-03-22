AFRAME.registerComponent('bill', {
  init: function () {
    console.log('register');
    var geometry = new THREE.PlaneGeometry(2, 1);
    var texture = new THREE.TextureLoader().load('dollarbill.jpg');
    // immediately use the texture for material creation
    var material = new THREE.MeshBasicMaterial({
      map: texture
    });

    material.side = THREE.DoubleSide;

    this.el.setObject3D('bill', new THREE.Mesh(geometry, material));  
}});