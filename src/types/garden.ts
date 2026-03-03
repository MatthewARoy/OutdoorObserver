export interface Badge {
  id: string;
  label: string;
  iconName: string;
  color: string;
  earned: boolean;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  uri: string;
}

export interface GardenEntry {
  id: string;
  plantId: string;
  lessonId: string;
  collectedAt: string;
  photoUri: string;
  badges: Badge[];
  keyPointsLearned: string[];
  personalNotes: string;
  mediaItems: MediaItem[];
}
