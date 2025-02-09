const signUpButton = document.getElementById("SignUpButton2");

signUpButton.addEventListener("click", SignUp);

function SignUp(event) {
    event.preventDefault();

    const username = document.getElementById("Username").value;
    const email = document.getElementById("Mail2").value;
    const password = document.getElementById("Pass2").value;

    if (username.length === 0) {
        alert("Username can't be empty");
        return;
    }
    if (email.length === 0) {
        alert("Email address can't be empty");
        return;
    }
    if (password.length === 0) {
        alert("Password field can't be empty");
        return;
    }

    axios.post("http://localhost:3000/SignUp", {
        Name: username,
        Email: email,
        Password: password
    })
        .then((response) => {
            if (response.data === "exists") {
                alert("Email already exists, please log in..");
                return;
            }
            if (response.data === "success") {
                alert("Sign-up successful!");
                window.location.href = "/Entry-Page.html";
            }
        });
};
