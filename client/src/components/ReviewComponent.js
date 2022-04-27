import React from 'react';
import { Segment } from 'semantic-ui-react';
import Rating from './Rating';
import moment from 'moment';

const ReviewComponent = ({ data }) => {
  return (
    <Segment.Group style={{ width: '100%', margin: 0 }}>
      <Segment style={{ display: 'flex', justifyContent: 'space-between ' }}>
        <div style={{ width: '150px', display: 'flex' }}>
          <Rating rating={data.customerRating} />
          {data.customerRating >= 1 &&
            (data.customerRating < 3 ? (
              <div style={{ color: 'red' }}>Poor :(</div>
            ) : data.customerRating === 3 ? (
              <div style={{ color: 'green' }}>Fair :/</div>
            ) : (
              <div style={{ color: 'orange' }}>Good!</div>
            ))}
        </div>
        <p style={{ color: 'grey' }}>
          <strong style={{ textTransform: 'capitalize' }}>{data.customerName}, </strong>
          {moment(data.date).fromNow()}
        </p>
      </Segment>
      <Segment>
        <h4 style={{ textTransform: 'capitalize' }}>{data.customerCommentBody}</h4>
        <p>{data.customerComment}</p>
      </Segment>
      <Segment>
        <p>
          Helpful? <a> Yes (count) </a>|<a> Report</a>
        </p>
      </Segment>
    </Segment.Group>
  );
};

export default ReviewComponent;
