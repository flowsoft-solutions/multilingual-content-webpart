declare interface IMultilingualContentWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  EditorTitle: string;
}

declare module 'MultilingualContentWebPartStrings' {
  const strings: IMultilingualContentWebPartStrings;
  export = strings;
}
