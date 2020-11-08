import styled from 'styled-components';

export default styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  z-index: 11;

  .dog {
    width: 100px;
    height: 100px;
  }
  .dog:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(118,118,118,0.233);
    border-radius: 50%;
     -webkit-transform: translateY(-30%) scale(1.5);
            transform: translateY(-30%) scale(1.5);
  }
  .dog * {
    position: absolute;
  }

  .dog-body {
    top: -50%;
    -webkit-animation: dog-body 200ms ease-in-out infinite alternate;
            animation: dog-body 200ms ease-in-out infinite alternate;
  }
  .dog-body:before {
    content: '';
    position: absolute;
    bottom: 90%;
    right: 50%;
    width: 90%;
    height: 90%;
    border-top-left-radius: 100%;
    border-bottom-left-radius: 10%;
    border-top-right-radius: 10%;
    -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
    -webkit-animation: dog-tail-blur 200ms 33.3333333333ms ease-in-out infinite alternate both;
            animation: dog-tail-blur 200ms 33.3333333333ms ease-in-out infinite alternate both;
  }
  @-webkit-keyframes dog-tail-blur {
    from {
      -webkit-transform: rotate(0);
              transform: rotate(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    to {
      -webkit-transform: rotate(90deg);
              transform: rotate(90deg);
      opacity: 0;
    }
  }
  @keyframes dog-tail-blur {
    from {
      -webkit-transform: rotate(0);
              transform: rotate(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    to {
      -webkit-transform: rotate(90deg);
              transform: rotate(90deg);
      opacity: 0;
    }
  }
  @-webkit-keyframes dog-body {
    from {
      -webkit-transform: translateX(-10%);
              transform: translateX(-10%);
    }
    to {
      -webkit-transform: translateX(10%);
              transform: translateX(10%);
    }
  }
  @keyframes dog-body {
    from {
      -webkit-transform: translateX(-10%);
              transform: translateX(-10%);
    }
    to {
      -webkit-transform: translateX(10%);
              transform: translateX(10%);
    }
  }

  @-webkit-keyframes dog-head {
    from, to {
      -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
    }
    33.3% {
      -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
    }
    66.6% {
      -webkit-transform: rotate(0);
              transform: rotate(0);
    }
  }
  @keyframes dog-head {
    from, to {
      -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
    }
    33.3% {
      -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
    }
    66.6% {
      -webkit-transform: rotate(0);
              transform: rotate(0);
    }
  }
  .dog-torso {
    display: none;
    top: -20%;
    animation: dog-torso 200ms ease-in-out infinite alternate-reverse;
  }
  @-webkit-keyframes dog-torso {
    from {
      -webkit-transform: translateX(-5%);
              transform: translateX(-5%);
    }
    to {
      -webkit-transform: translateX(5%);
              transform: translateX(5%);
    }
  }
  @keyframes dog-torso {
    from {
      -webkit-transform: translateX(-5%);
              transform: translateX(-5%);
    }
    to {
      -webkit-transform: translateX(5%);
              transform: translateX(5%);
    }
  }
  .dog-eyes {
    width: 60%;
    top: 46%;
    left: 20%;
    z-index: 1;
  }
  .dog-eyes:before {
    content: '';
    display: block;
    height: 40px;
    width: 40px;
    border-radius: 40px;
    position: absolute;
    background: #BB8C53;
    top: -10px;
    left: -10px;
    z-index: 0;
    box-shadow: inset -12px -8px 40px rgba(118,118,118,0.2);
    border: 4px solid #fcfcfc;
    border-left-width: 0;
    border-bottom-width: 0;
    border-top-width: 0;
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);

  }

  .dog-eye {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #544258;
    z-index: 1;
    -webkit-animation: dog-eye 1800ms infinite;
            animation: dog-eye 1800ms infinite;
  }
  @-webkit-keyframes dog-eye {
    from, to {
      -webkit-animation-timing-function: step-end;
              animation-timing-function: step-end;
      opacity: 1;
    }
    50%, 55% {
      -webkit-animation-timing-function: step-start;
              animation-timing-function: step-start;
      opacity: 0;
    }
  }
  @keyframes dog-eye {
    from, to {
      -webkit-animation-timing-function: step-end;
              animation-timing-function: step-end;
      opacity: 1;
    }
    50%, 55% {
      -webkit-animation-timing-function: step-start;
              animation-timing-function: step-start;
      opacity: 0;
    }
  }
  .dog-eye:first-child {
    left: 0;
  }
  .dog-eye:last-child {
    right: 0;
  }

  .dog-muzzle {
    width: 60%;
    left: 20%;
    height: 50%;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
    background: #f9f9f9;
    bottom: -15%;
    box-shadow: inset -12px -8px 40px rgba(255,255,255,0.233);
  }


  .dog-muzzle:before, .dog-muzzle:after {
    content: '';
    display: block;
    position: absolute;
  }
  .dog-muzzle:before {
    width: 6px;
    height: 20px;
    bottom: 0;
    left: calc(50% - 3px);
    background: rgba(84, 66, 88, 0.233);
  }
  .dog-muzzle:after {
    background: #544258;
    width: 20px;
    height: 15px;
    bottom: 12px;
    left: calc(50% - 10px);
    border-bottom-left-radius: 60% 60%;
    border-bottom-right-radius: 60% 60%;
    border-top-left-radius: 50% 40%;
    border-top-right-radius: 50% 40%;
  }

  .dog-tongue {
    width: 40px;
    height: 100%;
    left: calc(50% - 20px);
    z-index: -1;
    -webkit-transform-origin: center top;
            transform-origin: center top;
    -webkit-animation: dog-tongue 1800ms -50ms ease-in-out infinite;
            animation: dog-tongue 1800ms -50ms ease-in-out infinite;
  }
  @-webkit-keyframes dog-tongue {
    from, to {
      -webkit-transform: rotate(0);
              transform: rotate(0);
    }
    16.6666666667% {
      -webkit-transform: rotate(30deg);
              transform: rotate(30deg);
    }
    33.3333333333%, 66.6666666667% {
      -webkit-transform: rotate(0);
              transform: rotate(0);
    }
    50%, 83.3333333333% {
      -webkit-transform: rotate(-20deg);
              transform: rotate(-20deg);
    }
  }
  @keyframes dog-tongue {
    from, to {
      -webkit-transform: rotate(0);
              transform: rotate(0);
    }
    16.6666666667% {
      -webkit-transform: rotate(30deg);
              transform: rotate(30deg);
    }
    33.3333333333%, 66.6666666667% {
      -webkit-transform: rotate(0);
              transform: rotate(0);
    }
    50%, 83.3333333333% {
      -webkit-transform: rotate(-20deg);
              transform: rotate(-20deg);
    }
  }
  .dog-tongue:before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 40px;
    background: #FD3163;
    -webkit-animation: dog-tongue-inner 100ms ease-in-out infinite alternate;
            animation: dog-tongue-inner 100ms ease-in-out infinite alternate;
  }
  @-webkit-keyframes dog-tongue-inner {
    from {
      -webkit-transform: translateY(5%);
              transform: translateY(5%);
    }
    to {
      -webkit-transform: translateY(22%);
              transform: translateY(22%);
    }
  }
  @keyframes dog-tongue-inner {
    from {
      -webkit-transform: translateY(5%);
              transform: translateY(5%);
    }
    to {
      -webkit-transform: translateY(22%);
              transform: translateY(22%);
    }
  }
  .dog-ears {
    width: 40%;
    top: 16%;
    left: 30%;
    filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.233));
    -webkit-animation: dog-ears 1800ms 100ms ease infinite;
            animation: dog-ears 1800ms 100ms ease infinite;
  }
  @-webkit-keyframes dog-ears {
    42.3%, 71.6% {
      -webkit-transform: rotate(-5deg);
              transform: rotate(-5deg);
    }
    50.3%, 79.6% {
      -webkit-transform: rotate(5deg);
              transform: rotate(5deg);
    }
    5% {
      -webkit-transform: rotate(5deg);
              transform: rotate(5deg);
    }
    12% {
      -webkit-transform: rotate(-5%);
              transform: rotate(-5%);
    }
    from, 33.3%, 66%, to {
      -webkit-transform: rotate(0);
              transform: rotate(0);
    }
  }
  @keyframes dog-ears {
    42.3%, 71.6% {
      -webkit-transform: rotate(-5deg);
              transform: rotate(-5deg);
    }
    50.3%, 79.6% {
      -webkit-transform: rotate(5deg);
              transform: rotate(5deg);
    }
    5% {
      -webkit-transform: rotate(5deg);
              transform: rotate(5deg);
    }
    12% {
      -webkit-transform: rotate(-5%);
              transform: rotate(-5%);
    }
    from, 33.3%, 66%, to {
      -webkit-transform: rotate(0);
              transform: rotate(0);
    }
  }
  .dog-ear {
    bottom: -10px;
    height: 50px;
    width: 50px;
    background: #705431;
    -webkit-animation-duration: 400ms;
            animation-duration: 400ms;
    -webkit-animation-direction: alternate;
            animation-direction: alternate;
    -webkit-animation-timing-function: ease-in-out;
            animation-timing-function: ease-in-out;
    -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
    -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
  }
  .dog-ear:first-child {
    border-bottom-left-radius: 95%;
    border-top-right-radius: 80%;
    right: 100%;
    box-shadow: inset -15px 8px 0 1px #BB8C53;
    -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
    -webkit-transform: rotate(10deg);
            transform: rotate(10deg);
  }
  .dog-ear:last-child {
    border-top-left-radius: 95%;
    border-bottom-right-radius: 80%;
    left: 100%;
    box-shadow: inset 15px 8px 0 0 #BB8C53;
    -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
    -webkit-transform: rotate(-10deg);
            transform: rotate(-10deg);
  }

	.dog-tail {
		width: 10px;
		height: 50px;
		position: absolute;
		top: -48px;
		left: calc(50% - 5px);
		background-color: #F7B66C;
		transform: rotate(-47deg);
		border-radius: 10px 0 0 0px / 50px 0 0 0px;
		
	}

  .dog-tail {
    -webkit-transform-origin: center bottom;
            transform-origin: center bottom;
  }

  @-webkit-keyframes dog-tail-segment {
    from {
      -webkit-transform: rotate(-10deg);
              transform: rotate(-10deg);
    }
    to {
      -webkit-transform: rotate(10deg);
              transform: rotate(10deg);
    }
  }
  @keyframes dog-tail-segment {
    from {
      -webkit-transform: rotate(-10deg);
              transform: rotate(-10deg);
    }
    to {
      -webkit-transform: rotate(10deg);
              transform: rotate(10deg);
    }
  }
  .dog-body > .dog-tail {
    bottom: 90%;
    -webkit-animation: dog-tail 200ms ease-in-out infinite alternate;
            animation: dog-tail 200ms ease-in-out infinite alternate;
  }
  @-webkit-keyframes dog-tail {
    from {
      -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
    }
    to {
      -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
    }
  }
  @keyframes dog-tail {
    from {
      -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
    }
    to {
      -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
    }
  }
  .dog-body,
  .dog-torso,
  .dog-head {
    border-radius: 50%;
    background: #F7B66C;
    position: absolute;
    height: 100%;
    width: 100%;
    box-shadow: inset -12px -8px 40px rgba(118, 118, 118, 0.233 );
    filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.233)) brightness(100%);
  }

  .dog-body, .dog-torso {
    box-shadow: inset -12px -8px 40px #BB8C53;
  }

  .dog-head {
    background: #F7B66C;
  }


  *, *:before, *:after {
    box-sizing: border-box;
    position: relative;
  }
  

`;