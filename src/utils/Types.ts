export type TrackOverviewData = {
  command_name: string;
  display_name: string;
  date_created: number;
  record_count: number;
};

export type UserOverviewData = {
  username: string;
  pp: number;
  uuid: string;
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
