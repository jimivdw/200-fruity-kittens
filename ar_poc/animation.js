function getRandomNumber(x) {
  return Math.floor(Math.random() + x);
}

let glassFill = 0.1;
function calcDistance(source, destination) {
  var dx = 0 - destination.x;
  var dy = 0 - destination.y;
  var dz = 0 - destination.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function setGlassFill(part) {
  const glass = document.getElementById('marker');
  glass.object3D.children[1].children[0].scale.set(1, part, 1);
  glass.object3D.children[1].children[0].position.set(0, -1 + part, 0);
  glassFill = part;
}

function throwAnimation() {
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
  point2.setAttribute('position', `${getRandomNumber(stepX - 0.5)} ${getRandomNumber(stepY - 0.5)} ${getRandomNumber(stepZ - 0.5)}`);
  track.append(point2);
  let point3 = document.createElement('a-curve-point');
  point3.setAttribute('position', `${getRandomNumber(stepX * 2 - 0.5)} ${getRandomNumber(stepY * 2 - 0.5)} ${getRandomNumber(stepZ * 2 - 0.5)}`);
  track.append(point3);
  let point4 = document.createElement('a-curve-point');
  point4.setAttribute('position', `${target.object3D.position.x} ${target.object3D.position.y} ${target.object3D.position.z}`);
  track.appendChild(point4);

  element.setAttribute(`alongpath`, `curve: .track; dur: 1000; loop: false`);

  setTimeout(() => {
    setGlassFill(glassFill + 0.1);
    element.object3D.position.set(0, 0, 0);
    element.removeAttribute('alongpath');
    scene.removeChild(track);
    scene.removeChild(element);
  }, 1000);
}

const sceneElement = document.getElementById('cover');
console.log('scene', sceneElement);
sceneElement.addEventListener('click', throwAnimation);
setGlassFill(glassFill);
