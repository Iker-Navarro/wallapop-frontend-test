export interface FilterEvent{
  filterTerm: string;
  type: SearchType
}

export enum SearchType {
  Generic = "generic",
  Advanced = "advanced"
}