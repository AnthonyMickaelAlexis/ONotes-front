import Matter from 'matter-js';
import getRandomInt from '../getRandomInt';

function startAnimation(scene) {
  const sceneWidth = scene.clientWidth;
  const sceneHeight = scene.clientHeight;

  // module aliases
  const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;
  
  // create an engine
  const engine = Engine.create();
  
  // create a renderer
  const render = Render.create({
    element: scene,
    engine: engine,
    options: {
      width: sceneWidth,
      height: sceneHeight,
      wireframes: false,
      background: 'transparent'
    }
  });

  // Create tag boxes
  const tags = document.querySelectorAll(".falling-tag");
  const tagBodies = [...tags].map((tag) => {
    const tagWidth = tag.offsetWidth;
    const tagHeight = tag.offsetHeight;
    const angle = getRandomInt(-5, 5) / 10;
    const x = getRandomInt(sceneWidth / 4, sceneWidth / 4 * 3);
    const y = getRandomInt(-500, -100);
    const frictionAir = getRandomInt(10, 40) / 1000;

    return {
      body: Matter.Bodies.rectangle(x, y, tagWidth, tagHeight, {
        render: {
          fillStyle: "transparent"
        },
        chamfer: {
          radius: 14
        },
        angle,
        friction: 1,
        frictionAir
      }),
      elem: tag,
      render() {
        const { x, y } = this.body.position;
        this.elem.style.top = `${y - tagHeight / 2}px`;
        this.elem.style.left = `${x - tagWidth / 2}px`;
        this.elem.style.transform = `rotate(${this.body.angle}rad) translateY(3px)`;
      }
    };
  });

  const leftWall = Bodies.rectangle(0, 0, 1, sceneHeight * 2, {isStatic: true, render: { opacity: 0 }});
  const rightWall = Bodies.rectangle(sceneWidth, 0, 1, sceneHeight * 2, {isStatic: true, render: { opacity: 0 }});
  const ground = Bodies.rectangle(0, sceneHeight, sceneWidth * 2, 1, { isStatic: true, render: { opacity: 0 }});

  // add all of the bodies to the world
  Composite.add(engine.world, [...tagBodies.map((box) => box.body), leftWall, rightWall, ground]);

  // run the renderer
  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);

  (function rerender() {
    tagBodies.forEach((element) => {
      element.render();
    });
    Matter.Engine.update(engine);
    requestAnimationFrame(rerender);
  })();
}

export default startAnimation;
