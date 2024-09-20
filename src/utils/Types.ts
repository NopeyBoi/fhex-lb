export type TrackOverviewData = {
  command_name: string;
  display_name: string;
  date_created: number;
  record_count: number;
  cheated_sr: string;
};

export type UserOverviewData = {
  username: string;
  pp: number;
  uuid: string;
  record_count: number;
};

export type TrackRecordData = {
  pp: number;
  uuid: string;
  username: string;
  time: number;
  position: number;
};

export type UserRecordData = {
  track_name: string;
  command_name: string;
  position: number;
  pp: number;
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

export type UserData = {
  username: string;
  pp: number;
  uuid: string;
  records: UserRecordData[];
};

export type CheatSuspicionData = {
  username: string;
  track_name: string;
  reason: string;
};
