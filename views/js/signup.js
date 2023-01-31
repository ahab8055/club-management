const signupButton = document.getElementById("submit-button");

signupButton.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password || !name) {
    alert("Please enter all fields");
    return;
  }

  const data = {
    name,
    email,
    password,
  };

  fetch("/api/signup", {
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
        window.location.href = "/";
        console.log(data);
      }
    })
    .catch((err) => console.log(err));
});
