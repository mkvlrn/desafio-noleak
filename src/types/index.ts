export interface HeatmapEntry {
  hash: string;
  data: {
    url: string;
    downloadUrl: string;
    timestamp: number;
    searchTerm: string;
    width: number;
    height: number;
  };
}
