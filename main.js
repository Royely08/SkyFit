let workoutCount = 0;
let selectedExerciseType = "";
let selectedLevel = "";
let selectedMuscleGroup = "";
let currentEditId = ""; // Stores which title is being edited
let tempExerciseList = [];

if (localStorage.getItem("loggedInUser")) {
  showWelcome(localStorage.getItem("loggedInUser"));
}

//Hide all pop-ups 
function hideAllPopups() {
  document.getElementById("lib-popup").style.display = "none";
  document.getElementById("sign-popup").style.display = "none";
  document.getElementById("log-popup").style.display = "none";
  document.getElementById("background-image").style.display = "none";
}

//HOME
function openHome() {
  hideAllPopups();

  document.getElementById("background-image").style.display = "block";
}


function openSign() {
  hideAllPopups();
  const overlay = document.getElementById("sign-popup");
  overlay.style.display = "flex";
  setTimeout(() => {
    overlay.classList.add("show");
  }, 10);
}

function signUp() {
  const usernameInput = document.getElementById("signup-name");
  const passwordInput = document.getElementById("signup-password");
  const firstnameInput = document.getElementById("signup-firstname");
  const lastnameInput = document.getElementById("signup-lastname");

  const username = usernameInput.value;
  const password = passwordInput.value;
  const firstname = firstnameInput.value;
  const lastname = lastnameInput.value;

  if (!username || !password || !firstname || !lastname) {
    alert("Please enter first/last names, username, and password.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[username]) {
    alert("User already exists. Please log in.");
    return;
  }

  users[username] = {
  password: password,
  firstname: firstname,
  lastname: lastname
  };

  localStorage.setItem("users", JSON.stringify(users));
  alert("Sign-up successful! You can now log in.");

  // ✅ Reset input fields
  usernameInput.value = "";
  passwordInput.value = "";
  firstnameInput.value = "";
  lastnameInput.value = "";
}

function openLib() {
  hideAllPopups();
  const overlay = document.getElementById("lib-popup");
  overlay.style.display = "flex";
  setTimeout(() => {
    overlay.classList.add("show");
  }, 10);

  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    document.getElementById("sentence-login").style.display = "none";
    document.getElementById("workout-routines").style.display = "block";
  } else {
    document.getElementById("sentence-login").style.display = "block";
    document.getElementById("workout-routines").style.display = "none";
    document.getElementById("sentence-login").textContent = "Log in to see what's in the library";
  }
}

function openLog() {
  hideAllPopups();
  const overlay = document.getElementById("log-popup");
  overlay.style.display = "flex";

  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    showWelcome(loggedInUser);
  } else {
    showLoginForm();
  }

  setTimeout(() => {
    overlay.classList.add("show");
  }, 10);
}

function logIn() {
  const name = document.getElementById("login-name").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[name] && users[name].password === password) {
    localStorage.setItem("loggedInUser", name);
    loadUserWorkouts(name);
    const fullName = users[name].firstname + " " + users[name].lastname;
    showWelcome(fullName);  // ✅ Show welcome after login
  } else {
    alert("Invalid username or password.");
  }
}

function showWelcome(username) {
  document.getElementById("user-name").textContent = username;
  document.getElementById("welcome").style.display = "block";
  document.getElementById("logout-btn").style.display = "block";

  document.getElementById("login-name").style.display = "none";
  document.getElementById("login-password").style.display = "none";
  document.getElementById("login-btn").style.display = "none";
}

function showLoginForm() {
  document.getElementById("login-name").style.display = "block";
  document.getElementById("login-password").style.display = "block";
  document.getElementById("login-btn").style.display = "block";

  document.getElementById("logout-btn").style.display = "none";
  document.getElementById("welcome").style.display = "none";
}

function logout() {
  localStorage.removeItem("loggedInUser");

  document.getElementById("welcome").style.display = "none";
  document.getElementById("logout-btn").style.display = "none";
  document.getElementById("workout-routines").style.display = "none";
  document.getElementById("sentence-login").style.display = "block";

  showLoginForm();
}

function loadUserWorkouts(username) {
  const key = `workouts_${username}`;
  const saved = JSON.parse(localStorage.getItem(key)) || [];
  saved.forEach(workout => {
    const day = document.getElementById(`day${workout.day}`);
    if (day) {
      day.style.display = "block";
      document.getElementById(`workoutTitle${workout.day}`).textContent = workout.title;
      document.getElementById(`exerciseLabel${workout.day}`).textContent = `Exercise: ${workout.exercise}`;
    }
  });
}

window.onload = function () {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    showWelcome(loggedInUser);
    loadUserWorkouts(loggedInUser);
  } else {
    showLoginForm();
  }
};

function selectLevel(level) {
  selectedLevel = level.toLowerCase(); // API expects lowercase

  document.querySelector(".dropbtn").textContent = `Level: ${level}`;
  document.getElementById("dropdownContent").style.display = "none";
}

function selectExercise(type) {
  selectedExerciseType = type;
  
  document.querySelector(".dropbtn-exercise").textContent = `Exercise Type: ${type}`;
  document.getElementById("exerciseContent").style.display = "none";
}

function selectMuscleGroup(muscle) {
  selectedMuscleGroup = muscle;
  
  document.querySelector(".dropbtn-targeted").textContent = `Targeted : ${muscle}`;
  document.getElementById("targetedContent").style.display = "none";
}

function addWorkout() {
  document.getElementById("add-popup").style.display = "flex";
  setTimeout(() => {
    document.getElementById("add-popup").classList.add("show");
  }, 10);
}

function toggleDropdown() {
  const dropdown = document.getElementById("dropdownContent");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function toggleDropdownexercise() {
  const dropdown = document.getElementById("exerciseContent");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function toggleDropdowntargeted() {
  const dropdown = document.getElementById("targetedContent");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function closeAddPopup(){
  const overlay = document.getElementById("add-popup"); // ✅ correct ID
  overlay.classList.remove("show"); // if you're using a transition class
  setTimeout(() => {
    overlay.style.display = "none";
  }, 400); // match your CSS transition duration
}

function confirmAdd() {
  workoutCount++;
  const nextDay = document.getElementById(`day${workoutCount}`);

  const selectedCount = [selectedExerciseType, selectedLevel, selectedMuscleGroup].filter(Boolean).length;
  if (selectedCount < 2) {
    alert("Please select at least two filters: exercise type, difficulty level, or targeted muscle group.");
    workoutCount--;
    return;
  }

  // ✅ Normalize all filter values
  const type = selectedExerciseType?.toLowerCase();
  const difficulty = selectedLevel?.toLowerCase();
  const muscle = selectedMuscleGroup?.toLowerCase();

  // ✅ Build query string
  let queryParams = [];
  if (type) queryParams.push(`type=${type}`);
  if (difficulty) queryParams.push(`difficulty=${difficulty}`);
  if (muscle) queryParams.push(`muscle=${muscle}`);
  const queryString = queryParams.join("&");

  console.log(`Query: https://api.api-ninjas.com/v1/exercises?${queryString}`);

  if (nextDay) {
    fetch(`https://api.api-ninjas.com/v1/exercises?${queryString}`, {
      method: "GET",
      headers: {
        "X-Api-Key": "UOeSq6102SJ+/D2/PO8S4A==dfqh3YuFuXFkyuMZ"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("API response:", data);

      nextDay.style.display = "block";

      const titleInput = document.getElementById("add-input").value.trim();
      let exerciseName = "";
      let workoutTitle = "";

      if (data.length > 0) {
        exerciseName = data[0].name;
        workoutTitle = titleInput || exerciseName;
      } else {
        alert("No exercises found for this combination. Try adjusting your filters.");
        workoutTitle = titleInput || "Untitled Workout";
      }

      document.getElementById(`workoutTitle${workoutCount}`).textContent = workoutTitle;
      document.getElementById(`exerciseLabel${workoutCount}`).textContent =
        exerciseName ? `Exercise: ${exerciseName}` : "Exercise: N/A";

      // ✅ Save workout for logged-in user
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const key = `workouts_${loggedInUser}`;
        const existing = JSON.parse(localStorage.getItem(key)) || [];
        existing.push({
          day: workoutCount,
          title: workoutTitle,
          exercise: exerciseName,
          filters: {
            type,
            difficulty,
            muscle
          }
        });
        localStorage.setItem(key, JSON.stringify(existing));
      }

      // ✅ Reset input and selections
      document.getElementById("add-input").value = "";
      selectedExerciseType = "";
      selectedLevel = "";
      selectedMuscleGroup = "";
      document.querySelector(".dropbtn-exercise").textContent = "Exercise type";
      document.querySelector(".dropbtn-targeted").textContent = "Targeted Muscle Group";
      document.querySelector(".dropbtn").textContent = "Difficulty Level";

      closeAddPopup();
    })
    .catch(error => {
      console.error("API error:", error);
      nextDay.style.display = "block";
      document.getElementById(`workoutTitle${workoutCount}`).textContent = "Error loading workout";
      document.getElementById(`exerciseLabel${workoutCount}`).textContent = "Exercise: Error";

      document.getElementById("add-input").value = "";
      selectedExerciseType = "";
      selectedLevel = "";
      selectedMuscleGroup = "";
      document.querySelector(".dropbtn-exercise").textContent = "Exercise type";
      document.querySelector(".dropbtn-targeted").textContent = "Targeted Muscle Group";
      document.querySelector(".dropbtn").textContent = "Difficulty Level";

      closeAddPopup();
    });
  } else {
    alert("All workout days are already visible!");
    workoutCount--;
    closeAddPopup();
  }
}



function deleteWorkout(dayNumber) {
  const workoutBox = document.getElementById(`day${dayNumber}`);
  if (workoutBox && workoutBox.style.display !== "none") {
    workoutBox.style.display = "none";
    workoutCount--; 
  }
}

function openEditPopup(dayNumber) {
  currentEditDay = dayNumber;
  tempExerciseList = [];

  const titleEl = document.getElementById(`workoutTitle${dayNumber}`);
  const exerciseEl = document.getElementById(`exerciseLabel${dayNumber}`);

  if (!titleEl || !exerciseEl) {
    alert("Workout elements not found.");
    return;
  }

  const currentTitle = titleEl.textContent;
  const currentExercises = exerciseEl.textContent.replace("Exercises: ", "").split(", ");

  document.getElementById("edit-title-input").value = currentTitle;
  document.getElementById("new-exercise-input").value = "";
  document.getElementById("exercise-list").innerHTML = "";

  tempExerciseList = currentExercises.filter(e => e.trim() !== "");
  tempExerciseList.forEach(ex => renderExerciseItem(ex));

  document.getElementById("edit-popup").style.display = "flex";
  setTimeout(() => {
    document.getElementById("edit-popup").classList.add("show");
  }, 10);
}

function addExercise() {
  const input = document.getElementById("new-exercise-input");
  const exercise = input.value.trim();
  if (exercise) {
    tempExerciseList.push(exercise);
    renderExerciseItem(exercise);
    input.value = "";
  }
}

function renderExerciseItem(exercise) {
  const li = document.createElement("li");
  li.textContent = exercise;

  const deleteBtn = document.createElement("button");
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.style.background = "none";
  deleteBtn.style.border = "none";
  deleteBtn.style.cursor = "pointer";

  const img = document.createElement("img");
  img.src = "images/delete1.png"; // ✅ Local image path
  img.alt = "Delete";
  img.style.width = "auto";
  img.style.height = "25px";

  deleteBtn.appendChild(img);

  deleteBtn.onclick = () => {
    tempExerciseList = tempExerciseList.filter(e => e !== exercise);
    li.remove();
  };

  li.appendChild(deleteBtn);
  document.getElementById("exercise-list").appendChild(li);
}

function saveEdit() {
  const newTitle = document.getElementById("edit-title-input").value.trim();
  if (!currentEditDay || !newTitle || tempExerciseList.length === 0) {
    alert("Please enter a title and at least one exercise.");
    return;
  }

  document.getElementById(`workoutTitle${currentEditDay}`).textContent = newTitle;
  document.getElementById(`exerciseLabel${currentEditDay}`).textContent = `Exercises: ${tempExerciseList.join(", ")}`;

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const key = `workouts_${loggedInUser}`;
    const workouts = JSON.parse(localStorage.getItem(key)) || [];
    const index = workouts.findIndex(w => w.day === currentEditDay);
    if (index !== -1) {
      workouts[index].title = newTitle;
      workouts[index].exercises = tempExerciseList;
      localStorage.setItem(key, JSON.stringify(workouts));
    }
  }

  closeEditPopup();
}

function closeEditPopup() {
  document.getElementById("edit-popup").classList.remove("show");
  setTimeout(() => {
    document.getElementById("edit-popup").style.display = "none";
  }, 300);
}