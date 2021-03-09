function main() {
    var stats = initStats();          // To show FPS information
    var scene = new THREE.Scene();    // Create main scene
    var renderer = initRenderer();    // View function in util/utils
    var camera = changeCamera(new THREE.Vector3(0, -25, 10));// Init camera in this position
    var dirLight = new THREE.DirectionalLight(lightColor);
	var light = setDirectionalLighting(scene, new THREE.Vector3(200, 50, 50));
    var spotLight = new THREE.SpotLight(lightColor);
    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
	var MatrixGlobal = new THREE.Matrix4();
	var group = new THREE.Group();
	var lightColor = "rgb(255,255,255)";
	var luzPoste08;
	var luzPoste07;
    var luzPoste06;
	var luzPoste05;
	var luzPoste04;
	var luzPoste03;
	var luzPoste02;
	var luzPoste01;
	var modoCamera = 2;
    // Show text information onscreen
    showInformation();
	const geometryCamera = new THREE.BoxGeometry( 1, 1, 1 );
	const materialCamera = new THREE.MeshPhongMaterial( {color: 0xDCDCDC} );
	const cubeCamera = new THREE.Mesh( geometryCamera, materialCamera );
	
	

    // To use the keyboard
    var keyboard = new KeyboardState();
	//var plane = criarPlano(700.0, 700.5);
	
	var gcolor = "rgb(200,200,200)";
	var planeGeometry = new THREE.PlaneGeometry(700.0, 700.5, 400, 400);
	var planeMaterial = new THREE.MeshLambertMaterial({color:gcolor, side:THREE.DoubleSide});
	//  var planeMaterial = new THREE.MeshLambertMaterial({color:"rgb(255,0,0)", side:THREE.DoubleSide});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	scene.add(plane);
	
	/*var wireframe = new THREE.WireframeGeometry(planeGeometry);
    var line = new THREE.LineSegments(wireframe);
    line.material.color.setStyle("rgb(0, 0, 0)");
    scene.add(line);*/

	

    // Enable mouse rotation, pan, zoom etc.
    /*var planeGeometry = new THREE.PlaneGeometry(400.0, 200.5, 10, 10);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
    var planeMaterial = new THREE.MeshPhongMaterial({
        color: "rgb(200,200,200)",
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
    });
	scene.add(plane);
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
    scene.add(plane);

    var wireframe = new THREE.WireframeGeometry(planeGeometry);
    var line = new THREE.LineSegments(wireframe);
    line.material.color.setStyle("rgb(180, 180, 180)");
    scene.add(line);*/
	
	//scene.add(ambientLight);

    // cabine e parte central do carro
    const chassi = cubo(2, 4.7, 0.5, 'rgb(255,255,255)');
    const cabine = cubo(1.5, 2, 0.2, 'rgb(92,88,88)');
    var geometryTorus = new THREE.TorusGeometry(1.6, 0.25, 30, 3, 3);
    var materialTorus = new THREE.MeshPhongMaterial({ color: 'white' });
    const arcoEsquerdo = new THREE.Mesh(geometryTorus, materialTorus);
    const arcoDireito = new THREE.Mesh(geometryTorus, materialTorus);
    const ponteCentral = cubo(1.5, 3.9, 0.4, 'blue');
    materialVolante = new THREE.MeshPhongMaterial({ color: 'black' });
    geometryVolante = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 10);
    const volante = new THREE.Mesh(geometryVolante, materialVolante);
    geometryApoioVolante = new THREE.CylinderGeometry(0.1, 0.1, 1, 10);
    const apoioVolante = new THREE.Mesh(geometryApoioVolante, materialVolante);
    const banco = cubo(0.1, 0.7, 0, 'rgb(0,255,0)');
    const apoioBanco = cubo(0, 0.7, 0.1, 'rgb(0,255,0)');

    //peças da frente do carro
    const frenteDoCarro = cubo(1, 4.7, 0.5, 'rgb(255,255,255)');
    const conexaoFrontal = cubo(0.8, 3.49, 0.7, 'rgb(0,0,255)');
    const asaEsquerdafrontal = cubo(0.7, 1, 0.1, 'rgb(0,255,0)');
    const asaDireitoFrontal = cubo(0.7, 1, 0.1, 'rgb(0,255,0)');


    // aerofolio do carro
    const wing = cubo(4, 0.6, 0.2, 'rgb(0,0,255)');
    const leftWing = cubo(0.5, 0.8, 0.05, 'rgb(0,255,0)');
    const rightWing = cubo(0.5, 0.8, 0.05, 'rgb(0,255,0)');
    var geometrySuporte = new THREE.CylinderGeometry(0.1, 0.19, 1.6, 3, 5);
    var materialSuporte = new THREE.MeshPhongMaterial({ color: 'black' });
    const suporteEsquerdoWing = new THREE.Mesh(geometrySuporte, materialSuporte);
    const suporteDireitoWing = new THREE.Mesh(geometrySuporte, materialSuporte);

    //rodas  e eixos do carro
    const rodaDianteiraDireita = roda();
    const rodaTraseiraDireita = roda();
    const rodaDianteiraEsquerda = roda();
    const rodaTraseiraEsquerda = roda();

	

	var mat42 = new THREE.Matrix4();	
	//constrói os postes da tela 
	const poste08 = poste();
	poste08.matrix.multiply(mat42.makeTranslation(-120, 0, 0));
	poste08.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-270)));
	luzPoste08 = poste08.getObjectByName('LuzPoste');
	scene.add(poste08);
  
	
	const poste07 = poste();
	poste07.matrix.multiply(mat42.makeTranslation(90, 150, 0));
	poste07.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-270)));
	luzPoste07 = poste07.getObjectByName('LuzPoste');
	scene.add(poste07);
	
	const poste06 = poste();
	poste06.matrix.multiply(mat42.makeTranslation(-230, 280, 0));
	poste06.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-270)));
	luzPoste06 = poste06.getObjectByName('LuzPoste');
	scene.add(poste06);
	
	const poste05 = poste();
	poste05.matrix.multiply(mat42.makeTranslation(230, 310, 0));
	poste05.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-90)));
	luzPoste05 = poste05.getObjectByName('LuzPoste');
	scene.add(poste05);
	
	
	const poste04 = poste();
	poste04.matrix.multiply(mat42.makeTranslation(110, -200, 0));
	poste04.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-180)));
	luzPoste04 = poste04.getObjectByName('LuzPoste');
	scene.add(poste04);
	
	const poste03 = poste();
	poste03.matrix.multiply(mat42.makeTranslation(10, -200, 0));
	poste03.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-180)));
	luzPoste03 = poste03.getObjectByName('LuzPoste');
	scene.add(poste03);
	
	const poste02 = poste();
	poste02.matrix.multiply(mat42.makeTranslation(-90, -200, 0));
	poste02.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-180)));
	luzPoste02 = poste02.getObjectByName('LuzPoste');
	scene.add(poste02); 

	
	const poste01 = poste();
	poste01.matrix.multiply(mat42.makeTranslation(-190, -200, 0));
	poste01.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-180)));
    luzPoste01 = poste01.getObjectByName('LuzPoste');
	scene.add(poste01);
    
	
    const eixoFrontal = eixo();
    const eixoTraseiro = eixo();
    var cylinderGeometry = new THREE.CylinderGeometry(0.07, 0.07, 1.5, 10);
    var cylinderMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(255,255,0)' });
    const suporteEixoFrontalDireito = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    const suporteeixoFrontalEsquerdo = new THREE.Mesh(cylinderGeometry, cylinderMaterial);


    //escapamentos do carro
    geometryEscapamento = new THREE.CylinderGeometry(0.1, 0.19, 1.6, 15, 5);
    materialEscapamento = new THREE.MeshPhongMaterial({ color: 'black' });
    const escapamentoEsquerdo = new THREE.Mesh(geometryEscapamento, materialEscapamento);
    const escapamentoDireito = new THREE.Mesh(geometryEscapamento, materialEscapamento);
	chassi.castShadow = true;
	chassi.matrix.identity();
	
	
	scene.add(chassi);
    
	// inicializa os filhos da chassi
    createCarChild();

    // desliga o autoUpdate das matrizes
    desligarAutoUpdate();
	
	//liga a sombra nas partes do carro 
	ligarSombraCarro();
	
	//configura a luz que segue o carro
	setSpotLight();

    var mat4 = new THREE.Matrix4();
	

    // chama o identify para todas as matrizes
    resetMatrix()

    // posiciona o carro na posicao inicial
    carInicialPosition();
	chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-90)));
	chassi.matrix.multiply(mat42.makeTranslation(190, -35, 0));


    //rotaciona os angulos das pecas
    rotate();


    // Listen window size changes
    window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);
    render();
    //variáveis que guardam qual foi última direção(frente ou trás) que o carro andou.
    var flagDesaceleracaoAutomatica = 0;
    var flagDesaceleracaoManual = 0;
	var flagVirandoparaEsquerda = 0;
	var flagVirandoparaDireita = 0;

    // variavel que controla o angulo de rotacao das rodas para elas nao girarem 360* tambem direciona o angulo de rotacao do eixo X
    var anguloX = 0;

    // uma constante para multiplicar o angulo do carro para rotacionar as rodas
    const anguloPadrao = 1.3;

    //flag para verificar se esta no modo de inspecao
    var inspect = false;
    //velocidade que o carro movimento no eixo Y
    var speed = 0.1;
    //informa qual a rotação máxima das rodas  dianteiras.
    var anguloEsquerdoMaximo = -0.4067366430758069;
    var anguloDireitoMaximo = 0.30192189559966865;
	
	
	function ligarSombraCarro()
	{
		//frente do carro
		arcoEsquerdo.castShadow = true;
		arcoDireito.castShadow = true;
		ponteCentral.castShadow = true;
		cabine.matrix.castShadow = true;
		volante.matrix.castShadow = true;
		apoioVolante.castShadow = true;

		//frente do carro
		frenteDoCarro.castShadow = true;
		conexaoFrontal.castShadow = true;
		asaEsquerdafrontal.castShadow = true;
		asaDireitoFrontal.castShadow = true;
		banco.castShadow = true;
		apoioBanco.castShadow = true;

		//traseira
		wing.castShadow = true;
		leftWing.castShadow = true;
		rightWing.castShadow = true;
		escapamentoEsquerdo.castShadow = true;
		escapamentoDireito.castShadow = true;
		suporteEsquerdoWing.castShadow = true;
		suporteDireitoWing.castShadow = true;

		//rodas e eixos
		rodaDianteiraDireita.castShadow = true;
		rodaTraseiraDireita.castShadow = true;
		rodaDianteiraEsquerda.castShadow = true;
		rodaTraseiraEsquerda.castShadow = true;
		eixoFrontal.matrix.castShadow = true;
		suporteEixoFrontalDireito.castShadow = true;
		suporteeixoFrontalEsquerdo.castShadow = true;
		eixoTraseiro.castShadow = true;	
	}
	
	//configura a luz direcional
	function setDirectionalLighting(scene, initialPosition) 
	{
	dirLight.position.copy(initialPosition);
    dirLight.castShadow = false;
	dirLight.intensity = 1;
    scene.add(dirLight);
    return dirLight;
	}
	
 
    function setSpotLight()
   {	   
	spotLight.position.copy(new THREE.Vector3(0, 0, 15));
    spotLight.distance = 30;
    spotLight.decay = 2;
    //spotLight.penumbra = 0.05;
	spotLight.angle = 2;
	spotLight.penumbra = 0.1
	spotLight.intensity = 5;
	spotLight.visible = true;
    }    
	
    
    //funcao principal que movimenta os carros
    function movimentacaoCarro() {
        keyboard.update();
        //rotaciona as rodas
        if (keyboard.pressed("left") && anguloX > anguloEsquerdoMaximo) {

            rodaDianteiraDireita.matrix.multiply(mat4.makeRotationZ(degreesToRadians(anguloPadrao)));
            rodaDianteiraEsquerda.matrix.multiply(mat4.makeRotationZ(degreesToRadians(anguloPadrao)));
            anguloX = rodaDianteiraDireita.matrix.elements[0] + 0.1;
			flagVirandoparaEsquerda = 1;
			flagVirandoparaDireita = 0;
        }
        if (keyboard.pressed("right") && anguloX < anguloDireitoMaximo) {

            rodaDianteiraDireita.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-anguloPadrao)));
            rodaDianteiraEsquerda.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-anguloPadrao)));
            anguloX = rodaDianteiraDireita.matrix.elements[0] - 0.1;
			flagVirandoparaDireita = 1;
			flagVirandoparaEsquerda = 0;
        }
		
		if(!keyboard.pressed("left") && flagVirandoparaEsquerda == 1 && anguloX <= 0)
		{
			
			rodaDianteiraDireita.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-anguloPadrao)));
            rodaDianteiraEsquerda.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-anguloPadrao)));
			anguloX = rodaDianteiraDireita.matrix.elements[0] - 0.1;
		}
		
		if(!keyboard.pressed("right") && flagVirandoparaDireita == 1 && anguloX >= 0)
		{		
			rodaDianteiraDireita.matrix.multiply(mat4.makeRotationZ(degreesToRadians(anguloPadrao)));
            rodaDianteiraEsquerda.matrix.multiply(mat4.makeRotationZ(degreesToRadians(anguloPadrao)));
            anguloX = rodaDianteiraDireita.matrix.elements[0] + 0.1;
		}

        //altera o modo da câmera  
        if (keyboard.down("space")) changeCameraMode();

        //impede a movimentação do carro no modo inspeção. 
        if (inspect === false) {
			//console.log("1");
			
            var position = new THREE.Vector3();
            var quaternion = new THREE.Quaternion();
            var scale = new THREE.Vector3();
            camera.matrixAutoUpdate = true;
            var rotX = Math.cos(anguloX);
            var rotZ = Math.sin(anguloX);
            var distance = 26.925824;
            chassi.matrixWorld.decompose(position, quaternion, scale);
			window.addEventListener('wheel', onMouseWheel, true);
            // o carro move para direcao do angulo em relacao a X
            if (keyboard.pressed("up")) {
				
                flagDesaceleracaoAutomatica = 1;
                if (speed > 0 && flagDesaceleracaoManual == 2) {
                    chassi.matrix.multiply(mat4.makeTranslation(degreesToRadians(-anguloX), -speed, 0));
                    chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(anguloX*3)));
                    speed = speed - 0.01;
                }

                if (speed <= 0.1) {
                    flagDesaceleracaoManual = 1;
                }

                if (flagDesaceleracaoManual == 1 && !keyboard.pressed("down")) {
                    chassi.matrix.multiply(mat4.makeTranslation(degreesToRadians(anguloX), speed, 0));
                    chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-anguloX*3)));
                    if (speed <= 2) {
                        speed = speed + 0.01;
                    }
                }
            }
            if (keyboard.pressed("down")) {
				
                flagDesaceleracaoAutomatica = 2;
                if (speed > 0 && flagDesaceleracaoManual == 1) {
                    chassi.matrix.multiply(mat4.makeTranslation(degreesToRadians(anguloX), speed, 0));
                    chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-anguloX*3)));
                    speed = speed - 0.01;
                }

                if (speed <= 0.1) {
                    flagDesaceleracaoManual = 2;
                }

                if (flagDesaceleracaoManual == 2 && !keyboard.pressed("up")) {
                    chassi.matrix.multiply(mat4.makeTranslation(degreesToRadians(-anguloX), -speed, 0));
                    chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(anguloX*3)));
                    if (speed <= 2) {
                        speed = speed + 0.01;
                    }
                }
            }

            //Desacelera o carro quando não estiver apertando o acelerador
            if (!keyboard.pressed("up") && !keyboard.pressed("down")) {
                if (speed >= 0.1 && flagDesaceleracaoAutomatica == 1) {
                    chassi.matrix.multiply(mat4.makeTranslation(degreesToRadians(anguloX), speed, 0));
                    chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-anguloX*3)));
                    speed = speed - 0.007;
                }

                if (speed >= 0.1 && flagDesaceleracaoAutomatica == 2) {
                    chassi.matrix.multiply(mat4.makeTranslation(degreesToRadians(-anguloX), -speed, 0));
                    chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(anguloX*3)));
                    speed = speed - 0.007;
                }

            }
				
			if(modoCamera === 2 )
			{
				console.log("cvp");
				console.log(modoCamera);
				camera.lookAt(position);	
			}
            //camera.lookAt(position);
			MatrixGlobal.copy(chassi.matrix);
			
        }
    }

    //reseta o carro para posicao inicial
    function resetarCarro() {
		 var mat4 = new THREE.Matrix4(); 
		 desligarAutoUpdate();
         resetMatrix();
		 if(inspect === false)
		 {
			 carInicialPosition();				 
			 chassi.matrix.copy(MatrixGlobal);	
		 }
		 else
		 {
			carInicialPosition();							
		 }
         
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
        suporteEixoFrontalDireito.matrixAutoUpdate = false;
        suporteeixoFrontalEsquerdo.matrixAutoUpdate = false;
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
        suporteEixoFrontalDireito.matrix.identity();
        suporteeixoFrontalEsquerdo.matrix.identity();
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
        suporteEixoFrontalDireito.matrix.multiply(mat4.makeTranslation(1, 3.2, 0.2));
        suporteeixoFrontalEsquerdo.matrix.multiply(mat4.makeTranslation(-1, 3.2, 0.2));
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
        chassi.add(suporteEixoFrontalDireito);
        chassi.add(suporteeixoFrontalEsquerdo);
        chassi.add(eixoTraseiro);

        //câmera 
        chassi.add(camera);
		
		//luz 
		chassi.add(spotLight);

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

        //rodas e eixo
        rodaDianteiraDireita.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
        rodaTraseiraDireita.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
        rodaDianteiraEsquerda.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
        rodaTraseiraEsquerda.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
        eixoFrontal.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)))
        suporteEixoFrontalDireito.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)))
        suporteEixoFrontalDireito.matrix.multiply(mat4.makeRotationX(degreesToRadians(30)))
        suporteeixoFrontalEsquerdo.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)))
        suporteeixoFrontalEsquerdo.matrix.multiply(mat4.makeRotationX(degreesToRadians(-30)))
        eixoTraseiro.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
    }


    // funcao que cria as rodas do carro
    function roda() {
        const cylinderGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.7, 17);
        const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(50,50,50)' });
        const roda = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        return roda;

    }
	
	// função que cria os postes
	function poste()
	{ 
	   
	  //base do poste
	  var mat4 = new THREE.Matrix4();
	  var position = new THREE.Vector3();
      var quaternion = new THREE.Quaternion();
      var scale = new THREE.Vector3();
	  const geometry = new THREE.BoxGeometry( 1, 1, 0.5 );
	  const material = new THREE.MeshPhongMaterial( {color: 0xDCDCDC} );
	  const cube = new THREE.Mesh( geometry, material );
	  cube.matrixAutoUpdate = false;
	  cube.matrix.multiply(mat4.makeTranslation(0, 0, 0));
      cube.castShadow = true;		
	  

	  const geometry2 = new THREE.ConeGeometry( 0.5, 0.5, 32 );
	  const material2 = new THREE.MeshPhongMaterial( {color: 0x1C1C1C} );
	  const cone = new THREE.Mesh( geometry2, material2 );
	  cone.matrixAutoUpdate = false;
	  cone.matrix.multiply(mat4.makeTranslation(0, 0, 0.3));
	  cone.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	  cone.castShadow = true;	

	  const geometry3 = new THREE.CylinderGeometry( 0.3, 0.3, 2, 32 );
	  const material3 = new THREE.MeshPhongMaterial( {color: 0xDCDCDC} );
	  const cylinder3 = new THREE.Mesh( geometry3, material3 );
	  cylinder3.matrixAutoUpdate = false;
	  cylinder3.matrix.multiply(mat4.makeTranslation(0, 0, 1.2));
	  cylinder3.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	  cylinder3.castShadow = true;		
	  
	  const geometry4 = new THREE.ConeGeometry( 0.31, 0.31, 32 );
	  const material4 = new THREE.MeshPhongMaterial( {color: 0x1C1C1C} );
	  const cone2 = new THREE.Mesh( geometry4, material4 );
	  cone2.matrixAutoUpdate = false;
	  cone2.matrix.multiply(mat4.makeTranslation(0, 0, 2.35));
	  cone2.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
      cone2.castShadow = true;  
	  
	  // corpo poste 
	  const geometry5 = new THREE.CylinderGeometry( 0.1, 0.1, 4, 32 );
	  const material5 = new THREE.MeshPhongMaterial( {color: 0xDCDCDC} );
	  const cylinder4 = new THREE.Mesh( geometry5, material5 );
	  cylinder4.matrixAutoUpdate = false;
	  cylinder4.matrix.multiply(mat4.makeTranslation(0, 0, 4.2));
	  cylinder4.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	  cylinder4.castShadow = true;

	  // base segura lampada
	  const geometry6 = new THREE.CylinderGeometry( 0.1, 0.1, 3, 32 );
	  const material6 = new THREE.MeshPhongMaterial( {color: 0xDCDCDC} );
	  const cylinder5 = new THREE.Mesh( geometry5, material5 );
	  cylinder5.matrixAutoUpdate = false;
	  cylinder5.matrix.multiply(mat4.makeTranslation(0, -1.7, 7));
	  cylinder5.matrix.multiply(mat4.makeRotationX(degreesToRadians(150)));
	  cylinder5.castShadow = false;

	  //bocal lampada	
	  const geometry7 = new THREE.BoxGeometry( 0.5, 0.5, 0.2 );
	  const material7 = new THREE.MeshPhongMaterial( {color: 0xDCDCDC} );
	  const cube2 = new THREE.Mesh( geometry7, material7 );
	  cube2.matrixAutoUpdate = false;
	  cube2.matrix.multiply(mat4.makeTranslation(0, -3.6, 8.1));
	  cube2.matrix.multiply(mat4.makeRotationX(degreesToRadians(150)));
	  cube2.castShadow = true;
	  
	  //lampada
	  const geometry8 = new THREE.SphereBufferGeometry(0.25, 32, 32, 0, 2*Math.PI, 0, 0.5 * Math.PI);
	  const material8 = new THREE.MeshPhongMaterial( {color: 0xffff00} );
	  const sphere = new THREE.Mesh( geometry8, material8 );
	  sphere.matrixAutoUpdate = false;
	  sphere.matrix.multiply(mat4.makeTranslation(0, -3.6, 8.15));
	  sphere.matrix.multiply(mat4.makeRotationX(degreesToRadians(-90)));
	  sphere.castShadow = true;
	  	  
	  var luzLampada = new THREE.SpotLight(lightColor);
	  luzLampada.matrixAutoUpdate = false;
      setLuzLampada(luzLampada);
	
      cube.add(cylinder4);
	  cube.add(cone);
	  cube.add(cylinder3);
	  cube.add(cone2);
	  cube.add(cylinder5);
	  cube.add(cube2);
	  cube.add(sphere);
	  sphere.add(luzLampada);
	  sphere.add(luzLampada.target);
	  return cube;
       		
	}
	
	//configura a luz do poste
	function setLuzLampada(pointLight)
	{
			
		pointLight.shadow.mapSize.width = 2048;
        pointLight.shadow.mapSize.height = 2048;
        pointLight.shadow.camera.fov = degreesToRadians(20);
        pointLight.castShadow = true;
        pointLight.decay = 2;
        pointLight.penumbra = 0.68;
		pointLight.focus = 1;
		pointLight.angle = 1.3;
		pointLight.target.position.set(0, 10, 1);
        pointLight.target.updateMatrixWorld();
		pointLight.name = "LuzPoste";
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
		apoioBanco.remove(cubeCamera);
        trackballControls = initTrackballControls(camera, renderer);
		camera.position.x = -15;
        camera.position.y = 15;
        camera.position.z = 15;

        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 1;
        scene.remove(plane);
		scene.remove(poste08);
		scene.remove(poste07);
		scene.remove(poste06);
		scene.remove(poste05);
		scene.remove(poste04);
		scene.remove(poste03);
		scene.remove(poste02);
		scene.remove(poste01);		
        //scene.remove(line);
        resetarCarro();
    }

    //altera a câmera para o modo jogo 
    function cameraModoJogo() {

        inspect = false;
		apoioBanco.remove(cubeCamera);
        speed = 0;
        anguloX = 0;
        scene.add(plane);
        //scene.add(line);
        camera = changeCamera(new THREE.Vector3(0, -25, 10));
        resetarCarro();
        chassi.add(camera);
		scene.add(poste08);
		scene.add(poste07);
		scene.add(poste06);
		scene.add(poste05);
		scene.add(poste04);
		scene.add(poste03);
		scene.add(poste02);
		scene.add(poste01);		
    }
	
	 function cameraModoCockpit() 
	{
		chassi.remove(camera);
        camera = changeCamera(new THREE.Vector3(0, 0.8, 0.4));
		
		/*const geometry7 = new THREE.BoxGeometry( 1, 1, 1 );
		const material7 = new THREE.MeshPhongMaterial( {color: 0xDCDCDC} );
		const cube2 = new THREE.Mesh( geometry7, material7 );*/
		//camera.position.set(0, 2, -5);
        //camera.lookAt(new THREE.Vector3(0, 250, 0));
		cubeCamera.add(camera);
		apoioBanco.add(cubeCamera);
	    /*camera.position.copy(new THREE.Vector3(0, -2, 2));			  
			  console.log("2B")	
			  camera.fov = 40;
		      camera.updateProjectionMatrix();*/	 
		 
	}

    // controla o modo da câmera 
    function changeCameraMode() {
        if (inspect === true && modoCamera === 1 ) {
            cameraModoJogo();
			modoCamera = 2;
			console.log("1A")
        }
        else {
			if(modoCamera === 2)
			{
			  cameraModoCockpit();				 
			  modoCamera = 3	
			}
			else
			{
			console.log("3C")	
			modoCamera = 1;
            cameraModoInspecao();			
			}
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
		
        //lightFollowingCamera(light, camera);
        requestAnimationFrame(render);		
        renderer.render(scene, camera); // Render scene
    }
	
	function onMouseWheel(event) 
	{
		if(modoCamera === 2)
		{			
			event.preventDefault();
			camera.fov += event.deltaY / 100;
			camera.updateProjectionMatrix();
			//camera.updateProjectionMatrix();
			//camera.position.z += event.deltaY / 1000;
			//camera.position.clampScalar(0, 100);

			/*event.preventDefault();
			var teste = event.deltaY * 0.05;
			console.log(teste);*/
		}
	}


    //configurações da câmera do jogo
    function changeCamera(initialPosition) {
        var position = initialPosition;
        var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.copy(position);
        camera.up.set(0, 0, 1);
        return camera;
    }

	//controla as luzes do cenário
	var controls = new function ()
    {
      this.viewDirecional = true;
      this.lightDirecional = function(){
      dirLight.visible = this.viewDirecional;
      };
	  
	  this.viewPoste = true;
      this.lightPoste = function(){
      luzPoste01.visible = this.viewPoste;
	  luzPoste02.visible = this.viewPoste;
	  luzPoste03.visible = this.viewPoste;
	  luzPoste04.visible = this.viewPoste;
	  luzPoste05.visible = this.viewPoste;
	  luzPoste06.visible = this.viewPoste;
	  luzPoste07.visible = this.viewPoste;
	  luzPoste08.visible = this.viewPoste;
      };
	  
	  this.viewCarro = true;
      this.lightCarro = function(){
      spotLight.visible = this.viewCarro;
      };
	  
	  spotLight
	}

	//Chamam as funcionalidades que controlam as luzes do cenário	
	var gui = new dat.GUI();
	gui.add(controls, 'viewDirecional', true)
    .name("Luz Direcional")
    .onChange(function(e) { controls.lightDirecional() });
	gui.add(controls, 'viewPoste', true)
    .name("Luz Poste")
    .onChange(function(e) { controls.lightPoste() });
	gui.add(controls, 'viewCarro', true)
    .name("Luz Carro")
    .onChange(function(e) { controls.lightCarro() });
	
	
	function criarPlano(width, height, gcolor = null)
	{
	  if(!gcolor) gcolor = "rgb(200,200,200)";
	  // create the ground plane
	  var planeGeometry = new THREE.PlaneGeometry(width, height, 400, 400);
	  var planeMaterial = new THREE.MeshLambertMaterial({color:gcolor, side:THREE.DoubleSide});
	//  var planeMaterial = new THREE.MeshLambertMaterial({color:"rgb(255,0,0)", side:THREE.DoubleSide});
	  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	  plane.receiveShadow = true;
	  return plane;
	}
	
	
	
}