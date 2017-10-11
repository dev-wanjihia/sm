
var renderer, camera, scene;

var ball, plane;

var controls, spotLight;

initGraphics();
animate();

function initGraphics()
{

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set( -15, 20, 250 );
    camera.rotation.set(-0.0787, -0.0581, 0.00262);
    
    scene.add(camera);

    controls = new THREE.TrackballControls(camera);

    renderer = new THREE.WebGLRenderer( {antialias : true} );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xdddddd);
    renderer.shadowMapEnabled = true;

    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(150, 300, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);

    var bottomLight = new THREE.PointLight(0xffffff, 0.25);
    bottomLight.position.set(-100, -100, -100);
    scene.add(bottomLight);

    ball = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshPhongMaterial({color : 0xaaffaa}));
    ball.castShadow = true;
    scene.add(ball);

    var axis = new THREE.AxisHelper(20);
    scene.add(axis);

    plane = new THREE.Mesh(new THREE.BoxGeometry(9000, 4, 9000), new THREE.MeshPhongMaterial({color : 0xdddddd}));
    plane.position.y = -6;
    plane.receiveShadow = true;
    scene.add(plane);

    document.getElementById("container").appendChild(renderer.domElement);
}

function animate()
{
    requestAnimationFrame(animate);
    render();
}

var falling = true;

function render()
{
    ball.position.set( rVec[0], rVec[1], rVec[2] );
    controls.update();
    renderer.render(scene, camera);  
}