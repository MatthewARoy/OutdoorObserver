import { GardenEntry } from '@/src/types';

export const mockGardenEntries: GardenEntry[] = [
  {
    id: 'entry-1',
    plantId: 'plant-strawberry',
    lessonId: 'lesson-reproduction',
    collectedAt: '2026-02-15T10:30:00Z',
    photoUri: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
    badges: [
      { id: 'b1', label: 'flower', iconName: 'flower-outline', color: '#E8956D', earned: true },
      { id: 'b2', label: 'fruit/flower', iconName: 'nutrition-outline', color: '#E8956D', earned: true },
      { id: 'b3', label: 'roots', iconName: 'git-branch-outline', color: '#E8956D', earned: true },
    ],
    keyPointsLearned: [
      'Strawberry flowers have both male and female parts',
      'The "seeds" on a strawberry are actually the true fruits',
      'Runners help strawberry plants spread to new areas',
    ],
    personalNotes: 'Found these growing in the community garden. The flowers were so tiny!',
    mediaItems: [
      { id: 'm1', type: 'photo', uri: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200' },
      { id: 'm2', type: 'photo', uri: 'https://images.unsplash.com/photo-1543528176-61b239494933?w=200' },
    ],
  },
  {
    id: 'entry-2',
    plantId: 'plant-daisy',
    lessonId: 'lesson-reproduction',
    collectedAt: '2026-02-20T14:15:00Z',
    photoUri: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400',
    badges: [
      { id: 'b4', label: 'Photosynthesis', iconName: 'sunny-outline', color: '#E8956D', earned: true },
      { id: 'b5', label: 'stomata', iconName: 'ellipse-outline', color: '#E8956D', earned: true },
    ],
    keyPointsLearned: [
      'Daisies are actually composed of hundreds of tiny flowers',
      'Ray florets attract pollinators while disc florets produce seeds',
    ],
    personalNotes: 'Found a patch of daisies in the park. They really do close at night!',
    mediaItems: [
      { id: 'm3', type: 'photo', uri: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200' },
    ],
  },
  {
    id: 'entry-3',
    plantId: 'plant-fern',
    lessonId: 'lesson-lifecycles',
    collectedAt: '2026-02-25T09:45:00Z',
    photoUri: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?w=400',
    badges: [
      { id: 'b6', label: 'spores', iconName: 'sparkles-outline', color: '#E8956D', earned: true },
      { id: 'b7', label: 'fronds', iconName: 'leaf-outline', color: '#E8956D', earned: true },
    ],
    keyPointsLearned: [
      'Ferns reproduce through spores, not seeds',
      'Fiddleheads are coiled young fronds about to unfurl',
      'Ferns are some of the oldest plants on Earth',
    ],
    personalNotes: 'Amazing to think these plants have been around for 360 million years.',
    mediaItems: [
      { id: 'm4', type: 'photo', uri: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?w=200' },
      { id: 'm5', type: 'video', uri: 'placeholder' },
    ],
  },
];
