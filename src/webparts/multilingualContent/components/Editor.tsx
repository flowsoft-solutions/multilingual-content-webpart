import * as React from 'react';
import * as strings from 'MultilingualContentWebPartStrings';
import styles from './Editor.module.scss';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import {stateToHTML} from 'draft-js-export-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
require('./overrides.css');
import draftToHtml from 'draftjs-to-html';

export interface EditorProps {
    save(html: string): void;
}
export interface EditorState {
    showDialog: boolean;
    editorState: EditorState;
}

export default class MultiLingualUserInterfaceEditor extends React.Component<EditorProps, EditorState> {

    constructor(props) {
        super(props);

        this.state = {
            showDialog: false,
            editorState: EditorState.createEmpty()
        }

        this._onChange = this._onChange.bind(this);
        this._showDialog = this._showDialog.bind(this);
        this._closeDialog = this._closeDialog.bind(this);
        this._cancelDialog = this._cancelDialog.bind(this);
    }
    private _showDialog() {
        this.setState({ showDialog: true });
    }

    private _closeDialog() {
        this.props.save(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
        this.setState({ showDialog: false });
    }

    private _cancelDialog() {
        this.setState({ showDialog: false });
    }

    private _onChange(editorState: EditorState) {
        this.setState({ editorState });
    }

    public render(): React.ReactElement<EditorProps> {
        return (
            <div>
                <div className={styles.contentEditor}>
                <DefaultButton description='Opens the snippet dialog' onClick={this._showDialog}>Edit snippet</DefaultButton>
                <Dialog
                    isOpen={this.state.showDialog}
                    type={DialogType.normal}
                    onDismiss={this._closeDialog}
                    title={strings.EditorTitle}
                    isBlocking={false}
                    className={'ContentEditorPart'}
                >
                    <Editor
                    editorState={this.state.editorState}
                    onEditorStateChange={this._onChange}
                    toolbarClassName={styles.toolbar}
                    wrapperClassName={styles.wrapper}
                    editorClassName={styles.editor}
                    />
                    <DialogFooter>
                        <PrimaryButton onClick={this._closeDialog}>Save</PrimaryButton>
                        <DefaultButton onClick={this._cancelDialog}>Cancel</DefaultButton>
                    </DialogFooter>
                </Dialog>
                </div>
            </div>
        )
    }
}