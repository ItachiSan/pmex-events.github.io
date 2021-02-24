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

// Helper function for parsing the dates
function formatDate(string) {
  let date = new Date(string);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Parse stuff
let rumor = {};
let field_count = 0;

for (let line of lines) {
  // Skip empty lines
  if (line.length < 1) continue;

  switch (field_count) {
    case 3:
      // Add the rumor
      //console.log(JSON.stringify(rumor));
      new_rumors.push(rumor);
      // Reset counters / temporary storages
      rumor = {};
      field_count = 0;
    // Don't break, so we can fall in the next case
    case 0:
      rumor["name"] = [line];
    case 1:
      rumor["date"] = formatDate(line);
    case 2:
      rumor["expires"] = formatDate(line);
    default:
      field_count += 1;
  }
  // console.log(line);
}

if ("name" in rumor && "date" in rumor && "expires" in rumor) {
  new_rumors.push(rumor);
} else {
  console.log("! The last rumor was wrongly formatted. Verify the input file!");
}

console.log(`New ${new_rumors.length} rumors`);

// Now dump to file
let new_rumors_content = JSON.stringify(new_rumors, null, 2);
let rumor_json_path = path.join(pwd, rumor_json);

fs.writeFileSync(rumor_json_path, new_rumors_content);

console.log(`Rumors written to ${rumor_json_path}`);
