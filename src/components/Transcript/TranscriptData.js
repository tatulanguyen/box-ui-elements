/**
 * @flow
 * @file Transcript grid component
 * @author Box
 */

import React from 'react';
import { Table, Column } from 'react-virtualized/dist/es/Table';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer';
import 'react-virtualized/styles.css';
import { formatTime } from '../../util/datetime';
import isValidStartTime from './timeSliceUtil';
import type { SkillCardEntry } from '../../flowTypes';
import './Transcript.scss';

type Props = {
    data: SkillCardEntry[],
    getPreviewer?: Function
};

const cache = new CellMeasurerCache({
    minHeight: 10,
    fixedWidth: true
});

const TranscriptData = ({ data, getPreviewer }: Props) => (
    <AutoSizer>
        {({ width, height }) => (
            <Table
                width={width}
                height={height}
                disableHeader
                headerHeight={0}
                rowHeight={cache.rowHeight}
                rowCount={data.length}
                rowGetter={({ index }) => data[index]}
                className='be-transcript'
                deferredMeasurementCache={cache}
                onRowClick={({ rowData }: { rowData: SkillCardEntry }): void => {
                    const viewer = getPreviewer ? getPreviewer() : null;
                    const cellData = rowData.appears;
                    if (
                        isValidStartTime(cellData) &&
                        viewer &&
                        viewer.isLoaded() &&
                        !viewer.isDestroyed() &&
                        typeof viewer.play === 'function'
                    ) {
                        // $FlowFixMe Already checked above
                        const { start } = cellData[0];
                        viewer.play(start);
                    }
                }}
            >
                <Column
                    dataKey='appears'
                    width={60}
                    flexShrink={0}
                    className='be-transcript-time-column'
                    cellRenderer={({ cellData }): string =>
                        isValidStartTime(cellData) ? formatTime(cellData[0].start) : '--'
                    }
                />
                <Column
                    dataKey='text'
                    width={230}
                    flexGrow={1}
                    cellRenderer={({ dataKey, parent, rowIndex, cellData }) => (
                        <CellMeasurer cache={cache} columnIndex={0} key={dataKey} parent={parent} rowIndex={rowIndex}>
                            <div
                                className='be-transcript-column'
                                style={{
                                    whiteSpace: 'normal'
                                }}
                            >
                                {(cellData || '').replace(/\r?\n|\r/g, '')}
                            </div>
                        </CellMeasurer>
                    )}
                />
            </Table>
        )}
    </AutoSizer>
);

export default TranscriptData;