const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 2000 );
const controls = new THREE.OrbitControls(camera);
const renderer = new THREE.WebGLRenderer();
const lineMat = new THREE.LineBasicMaterial({color: 0x111111, linewidth: 0.1});
const sphereGeometry = new THREE.SphereGeometry(0.25, 8, 8);

const init = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.set(0, 0, 100);
  controls.update();
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

const colorPicker = (num) => {
  if (num > 0.5) {
    const r = Math.floor(255 - (num - 0.5) / 0.5 * 255);
    return `rgb(${r}, 255, 0)`;
  } else if (num > 0) {
    const g = Math.floor(num / 0.5 * 255);
    return `rgb(255, ${g}, 0)`;
  } else {
    return `rgb(255, 0, 0)`;
  }
}

const addStars = () => {
  for (let starID in solarsystems) {
    const pos = solarsystems[starID].position;
    const color = colorPicker(Number(solarsystems[starID].security));
    const material = new THREE.MeshBasicMaterial({color: color});
    const sphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(sphere);
    sphere.position.set(pos[0], pos[1], pos[2]);
  }
}

const addGates = () => {
  for (let i = 0; i < gates.length; i++) {
    const pos1 = gates[i][0];
    const pos2 = gates[i][1];

    const geometry = new THREE.Geometry();
    geometry.vertices.push(
    	new THREE.Vector3(pos1[0], pos1[1], pos1[2]),
    	new THREE.Vector3(pos2[0], pos2[1], pos2[2])
    );

    const line = new THREE.Line(geometry, lineMat);
    scene.add( line );
  }
}

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener( 'resize', onWindowResize, false );

init();
addStars();
addGates();
animate();
