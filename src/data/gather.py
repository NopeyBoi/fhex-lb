import requests
import json

api_key = "?api_key=85c5e272-e9bf-4c81-91b5-ae6db61407a0"

user_data = {}
track_data = {}

def get_api_path(track = ""):
  version = 3
  track_string = ""
  if track != "":
    version = 2;
    track_string = f"/{track}/withusernames"
  return f"http://frosthex.com:30050/api/v{version}/readonly/tracks{track_string}{api_key}"

def get_track_info(track_name, count, max_count):
  print(f"Got info from {track_name}! ({count}/{max_count})")
  return requests.get(get_api_path(track_name)).json()

def calc_pp(self_ticks, sr_ticks):
  return 100 * pow(0.985, (self_ticks - sr_ticks) / (sr_ticks / 2000))

def gather_data():
  tracks = requests.get(get_api_path()).json()
  count = 1
  track_count = tracks["number"]
  for track in tracks["tracks"]:
    track_info = get_track_info(track["command_name"], count, track_count)
    sr = track_info["top_list"][0]
    track_data[track["command_name"]] = {}
    track_data[track["command_name"]]["command_name"] = track["command_name"]
    track_data[track["command_name"]]["display_name"] = track["display_name"]
    track_data[track["command_name"]]["date_created"] = track["date_created"]
    track_data[track["command_name"]]["type"] = track["type"]
    track_data[track["command_name"]]["open"] = track["open"]
    track_data[track["command_name"]]["owner"] = track["owner"]
    track_data[track["command_name"]]["tags"] = track["tags"]
    track_data[track["command_name"]]["records"] = []
    record_pos = 1
    for user in track_info["top_list"]:
      if user["username"] in user_data:
        user_data[user["username"]]["pp"] += calc_pp(user["time"] / 20, sr["time"] / 20)
        user_data[user["username"]]["records"].append({
          "track_name": track["display_name"],
          "position": record_pos,
          "pp": calc_pp(user["time"] / 20, sr["time"] / 20)
        })
      else:
        user_data[user["username"]] = {}
        user_data[user["username"]]["username"] = user["username"]
        user_data[user["username"]]["pp"] = calc_pp(user["time"] / 20, sr["time"] / 20)
        user_data[user["username"]]["uuid"] = user["player_uuid"]
        user_data[user["username"]]["records"] = []
      track_data[track["command_name"]]["records"].append({
        "username": user["username"],
        "pp": calc_pp(user["time"] / 20, sr["time"] / 20),
        "uuid": user["player_uuid"],
        "time": user["time"]
      })
      record_pos += 1
    count += 1
    if count > 4:
      return

gather_data()
with open("user_data.json", "w") as file:
  file.write(json.dumps(user_data))
  print("Saved user_data.json")
with open("track_data.json", "w") as file:
  file.write(json.dumps(track_data))
  print("Saved track_data.json")
