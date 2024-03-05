import "./style.css";

const getCharacters = async () => {
  const response = await fetch("http://localhost:3000/characters");
  const characters = await response.json();

  printCharacters(characters);
};

const printCharacters = (characters) => {
  main.innerHTML = "";
  for (const character of characters) {
    const divCharacter = document.createElement("div");

    divCharacter.classList.add("character");
    divCharacter.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.img}"/>
    `;
    if (JSON.parse(localStorage.getItem("user"))?.rol === "admin") {
      const x = document.createElement("img");

      x.src = "/assets/x.png";
      x.classList.add("x");

      x.addEventListener("click", () => deleteCharacter(character._id));
      divCharacter.append(x);
    }

    main.append(divCharacter);
  }
};

const printButtons = () => {
  const div = document.createElement("div");
  const buttonCharacters = document.createElement("button");
  const buttonRegister = document.createElement("button");
  const buttonLogin = document.createElement("button");

  buttonCharacters.textContent = "Characters";
  buttonRegister.textContent = "Register";
  buttonRegister.classList.add("register");
  buttonLogin.textContent = "Login";
  buttonLogin.classList.add("login");
  div.classList.add("buttons");

  buttonCharacters.addEventListener("click", getCharacters);
  buttonRegister.addEventListener("click", registerForm);
  buttonLogin.addEventListener("click", loginForm);

  div.append(buttonCharacters);
  if (localStorage.getItem("user")) {
    const buttonCreate = document.createElement("button");
    buttonCreate.textContent = "Create";
    buttonCreate.addEventListener("click", printForm);
    div.append(buttonCreate);
  }
  div.append(buttonRegister);
  div.append(buttonLogin);
  document.querySelector("#app").append(div);
};

const registerForm = () => {
  main.innerHTML = "";
  const form = document.createElement("form");

  form.innerHTML = `
    <div>
      <label>Email</label>
      <input/>
    </div>
    <div>
      <label>Contraseña</label>
      <input/>
    </div>
    <button>Enviar</button>
  `;

  form.addEventListener("submit", registro);
  main.append(form);
};

const loginForm = () => {
  main.innerHTML = "";
  const form = document.createElement("form");

  form.innerHTML = `
    <div>
      <label>Email</label>
      <input/>
    </div>
    <div>
      <label>Contraseña</label>
      <input/>
    </div>
    <button>Enviar</button>
  `;

  form.addEventListener("submit", login);
  main.append(form);
};

const printForm = () => {
  main.innerHTML = "";
  const form = document.createElement("form");

  form.innerHTML = `
    <div>
      <label>Nombre del personaje</label>
      <input/>
    </div>
    <div>
      <label>Imagen del personaje</label>
      <input/>
    </div>
    <button>Enviar</button>
  `;

  form.addEventListener("submit", postCharacter);
  main.append(form);
};

const registro = async (e) => {
  e.preventDefault();

  // recoger los datos del formulario crear el objeto correspondiente
  const objetoEnvio = {
    email: e.srcElement[0].value,
    password: e.srcElement[1].value,
  };

  // pasar ese objeto a JSON
  const newUser = JSON.stringify(objetoEnvio);

  try {
    await fetch("http://localhost:3000/users/register", {
      method: "POST",
      body: newUser,
      headers: {
        "Content-Type": "Application/json",
      },
    });

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      body: newUser,
      headers: {
        "Content-Type": "Application/json",
      },
    });

    const loginSuccess = await response.json();
    const { token, user } = loginSuccess;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    console.log(loginSuccess);
  } catch (error) {
    console.log("El registro ha fallado");
  }
};

const login = async (e) => {
  e.preventDefault();

  // recoger los datos del formulario crear el objeto correspondiente
  const objetoEnvio = {
    email: e.srcElement[0].value,
    password: e.srcElement[1].value,
  };

  // pasar ese objeto a JSON
  const newUser = JSON.stringify(objetoEnvio);

  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    body: newUser,
    headers: {
      "Content-Type": "Application/json",
    },
  });

  const loginSuccess = await response.json();
  const { token, user } = loginSuccess;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  getCharacters();
  document.querySelector(".register").style.display = "none";
  document.querySelector(".login").style.display = "none";
  const divButtons = document.querySelector(".buttons");
  const logout = document.createElement("button");

  logout.textContent = "Logout";

  logout.addEventListener("click", () => {
    localStorage.clear();
    logout.style.display = "none";
    document.querySelector(".register").style.display = "block";
    document.querySelector(".login").style.display = "block";
    getCharacters();
  });

  const div = document.querySelector(".buttons");
  const buttonCreate = document.createElement("button");
  buttonCreate.textContent = "Create";
  buttonCreate.addEventListener("click", printForm);
  div.append(buttonCreate);

  divButtons.append(logout);
  console.log(loginSuccess);
};

const postCharacter = async (e) => {
  e.preventDefault();

  // recoger los datos del formulario crear el objeto correspondiente
  const objetoEnvio = {
    name: e.srcElement[0].value,
    img: e.srcElement[1].value,
  };

  // pasar ese objeto a JSON
  const newCharacter = JSON.stringify(objetoEnvio);

  // fetch
  await fetch("http://localhost:3000/characters", {
    // indicar el método que estás realizando
    method: "POST",
    // te paso el objeto con los datos
    body: newCharacter,
    // te indico el tipo de contenido que estoy utilizando
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });

  getCharacters();
};

const deleteCharacter = async (id) => {
  await fetch(`http://localhost:3000/characters/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  getCharacters();
};

printButtons();

const main = document.createElement("main");
document.querySelector("#app").append(main);

getCharacters();
