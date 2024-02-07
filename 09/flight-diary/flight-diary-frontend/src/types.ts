export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface Entry {
  id?: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<Entry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<Entry, 'comment'>;
