interface InterfaceLocation {
  name: string;
  url: string;
}

export interface InterfaceCharacter {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "Uknown";
  species: string;
  gender: "Male" | "Female";
  type: string;
  url: string;
  image: string;
  episode: string[];
  location: InterfaceLocation;
  origin: InterfaceLocation;
}
