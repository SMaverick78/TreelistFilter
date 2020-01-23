
import React from 'react';
import ReactDOM from 'react-dom';
import { TreeList, filterBy, extendDataItem, mapTree } from '@progress/kendo-react-treelist';
import DropDownFilter from './dropDownFilter.jsx';
import { FilterRow } from './filterRow.jsx';
import employees from './data';

const dropDownData = ['CEO', 'Technical Officer', 'Engineering', 'Team Lead', 'Software Developer', 'Software Architect', 'QA Engineer', 'Support Officer', 'UI Designer'];
const MyDropDownFilter = (props) => <DropDownFilter {...props} data={dropDownData} defaultItem="Select Position" />;

const columns = [
  { 
    field: 'name',
    title: 'Name',
    width: 400,
    expandable: true,
    filter: MyDropDownFilter
  },
  { 
    field: 'Personal Information',
    children: [
      { 
        field: 'position',
        title: 'Position',
        width: 300,
        filter: MyDropDownFilter
      },
      { 
        field: 'hireDate',
        title: 'Hire Date',
        width: 300,
        format: '{0:d}',
        filter: MyDropDownFilter
      }
    ]
  },
  { 
    field: 'fullTime',
    title: 'Full Time',
    filter: MyDropDownFilter,
    width: 300,
  }
];

const subItemsField = 'employees';
const expandField = 'expanded';

class App extends React.Component {
    state = {
        data: [ ...employees ],
        filter: [],
        expanded: [1, 2, 32]
    }

    onExpandChange = (e) => {
        this.setState({
            expanded: e.value ?
                this.state.expanded.filter(id => id !== e.dataItem.id) :
                [ ...this.state.expanded, e.dataItem.id ]
        });
    }

    handleFilterChange = (event) => {
        this.setState({
            filter: event.filter
        })
    }

    addExpandField = (dataTree) => {
        const expanded = this.state.expanded;
        return mapTree(dataTree, subItemsField, (item) =>
            extendDataItem(item, subItemsField, {
                [expandField]: expanded.includes(item.id)
            })
        );
    }

    processData = () => {
        let data = this.state.data;
        let filteredData = filterBy(data, this.state.filter, subItemsField)
        return this.addExpandField(filteredData);
    }

    render() {
        return (
            <TreeList
                style={{ maxHeight: '510px', overflow: 'auto' }}
                expandField={expandField}
                subItemsField={subItemsField}
                onExpandChange={this.onExpandChange}
                filter={this.state.filter}
                data={this.processData()}
                onFilterChange={this.handleFilterChange}
                columns={columns}
                filterRow={FilterRow}
            />
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);

