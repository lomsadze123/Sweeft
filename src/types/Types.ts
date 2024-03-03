export interface Image {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
  downloads: number;
  likes: number;
  views: number;
}

export interface Cache {
  [key: string]: {
    [page: number]: Image[];
  };
}

export interface Query {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export interface ClickIdContextType {
  clickId: string;
  setClickId: (id: string) => void;
}
