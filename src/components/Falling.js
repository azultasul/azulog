import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import Link from 'next/link'
import Image from 'next/image'
// import githubImage from '~/assets/images/hotline.png';
import styled from  'styled-components';

const WordStyle = styled.div`
  .word {
    position: absolute;
    cursor: grab;
    font-size: 60px;
    color: #ffeb3b;
    &--about {
      font-size: 70px;
      font-weight: bold;
      color: gray;
    }
    &--menu {
      text-align: center;
      padding: 20px;
    }
    &--contact {
      text-align: center;
      padding: 5px;
    }
    &--info {
      font-size: 40px;
    }
    a {
      text-decoration: none;
      font-size: 20px;
      color: aliceblue;
      display: block;
      padding: 0rem;
    }
  }
`;

export const Falling = () => {
  const canvasRef = useRef(null);
  const boxRef = useRef(null);
  const aboutRef = useRef([]);
  const aboutKrRef = useRef([]);
  const aboutEnRef = useRef([]);
  const menuRef = useRef([]);
  const contactRef = useRef([]);
  // const infoRef = useRef([]);

  const infos = [
    {
      category: 'about-kr',
      items: ['유다솔', '프론트앤드', '개발자']
    },
    {
      category: 'about-en',
      items: ['Dasol', 'Yoo', 'Frontend', 'Developer']
    },
    {
      category: 'about',
      items: ['🇰🇷', '👩‍💻']
      // items: ['🇰🇷', '👩‍💻', '유다솔', 'Dasol', 'Yoo', 'Frontend', 'Developer']
    },
    {
      category: 'menu',
      items: ['about', 'work', 'blog'],
    },
    {
      category: 'contact',
      items: [
        {
          type: 'link',
          // imagePath: githubImage,
          url: 'https://github.com/azultasul',
        },
        {
          type: 'email',
          // imagePath: githubImage,
          email: 'mail@gmail.com',
        },
        {
          type: 'phone',
          // imagePath: githubImage,
          phone: '010-1234-5678',
        },
      ]
    },
    // {
    //   category: 'info',
    //   items: ['✈️', '🇪🇸', '🚲', '🎧', '📸', '💻', '🍎', '📚', '✏️', '🖱️', '⌨️', '🙃', '🤟', '👍', '🇺🇸', '🙆🏻', '🙇🏻', '🏃🏻‍♀️', '🐶', '☘️', '⭐️', '🌙', '🌞', '🍫', '🥤', '🧘🏻‍♀️', '🏓', '🚋', '🏛', '🛹', '🚴🏻‍♀️'],
    // },
  ]

  useEffect(() => {
    // module aliases
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;
  
    const canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // create an engine
    const engine = Engine.create();
  
    // create a renderer
    const render = Render.create({
      element: canvasRef.current,
      engine: engine,
      options: {
        ...canvasSize,
        background: "transparent",
        wireframes: false
      }
    });
  
    // create walls
    // const boxA = Bodies.rectangle(400, 20, 80, 80);
    // const boxB = Bodies.rectangle(450, 50, 80, 80);
    // const ballA = Bodies.circle(350, 400, 40, { isStatic: true });

    const wallT = Bodies.rectangle(canvasSize.width/2, 12, canvasSize.width, 24, { isStatic: true, render: {fillStyle: "transparent"} });
    const wallR = Bodies.rectangle(canvasSize.width - 12, canvasSize.height/2, 24, canvasSize.height, { isStatic: true, render: {fillStyle: "transparent"} });
    const wallL = Bodies.rectangle(12, canvasSize.height/2, 24, canvasSize.height, { isStatic: true, render: {fillStyle: "transparent"} });
    const wallB = Bodies.rectangle(canvasSize.width/2, canvasSize.height - 12, canvasSize.width, 24, { isStatic: true, render: {fillStyle: "transparent"} });

    const customRender = (body, el, width, height) => {
      const { x, y } = body.position;
      el.style.top = `${y - height / 2}px`;
      el.style.left = `${x - width / 2}px`;
      el.style.transform = `rotate(${body.angle}rad)`;
    }

    // create about
    const aboutKr = aboutKrRef.current.map(el => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;

      return {
        body: Bodies.rectangle(width/2, 50, width, height, {render: {fillStyle: "transparent"}}),
        el: el,
        render() {
          customRender(this.body, this.el, width, height)
        }
      }
    })
    const aboutEn = aboutEnRef.current.map(el => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;

      return {
        body: Bodies.rectangle(canvasSize.width - width/2, 50, width, height, {render: {fillStyle: "transparent"}}),
        el: el,
        render() {
          customRender(this.body, this.el, width, height)
        }
      }
    })
    const about = aboutRef.current.map(el => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;

      return {
        body: Bodies.rectangle(canvasSize.width/2, 50, width, height, {render: {fillStyle: "transparent"}}),
        el: el,
        render() {
          customRender(this.body, this.el, width, height)
        }
      }
    })

    // create menu
    const menu = menuRef.current.map((el, index) => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;

      return {
        body: Bodies.rectangle(canvasSize.width/2, 400, width, height, {render: {fillStyle: "transparent"}}),
        el: el,
        render() {
          customRender(this.body, this.el, width, height)
        }
      }
    })

    // create contact
    const contact = contactRef.current.map(el => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;

      return {
        body: Bodies.rectangle(canvasSize.width/2, 32, width, height, {render: {fillStyle: "transparent"}}),
        el: el,
        render() {
          customRender(this.body, this.el, width, height)
        }
      }
    })

    // // create info
    // const info = infoRef.current.map(el => {
    //   const width = el.offsetWidth;
    //   const height = el.offsetHeight;

    //   return {
    //     body: Bodies.circle(canvasSize.width/2, 50, width, {render: {fillStyle: "transparent"}}),
    //     el: el,
    //     render() {
    //       customRender(this.body, this.el, width, height)
    //     }
    //   }
    // })

  
    // add mouse control
    const mouse = Mouse.create(canvasRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    // mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    // mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
  
    const customItems = [...about.map(el => el.body), ...aboutKr.map(el => el.body), ...aboutEn.map(el => el.body), ...menu.map(el => el.body), ...contact.map(el => el.body)]
    Composite.add(engine.world, [
       wallR, wallL, wallB, ...customItems, mouseConstraint
    ]);
  
    render.mouse = mouse;
    Runner.run(engine);
    Render.run(render);

    (function rerender() {
      about.forEach((element) => {
        element.render();
      });
      aboutKr.forEach((element) => {
        element.render();
      });
      aboutEn.forEach((element) => {
        element.render();
      });
      menu.forEach((element) => {
        element.render();
      });
      contact.forEach((element) => {
        element.render();
      });
      // info.forEach((element) => {
      //   element.render();
      // });
      Matter.Engine.update(engine);
      requestAnimationFrame(rerender);
    })();

  }, [])

  return (
    <div ref={canvasRef}>
      <WordStyle ref={boxRef}>
        {/* {infos.map((info, index) => 
          info.category === 'about' 
          ? info.items.map((item, _index) => 
            <span ref={el => (aboutRef.current[_index] = el)} className={`word word--about`} key={`${index}-${_index}`}>{item}</span>
          )
          : info.category === 'menu' 
          ? info.items.map((item, _index) => 
            <span ref={el => (menuRef.current[_index] = el)} className={`word word--menu`} key={`${index}-${_index}`}>
              <Link href={`/${item}`}>Link!</Link>{item}
            </span>
          )
          : info.category === 'contact' 
          ? info.items.map((item, _index) => 
            <span ref={el => (contactRef.current[_index] = el)} className={`word word--contact`} key={`${index}-${_index}`}>
              {
                item.type === 'link'
                ? <><a href={item.url} target="_blank">go to</a></>
                // ? <><Image src={item.imagePath} alt='test' width={30} height={30} /><a href={item.url} target="_blank">go to</a></>
                : item.type === 'email'
                  ? <><a href={`mailto:${item.email}@example.com`}>send</a></>
                  // ? <><Image src={item.imagePath} alt='test' width={30} height={30} /><a href={`mailto:${item.email}@example.com`}>send</a></>
                  : <><a href={`tel:${item.email}`}>call</a></>
                  // : <><Image src={item.imagePath} alt='test' width={30} height={30} /><a href={`tel:${item.email}`}>call</a></>
              }
            </span>) 
          : info.items.map((item, _index) => 
            <span ref={el => (infoRef.current[_index] = el)} className={`word word--info`} key={`${index}-${_index}`}>{item}</span>
          )
        )} */}
        {infos.map((info, index) => 
          info.category === 'about-kr'
          ? info.items.map((item, _index) => 
            <span ref={el => (aboutKrRef.current[_index] = el)} className={`word word--about word--about-kr`} key={`${index}-${_index}`}>{item}</span>
          )
          : info.category === 'about-en'
          ? info.items.map((item, _index) => 
            <span ref={el => (aboutEnRef.current[_index] = el)} className={`word word--about word--about-en`} key={`${index}-${_index}`}>{item}</span>
          )
          : info.category === 'menu' 
          ? info.items.map((item, _index) => 
            <span ref={el => (menuRef.current[_index] = el)} className={`word word--menu`} key={`${index}-${_index}`}>
              <Link href={`/${item}`}>Link!</Link>{item}
            </span>
          )
          : info.category === 'contact' 
          ? info.items.map((item, _index) => 
            <span ref={el => (contactRef.current[_index] = el)} className={`word word--contact`} key={`${index}-${_index}`}>
              {
                item.type === 'link'
                ? <><a href={item.url} target="_blank">go to</a></>
                // ? <><Image src={item.imagePath} alt='test' width={30} height={30} /><a href={item.url} target="_blank">go to</a></>
                : item.type === 'email'
                  ? <><a href={`mailto:${item.email}@example.com`}>send</a></>
                  // ? <><Image src={item.imagePath} alt='test' width={30} height={30} /><a href={`mailto:${item.email}@example.com`}>send</a></>
                  : <><a href={`tel:${item.email}`}>call</a></>
                  // : <><Image src={item.imagePath} alt='test' width={30} height={30} /><a href={`tel:${item.email}`}>call</a></>
              }
            </span>) 
          : info.items.map((item, _index) => 
            <span ref={el => (aboutRef.current[_index] = el)} className={`word word--about word--${info.category}`} key={`${index}-${_index}`}>{item}</span>
          )
        )}
      </WordStyle>
    </div>
  )
}

export default Falling;