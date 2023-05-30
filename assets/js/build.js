fetch('../data/RecursosArchivos.txt')
  .then(response => response.text())
  .then(data => {
    // Convertir el contenido a JSON si es necesario        
    const archivos = JSON.parse(data);
    const archivoContainer = document.getElementById("archivos");
    const archivoMContainer = document.getElementById("mobile-archivos")
    archivos.forEach(archivo => {
      // Se crea el elemento a del archivo screen normal
      const aArchivo = document.createElement("a");
      aArchivo.href = archivo.src;
      aArchivo.target = "_blank";
      aArchivo.className = "d-flex justify-content-between";
      // Se crea el elemento a del archivo screen mobile
      const aMArchivo = document.createElement("a");
      aMArchivo.href = archivo.src;
      aMArchivo.target = "_blank";
      aMArchivo.className = "d-flex justify-content-between";
      // Se crea el div que contiene el icono y el nombre
      const divArchivo = document.createElement("div");
      divArchivo.className = "d-flex";
      // Se crea el elemento icono descripcion
      const iDescArchivo = document.createElement("i");
      iDescArchivo.className = "bi bi-filetype-pdf";
      //Se crea el elemento div descripcion
      const divDescripcion = document.createElement("div");
      divDescripcion.className = "ms-3";
      divDescripcion.textContent = archivo.name;

      divArchivo.appendChild(iDescArchivo);
      divArchivo.appendChild(divDescripcion);
      // Se crea el elemento icono link
      const iArchivo = document.createElement("i");
      iArchivo.className = "bi bi-save";

      //Se generan clones de los elementos
      const divMArchivo = divArchivo.cloneNode(true);
      const iMArchivo = iArchivo.cloneNode(true);

      aArchivo.appendChild(divArchivo);
      aArchivo.appendChild(iArchivo);
      archivoContainer.appendChild(aArchivo);

      aMArchivo.appendChild(divMArchivo);
      aMArchivo.appendChild(iMArchivo);
      archivoMContainer.appendChild(aMArchivo);
    });
  }).catch(error => {
    console.log('Error al leer el archivo:', error);
  });

fetch('../data/RecursosLecturas.txt')
  .then(response => response.text())
  .then(data => {
    // Convertir el contenido a JSON si es necesario        
    const lecturas = JSON.parse(data);

    const lecturaContainer = document.getElementById("lecturas");
    const lecturaMContainer = document.getElementById("mobile-lecturas")
    lecturas.forEach(lectura => {
      // Se crea el elemento a de la lectura screen normal
      const aLectura = document.createElement("a");
      aLectura.href = lectura.src;
      aLectura.target = "_blank";
      aLectura.className = "d-flex justify-content-between";
      // Se crea el elemento a del archivo screen mobile
      const aMLectura = document.createElement("a");
      aMLectura.href = lectura.src;
      aMLectura.target = "_blank";
      aMLectura.className = "d-flex justify-content-between";
      // Se crea el div que contiene el icono y el nombre
      const divLectura = document.createElement("div");
      divLectura.className = "d-flex";
      // Se crea el elemento icono descripcion
      const iDescLectura = document.createElement("i");
      iDescLectura.className = "bi bi-circle";
      //Se crea el elemento div descripcion
      const divDescripcion = document.createElement("div");
      divDescripcion.className = "ms-3";
      divDescripcion.textContent = lectura.name;

      divLectura.appendChild(iDescLectura);
      divLectura.appendChild(divDescripcion);
      // Se crea el elemento icono link
      const iLectura = document.createElement("i");
      iLectura.className = "bi bi-box-arrow-up-right";

      //Se generan clones de los elementos
      const divMLectura = divLectura.cloneNode(true);
      const iMLectura = iLectura.cloneNode(true);

      aLectura.appendChild(divLectura);
      aLectura.appendChild(iLectura);
      lecturaContainer.appendChild(aLectura);

      aMLectura.appendChild(divMLectura);
      aMLectura.appendChild(iMLectura);
      lecturaMContainer.appendChild(aMLectura);
    });
  }).catch(error => {
    console.log('Error al leer el archivo:', error);
  });

fetch('../data/ChatMensajes.txt')
  .then(response => response.text())
  .then(data => {
    // Convertir el contenido a JSON si es necesario        
    const chatMessages = JSON.parse(data);

    /*Innecesario en implementacion httpRequest*/
    localStorage.setItem("chat", JSON.stringify(chatMessages));

    const divPreguntas = document.getElementById("preguntas");
    const divAportes = document.getElementById("aportes");
    const divMPreguntas = document.getElementById("mobile-preguntas");
    const divMAportes = document.getElementById("mobile-aportes");
    chatMessages.forEach(chat => {
      //Crea el elemento div contenedor principal de chat screen normal
      const divChatBox = document.createElement("div");
      divChatBox.id = "chat-" + chat.id;
      divChatBox.className = "chat-box-item";

      //Crea el elemento div contenedor principal de chat screen mobile
      const divMChatBox = document.createElement("div");
      divMChatBox.id = "mchat-" + chat.id;
      divMChatBox.className = "chat-box-item";

      //Crea el elemento div header del chat item
      const divUserHeader = document.createElement("div");
      divUserHeader.className = "d-flex user-header";

      //Crea el elemento div contenedor del avatar
      const divAvatarContainer = document.createElement("div");
      divAvatarContainer.className = "img-thumbnail-container";

      //Crea el elemento img del avatar
      const imgAvatar = document.createElement("img");
      imgAvatar.src = chat.avatar;
      imgAvatar.className = "img-thumbnail-avatar";
      imgAvatar.alt = "Avatar";

      //Agrega el elemento img avatar a su contenedor
      divAvatarContainer.appendChild(imgAvatar);

      //Crea los divs del nombre del usuario
      const divUserContainer = document.createElement("div");
      divUserContainer.className = "d-flex flex-column ms-3";
      const divUserName = document.createElement("div");
      divUserName.className = "chat-name";
      divUserName.textContent = chat.userName;
      const divSince = document.createElement("div");
      divSince.className = "chat-since";
      divSince.textContent = "Hace " + chat.days + " días";
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
      divStars.textContent = chat.stars;
      divStars.className = "votes";

      divStarsContainer.appendChild(iStar);
      divStarsContainer.appendChild(iStarActive);
      divStarsContainer.appendChild(divStars);

      const divUserBodyMessage = document.createElement("div");
      divUserBodyMessage.className = "user-body-message";
      divUserBodyMessage.textContent = chat.message;

      divUserBody.appendChild(divStarsContainer);
      divUserBody.appendChild(divUserBodyMessage);

      divChatBox.appendChild(divUserHeader);
      divChatBox.appendChild(divUserBody);

      //se generan clones de los elementos sin id para la version mobile
      const divUserHeaderClon = divUserHeader.cloneNode(true);
      const divUserBodyClon = divUserBody.cloneNode(true);
      divMChatBox.appendChild(divUserHeaderClon);
      divMChatBox.appendChild(divUserBodyClon);

      if (chat.type === 'P') {
        divPreguntas.appendChild(divChatBox);
        divMPreguntas.appendChild(divMChatBox);
      }
      if (chat.type === 'A') {
        divAportes.appendChild(divChatBox);
        divMAportes.appendChild(divMChatBox);
      }

    });

  }).catch(error => {
    console.log('Error al leer el archivo:', error);
  });

/**/
fetch('../data/Curso.txt')
  .then(response => response.text())
  .then(data => {
    // Convertir el contenido a JSON si es necesario        
    const steps = JSON.parse(data);

    /*Innecesario en implementacion httpRequest*/
    localStorage.setItem("answers", JSON.stringify(steps));

    const statements = document.getElementById("statements");        
    const lessonList1 = document.getElementById("stepper");
    const lessonListM = document.getElementById("mobile-stepper");
    const videoFrames = document.getElementById("videoFrames");

    steps.forEach((step, stepIndex) => {
      //STEPPER
      const divStep1 = document.createElement("div");
      divStep1.id = "step-" + step.id;
      divStep1.onclick = stepFunction;
      divStep1.className = "step" + (step.active ? " step-active" : "") + (step.status === 'disabled' ? " disabled" : "");
      divStep1.setAttribute("data-video", "videoFrame-" + step.id);
      divStep1.setAttribute("data-quiz", "step-" + step.id + "-question-list");
      

      const divDivCircle1 = document.createElement("div");

      const circle1 = document.createElement("div");
      circle1.setAttribute("class", "circle");

      const circleSpan1 = document.createElement("span");
      circleSpan1.setAttribute("class", "uncomplete");
      circleSpan1.textContent = step.number;

      const circleIcon1 = document.createElement("i");
      circleIcon1.setAttribute("class", "bi bi-check uncomplete");

      circle1.appendChild(circleSpan1);
      circle1.appendChild(circleIcon1);

      divDivCircle1.appendChild(circle1);

      const divDivTitle1 = document.createElement("div");

      const title1 = document.createElement("div");
      title1.setAttribute("class", "title");
      title1.textContent = step.title;

      const caption1 = document.createElement("div");
      caption1.setAttribute("class", "caption");
      caption1.textContent = step.caption;

      divDivTitle1.appendChild(title1);
      divDivTitle1.appendChild(caption1);

      divStep1.appendChild(divDivCircle1);
      divStep1.appendChild(divDivTitle1);

      lessonList1.appendChild(divStep1);
      /**/
      //STEPPER MOBILE
      const divStepM = document.createElement("div");
      divStepM.id = "m" + "step" + "ps-" + step.id;
      divStepM.onclick = stepFunction;
      divStepM.className = "step" + (step.active ? " step-active" : "");
      divStepM.setAttribute("data-video", "videoFrame-" + step.id);
      divStepM.setAttribute("data-quiz", "step-" + step.id + "-question-list");

      const divDivCircleM = document.createElement("div");

      const circleM = document.createElement("div");
      circleM.setAttribute("class", "circle");

      const circleSpanM = document.createElement("span");
      circleSpanM.setAttribute("class", "uncomplete");
      circleSpanM.textContent = step.number;

      const circleIconM = document.createElement("i");
      circleIconM.setAttribute("class", "bi bi-check uncomplete");

      circleM.appendChild(circleSpanM);
      circleM.appendChild(circleIconM);

      divDivCircleM.appendChild(circleM);

      const divDivTitleM = document.createElement("div");

      const titleM = document.createElement("div");
      titleM.setAttribute("class", "title");
      titleM.textContent = step.title;

      const captionM = document.createElement("div");
      captionM.setAttribute("class", "caption");
      captionM.textContent = step.caption;

      divDivTitleM.appendChild(titleM);
      divDivTitleM.appendChild(captionM);

      divStepM.appendChild(divDivCircleM);
      divStepM.appendChild(divDivTitleM);

      lessonListM.appendChild(divStepM);
      /*QUIZ - Generación del cuestionario*/
      /*Se crea el elemento div de la lista de preguntas*/
      const divQuestionList = document.createElement("div");
      divQuestionList.id = "step-" + step.id + '-question-list';
      divQuestionList.className = "step-question-list"

      /*Recorriendo el array de preguntas*/
      step.questions.forEach((question, index) => {
        const divQuestion = document.createElement("div");
        divQuestion.id = question.name;
        divQuestion.className = "question" + (index === 0 ? " show" : "");

        // Crea el elemento p para el enunciado de la pregunta
        const pStatement = document.createElement("p");
        pStatement.textContent = question.statement;
        // Crea el elemento div para las opciones de respuesta
        const divOptions = document.createElement("div");
        divOptions.className = "question-options";
        question.options.forEach((option, i) => {
          // Crea el elemento div para la opción
          const divOption = document.createElement("div");
          divOption.className = "form-check";
          // Crea el elemento input para el radio button
          const inputRadio = document.createElement("input");
          inputRadio.className = "form-check-input";
          inputRadio.type = "radio";
          inputRadio.name = "flexRadioDefault" + (index + 1);
          inputRadio.id = "flexRadioDefault" + (i + 1) + "-" + (index + 1) + "-" + (stepIndex + 1);
          // Crea el elemento label para el texto de la opción
          const labelOption = document.createElement("label");
          labelOption.className = "form-check-label";
          labelOption.htmlFor = "flexRadioDefault" + (i + 1) + "-" + (index + 1) + "-" + (stepIndex + 1);
          labelOption.textContent = option.option;

          // Agrega el input y el label al div de la opción
          divOption.appendChild(inputRadio);
          divOption.appendChild(labelOption);

          // Agrega el div de la opción al div de opciones
          divOptions.appendChild(divOption);
        });
        // Si no es el último elemento
        if (index < (step.questions.length - 1)) {
          // Agrega el enunciado y las opciones al div de la pregunta
          divQuestion.appendChild(pStatement);
          divQuestion.appendChild(divOptions);
        } else {
          // Agrega la sección de evaluación
          const buttonEvaluation = document.createElement("div");
          buttonEvaluation.className = "evaluation";

          const buttonEval = document.createElement("button");
          buttonEval.type = "button";
          buttonEval.className = "btn btn-success";
          buttonEval.textContent = "Evaluacion";
          buttonEval.onclick = eval;

          buttonEvaluation.appendChild(buttonEval);
          divQuestion.appendChild(buttonEvaluation);
        }
        // Agrega el div de la pregunta al contenedor
        divQuestionList.appendChild(divQuestion);
      });
      // Agrega los botones previo y siguiente al final del contenedor
      const buttonQuest = document.createElement("div");
      buttonQuest.className = "button-quest";

      const buttonPrev = document.createElement("button");
      buttonPrev.type = "button";
      buttonPrev.className = "btn btn-outline-primary m-2";
      buttonPrev.textContent = "Previa";
      buttonPrev.onclick = prev;

      const buttonNext = document.createElement("button");
      buttonNext.type = "button";
      buttonNext.className = "btn btn-outline-primary m-2";
      buttonNext.textContent = "Siguiente";
      buttonNext.onclick = next;

      buttonQuest.appendChild(buttonPrev);
      buttonQuest.appendChild(buttonNext);

      divQuestionList.appendChild(buttonQuest);
      statements.appendChild(divQuestionList);
      /*Iframes*/
      const iframe = document.createElement("iframe");
      iframe.id = "videoFrame-" + step.id;
      iframe.className = "responsive-iframe" + (step.active ? " show" : "");
      iframe.src = step.src;
      videoFrames.appendChild(iframe);
    });

  })
  .catch(error => {
    console.log('Error al leer el archivo:', error);
  });