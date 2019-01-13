import * as React from 'react';
import styles from './MultilingualContent.module.scss';
import { IMultilingualContentProps } from './IMultilingualContentProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class MultilingualContent extends React.Component<IMultilingualContentProps, {}> {
  public render(): React.ReactElement<IMultilingualContentProps> {
    return (
      <div className={ styles.multilingualContent }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
