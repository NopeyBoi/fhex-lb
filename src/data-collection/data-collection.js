import fs from "fs";

const api_path = "http://frosthex.com:30050/api/v3/readonly/tracks";
const api_key = "?api_key=85c5e272-e9bf-4c81-91b5-ae6db61407a0";

var user_data = {};
var track_data = {};

function _get_api_path(track = "") {
  var version = 3;
  var track_string = "";
  if (track != "") {
    version = 2;
    track_string = "/" + track + "/withusernames";
  }
  return "http://frosthex.com:30050/api/v" + version + "/readonly/tracks" + track_string + api_key;
}

async function _request(url) {
  try {
    const data = await fetch(url).then((res) => res.json());
    return data;
  } catch (err) {}
  return null;
}

async function get_track_info(track_name, count, max_count) {
  const track = await _request(_get_api_path(track_name));
  console.log("Got info from " + track_name + "! (" + count + "/" + max_count + ")");
  return track;
}

function calcPP(self_ticks, sr_ticks) {
  return 100 * 0.985 ** ((self_ticks - sr_ticks) / (sr_ticks / 2000));
}

async function gather_data() {
  const tracks = await _request(_get_api_path());
  var count = 1;
  var track_count = tracks.number;
  for (const track of tracks.tracks) {
    var track_info = await get_track_info(track.command_name, count, track_count);
    var sr = track_info.top_list[0];
    track_data[track.command_name] = {};
    track_data[track.command_name]["command_name"] = track.command_name;
    track_data[track.command_name]["display_name"] = track.display_name;
    track_data[track.command_name]["date_created"] = track.date_created;
    track_data[track.command_name]["type"] = track.type;
    track_data[track.command_name]["open"] = track.open;
    track_data[track.command_name]["owner"] = track.owner;
    track_data[track.command_name]["tags"] = track.tags;
    track_data[track.command_name]["records"] = [];
    for (const user of track_info.top_list) {
      if (user.username in user_data) {
        user_data[user.username]["pp"] += calcPP(user.time / 20, sr.time / 20);
      } else {
        user_data[user.username] = {};
        user_data[user.username]["username"] = user.username;
        user_data[user.username]["pp"] = calcPP(user.time / 20, sr.time / 20);
        user_data[user.username]["uuid"] = user.player_uuid;
      }
      track_data[track.command_name]["records"].push(user_data[user.username]);
    }
    count++;
    //if (count >= 2) return;
  }
}

// Getting the info here
await gather_data();
var user_json_string = JSON.stringify(user_data);
fs.writeFileSync("src/assets/fhex_data/user_data.json", user_json_string);
var track_json_string = JSON.stringify(track_data);
fs.writeFileSync("src/assets/fhex_data/track_data.json", track_json_string);
