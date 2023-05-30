/********************************************************************************/
  /*Operaciones: Funciones para la manipulación del DOM*/
  /********************************************************************************/

  const messageInput = document.getElementById('message-input');    
  const buttonContainer = document.getElementById('button-chat');
  

  messageInput.addEventListener('input', function() {
    if (messageInput.value.trim().length > 2) {
      buttonContainer.style.display = 'flex';
    } else {
      buttonContainer.style.display = 'none';
    }
  });

  messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      messageInput.value = '';
      buttonContainer.style.display = 'none';
    }
  });

  const chatButtons = Array.from(document.getElementById("button-chat").children);
  chatButtons.forEach(chatButton => {    
    chatButton.addEventListener("click", saveMessage);    
  })
  function saveMessage(event) {
    const user = {
      avatar: "/assets/images/avatar1.jpg",
      name: "Erika"
    }
    const messageInput = document.getElementById("message-input");
    const chatMessages = JSON.parse(localStorage.getItem("chat"));
    const chatMessagesArray = Array.from(chatMessages);
    /*Post agregar funcion httpRequest Post*/    
    chatMessagesArray.push({
      id: chatMessagesArray.length + 1,
      userName: user.name,
      avatar: user.avatar,
      message: messageInput.value,
      stars: 0,
      days: 0,
      type: (event.target.getAttribute("data-target") === 'aportes' ? 'A' : 'P'),
      answers: 0
    });
    localStorage.setItem("chat", JSON.stringify(chatMessagesArray));

    const divPreguntas = document.getElementById("preguntas");
    const divAportes = document.getElementById("aportes");
    const divMPreguntas = document.getElementById("mobile-preguntas");
    const divMAportes = document.getElementById("mobile-aportes");
    //Crea el elemento div contenedor principal de chat screen normal
    const divChatBox = document.createElement("div");

    divChatBox.id = "chat-" + chatMessagesArray.length; //valor numerico que deberia ser reemplazado por el resultado del post
    divChatBox.className = "chat-box-item";

    //Crea el elemento div contenedor principal de chat screen mobile
    const divMChatBox = document.createElement("div");
    divMChatBox.id = "mchat-" + chatMessagesArray.length; //valor numerico que deberia ser reemplazado por el resultado del post
    divMChatBox.className = "chat-box-item";

    //Crea el elemento div header del chat item
    const divUserHeader = document.createElement("div");
    divUserHeader.className = "d-flex user-header";

    //Crea el elemento div contenedor del avatar
    const divAvatarContainer = document.createElement("div");
    divAvatarContainer.className = "img-thumbnail-container";

    //Crea el elemento img del avatar
    const imgAvatar = document.createElement("img");
    imgAvatar.src = user.avatar; // reemplazar por datos del usaurio session actual
    imgAvatar.className = "img-thumbnail-avatar";
    imgAvatar.alt = "Avatar";

    //Agrega el elemento img avatar a su contenedor
    divAvatarContainer.appendChild(imgAvatar);

    //Crea los divs del nombre del usuario
    const divUserContainer = document.createElement("div");
    divUserContainer.className = "d-flex flex-column ms-3";
    const divUserName = document.createElement("div");
    divUserName.className = "chat-name";
    divUserName.textContent = user.name; // reemplazar por datos del usaurio session actual
    const divSince = document.createElement("div");
    divSince.className = "chat-since";
    divSince.textContent = "Hace " + 0 + " días";
    divUserContainer.appendChild(divUserName);
    divUserContainer.appendChild(divSince);

    // Append chld to userheader
    divUserHeader.appendChild(divAvatarContainer);
    divUserHeader.appendChild(divUserContainer);

    //Crea el elemento div del userBody
    const divUserBody = document.createElement("div");
    divUserBody.className = "d-flex user-body";

    const divStarsContainer = document.createElement("div");
    divStarsContainer.className = "d-flex flex-column align-items-center justify-content-center stars";

    const iStar = document.createElement("i");
    iStar.className = "bi bi-heart";
    iStar.onclick = addVote;

    const iStarActive = document.createElement("i");
    iStarActive.className = "bi bi-heart-fill hidden";
    iStarActive.onclick = addVote;

    const divStars = document.createElement("div");
    divStars.textContent = 0;
    divStars.className = "votes";

    divStarsContainer.appendChild(iStar);
    divStarsContainer.appendChild(iStarActive);
    divStarsContainer.appendChild(divStars);

    const divUserBodyMessage = document.createElement("div");
    divUserBodyMessage.className = "user-body-message";
    divUserBodyMessage.textContent = messageInput.value;

    divUserBody.appendChild(divStarsContainer);
    divUserBody.appendChild(divUserBodyMessage);

    divChatBox.appendChild(divUserHeader);
    divChatBox.appendChild(divUserBody);

    //se generan clones de los elementos sin id para la version mobile
    const divUserHeaderClon = divUserHeader.cloneNode(true);
    const divUserBodyClon = divUserBody.cloneNode(true);
    divMChatBox.appendChild(divUserHeaderClon);
    divMChatBox.appendChild(divUserBodyClon);

    if (event.target.getAttribute("data-target") === 'preguntas') {      
      divPreguntas.insertBefore(divChatBox, divPreguntas.firstChild);
      divMPreguntas.insertBefore(divMChatBox, divMPreguntas.firstChild);
    }
    if (event.target.getAttribute("data-target") === 'aportes') {
      divAportes.insertBefore(divChatBox, divAportes.firstChild);
      divMAportes.insertBefore(divMChatBox, divMAportes.firstChild);
    }

    messageInput.value = '';
    const buttonContainer = document.getElementById('button-chat');
    buttonContainer.style.display = 'none';
  }

  const buttonsOrder = Array.from(document.querySelectorAll(".button-order"));
  buttonsOrder.forEach(buttonOrder => {
    const orderBy = Array.from(buttonOrder.children)
    orderBy[0].addEventListener("click", chatOrderVotados);
    orderBy[1].addEventListener("click", chatOrderNuevos);
    orderBy[2].addEventListener("click", chatOrderSin);
  });

  function chatOrderNuevos(event) {
    /*GET Reemplazar por httpRequest Get*/
    const chatMessages = JSON.parse(localStorage.getItem("chat"));
    const node = event.target;
    const nodoId = node.getAttribute("data-target");  

    
    Array.from(node.parentNode.children).forEach(child => child.classList.remove('active'));
    node.classList.add("active");

    const chatsOrdered = document.createDocumentFragment();
    const chatMessagesOrdered = chatMessages.filter(chat => chat.type === (nodoId === "aportes" ? "A" : "P"));
    chatMessagesOrdered.sort(function (a, b) {
      return a.days === b.days ? 0 : (a.days < b.days ? -1 : 1)
    });

    const divAportes = document.getElementById(nodoId);

    const chats = Array.from(divAportes.children);
    chatMessagesOrdered.forEach(function (message) {
      const clone = chats.find(chat => chat.id === ('chat-' + message.id)).cloneNode(true);
      clone.addEventListener("click", addVote);      
      chatsOrdered.appendChild(clone);
    });

    divAportes.innerHTML = null;
    divAportes.appendChild(chatsOrdered);
  }

  function chatOrderVotados(event) {
    /*GET Reemplazar por httpRequest Get*/
    const chatMessages = JSON.parse(localStorage.getItem("chat"));
    
    const node = event.target;
    const nodoId = node.getAttribute("data-target");  

    Array.from(node.parentNode.children).forEach(child => child.classList.remove('active'));
    node.classList.add("active");


    const chatsOrdered = document.createDocumentFragment();
    const chatMessagesOrdered = chatMessages.filter(chat => chat.type === (nodoId === "aportes" ? "A" : "P"));
    chatMessagesOrdered.sort(function (a, b) {
      return a.stars === b.stars ? 0 : (a.stars > b.stars ? -1 : 1)
    });

    const divAportes = document.getElementById(nodoId);
    const chats = Array.from(divAportes.children);    
    chatMessagesOrdered.forEach(function (message) {
      //chatsOrdered.appendChild(chats.find(chat => chat.id === ('chat-' + message.id)).cloneNode(true));
      const clone = chats.find(chat => chat.id === ('chat-' + message.id)).cloneNode(true);
      clone.addEventListener("click", addVote);
      chatsOrdered.appendChild(clone);
    });

    divAportes.innerHTML = null;
    divAportes.appendChild(chatsOrdered);
  }

  function chatOrderSin(event) {

    /*GET Reemplazar por httpRequest Get*/
    const chatMessages = JSON.parse(localStorage.getItem("chat"));
    
    const node = event.target;
    const nodoId = node.getAttribute("data-target");  

    Array.from(node.parentNode.children).forEach(child => child.classList.remove('active'));
    node.classList.add("active");

    const chatsOrdered = document.createDocumentFragment();
    const chatMessagesOrdered = chatMessages.filter(chat => chat.type === (nodoId === "aportes" ? "A" : "P"));
    chatMessagesOrdered.sort(function (a, b) {
      return a.answers === b.answers ? 0 : (a.answers < b.answers ? -1 : 1)
    });

    const divAportes = document.getElementById(nodoId);

    const chats = Array.from(divAportes.children);
    chatMessagesOrdered.forEach(function (message) {      
      const clone = chats.find(chat => chat.id === ('chat-' + message.id)).cloneNode(true);
      clone.addEventListener("click", addVote);
      chatsOrdered.appendChild(clone);
    });

    divAportes.innerHTML = null;
    divAportes.appendChild(chatsOrdered);
  }

  function addVote(event) {
    let parentNode = event.target;

    while (parentNode) {
      if (parentNode.id) {
        break;
      }
      parentNode = parentNode.parentNode;
    }

    const iconInactive = parentNode.querySelector(".bi-heart");
    const iconActive = parentNode.querySelector(".bi-heart-fill");
    const isHidden = iconActive.classList.contains("hidden");
    if (isHidden) {
      iconActive.classList.remove("hidden");
      iconInactive.classList.add("hidden");
      const stars = parentNode.querySelector(".votes");
      stars.textContent = +stars.textContent + 1;
    } else {
      iconActive.classList.add("hidden");
      iconInactive.classList.remove("hidden");
      const stars = parentNode.querySelector(".votes");
      stars.textContent = +stars.textContent - 1;
    }
    /*POST httpRequest Post*/
    //
  }

  /*QUIZ: Función para iniciar examen*/
  const buttonTest = document.getElementById("enable-quiz");
  buttonTest.addEventListener("click", enableTest);

  function enableTest() {
    const currentListStep = document.getElementById("stepper");
    const steps = currentListStep.querySelectorAll(".step");
    const stepsArray = Array.from(steps);
    const currentStep = stepsArray.find(item => item.classList.contains("step-active"));

    /*GET Reemplazar por httpRequest Get*/
    const answers = JSON.parse(localStorage.getItem("answers"));

    const answered = answers.find(item => "step-" + item.id === currentStep.id);
    if (answered.status === "complete") {
      return;
    }
    //const node = document.getElementById(currentStep.id + "-question-list");
    const node = document.getElementById(currentStep.getAttribute('data-quiz'));
    node.classList.add("display");
  }

  /*QUIZ: siguiente pregunta*/
  function next() {
    /*Se obtiene el current step*/
    const currentListStep = document.getElementById("stepper");
    const steps = currentListStep.querySelectorAll(".step");
    const stepsArray = Array.from(steps);
    const currentStep = stepsArray.find(item => item.classList.contains("step-active"));

    /*Se utiliza el current step para buscar la lista correcta de preguntas*/
    //const lista = document.getElementById(currentStep.id + "-question-list");
    const lista = document.getElementById(currentStep.getAttribute('data-quiz'));
    const elementos = lista.querySelectorAll(".question");
    const items = Array.from(elementos);
    const indexItem = items.findIndex(item => item.classList.contains("show"));
    if (indexItem !== -1 && indexItem < items.length - 1) {
      /*si se lo encuentra y ademas no es el ultimo nodo...*/
      /*los inputs del radio button*/
      const inputs = Array.from(items[indexItem].querySelectorAll('input[type="radio"]'));
      /*se obtiene la respuesta*/
      const answer = inputs.findIndex(input => input.checked === true) + 1;

      /*actualizacion del array de respuestas*/
      /*GET Reemplazar por httpRequest Get*/
      const answers = JSON.parse(localStorage.getItem("answers"));
      const answered = (answers.find(item => ("step-" + item.id) === currentStep.id)).questions.find(item => item.name === items[indexItem].id);
      answered.values.answered = answer;
      /*POST Reemplazar por httpRequest Post*/
      localStorage.setItem("answers", JSON.stringify(answers));

      /*el paso de pregunta*/
      items[indexItem].classList.remove("show");
      items[indexItem + 1].classList.add("show");
    }
  }

  /*QUIZ: pregunta previa*/
  function prev() {
    /*Se obtiene el current step*/
    const currentListStep = document.getElementById("stepper");
    const steps = currentListStep.querySelectorAll(".step");
    const stepsArray = Array.from(steps);
    const currentStep = stepsArray.find(item => item.classList.contains("step-active"));

    /*Se utiliza el current step para buscar la lista correcta de preguntas*/
    //const lista = document.getElementById(currentStep.id + "-question-list");
    const lista = document.getElementById(currentStep.getAttribute('data-quiz'));
    const elementos = lista.querySelectorAll(".question");
    const items = Array.from(elementos);
    const indexItem = items.findIndex((item) => item.classList.contains("show"));
    if (indexItem !== -1 && indexItem > 0) {
      items[indexItem].classList.remove("show");
      items[indexItem - 1].classList.add("show");
    }
  }

  /*QUIZ: Proceso de evaluación*/
  function eval() {
    /*Se obtiene el current step*/
    const currentListStep = document.getElementById("stepper");
    const steps = currentListStep.querySelectorAll(".step");
    const stepsArray = Array.from(steps);
    const currentStep = stepsArray.find(item => item.classList.contains("step-active"));

    /*se obtiene la lista de respuestas del current step*/

    /*GET Reemplazar por httpRequest Get*/
    const answers = JSON.parse(localStorage.getItem("answers"));

    const index = answers.findIndex(item => ("step-" + item.id) === currentStep.id);
    const step = answers[index];
    /*se obtienen el criterio de aprobacion en %*/
    const criteria = step.criteria;

    let total = 0;
    step.questions.forEach(item => {
      if (item.values.goodanswer === item.values.answered) {
        total = total + 1;
      }
    });

    const resultado = Math.round((total / step.questions.length) * 100);
    if (criteria <= resultado) {
      //step.classList.add("complete");
      step.status = "complete";
      // si el numero de index dice que no es el ultimo se asigna enabled al siguiente
      if (index < answers.length - 1) {
        const stepNext = answers[index + 1];
        stepNext.status = "enabled";
        document.getElementById("step-" + stepNext.id).classList.remove("disabled");
        document.getElementById("mstepps-" + stepNext.id).classList.remove("disabled");

        /*Post Reemplazar por httpRequest Post*/
        localStorage.setItem("answers", JSON.stringify(answers));
      }


      const circle = currentStep.querySelector(".circle:first-child");
      const circleSpan = circle.querySelector("span");
      circleSpan.classList.add("complete");
      circleSpan.classList.remove("uncomplete");
      const circleIcon = circle.querySelector("i");
      circleIcon.classList.add("complete");
      circleIcon.classList.remove("uncomplete");

      const currentStepM = document.getElementById("mstepps-" + step.id);
      const circleM = currentStepM.querySelector(".circle:first-child");
      const circleSpanM = circleM.querySelector("span");
      circleSpanM.classList.add("complete");
      circleSpanM.classList.remove("uncomplete");
      const circleIconM = circleM.querySelector("i");
      circleIconM.classList.add("complete");
      circleIconM.classList.remove("uncomplete");


      const mensaje = 'Felicidades su resultado fue de' + resultado + '%, se habilitó la siguiente lección';
      alert(mensaje, 'success');
    } else {
      const mensaje = 'El mínimo requerido es ' + criteria + '% su resultado fue de ' + resultado + '%';
      alert(mensaje, 'danger');
    }
  }

  // Alerta Bootstrap
  function alert(mensaje, tipo) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')

      alertPlaceholder.append(wrapper)
    }
    appendAlert(mensaje, tipo)
  }

  /**/
  /*SCRIPT PARA EL COMPORTAMIENTO DEL STEPPER*/
  /*Asignacion del recurso para el iframe VIDEO*/
  function stepFunction(event) {        
    /*GET Reemplazar por httpRequest Get*/
    const answers = JSON.parse(localStorage.getItem("answers"));

    let parentNode = event.target;
    // El primer parent nodo con id
    while (parentNode) {
      if (parentNode.id) {
        break;
      }
      parentNode = parentNode.parentNode;
    }
    const node = answers.find(item => (("step-" + item.id) === parentNode.id) || (("mstepps-" + item.id) === parentNode.id));

    if (node.status === "disabled") {
      console.log("disabled");
      return;
    }

    //const nodeIds = parentNode.id.split('-');
    const iframes = document.getElementById("videoFrames");
    Array.from(iframes.children).forEach(item =>  {
      if (item.id === parentNode.getAttribute('data-video')) {
        item.classList.add("show");
      } else {
        item.classList.remove("show");
      }
    });  

    // Propagando la desactivación de todos los nodos para habilitar sólo el que corresponde      
    const lista2 = document.getElementById("stepper");
    const lista3 = document.getElementById("mobile-stepper");      
    const elementos2 = lista2.querySelectorAll(".step");
    const elementos3 = lista3.querySelectorAll(".step");
    //const iframe = document.getElementById("videoFrame");      
    elementos2.forEach(function (otroElemento) {
      const node = document.getElementById(otroElemento.id + "-question-list");
      if (node) {
        node.classList.remove("display");
      }
      otroElemento.classList.remove("step-active");
    });
    elementos3.forEach(function (otroElemento) {
      otroElemento.classList.remove("step-active");
    });

    // Asignación del video la iframe
    // iframe.src = node.src;
    const stepName = "step-" + node.id;      
    const stepMName = "mstepps-" + node.id;
    // const stepDiv = (parentNode.id);

    switch (parentNode.id) {
      case stepName:
        parentNode.classList.add("step-active");
        document.getElementById(stepName).classList.add("step-active");
        document.getElementById(stepMName).classList.add("step-active");
        break;
      case stepMName:
        parentNode.classList.add("step-active");
        document.getElementById(stepName).classList.add("step-active");
        document.getElementById(stepName).classList.add("step-active");
        break
      default:
        break;
    }
  }

  const sideNav = document.getElementById("side-nav-btn");
  sideNav.addEventListener("click", openSideNav);
  /*Script para cerrar el STEPPER*/ 
  function openSideNav(event) {
    const node = event.target;
    const icon = node.querySelector("i:first-child");            
    const sideNav = document.getElementById("body-stepper");
    if (sideNav.classList.contains('open')) {
      sideNav.classList.remove('open');
      icon.classList.remove("bi-chevron-compact-left");
      icon.classList.add("bi-chevron-compact-right");
    } else {
      sideNav.classList.add('open');
      icon.classList.remove("bi-chevron-compact-right");
      icon.classList.add("bi-chevron-compact-left");        
    }      
  }

  document.addEventListener('click', function(event) {
  const sidenav = document.getElementById("body-stepper");
  const target = event.target;
  const button = document.getElementById("side-nav-btn");
  const icon = button.querySelector("i:first-child");
  // Comprobar si el clic ocurrió dentro del sidenav
  if (target === sidenav || sidenav.contains(target)) {
    // El clic ocurrió dentro del sidenav, no se cierra
    return;
  }
  
  // El clic ocurrió fuera del sidenav, se cierra
  // Aquí puedes agregar la lógica para cerrar el sidenav, por ejemplo:
  sidenav.classList.remove('open');
  icon.classList.remove("bi-chevron-compact-left");
  icon.classList.add("bi-chevron-compact-right");
});    
  document.addEventListener("keydown", function (event) {
    const elemento = document.getElementById("body-stepper");
    const button = document.getElementById("side-nav-btn");
    const icon = button.querySelector("i:first-child");
    if (event.key === "Escape") {
      elemento.classList.remove('open');
      icon.classList.remove("bi-chevron-compact-left");
      icon.classList.add("bi-chevron-compact-right");
    }
  });