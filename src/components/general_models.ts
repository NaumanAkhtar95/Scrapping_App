export interface DropDownModel {
  desc: string
  value: any
}

export interface Filters {
  column_name: string
  operation: "=" | "!=" | "LIKE"
  value: any
}