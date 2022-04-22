import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';
import { openModal } from '../redux/actions/modalActions';
import { editPost } from '../redux/actions/restaurantActions';


const RestaurantCard = ({ data }) => {
 
  const dispatch = useDispatch();
  console.log('new',data)
  return (
    <Grid className="prod_card" style={{ marginBottom: '1rem' }}>
      <Grid.Column width={4} className="img_container">
        <Image
          src={data.image}
          // size= 'big'
          // fluid
          // style={{ height: '100%', width: '100%'}}
        />
      </Grid.Column>
      <Grid.Column width={12} className="prod_con">
        <div className="prod_header">
          <h2>{data.name}</h2>
          <Icon name="heart" color="black" size="big" />
        </div>
        <div className="prod_tags" style={{ marginBottom: '1rem' }}>
          {data.tags && data.tags.join(', ')}
        </div>
        <div className="prod_details_row">
          <Icon name="star" color="orange" size="large" />
          <div style={{ fontSize: '1.5rem' }}>{data.rating}</div>
          <div>({data.totalReviews} reviews)</div>
          <div>Minimum delivery: $ {data.minimumOrder}</div>
          <Button
            floated="right"
            style={{ marginLeft: 'auto' }}
            onClick={() => dispatch(openModal({ modalType: 'FormModal', modalProps: data }))}
          >
            Edit
          </Button>
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default RestaurantCard;
