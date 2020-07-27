import UserInput from "./components/userInput";

window.addEventListener("DOMContentLoaded", function () {
  const input = UserInput();

  input.onStart(listener);
});

function listener(): void {
  // Here, the HTML DOM is OK and User Clicked on Button "Start"
}
