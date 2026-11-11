const countdownNode = document.querySelector("#countdown");
const resendButton = document.querySelector("#resend-button");
const statusMessage = document.querySelector("#status-message");
const emailDisplay = document.querySelector("#email-display");
const changeEmailDialog = document.querySelector("#change-email-dialog");
const signInDialog = document.querySelector("#sign-in-dialog");
const changeEmailForm = document.querySelector("#change-email-form");
const signInForm = document.querySelector("#sign-in-form");
const newEmailInput = document.querySelector("#new-email");
const signInEmail = document.querySelector("#sign-in-email");
const signInPassword = document.querySelector("#sign-in-password");
const signInNote = document.querySelector("#sign-in-note");
let secondsRemaining = 59;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function announce(message) {
  statusMessage.textContent = message;
}

countdownNode.textContent = formatTime(secondsRemaining);
window.setInterval(() => {
  if (secondsRemaining > 0) secondsRemaining -= 1;
  countdownNode.textContent = formatTime(secondsRemaining);
}, 1000);

resendButton.addEventListener("click", () => {
  if (secondsRemaining > 0) {
    announce(`You can resend the verification email in ${formatTime(secondsRemaining)}.`);
    return;
  }
  secondsRemaining = 59;
  countdownNode.textContent = formatTime(secondsRemaining);
  announce("A new verification email was requested.");
});

document.querySelector("#change-email-trigger").addEventListener("click", () => {
  newEmailInput.value = emailDisplay.textContent.trim();
  changeEmailDialog.showModal();
  window.setTimeout(() => newEmailInput.focus(), 0);
});

changeEmailForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = newEmailInput.value.trim();
  if (!email) return;
  emailDisplay.textContent = email;
  signInEmail.value = email;
  changeEmailDialog.close();
  announce(`Email address updated to ${email}.`);
});

document.querySelector("#sign-in-trigger").addEventListener("click", () => {
  signInEmail.value = emailDisplay.textContent.trim();
  signInDialog.showModal();
  window.setTimeout(() => signInEmail.focus(), 0);
});

signInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signInPassword.value = "";
  signInNote.hidden = false;
});

signInDialog.addEventListener("close", () => {
  signInPassword.value = "";
  signInNote.hidden = true;
});
document.querySelectorAll(".modal").forEach((dialog) => {

  dialog.querySelectorAll(".modal-close, .modal-cancel").forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
