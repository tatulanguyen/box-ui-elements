/**
 * @flow
 * @file Base class for the content picker ES6 wrapper
 * @author Box
 */

import React from 'react';
import { render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
import ContentExplorerComponent from '../components/ContentExplorer/ContentExplorer';
import type { BoxItem } from '../flowTypes';

class ContentExplorer extends ES6Wrapper {
    /**
     * Callback for selecting files
     *
     * @param {Array} data - chosen box items
     * @return {void}
     */
    onSelect = (data: BoxItem[]): void => {
        this.emit('select', data);
    };

    /**
     * Callback for renaming file
     *
     * @return {void}
     */
    onRename = (data: BoxItem): void => {
        this.emit('rename', data);
    };

    /**
     * Callback for previewing a file
     *
     * @return {void}
     */
    onPreview = (data: BoxItem): void => {
        this.emit('preview', data);
    };

    /**
     * Callback for downloading a file
     *
     * @return {void}
     */
    onDownload = (data: BoxItem[]): void => {
        this.emit('download', data);
    };

    /**
     * Callback for deleting a file
     *
     * @return {void}
     */
    onDelete = (data: BoxItem[]): void => {
        this.emit('delete', data);
    };

    /**
     * Callback for uploading a file
     *
     * @return {void}
     */
    onUpload = (data: BoxItem[]): void => {
        this.emit('upload', data);
    };

    /**
     * Helper to programatically navigate
     *
     * @param {string} id - string folder id
     * @return {void}
     */
    navigateTo(id: string): void {
        const component = this.getComponent();
        if (component && typeof component.clearCache === 'function') {
            component.fetchFolder(id);
        }
    }

    /** @inheritdoc */
    render() {
        render(
            <ContentExplorerComponent
                rootFolderId={this.root}
                token={this.token}
                componentRef={this.setComponent}
                getLocalizedMessage={this.getLocalizedMessage}
                onDelete={this.onDelete}
                onDownload={this.onDownload}
                onPreview={this.onPreview}
                onRename={this.onRename}
                onSelect={this.onSelect}
                onUpload={this.onUpload}
                {...this.options}
            />,
            this.container
        );
    }
}

global.Box = global.Box || {};
global.Box.ContentExplorer = ContentExplorer;
export default ContentExplorer;