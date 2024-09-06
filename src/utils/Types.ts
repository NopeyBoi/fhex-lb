export type TrackRecordData = {
  pp: number;
  uuid: string;
  username: string;
  time: number;
};

export type TrackData = {
  command_name: string;
  display_name: string;
  date_created: number;
  type: string;
  open: boolean;
  owner: string;
  tags: string[];
  records: TrackRecordData[];
};

export type UserRecordData = {
  position: number;
  pp: number;
  track_name: string;
};

export type UserData = {
  pp: number;
  username: string;
  uuid: string;
  records: UserRecordData[];
};
