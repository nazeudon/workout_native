export interface DropDownItemType {
  label: string;
  value: string;
}

export const dropDownRecovery: DropDownItemType[] = [
  { label: "全て", value: "all" },
  { label: "1分", value: "1" },
  { label: "2分", value: "2" },
  { label: "3分", value: "3" },
  { label: "4分", value: "4" },
  { label: "5分以上", value: "over5" },
];

export const dropDownTrial: DropDownItemType[] = [
  { label: "全て", value: "all" },
  { label: "1種目目", value: "1" },
  { label: "2種目目", value: "2" },
  { label: "3種目目", value: "3" },
  { label: "4種目目", value: "4" },
  { label: "5種目目以降", value: "over5" },
];
