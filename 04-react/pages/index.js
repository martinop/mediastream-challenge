'use strict';

console.log(`
4.
---

We require a 'List' component that will receive an array of dates (formated as ISO Dates (Date-Time))
and it has to render those to 'Row' components.

This 'Row' component can be as simple as you want,
but it must display the dates like the following example: '(12/jun/2013)'
and on click must 'alert()' its index in the list.

Also, the 'List' component should receive an optional child as a header.
Remember to validate the props.

The implementation **must focus on performance**.

Take a look at the MyApp component, you should not modify it.

NOTE: You can use ES7+ here and install any library not tied to React.
Example:
- lodash: OK
- react-dates: NOPE
`);

import React, { PureComponent } from 'react';
import moment from 'moment';
import { arrayOf, string, node, object, oneOfType, number } from 'prop-types'

export default class MyApp extends React.Component {
  render() {
    const dates = ['2017-02-20T13:33:52.889Z', '2013-06-25T14:31:24.888Z'];

    return (
      <div>
        <h1>04 - React</h1>
        <List dates={dates} />
        <hr />
        <List dates={dates}>
          <h1>Optional Header</h1>
        </List>
      </div>
    );
  }
}

const Row = ({ date, index }) =>
  <h2 onClick={() => alert(index)}>
    {date.isValid() ? `(${date.format('DD/MMM/YYYY')})` : ''}
  </h2>

Row.propTypes = {
  date: object,
  index: number
}
/*
  This class could be changed to a function comp:
    const List = ({ dates, children }) => (
      <div>
        {children}
        {dates.map((date, index) =>
          <Row date={date} key={`row-item-${index}`} index={index} /> 
        )}
      </div>
    )
*/
class List extends PureComponent {
  renderDates = () => 
    this.props.dates.map((date, index) =>
      <Row date={moment(new Date(date))} key={`row-item-${index}`} index={index} /> )

  render() {
    return (
     <div>
       {this.props.children}
       {this.renderDates()}
     </div> 
    );
  }
}

List.propTypes = {
  dates: arrayOf(string),
  children: oneOfType([
    arrayOf(node),
    node
  ])
}