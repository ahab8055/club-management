const loginButton = document.getElementById("submit-button");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter all fields");
    return;
  }

  const data = {
    email,
    password,
  };

  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        alert("Login Success");
        window.location.href = "/home";
        console.log(data);
      }
    })
    .catch((err) => console.log(err));
});
