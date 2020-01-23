
import React from 'react'
import { DropDownList } from '@progress/kendo-react-dropdowns';

const DropDownFilter = (props) => {
    return (
        <DropDownList
            data={props.data}
            defaultItem={props.defaultItem}
            onChange={(event) => {
                const value = event.target.value;
                props.onFilterChange({
                    filter: [{
                        value: value !== props.defaultItem ? value : '',
                        operator: 'contains',
                        field: props.field
                    }],
                    field: props.field,
                    syntheticEvent: event.syntheticEvent
                });
            }}
        />
    )
}
export default DropDownFilter;

