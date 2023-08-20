const eadDueDate = new Date("Jun 28, 2025 00:00:00").getTime();
const now = new Date().getTime();

const distance = eadDueDate - now;
const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
document.getElementById("y-1").innerHTML = 0;
const yearsSecondDigit = years % 10;
document.getElementById("y-2").innerHTML = yearsSecondDigit;

let months = Math.floor(
  (distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
);
if (years > 0) months += 12;
const monthsFirstDigit = Math.floor(months / 10);
document.getElementById("m-1").innerHTML =
  monthsFirstDigit > 0 ? monthsFirstDigit : 0;
const monthsSecondDigit = months % 10;
document.getElementById("m-2").innerHTML = monthsSecondDigit;

let days = Math.floor(
  (distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
);
while (days >= 30) {
  days -= 30;
}
const daysFirstDigit = Math.floor(days / 10);
document.getElementById("d-1").innerHTML =
  daysFirstDigit > 0 ? daysFirstDigit : 0;
const daysSecondDigit = days % 10;
document.getElementById("d-2").innerHTML = daysSecondDigit;

// Display the result in the element with id="demo"
document.getElementById("countdown").innerHTML =
 months + " months " + days + " days ";
