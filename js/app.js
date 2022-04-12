"use strict";
/**
 * WEB222 - Final Assesment
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 *      Name:       <Aaron Meek>
 *      Student ID: <121258164>
 *      Date:       <12/04/2022>
 */

const { basic_info, cities, education, experience } = window;
const date_element = document.getElementById("date");
const radios = document.getElementsByName("reason");
const date = new Date();
const css_mock_modol = "mock-modol";
const css_center_text = "center-text";
const css_styled_table = "styled-table";
const css_cursors = [];
let cursor_switch = true;
let hourlyRateElement = false;

/*           FUNCTIONS           */

/********** called once **********/
// fills the experience table
function loadEduTable(edu) {
  const t_body = document.getElementById("education");

  edu.forEach((e) => {
    const tr = t_body.appendChild(document.createElement("tr"));
    const td = tr.appendChild(document.createElement("td"));
    const div = td.appendChild(document.createElement("div"));
    const table = div.appendChild(document.createElement("table"));
    let edu_row = null;

    // I don't enjoy using the innerHTML attribute like this, but I've no time :)
    table.innerHTML = `
      <thead>
        <td>_________________</td>
        <td>___________________________</td>
      </thead>
    `;

    edu_row = table.appendChild(document.createElement("tr"));
    edu_row.innerHTML = `
      <td><b>RESOURCE:</b></td>
      <td>${e.res}</td>
    `;

    edu_row = table.appendChild(document.createElement("tr"));

    if (e.link) {
      edu_row.innerHTML = `
        <td><b>PROGRAM:</b></td>
        <td>
          <a
            target="_blank"
            href="${e.link}"
            >
              ${e.prog}
          </a>
        </td>
      `;
    } else {
      edu_row.innerHTML = `
        <td><b>PROGRAM:</b></td>
        <td>${e.prog}</td>
      `;
    }

    edu_row = table.appendChild(document.createElement("tr"));
    edu_row.innerHTML = `
      <td><b>CREDENTIAL:</b></td>
      <td>${e.cred}</td>
    `;

    edu_row = table.appendChild(document.createElement("tr"));
    edu_row.innerHTML = `
      <td><b>STATUS:</b></td>
      <td>${e.stat}</td>
    `;

    div.className = css_mock_modol;
    table.className = css_styled_table;
  });
}

// fills the educaiton table
function loadExpTable(exp) {
  const t_body = document.getElementById("experience");

  exp.forEach((e) => {
    const tr = t_body.appendChild(document.createElement("tr"));
    const td = tr.appendChild(document.createElement("td"));
    const div = td.appendChild(document.createElement("div"));
    const span = div.appendChild(document.createElement("span"));
    span.innerText = e.def;

    e.pos.forEach((pos) => {
      let info = null;
      if (pos.link) {
        div.innerHTML += `
          <br />
          <a
            target="_blank"
            href="${pos.link}"
            >
            ${pos.title}
          </a>
        `;
      } else {
        div.innerHTML += `
          <br />
          <span>${pos.title}</span>
          <p>${e.desc}</p>
        `;
      }
    });

    span.innerText = e.def;
    div.className = `${css_mock_modol} ${css_center_text}`;
  });
}

// loads basic info about me
function loadBasicInfo(info) {
  const table = document.getElementById("about-me");

  Object.keys(info).forEach((key) => {
    let tr = document.getElementById(key);
    let td = tr.appendChild(document.createElement("td"));
    td.innerText = info[key];
  });
}

// loads cities from cities.js into the form datalist
function loadCities(cty) {
  const list = document.getElementById("dat-city");

  Object.keys(cty).forEach((key) => {
    list.appendChild(document.createElement("option")).value = cty[key];
  });
}

// retrieves all the elements with curs-on ids
function getAllCursorEls(cursors) {
  let loaded = 0;
  for (let i = 0; i < document.getElementsByTagName("span").length; i++) {
    if (document.getElementsByTagName("span")[i].id == "curs-on") {
      cursors[loaded] = document.getElementsByTagName("span")[i];
      loaded++;
    }
  }
}

// ups the Date...
function upDate(date, element) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  element.innerHTML = `Current Date: ${day}/${month}/${year}`;
}

function radioListeners(rads) {
  rads.forEach((e) => {
    e.addEventListener("click", appearHourlyRate);
  });
}

function appearHourlyRate() {
  if (this.id === "dat-hiring" && hourlyRateElement === false) {
    const new_node = document.createElement("label");
    const input = document.createElement("input");

    new_node.id = "hourly-label";
    new_node.setAttribute("for", "dat-hourly");
    new_node.innerHTML = "Hourly Rate<r>*</r>";

    input.id = "dat-hourly";
    input.setAttribute("name", "hourly-rate");
    input.setAttribute("pattern", "[$][0-9]{3}");
    input.setAttribute("value", "$");
    input.setAttribute("required", true);

    this.after(new_node);
    new_node.after(input);

    hourlyRateElement = true;
  } else if (this.id !== "dat-hiring" && hourlyRateElement === true) {
    document.getElementById("hourly-label").remove();
    document.getElementById("dat-hourly").remove();
    hourlyRateElement = false;
  }
}

/********** called over **********/
// i still dislike console.log
const print = (e) => console.log(e);

// switches the cursors on and off
const updateCursors = setInterval(() => {
  if (cursor_switch === true) {
    css_cursors.forEach((e) => {
      e.innerText = "> ";
    });
    cursor_switch = false;
  } else if (cursor_switch === false) {
    css_cursors.forEach((e) => {
      e.innerText = "> I";
    });
    cursor_switch = true;
  }
}, 550);

/********** LOGIC **********/
// or again, lack there of
css_cursors.length = document.getElementsByTagName("span").length;
document.getElementById("contact-me").addEventListener("click", () => {
  document.getElementById("dat-msg").focus(); // this is just a cheap trick I'm using to force the page lower than the input box I actually want to focus
  document.getElementById("dat-name").focus(); // this is the box I want to focus
});

getAllCursorEls(css_cursors);
loadExpTable(experience);
loadEduTable(education);
loadBasicInfo(basic_info);
upDate(date, date_element);
loadCities(cities);
radioListeners(radios);
updateCursors;
