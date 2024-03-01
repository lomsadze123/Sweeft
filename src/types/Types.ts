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
