let billValue = document.getElementById("bill");
let num_People = document.getElementById("number_of_people");

let tipPerPersonEl = document.getElementById("tip-per-person");
let totalPerPersonEl = document.getElementById("total-per-person");

let buttons = document.querySelectorAll('.btn');

let resetButton = document.getElementById("reset");

let tipPercentage_Value = undefined;

buttons.forEach((button) => {
  button.addEventListener('click', handleClick);
});

function handleClick(event) {
  buttons.forEach((button) => {

    button.classList.remove('active_btn');

    if (event.target.value == button.value)
    {
      button.classList.add('active_btn');
      tipPercentage_Value = parseFloat(button.value);
    }
  });

  calculation()
}

let CustomInput = document.getElementById("custom_input");

CustomInput.addEventListener("input", () => {
  let values = parseFloat(CustomInput.value);

  if (values < 100) {
    tipPercentage_Value = values;
    calculation();
  }
});

function resetButtonEnable() {
  if (billValue.value == "" || num_People.value == "") {
    resetButton.disabled = true;
    resetButton.classList.remove("enable");
    resetButton.classList.add("disable");
  } else {
    resetButton.disabled = false;
    resetButton.classList.remove("disable");
    resetButton.classList.add("enable");

    if (resetButton.disabled == false) {
      resetButton.addEventListener("click", () => {
        tipPerPersonEl.textContent = "$0.00";
        totalPerPersonEl.textContent = "$0.00";

        billValue.value = "";
        num_People.value = "";

        CustomInput.value = "";

        resetButton.disabled = true;

        resetButtonEnable();
      });
    }
  }
}

function calculation() {
  if (billValue.value != "" && num_People.value != "") {
    resetButtonEnable();
    let tip_decimal = tipPercentage_Value / 100;

    let tipAmount = parseFloat(billValue.value) * tip_decimal;

    let tip_per_person = tipAmount / parseFloat(num_People.value);

    let total_per_person =
      (tipAmount + parseFloat(billValue.value)) / parseFloat(num_People.value);

    tipPerPersonEl.textContent = "$" + tip_per_person.toFixed(2);
    totalPerPersonEl.textContent = "$" + total_per_person.toFixed(2);
  } else {
    resetButtonEnable();
  }

  let errorMesssage = document.querySelector(".error");

  if (num_People.value == "" || num_People.value == 0) {
    errorMesssage.classList.add("show");
    num_People.classList.add('error_input');

    num_People.addEventListener("input", calculation);
  } else {
    errorMesssage.classList.remove("show");
    num_People.classList.remove('error_input');

    num_People.removeEventListener("input", calculation);
  }
}
