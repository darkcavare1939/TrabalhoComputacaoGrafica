function main() {
    var stats = initStats();          // To show FPS information
    var scene = new THREE.Scene();    // Create main scene
    var renderer = initRenderer();    // View function in util/utils
    var camera = changeCamera(new THREE.Vector3(0, -25, 10)); // Init camera in this position
    var light = initDefaultLighting(scene, new THREE.Vector3(0, 10, 15));
    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    var vetorChassi = new THREE.Vector3();

    // Show text information onscreen
    showInformation();

    // To use the keyboard
    var keyboard = new KeyboardState();

    // Enable mouse rotation, pan, zoom etc.
    var planeGeometry = new THREE.PlaneGeometry(700, 700, 40, 40);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: "rgba(20, 30, 110)",
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);

    var wireframe = new THREE.WireframeGeometry(planeGeometry);
    var line = new THREE.LineSegments(wireframe);
    line.material.color.setStyle("rgb(180, 180, 180)");
    scene.add(line);

    // cabine e parte central do carro
    const chassi = cubo(2, 4.7, 0.5, 'rgb(255,255,255)');
    const cabine = cubo(1.5, 2, 0.2, 'rgb(92,88,88)');
    var geometryTorus = new THREE.TorusGeometry(1.6, 0.25, 30, 3, 3);
    var materialTorus = new THREE.MeshBasicMaterial({ color: 'white' });
    const arcoEsquerdo = new THREE.Mesh(geometryTorus, materialTorus);
    const arcoDireito = new THREE.Mesh(geometryTorus, materialTorus);
    const ponteCentral = cubo(1.5, 3.9, 0.4, 'blue');
    materialVolante = new THREE.MeshBasicMaterial({ color: 'black' });
    geometryVolante = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 10);
    const volante = new THREE.Mesh(geometryVolante, materialVolante);
    geometryVolante = new THREE.CylinderGeometry(0.1, 0.1, 1, 10);
    const apoioVolante = new THREE.Mesh(geometryVolante, materialVolante);
    const banco = cubo(0.1, 0.7, 0, 'rgb(0,255,0)');
    const apoioBanco = cubo(0, 0.7, 0.1, 'rgb(0,255,0)');

    //pecas da frente do carro
    const frenteDoCarro = cubo(1, 4.7, 0.5, 'rgb(255,255,255)');
    const conexaoFrontal = cubo(0.8, 3.49, 0.7, 'rgb(0,0,255)');
    const asaEsquerdafrontal = cubo(0.7, 1, 0.1, 'rgb(0,255,0)');
    const asaDireitoFrontal = cubo(0.7, 1, 0.1, 'rgb(0,255,0)');


    // aerofolio do carro
    const wing = cubo(4, 0.6, 0.2, 'rgb(0,0,255)');
    const leftWing = cubo(0.5, 0.8, 0.05, 'rgb(0,255,0)');
    const rightWing = cubo(0.5, 0.8, 0.05, 'rgb(0,255,0)');
    var geometrySuporte = new THREE.CylinderGeometry(0.1, 0.19, 1.6, 3, 5);
    var materialSuporte = new THREE.MeshBasicMaterial({ color: 'black' });
    const suporteEsquerdoWing = new THREE.Mesh(geometrySuporte, materialSuporte);
    const suporteDireitoWing = new THREE.Mesh(geometrySuporte, materialSuporte);

    //rodas  e eixos do carro
    const rodaDianteiraDireita = roda();
    const rodaTraseiraDireita = roda();
    const rodaDianteiraEsquerda = roda();
    const rodaTraseiraEsquerda = roda();
    const eixoFrontal = eixo();
    const eixoTraseiro = eixo();

    //escapamentos do carro
    geometryEscapamento = new THREE.CylinderGeometry(0.1, 0.19, 1.6, 15, 5);
    materialEscapamento = new THREE.MeshBasicMaterial({ color: 'black' });
    const escapamentoEsquerdo = new THREE.Mesh(geometryEscapamento, materialEscapamento);
    const escapamentoDireito = new THREE.Mesh(geometryEscapamento, materialEscapamento);

    scene.add(chassi);

    // inicializa os filhos da chassi
    createCarChild();

    // desliga o autoUpdate das matrizes
    desligarAutoUpdate();

    var mat4 = new THREE.Matrix4();

    // chama o identify para todas as matrizes
    resetMatrix()

    // posiciona o carro na posicao inicial
    carInicialPosition();

    //rotaciona os angulos das pecas
    rotate();

    // Listen window size changes
    window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);
    render();
	//variáveis que guardam qual foi última direção(frente ou trás) que o carro andou.
    var flagDesaceleracaoAutomatica = 0;
    var flagDesaceleracaoManual = 0;
	
    // variavel que controla o angulo de rotacao das rodas para elas nao girarem 360*
    var anguloX = 0;

    // uma constante para multiplicar o angulo do carro para rotacionar as rodas
    const anguloPadrao = 1.3;
    var inspect = false;
    //velocidade que o carro movimento no eixo Y
    var speed = 0.1;
	//informa qual a rotação máxima das rodas  dianteiras.
    var anguloEsquerdoMaximo = -0.4067366430758069;
    var anguloDireitoMaximo = 0.30192189559966865;
    
	//funcao principal que movimenta os carros
    function movimentacaoCarro() {
        keyboard.update();

        //rotaciona as rodas
        if (keyboard.pressed("left") && anguloX > anguloEsquerdoMaximo) {

            rodaDianteiraDireita.matrix.multiply(mat4.makeRotationZ(degreesToRadians(anguloPadrao)));
            rodaDianteiraEsquerda.matrix.multiply(mat4.makeRotationZ(degreesToRadians(anguloPadrao)));
            anguloX = rodaDianteiraDireita.matrix.elements[0] + 0.1;
        }
        if (keyboard.pressed("right") && anguloX < anguloDireitoMaximo) {

            rodaDianteiraDireita.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-anguloPadrao)));
            rodaDianteiraEsquerda.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-anguloPadrao)));
            anguloX = rodaDianteiraDireita.matrix.elements[0] - 0.1;

        }

		//altera o modo da câmera  
        if (keyboard.down("space")) changeCameraMode();

		//impede a movimentação do carro no modo inspeção. 
        if (inspect === false) {
            var position = new THREE.Vector3();
            var quaternion = new THREE.Quaternion();
            var scale = new THREE.Vector3();
            camera.matrixAutoUpdate = true;
            var rotX = Math.cos(anguloX);
            var rotZ = Math.sin(anguloX);
            var distance = 26.925824;
            chassi.matrixWorld.decompose(position, quaternion, scale);

            // o carro move para direcao do angulo em relacao a X
            if (keyboard.pressed("up")) {
                flagDesaceleracaoAutomatica = 1;
                if (speed > 0 && flagDesaceleracaoManual == 2) {
                    chassi.matrix.multiply(mat4.makeTranslation(degreesToRadians(-anguloX), -speed, 0));
                    chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(anguloX)));
                    speed = speed - 0.01;
                }

                if (speed <= 0.1) {
                    flagDesaceleracaoManual = 1;
                }

                if (flagDesaceleracaoManual == 1 && !keyboard.pressed("down")) {
                    chassi.matrix.multiply(mat4.makeTranslation(degreesToRadians(anguloX), speed, 0));
                    chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-anguloX)));
                    if (speed <= 2) {
                        speed = speed + 0.01;
                    }
                }
            }
            if (keyboard.pressed("down")) {
                flagDesaceleracaoAutomatica = 2;
                if (speed > 0 && flagDesaceleracaoManual == 1) {
                    chassi.matrix.multiply(mat4.makeTranslation(degreesToRadians(anguloX), speed, 0));
                    chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-anguloX)));
                    speed = speed - 0.01;
                }

                if (speed <= 0.1) {
                    flagDesaceleracaoManual = 2;
                }

                if (flagDesaceleracaoManual == 2 && !keyboard.pressed("up")) {
                    chassi.matrix.multiply(mat4.makeTranslation(degreesToRadians(-anguloX), -speed, 0));
                    chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(anguloX)));
                    if (speed <= 2) {
                        speed = speed + 0.01;
                    }
                }
            }

            //Desacelera o carro quando não estiver apertando o acelerador
            if (!keyboard.pressed("up") && !keyboard.pressed("down")) {
                if (speed >= 0.1 && flagDesaceleracaoAutomatica == 1) {
                    chassi.matrix.multiply(mat4.makeTranslation(degreesToRadians(anguloX), speed, 0));
                    chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-anguloX)));
                    speed = speed - 0.01;
                }

                if (speed >= 0.1 && flagDesaceleracaoAutomatica == 2) {
                    chassi.matrix.multiply(mat4.makeTranslation(degreesToRadians(-anguloX), -speed, 0));
                    chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(anguloX)));
                    speed = speed - 0.01;
                }

            }
			
            camera.lookAt(position);
            vetorCamera = position;
        }
    }

    function resetarCarro() {
        desligarAutoUpdate();
        resetMatrix();
        carInicialPosition();
        rotate();
    }
    //funcao que desliga o autoUpdate das partes do carro
    function desligarAutoUpdate() {
        //frente do carro
        frenteDoCarro.matrixAutoUpdate = false;
        conexaoFrontal.matrixAutoUpdate = false;
        asaEsquerdafrontal.matrixAutoUpdate = false;
        asaDireitoFrontal.matrixAutoUpdate = false;
        banco.matrixAutoUpdate = false;
        apoioBanco.matrixAutoUpdate = false;

        //meio do carro
        chassi.matrixAutoUpdate = false;
        ponteCentral.matrixAutoUpdate = false;
        arcoEsquerdo.matrixAutoUpdate = false;
        arcoDireito.matrixAutoUpdate = false;
        cabine.matrixAutoUpdate = false;
        volante.matrixAutoUpdate = false;
        apoioVolante.matrixAutoUpdate = false;

        //rodas e eixos
        rodaDianteiraDireita.matrixAutoUpdate = false;
        rodaTraseiraDireita.matrixAutoUpdate = false;
        rodaDianteiraEsquerda.matrixAutoUpdate = false;
        rodaTraseiraEsquerda.matrixAutoUpdate = false;
        rodaTraseiraEsquerda.matrixAutoUpdate = false;
        eixoFrontal.matrixAutoUpdate = false;
        eixoTraseiro.matrixAutoUpdate = false;

        //traseira
        wing.matrixAutoUpdate = false;
        leftWing.matrixAutoUpdate = false;
        rightWing.matrixAutoUpdate = false;
        suporteEsquerdoWing.matrixAutoUpdate = false;
        suporteDireitoWing.matrixAutoUpdate = false;
        escapamentoEsquerdo.matrixAutoUpdate = false;
        escapamentoDireito.matrixAutoUpdate = false;


    }

    // funcao que reseta a posicao das partes do carro
    function resetMatrix() {
        //meio do carro
        chassi.matrix.identity();
        arcoEsquerdo.matrix.identity();
        arcoDireito.matrix.identity();
        ponteCentral.matrix.identity();
        cabine.matrix.identity();
        volante.matrix.identity();
        apoioVolante.matrix.identity();


        //frente do carro
        frenteDoCarro.matrix.identity();
        conexaoFrontal.matrix.identity();
        asaEsquerdafrontal.matrix.identity();
        asaDireitoFrontal.matrix.identity();
        banco.matrix.identity();
        apoioBanco.matrix.identity();


        //traseira
        wing.matrix.identity();
        leftWing.matrix.identity();
        rightWing.matrix.identity();
        escapamentoEsquerdo.matrix.identity();
        escapamentoDireito.matrix.identity();
        suporteEsquerdoWing.matrix.identity();
        suporteDireitoWing.matrix.identity();

        //rodas e eixos
        rodaDianteiraDireita.matrix.identity();
        rodaTraseiraDireita.matrix.identity();
        rodaDianteiraEsquerda.matrix.identity();
        rodaTraseiraEsquerda.matrix.identity();
        eixoFrontal.matrix.identity();
        eixoTraseiro.matrix.identity();
    }

    // funcao que posiciona as partes inicais do carro
    function carInicialPosition() {
        //frente do carro
        asaEsquerdafrontal.matrix.multiply(mat4.makeTranslation(-2.3, 4.5, 0.6));
        asaDireitoFrontal.matrix.multiply(mat4.makeTranslation(2.3, 4.5, 0.6));
        banco.matrix.multiply(mat4.makeTranslation(0, 0, 0.3));
        apoioBanco.matrix.multiply(mat4.makeTranslation(0, -0.3, 0.5));
        frenteDoCarro.matrix.multiply(mat4.makeTranslation(0, 4.5, 0));
        conexaoFrontal.matrix.multiply(mat4.makeTranslation(0, 3.25, 0.6));


        //meio do carro
        chassi.matrix.multiply(mat4.makeTranslation(0, 0, 1));
        cabine.matrix.multiply(mat4.makeTranslation(0, 0, 0.2));
        volante.matrix.multiply(mat4.makeTranslation(0, 1.2, 0.6));
        apoioVolante.matrix.multiply(mat4.makeTranslation(0, 1.7, 0.6));
        ponteCentral.matrix.multiply(mat4.makeTranslation(0, 0.2, 0));
        arcoEsquerdo.matrix.multiply(mat4.makeTranslation(-0.6, 0.2, 0));
        arcoDireito.matrix.multiply(mat4.makeTranslation(0.6, 0.2, 0));


        //traseira do carro
        wing.matrix.multiply(mat4.makeTranslation(0, -2, 1.5));
        rightWing.matrix.multiply(mat4.makeTranslation(2, -2, 1.5));
        leftWing.matrix.multiply(mat4.makeTranslation(-2, -2, 1.5));
        escapamentoEsquerdo.matrix.multiply(mat4.makeTranslation(-0.4, -1.9, 0));
        escapamentoDireito.matrix.multiply(mat4.makeTranslation(0.4, -1.9, 0));
        suporteEsquerdoWing.matrix.multiply(mat4.makeTranslation(-0.5, -2, 0.76));
        suporteDireitoWing.matrix.multiply(mat4.makeTranslation(0.5, -2, 0.76));

        //rodas e eixo
        eixoFrontal.matrix.multiply(mat4.makeTranslation(0, 3.2, 0));
        eixoTraseiro.matrix.multiply(mat4.makeTranslation(0, -2, 0));
        rodaDianteiraDireita.matrix.multiply(mat4.makeTranslation(-1.7, 3.2, 0));
        rodaTraseiraDireita.matrix.multiply(mat4.makeTranslation(1.7, -2, 0));
        rodaDianteiraEsquerda.matrix.multiply(mat4.makeTranslation(1.7, 3.2, 0));
        rodaTraseiraEsquerda.matrix.multiply(mat4.makeTranslation(-1.7, -2, 0));
    }

    // funcao que cria os filhos da Chassi para o carro mover junto
    function createCarChild() {

        //frente do carro
        chassi.add(frenteDoCarro);
        chassi.add(conexaoFrontal);
        chassi.add(asaEsquerdafrontal);
        chassi.add(asaDireitoFrontal);
        chassi.add(banco);
        chassi.add(apoioBanco);

        //meio do carro
        chassi.add(cabine);
        chassi.add(volante);
        chassi.add(apoioVolante);
        chassi.add(arcoEsquerdo);
        chassi.add(arcoDireito);
        chassi.add(ponteCentral);

        //traseira do carro
        chassi.add(wing);
        chassi.add(leftWing);
        chassi.add(rightWing);
        chassi.add(suporteEsquerdoWing);
        chassi.add(suporteDireitoWing);
        chassi.add(escapamentoEsquerdo);
        chassi.add(escapamentoDireito);

        //rodas e eeixo
        chassi.add(rodaDianteiraDireita);
        chassi.add(rodaTraseiraDireita);
        chassi.add(rodaDianteiraEsquerda);
        chassi.add(rodaTraseiraEsquerda);
        chassi.add(eixoFrontal);
        chassi.add(eixoTraseiro);
        
		//câmera 
		chassi.add(camera);
    }


    // funcao que rotaciona o angulo das pecas para formar o carro
    function rotate() {
        //frente do carro
        asaEsquerdafrontal.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
        asaDireitoFrontal.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
        banco.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
        apoioBanco.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
        frenteDoCarro.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));

        //meio do carro
        arcoEsquerdo.matrix.multiply(mat4.makeRotationZ(degreesToRadians(94)));
        arcoDireito.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-86)));
        ponteCentral.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));

        //traseira do carro
        leftWing.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
        rightWing.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
        suporteEsquerdoWing.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
        suporteDireitoWing.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));

        //rodas e eeixo
        rodaDianteiraDireita.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
        rodaTraseiraDireita.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
        rodaDianteiraEsquerda.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
        rodaTraseiraEsquerda.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
        eixoFrontal.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)))
        eixoTraseiro.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
    }


    // funcao que cria as rodas do carro
    function roda() {
        const cylinderGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.7, 17);
        const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(50,50,50)' });
        const roda = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        return roda;

    }

    // funcao que cria o eixo
    function eixo() {
        var cylinderGeometry = new THREE.CylinderGeometry(0.07, 0.07, 3, 10);
        var cylinderMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(255,255,0)' });
        var eixo = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        return eixo;
    }

    function cubo(width, height, depth, color) {
        var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
        var planeMaterial = new THREE.MeshPhongMaterial({ color: color });
        var cubo = new THREE.Mesh(cubeGeometry, planeMaterial);
        return cubo;
    }

	//altera a câmera para o modo inspeção 
    function cameraModoInspecao() {
        inspect = true;
        chassi.remove(camera);
        trackballControls = initTrackballControls(camera, renderer);
        chassi.remove(cubeAxesHelper);
        camera.position.x = -15;
        camera.position.y = 15;
        camera.position.z = 15;

        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 1;
        scene.remove(plane);
        scene.remove(line);
        resetarCarro();
    }

	//altera a câmera para o modo jogo 
    function cameraModoJogo() {
        
        inspect = false;
        speed = 0;
        anguloX = 0;
        chassi.add(cubeAxesHelper);
        scene.add(plane);
        scene.add(line);
        camera = changeCamera(new THREE.Vector3(0, -25, 10));
        resetarCarro();
        chassi.add(camera);
       }

	// controla o modo da câmera 
    function changeCameraMode() {
        if (inspect === true) {
            cameraModoJogo();
        }
        else {
            cameraModoInspecao();
        }
    }
    function showInformation() {
        // Use this to show information onscreen
        controls = new InfoBox();
        controls.addParagraph();
        controls.add("Use keyboard arrows to move the chassi.");
        controls.add("Press '< and '>' to rotate Wheels.");
        controls.add("Press Space to change between modes");
        controls.show();
    }


    function render() {
        stats.update(); // Update FPS
        if (inspect === true)
            trackballControls.update();
        movimentacaoCarro();
        lightFollowingCamera(light, camera);
        requestAnimationFrame(render);
        renderer.render(scene, camera); // Render scene
    }

    //configurações da câmera do jogo
    function changeCamera(initialPosition) {
        var position = initialPosition;
        var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.copy(position);
        camera.up.set(0, 0, 1);
        return camera;
    }
}