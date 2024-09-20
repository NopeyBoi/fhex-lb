"""
Data gathering script for fhex.nopey.online.
Made by.. Nopey. (duh)
"""

import json
import requests
from colorama import Fore

API_KEY = "?api_key=85c5e272-e9bf-4c81-91b5-ae6db61407a0"

user_overview_data = {}
user_specific_data = {}
track_overview_data = {}
track_specific_data = {}
cheat_suspicion_data = {}

def get_api_path(track = ""):
    """Create the API path based on the specified track"""
    version = 3
    track_string = ""
    if track != "":
        version = 2
        track_string = f"/{track}/withusernames"
    return f"http://frosthex.com:30050/api/v{version}/readonly/tracks{track_string}{API_KEY}"

def get_track_info(track_name, count, max_count):
    """Request and return the track info"""
    print(f"{Fore.GREEN}[INFO]{Fore.WHITE} Got info from {Fore.LIGHTYELLOW_EX}{track_name}{Fore.WHITE}! ({count}/{max_count})")
    return requests.get(get_api_path(track_name)).json()

def calc_pp(self_ticks, sr_ticks):
    """Calculate the pp based on record ticks and server record ticks"""
    return 100 * pow(0.985, (self_ticks - sr_ticks) / (sr_ticks / 2000))

def save_file(file_path, data):
    """Save data to a file"""
    with open(file_path, "w") as file:
        file.write(data)
        print(f"{Fore.CYAN}[DATA]{Fore.WHITE} Saved {Fore.LIGHTYELLOW_EX}{file_path}{Fore.WHITE}.")

def gather_data():
    """Gathering all the necessary data"""
    tracks = requests.get(get_api_path()).json()
    track_count = tracks["number"]
    # Go through all tracks
    for i, track in enumerate(tracks["tracks"], start=1):
        track_info = get_track_info(track["command_name"], i, track_count)
        if len(track_info["top_list"]) == 0:
            print(f"{Fore.YELLOW}[WARNING]{Fore.LIGHTYELLOW_EX} No records found on {track['command_name']}!{Fore.WHITE}")
            continue
        sr = track_info["top_list"][0]

        track_overview_data.update({track["command_name"]: {
            "command_name": track["command_name"],
            "display_name": track["display_name"],
            "date_created": track["date_created"],
            "record_count": len(track_info["top_list"])
        }})

        if len(track_info["top_list"]) > 1:
          second = track_info["top_list"][1]
          if sr["time"] / second["time"] < 0.8:
            cheat_suspicion_data.update({sr["username"]: {
                "username": sr["username"],
                "track_name": track["command_name"],
                "reason": "SERVER_RECORD"
            }})

        track_specific_data.update({track["command_name"]: {
            "command_name": track["command_name"],
            "display_name": track["display_name"],
            "date_created": track["date_created"],
            "type": track["type"],
            "open": track["open"],
            "owner": track["owner"],
            "tags": track["tags"],
            "records": []
        }})

        # Go through all records in the current track
        for position, record in enumerate(track_info["top_list"], start=1):
            if record["username"] in user_overview_data:
                user_overview_data[record["username"]]["pp"] += calc_pp(record["time"] / 20, sr["time"] / 20)
                user_overview_data[record["username"]]["record_count"] += 1
                user_specific_data[record["username"]]["pp"] = user_overview_data[record["username"]]["pp"]
                user_specific_data[record["username"]]["records"].append({
                    "track_name": track["display_name"],
                    "command_name": track["command_name"],
                    "position": position,
                    "pp": calc_pp(record["time"] / 20, sr["time"] / 20)
                })
            else:
              user_overview_data.update({record["username"]: {
                  "username": record["username"],
                  "pp": calc_pp(record["time"] / 20, sr["time"] / 20),
                  "uuid": record["player_uuid"],
                  "record_count": 1
              }})
              user_specific_data.update({record["username"]: {
                  "username": record["username"],
                  "pp": calc_pp(record["time"] / 20, sr["time"] / 20),
                  "uuid": record["player_uuid"],
                  "records": [{
                      "track_name": track["display_name"],
                      "command_name": track["command_name"],
                      "position": position,
                      "pp": calc_pp(record["time"] / 20, sr["time"] / 20)
                  }]
              }})

            track_specific_data[track["command_name"]]["records"].append({
                "username": record["username"],
                "pp": calc_pp(record["time"] / 20, sr["time"] / 20),
                "uuid": record["player_uuid"],
                "time": record["time"],
                "position": position
            })

        save_file(f"tracks/{track['command_name']}.json", json.dumps(track_specific_data[track["command_name"]]))
        #if i > 4:
        #    return

gather_data()

for user in user_specific_data.items():
    if user[1]["pp"] / len(user[1]["records"]) > 80:
        cheat_suspicion_data.update({user[0]: {
            "username": user[0],
            "track_name": "",
            "reason": "HIGH_AVERAGE"
        }})
    save_file(f"users/{user[0]}.json", json.dumps(user_specific_data[user[0]]))

save_file("user_overview.json", json.dumps(user_overview_data))
save_file("track_overview.json", json.dumps(track_overview_data))
save_file("cheat_suspicions.json", json.dumps(cheat_suspicion_data))
