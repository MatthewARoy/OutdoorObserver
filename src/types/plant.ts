export interface PlantPart {
  id: string;
  name: string;
  description: string;
  learnedFact: string;
}

export interface Plant {
  id: string;
  commonName: string;
  scientificName: string;
  imageUri: string;
  description: string;
  parts: PlantPart[];
  funFact: string;
}
