import React from 'react';
import { readColumns } from '@progress/kendo-react-data-tools';

const headerCellClassName = (sort, field, locked) => {
    let result = `${locked ? 'k-grid-header-sticky' : ''}`;
    if (sort.some(descriptor => descriptor.field === field)) {
        result += ' k-sorted';
    }
    return result;
};

export const FilterRow = function(props) {
    const { columns, filter, filterChange, sort = [] } = props;

    return (
        <tr className="k-filter-row">
            {readColumns(columns).filter(c => c.children.length === 0).map((column, index) => (
                    <th
                        key={index}
                        className={headerCellClassName(sort, column.field, column.locked)}
                    >
                        {column.filter && (
                            <column.filter
                                field={column.field}
                                filter={filter}
                                onFilterChange={filterChange}
                            />
                        )}
                    </th>
                )
            )}
        </tr>
    );
};