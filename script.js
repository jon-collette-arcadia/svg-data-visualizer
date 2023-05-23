console.clear();
/* window.onload = function () {
  let elements = document.body.getElementsByTagName("*");
  for (let i = 0; i < elements.length; i++) {
    let id = elements[i].id;
    if (id) {
      elements[i].setAttribute("data-bs-toggle", "tooltip");
      elements[i].setAttribute("data-bs-title", id);
      elements[i].removeAttribute("class");
    }
  }
};

const stateNames = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};

window.onload = function() {
  let elements = document.body.getElementsByTagName('*');
  for(let i = 0; i < elements.length; i++) {
    let id = elements[i].id;
    if (id && stateNames[id]) {
      elements[i].setAttribute('data-bs-toggle', 'tooltip');
      elements[i].setAttribute('data-bs-title', stateNames[id]);
    }
  }
}

*/

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function toDollarAmount(x) {
  return x.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}
function getColor(value, minValue, maxValue) {
  var hue = (120 * (maxValue - value)) / (maxValue - minValue);
  return `hsl(${hue}, 100%, 50%)`;
}

// setting targets
let usaMap = document.getElementById("usa-map");
let states = usaMap.querySelectorAll("path");

// Make up some data for each state
var stateData = {
  XX: {
    name: "Fakestate",
    population: random(1000, 100000),
    gdp: random(1000, 1000000)
  }
};
function makeData() {
  for (let i = 0; i < states.length; i++) {
    stateData[states[i].id] = {
      name: states[i].dataset.bsTitle,
      population: random(1000, 100000),
      gdp: random(1000, 1000000)
    };
  }
}
makeData();

// get min and max values
var stateDataMax, stateDataMin;

function applyData() {
  stateDataMax = 0;
  stateDataMin = Infinity;
  // applying the data to the tooltips
  for (let i = 0; i < states.length; i++) {
    // set the title package:
    let data = stateData[states[i].id];
    if (data.population < stateDataMin) {
      stateDataMin = data.population;
    }
    if (data.population > stateDataMax) {
      stateDataMax = data.population;
    }

    let title = `<strong>${
      data.name
    }</strong><br>Population: ${data.population.toLocaleString()}<br>GDP: ${toDollarAmount(
      data.gdp
    )}`;
    //clear old attributes
    states[i].setAttribute("title", "");
    new bootstrap.Tooltip(states[i], {
      title: title,
      html: true,
      template:
        '<div class="tooltip tooltip-left" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
  }
}
applyData();

function colorizeData() {
  // coloring the states
  for (let i = 0; i < states.length; i++) {
    states[i].style.fill = getColor(
      stateData[states[i].id].population,
      stateDataMax,
      stateDataMin
    );
  }
}
colorizeData();

function randomDataReapply() {
  resetStates();
  makeData();
  applyData();
  colorizeData();
}

// 'fix' SVG z-index on hover
states.forEach((states) => {
  states.addEventListener("mouseenter", (e) => {
    usaMap.appendChild(states);
  });
});

function svgZoom() {
  // Get the SVG element
  let svg = document.getElementById("usa-map");

  // Initialize the bounds to a large value
  let minX = Number.MAX_VALUE,
    minY = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE,
    maxY = Number.MIN_VALUE;

  // Loop over all child elements of the SVG
  for (let i = 0; i < svg.childNodes.length; i++) {
    let child = svg.childNodes[i];

    // Ignore if child is not an SVGElement (like text nodes) or if it has the 'd-none' class
    if (!(child instanceof SVGElement) || child.classList.contains("d-none"))
      continue;

    // Get the bounding box of the current child element
    let bbox = child.getBBox();

    // Update bounds
    minX = Math.min(minX, bbox.x);
    minY = Math.min(minY, bbox.y);
    maxX = Math.max(maxX, bbox.x + bbox.width);
    maxY = Math.max(maxY, bbox.y + bbox.height);
  }
  // add some padding to the final output
  let padding = 10;
  minX -= padding;
  minY -= padding;
  maxX += padding;
  maxY += padding;

  // Update the SVG viewbox to contain all elements
  svg.setAttribute("viewBox", `${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
}
svgZoom();

function showRandomState() {
  // -1 to adjust for the array
  let state = random(0, states.length - 1);
  for (let i = 0; i < states.length; i++) {
    states[i].classList.add("d-none");
  }
  states[state].classList.remove("d-none");
  svgZoom();
}
for (let i = 0; i < states.length; i++) {
  states[i].addEventListener("click", function () {
    showClickedState(this);
    console.log(this);
  });
}
function showClickedState(event) {
  let state = document.getElementById(event.id);
  // hide the tooltip
  var instance = bootstrap.Tooltip.getInstance(state);
  instance.hide();
  // hide all states, show state, update zoom
  for (let i = 0; i < states.length; i++) {
    states[i].classList.add("d-none");
  }
  state.classList.remove("d-none");
  svgZoom();
}
function resetStates() {
  for (let i = 0; i < states.length; i++) {
    states[i].classList.remove("d-none");
  }
  svgZoom();
}