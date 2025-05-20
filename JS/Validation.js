const form = document.getElementById("signupForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");      // These lines get references to the form and input fields using their id. You'll use them to read values and add validation styles.
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

function validateInput(input, condition,) {
  if (condition) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");     // This function checks if the input meets the condition
  } else {                                // If it does it adds the green is-valid Bootstrap class.
    input.classList.remove("is-valid");   // If it doesn’t  it shows the red is-invalid class.
    input.classList.add("is-invalid");
  }
}

function checkForm() {                                      //This function runs all your field validations
  validateInput(fullName, fullName.value.trim().length > 0); // Checks if Full Name is not empty
  validateInput(email, /^\S+@\S+\.\S+$/.test(email.value)); // Checks if Email matches a simple email pattern.
  validateInput(password, password.value.length >= 6);     // Checks if Password is at least 6 characters
  validateInput(confirmPassword, password.value.length >= 6 && confirmPassword.value === password.value); //Checks if Confirm Password matches Password.
  validateInput(terms, terms.checked);                   //Checks if Terms checkbox is ticked
}
fullName.addEventListener("input", () =>
  validateInput(fullName, fullName.value.trim().length > 0) //When the user types in the Full Name field, it validates in real time
);
email.addEventListener("input", () =>
  validateInput(email, /^\S+@\S+\.\S+$/.test(email.value))
);
password.addEventListener("input", () =>
  validateInput(password, password.value.length >= 6)
);
confirmPassword.addEventListener("input", () =>
  validateInput(
    confirmPassword,
    password.value.length >= 6 && confirmPassword.value === password.value
  )
);

terms.addEventListener("change", () => validateInput(terms, terms.checked));

form.addEventListener("submit", function (event) { //When the form is submitted
  event.preventDefault();                          //event.preventDefault() stops the form from submitting if there are errors.
  checkForm();                                      //Then checkForm() runs all the validations again.

  if (form.querySelectorAll(".is-invalid").length === 0) {// If there are no errors (.is-invalid fields), show a success message
    alert("Form submitted successfully!");
    form.reset();                              //After successful submission, The form is cleared.All green validation borders (is-valid) are removed.
    form.querySelectorAll(".form-control, .form-check-input").forEach((el) => {
      el.classList.remove("is-valid");
    });
  }
})