const signIn = document.getElementById("SignInButton");
const signUp = document.getElementById("SignUpButton");

signIn.addEventListener("click", Entry);
signUp.addEventListener("click", redirectToSignUp);

function redirectToSignUp(event) {
    event.preventDefault();
    window.location.href = "Sign-Up.html"; // direct to the Sign-Up page
}

function Entry(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email.length === 0) {
        alert("Email address can't be empty");
        return;
    }

    if (password.length === 0) {
        alert("Password field can't be empty");
        return;
    }

    axios.post("http://localhost:3000/SignIn", {
        Email: email,
        Password: password
    })
        .then((response) => {
            if (response.data === "notFound") {
                alert("No user found, Must sign up...");
                return;
            }
            if (response.data === "wrongPass") {
                alert("Email or Password incorrect...");
                return;
            }
            if (response.data === "ok") {
                localStorage.setItem("currentUser", email);
                window.location.href = "/Shop.html";
            }

        });
}


