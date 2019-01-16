import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'MultilingualContentWebPartStrings';
import MultilingualContent from './components/MultilingualContent';
import Editor from './components/Editor';
import { IMultilingualContentProps } from './components/IMultilingualContentProps';

export interface IMultilingualContentWebPartProps {
  description: string;
  html: string;
}

export default class MultilingualContentWebPart extends BaseClientSideWebPart<IMultilingualContentWebPartProps> {

  public render(): void {

    if (this.displayMode === DisplayMode.Read) {

      this.domElement.parentElement.parentElement.parentElement.style.paddingTop = "0";
      this.domElement.parentElement.parentElement.parentElement.style.paddingBottom = "0";
      this.domElement.parentElement.parentElement.parentElement.style.marginTop = "0";
      this.domElement.parentElement.parentElement.parentElement.style.marginBottom = "0";
      this.domElement.innerHTML = this.properties.html;
    }
    else {

      const element: React.ReactElement<IMultilingualContentProps> = React.createElement(
        Editor,
        {
          save: this.save
        }
      );

      ReactDom.render(element, this.domElement);
    }
  }

  public save: (html: string) => void = (html: string) => {
    console.log(html)
    this.properties.html = html;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
