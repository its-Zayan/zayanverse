declare global {
  interface Window {
    TweenMax: any;
    Expo: any;
    Quad: any;
  }
}

interface ExtendedElement extends Element {
  offsetParent: Element | null;
  offsetLeft: number;
  offsetTop: number;
  clientLeft: number;
  clientTop: number;
  scrollLeft: number;
  scrollTop: number;
}

export function initializeLoginAnimations() {
  if (typeof window === 'undefined') return;

  const email = document.querySelector('#loginEmail') as HTMLInputElement;
  const password = document.querySelector('#loginPassword') as HTMLInputElement;
  const showPasswordCheck = document.querySelector('#showPasswordCheck') as HTMLInputElement;
  const mySVG = document.querySelector('.svgContainer');
  const armL = document.querySelector('.armL');
  const armR = document.querySelector('.armR');
  const eyeL = document.querySelector('.eyeL');
  const eyeR = document.querySelector('.eyeR');
  const nose = document.querySelector('.nose');
  const mouth = document.querySelector('.mouth');
  const mouthBG = document.querySelector('.mouthBG');
  const mouthSmallBG = document.querySelector('.mouthSmallBG');
  const mouthMediumBG = document.querySelector('.mouthMediumBG');
  const mouthLargeBG = document.querySelector('.mouthLargeBG');
  const mouthMaskPath = document.querySelector('#mouthMaskPath');
  const mouthOutline = document.querySelector('.mouthOutline');
  const tooth = document.querySelector('.tooth');
  const tongue = document.querySelector('.tongue');
  const chin = document.querySelector('.chin');
  const face = document.querySelector('.face');
  const eyebrow = document.querySelector('.eyebrow');
  const outerEarL = document.querySelector('.earL .outerEar');
  const outerEarR = document.querySelector('.earR .outerEar');
  const earHairL = document.querySelector('.earL .earHair');
  const earHairR = document.querySelector('.earR .earHair');
  const hair = document.querySelector('.hair');
  const bodyBG = document.querySelector('.bodyBG');
  const twoFingers = document.querySelector('.twoFingers');

  let curEmailIndex = 0;
  let screenCenter: number;
  let svgCoords: { x: number; y: number };
  let emailCoords: { x: number; y: number };
  let emailScrollMax: number;
  let chinMin = 0.5;
  let dFromC: number;
  let mouthStatus = "small";
  let eyeScale = 1;
  let eyesCovered = false;

  function getPosition(el: ExtendedElement) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
      if (el.tagName == "BODY") {
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }

      el = el.offsetParent as ExtendedElement;
    }
    return {
      x: xPos,
      y: yPos
    };
  }

  function getAngle(x1: number, y1: number, x2: number, y2: number) {
    return Math.atan2(y1 - y2, x1 - x2);
  }

  function calculateFaceMove() {
    if (!email || !mySVG) return;

    const carPos = email.selectionEnd || email.value.length;
    const div = document.createElement('div');
    const span = document.createElement('span');
    const copyStyle = getComputedStyle(email);
    
    // Copy computed styles using setProperty
    for (const prop of copyStyle) {
      if (prop in copyStyle) {
        div.style.setProperty(prop, copyStyle.getPropertyValue(prop));
      }
    }
    
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';  // Hide the div
    document.body.appendChild(div);
    div.textContent = email.value.substr(0, carPos);
    span.textContent = email.value.substr(carPos) || '.';
    div.appendChild(span);
    
    const caretCoords = getPosition(span as ExtendedElement);
    document.body.removeChild(div);

    const centerX = svgCoords.x + (mySVG as HTMLElement).offsetWidth / 2;
    dFromC = centerX - (caretCoords.x + emailCoords.x);

    const eyeLCoords = { x: svgCoords.x + 84, y: svgCoords.y + 76 };
    const eyeRCoords = { x: svgCoords.x + 113, y: svgCoords.y + 76 };
    const noseCoords = { x: svgCoords.x + 97, y: svgCoords.y + 81 };
    const mouthCoords = { x: svgCoords.x + 100, y: svgCoords.y + 100 };

    const eyeLAngle = getAngle(eyeLCoords.x, eyeLCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
    const eyeRAngle = getAngle(eyeRCoords.x, eyeRCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
    const noseAngle = getAngle(noseCoords.x, noseCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
    const mouthAngle = getAngle(mouthCoords.x, mouthCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);

    if (!window.TweenMax) return;

    window.TweenMax.to(eyeL, 1, { x: -Math.cos(eyeLAngle) * 20, y: -Math.sin(eyeLAngle) * 10, ease: window.Expo.easeOut });
    window.TweenMax.to(eyeR, 1, { x: -Math.cos(eyeRAngle) * 20, y: -Math.sin(eyeRAngle) * 10, ease: window.Expo.easeOut });
    window.TweenMax.to(nose, 1, { x: -Math.cos(noseAngle) * 23, y: -Math.sin(noseAngle) * 10, rotation: Math.cos(mouthAngle) * 6, transformOrigin: "center center", ease: window.Expo.easeOut });
    window.TweenMax.to(mouth, 1, { x: -Math.cos(mouthAngle) * 23, y: -Math.sin(mouthAngle) * 10, rotation: Math.cos(mouthAngle) * 6, transformOrigin: "center center", ease: window.Expo.easeOut });
    window.TweenMax.to(chin, 1, { x: -Math.cos(mouthAngle) * 18.4, y: -Math.sin(mouthAngle) * 5, ease: window.Expo.easeOut });
    window.TweenMax.to(face, 1, { x: -Math.cos(mouthAngle) * 6.9, y: -Math.sin(mouthAngle) * 4, skewX: -Math.cos(mouthAngle) * 5, transformOrigin: "center top", ease: window.Expo.easeOut });
    window.TweenMax.to(eyebrow, 1, { x: -Math.cos(mouthAngle) * 6.9, y: -Math.sin(mouthAngle) * 4, skewX: -Math.cos(mouthAngle) * 25, transformOrigin: "center top", ease: window.Expo.easeOut });
    window.TweenMax.to(outerEarL, 1, { x: Math.cos(mouthAngle) * 4, y: -Math.cos(mouthAngle) * 5, ease: window.Expo.easeOut });
    window.TweenMax.to(outerEarR, 1, { x: Math.cos(mouthAngle) * 4, y: Math.cos(mouthAngle) * 5, ease: window.Expo.easeOut });
    window.TweenMax.to(earHairL, 1, { x: -Math.cos(mouthAngle) * 4, y: -Math.cos(mouthAngle) * 5, ease: window.Expo.easeOut });
    window.TweenMax.to(earHairR, 1, { x: -Math.cos(mouthAngle) * 4, y: Math.cos(mouthAngle) * 5, ease: window.Expo.easeOut });
    window.TweenMax.to(hair, 1, { x: Math.cos(mouthAngle) * 6, scaleY: 1.2, transformOrigin: "center bottom", ease: window.Expo.easeOut });
  }

  function onEmailInput() {
    if (!email || !window.TweenMax) return;

    calculateFaceMove();
    const value = email.value;
    curEmailIndex = value.length;

    // Email input animations
    if (curEmailIndex > 0) {
      if (mouthStatus == "small") {
        mouthStatus = "medium";
        // Happy expression when typing
        window.TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { 
          morphSVG: mouthMediumBG, 
          shapeIndex: 8, 
          ease: window.Expo.easeOut 
        });
        window.TweenMax.to(tooth, 1, { 
          x: 0, 
          y: -2, 
          ease: window.Expo.easeOut 
        });
        window.TweenMax.to(tongue, 1, { 
          x: 0, 
          y: 2, 
          ease: window.Expo.easeOut 
        });
        window.TweenMax.to([eyeL, eyeR], 1, { 
          scaleX: .85, 
          scaleY: .75,
          ease: window.Expo.easeOut,
          transformOrigin: "center center"
        });
        eyeScale = .85;
      }
      if (value.includes("@")) {
        mouthStatus = "large";
        // Extra happy expression with @ symbol
        window.TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { 
          morphSVG: mouthLargeBG, 
          ease: window.Expo.easeOut 
        });
        window.TweenMax.to(tooth, 1, { 
          x: 3, 
          y: -4, 
          ease: window.Expo.easeOut 
        });
        window.TweenMax.to(tongue, 1, { 
          y: 3, 
          ease: window.Expo.easeOut 
        });
        window.TweenMax.to([eyeL, eyeR], 1, { 
          scaleX: .65, 
          scaleY: .55, 
          ease: window.Expo.easeOut,
          transformOrigin: "center center"
        });
        // Add slight head tilt for extra cuteness
        window.TweenMax.to(face, 0.6, {
          rotation: 3,
          transformOrigin: "center center",
          ease: window.Quad.easeOut
        });
        eyeScale = .65;
      }
    } else {
      mouthStatus = "small";
      // Reset to neutral expression
      window.TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { 
        morphSVG: mouthSmallBG, 
        shapeIndex: 9, 
        ease: window.Expo.easeOut 
      });
      window.TweenMax.to(tooth, 1, { 
        x: 0, 
        y: 0, 
        ease: window.Expo.easeOut 
      });
      window.TweenMax.to(tongue, 1, { 
        y: 0, 
        ease: window.Expo.easeOut 
      });
      window.TweenMax.to([eyeL, eyeR], 1, { 
        scaleX: 1, 
        scaleY: 1, 
        ease: window.Expo.easeOut,
        transformOrigin: "center center"
      });
      // Reset head tilt
      window.TweenMax.to(face, 0.6, {
        rotation: 0,
        transformOrigin: "center center",
        ease: window.Quad.easeOut
      });
      eyeScale = 1;
    }
  }

  function coverEyes() {
    if (!window.TweenMax || !armL || !armR) return;

    // Make arms visible first
    window.TweenMax.set([armL, armR], { visibility: "visible" });
    
    const showPasswordCheck = document.querySelector('#showPasswordCheck') as HTMLInputElement;
    const isShowingPassword = showPasswordCheck && showPasswordCheck.checked;
    
    // Base position for covering eyes - keep hands close to face
    window.TweenMax.to(armL, .45, { 
      x: -93, 
      y: isShowingPassword ? 11 : 10, 
      rotation: isShowingPassword ? 2 : 0,
      transformOrigin: "top left",
      ease: window.Quad.easeOut,
      immediateRender: true
    });
    window.TweenMax.to(armR, .45, { 
      x: -93, 
      y: isShowingPassword ? 11 : 10, 
      rotation: isShowingPassword ? -2 : 0,
      transformOrigin: "top right",
      ease: window.Quad.easeOut,
      immediateRender: true
    });
    
    // Subtle finger spread animation for peeking
    window.TweenMax.to(twoFingers, .35, { 
      scaleX: isShowingPassword ? 1.1 : 1,
      scaleY: isShowingPassword ? 0.9 : 1,
      rotation: isShowingPassword ? 8 : 0,
      y: isShowingPassword ? 0.5 : 0,
      transformOrigin: "bottom center", 
      ease: window.Quad.easeOut,
      immediateRender: true
    });
    
    eyesCovered = true;
  }

  function uncoverEyes() {
    if (!window.TweenMax || !armL || !armR) return;
    
    // Only fully uncover if password field is not focused
    if (!document.activeElement?.matches('#loginPassword, #showPasswordToggle, #showPasswordCheck')) {
      window.TweenMax.to(armL, .75, { 
        y: 220,
        x: -93,
        rotation: 105,
        transformOrigin: "top left",
        ease: window.Quad.easeOut,
        immediateRender: true
      });
      window.TweenMax.to(armR, .75, { 
        y: 220,
        x: -93,
        rotation: -105,
        transformOrigin: "top right",
        ease: window.Quad.easeOut,
        immediateRender: true,
        onComplete: () => {
          window.TweenMax.set([armL, armR], { visibility: "hidden" });
        }
      });

      window.TweenMax.to(twoFingers, .35, { 
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        y: 0,
        transformOrigin: "bottom center", 
        ease: window.Quad.easeOut,
        immediateRender: true
      });
      
      eyesCovered = false;
    }
  }

  function resetFace() {
    if (!window.TweenMax) return;

    window.TweenMax.to([eyeL, eyeR], 1, { x: 0, y: 0, ease: window.Expo.easeOut });
    window.TweenMax.to(nose, 1, { x: 0, y: 0, scaleX: 1, scaleY: 1, ease: window.Expo.easeOut });
    window.TweenMax.to(mouth, 1, { x: 0, y: 0, rotation: 0, ease: window.Expo.easeOut });
    window.TweenMax.to(chin, 1, { x: 0, y: 0, scaleY: 1, ease: window.Expo.easeOut });
    window.TweenMax.to([face, eyebrow], 1, { x: 0, y: 0, skewX: 0, ease: window.Expo.easeOut });
    window.TweenMax.to([outerEarL, outerEarR, earHairL, earHairR, hair], 1, { x: 0, y: 0, scaleY: 1, ease: window.Expo.easeOut });
  }

  // Initialize
  if (email && password && showPasswordCheck && mySVG && armL && armR) {
    svgCoords = getPosition(mySVG as ExtendedElement);
    emailCoords = getPosition(email as ExtendedElement);
    screenCenter = svgCoords.x + ((mySVG as HTMLElement).offsetWidth / 2);
    emailScrollMax = email.scrollWidth;

    // Set initial arm positions
    window.TweenMax.set(armL, { 
      x: -93, 
      y: 220, 
      rotation: 105, 
      transformOrigin: "top left",
      visibility: "hidden" 
    });
    window.TweenMax.set(armR, { 
      x: -93, 
      y: 220, 
      rotation: -105, 
      transformOrigin: "top right",
      visibility: "hidden" 
    });

    // Event listeners
    email.addEventListener('focus', () => {
      if (eyesCovered) {
        uncoverEyes();
      }
      calculateFaceMove();
      onEmailInput();
    });

    email.addEventListener('blur', () => {
      resetFace();
    });

    email.addEventListener('input', onEmailInput);
    email.addEventListener('mousemove', calculateFaceMove);
    
    password.addEventListener('focus', () => {
      if (!eyesCovered) {
        coverEyes();
      }
    });

    password.addEventListener('blur', () => {
      // Only uncover if we're not focusing the show/hide password elements
      if (eyesCovered && !document.activeElement?.matches('#showPasswordToggle, #showPasswordCheck')) {
        uncoverEyes();
      }
    });

    showPasswordCheck.addEventListener('change', (e) => {
      // Always call coverEyes to update the peeking animation
      coverEyes();
    });

    // Add click handler for the toggle button to prevent unwanted uncovering
    const showPasswordToggle = document.querySelector('#showPasswordToggle');
    showPasswordToggle?.addEventListener('mousedown', (e) => {
      e.preventDefault(); // Prevent focus change
    });
  }
} 