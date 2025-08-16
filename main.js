// Check if user is already logged in
/* if (localStorage.getItem("loggedInUser")) {
  showWelcome(localStorage.getItem("loggedInUser"));
}

function signUp() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Save user credentials (⚠️ not secure)
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[email]) {
    alert("User already exists. Please log in.");
    return;
  }

  users[email] = password;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Sign-up successful! You can now log in.");
}

function logIn() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[email] && users[email] === password) {
    localStorage.setItem("loggedInUser", email);
    showWelcome(email);
  } else {
    alert("Invalid email or password.");
  }
}

function showWelcome(email) {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "none";
  document.getElementById("welcome").style.display = "block";
  document.getElementById("user-email").textContent = email;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
} */

function openlib() {
  const overlay = document.getElementById("lib-popup");
  overlay.style.display = "flex";
  setTimeout(() => {
    overlay.classList.add("show");
  }, 10); // Slight delay to trigger transition
}

function closeModal() {
  const overlay = document.getElementById("lib-popup"); // ✅ correct ID
  overlay.classList.remove("show"); // if you're using a transition class
  setTimeout(() => {
    overlay.style.display = "none";
  }, 400); // match your CSS transition duration
}

function openSign() {
  const overlay = document.getElementById("sign-popup");
  overlay.style.display = "flex";
  setTimeout(() => {
    overlay.classList.add("show");
  }, 10); // Slight delay to trigger transition

}

function closeModal_sign(){
  const overlay = document.getElementById("sign-popup"); // ✅ correct ID
  overlay.classList.remove("show"); // if you're using a transition class
  setTimeout(() => {
    overlay.style.display = "none";
  }, 400); // match your CSS transition duration

}

// SIGN-UP
if (localStorage.getItem("loggedInUser")) {
  showWelcome(localStorage.getItem("loggedInUser"));
}

function signUp() {
  const name = document.getElementById("signup-name").value;
  const password = document.getElementById("signup-password").value;

  if (!name || !password) {
    alert("Please enter both name and password.");
    return;
  }

  // Save user credentials (⚠️ not secure)
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[name]) {
    alert("User already exists. Please log in.");
    return;
  }

  users[name] = password;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Sign-up successful! You can now log in.");
  //close pop-up
  const overlay = document.getElementById("sign-popup");
  overlay.classList.remove("show"); // remove transition class if used
  setTimeout(() => {
    overlay.style.display = "none";
  }, 400); // match your CSS transition duration
}

//LOG-IN
function openLog() {
  const overlay = document.getElementById("log-popup");
  overlay.style.display = "flex";
  //document.getElementById("welcome").style.display = "none";
  setTimeout(() => {
    overlay.classList.add("show");
  }, 10); // Slight delay to trigger transition

}

function closeModal_log(){
  const overlay = document.getElementById("log-popup"); // ✅ correct ID
  overlay.classList.remove("show"); // if you're using a transition class
  setTimeout(() => {
    overlay.style.display = "none";
  }, 400); // match your CSS transition duration
}

function logIn() {
  const name = document.getElementById("login-name").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[name] && users[name] === password) {
    localStorage.setItem("loggedInUser", name);
    showWelcome(name);
    const overlay = document.getElementById("log-popup"); // ✅ correct ID
    overlay.classList.remove("show"); // if you're using a transition class
    setTimeout(() => {
      overlay.style.display = "none";
    }, 400); // match your CSS transition duration

  } else {
    alert("Invalid email or password.");
  }
}

function showWelcome(name) {
  document.getElementById("login-name").style.display = "none";
  document.getElementById("login-password").style.display = "none";
  document.getElementById("login-btn").style.display = "none";

  document.getElementById("user-name").textContent = name;

  // Show welcome section
  document.getElementById("welcome").style.display = "block";
}

function logout() {
    localStorage.removeItem("loggedInUser");

  // Hide welcome section
  document.getElementById("welcome").style.display = "none";

  // Show login fields and button
  document.getElementById("login-name").style.display = "block";
  document.getElementById("login-password").style.display = "block";
  document.getElementById("login-btn").style.display = "block";

  // Optional: Clear input fields
  document.getElementById("login-name").value = "";
  document.getElementById("login-password").value = "";
}