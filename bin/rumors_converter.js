"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

// "Configuration keys"
let rumor_log_file = "events.log";
let rumor_json = "new_rumors.json";

// Resolve the file path
let pwd = path.dirname(__filename);
let rumor_log_path = path.join(pwd, rumor_log_file);

console.log(`Reading file: ${rumor_log_path}`);

// Using this as having all the rest in a callback looked back for this
// simple script
let rumor_buffer = fs.readFileSync(rumor_log_path);

// Get a string out of the buffer
let rumor_data = rumor_buffer.toString();

// Split over the newline character
let lines = rumor_data.split(os.EOL);

// Prepare the recipient structure
let new_rumors = [];

// Allow toggling format parsing between the easy and the odd format
const easy_format = true;
// Helper function for parsing the dates
function formatDate(input_string) {
  // Handle the new Discord output, if needed
  if (input_string.includes(": "))
    input_string = input_string.split(": ")[1].trim();

  // Handle accepted undefined dates
  if (input_string === "TBA") return input_string;

  /*
  Handle the new format.
  From:
  YEAR-MONTH-DAY TIME 'UTC'
  it became
  DAY-MONTH-YEAR TIME
  Revert it to the original as that is super good as input for Date()
  */
  let date;
  if (easy_format) date = new Date(input_string);
  else {
    let [day, hour] = input_string.split(" ");
    day = day.split("-").reverse().join("-");
    hour = hour + " UTC";
    date = new Date(`${day} ${hour}`);
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatEventTitle(title) {
  return title.replace("×", "x").replace("’", "'");
}

// Parse stuff
let rumor = {};
let field_count = 0;

for (let line of lines) {
  // Skip empty or commented lines
  if (line.trim().length < 1 || line.startsWith("//")) continue;

  switch (field_count) {
    case 3:
      // Add the rumor
      //console.log(JSON.stringify(rumor));
      new_rumors.push(rumor);
      // Reset counters / temporary storages
      rumor = {};
      field_count = 0;
    // Don't break, so we can fall in the next case
    // eslint-disable-next-line no-fallthrough
    case 0:
      rumor["name"] = [formatEventTitle(line)];
      break;
    case 1:
      rumor["date"] = formatDate(line);
      break;
    case 2:
      rumor["expires"] = formatDate(line);
      break;
    default:
      throw new Error(
        `Unexpected case with count ${field_count} and line ${line}`
      );
  }
  field_count += 1;
  // console.log(line);
}

if ("name" in rumor && "date" in rumor && "expires" in rumor) {
  new_rumors.push(rumor);
} else {
  console.log("! The last rumor was wrongly formatted. Verify the input file!");
}

console.log(`New ${new_rumors.length} rumors`);

// First sort the rumors
new_rumors.sort(function (event1, event2) {
  if (event1.date === event2.date) {
    return event1.expires - event2.expires;
  } else {
    return event1.date - event2.date;
  }
});

// Now dump to file
let new_rumors_content = JSON.stringify(new_rumors, null, 2);
let rumor_json_path = path.join(pwd, rumor_json);

fs.writeFileSync(rumor_json_path, new_rumors_content);

console.log(`Rumors written to ${rumor_json_path}`);
