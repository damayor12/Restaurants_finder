import React, { useEffect, useState } from 'react';
import { Grid, Container, Button, Segment, Header, Image } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/actions/modalActions';
import axios from 'axios';
import ImageCarousel from '../components/ImageCarousel';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { getDetails } from '../redux/actions/detailsActions';
import ReviewComponent from '../components/ReviewComponent';
import ProductItem from '../components/ProductItem';

const DetailsPage = ({ match }) => {
  const [error, SetError] = useState(false);
  const dispatch = useDispatch();
  const detailsData = useSelector((state) => state.details.details);

  const handleDragStart = (e) => e.preventDefault();
  const items = [
    <Image
      src="http://res.cloudinary.com/dlkdaara8/image/upload/v1650818529/xdvu9dbk8ikmmwekhhht.png"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <Image
      src="http://res.cloudinary.com/dlkdaara8/image/upload/v1650818529/xdvu9dbk8ikmmwekhhht.png"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <Image
      src="http://res.cloudinary.com/dlkdaara8/image/upload/v1650818529/xdvu9dbk8ikmmwekhhht.png"
      onDragStart={handleDragStart}
      role="presentation"
    />,
  ];

  useEffect(() => {
    dispatch(getDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <Container>
      <Grid style={{ paddingTop: '2rem' }}>
        <Grid.Column width={8}>
          <Segment attached="top">
            <Header
              as="h2"
              content={detailsData.name}
              style={{ height: '3rem', background: 'white' }}
            />
            <p>
              {detailsData.description
                ? detailsData.description
                : 'Your home to  the best dishes and snacks, please look through our products ;)'}
            </p>
          </Segment>
          <Segment attached="bottom">
            <AliceCarousel
              mouseTracking
              items={items}
              infinite={true}
              autoPlay={true}
              animationDuration={3000}
              autoPlayInterval={3000}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Button
            style={{ width: '100%' }}
            onClick={() => {
              if (
                detailsData.customerReviews.some(
                  (detail) => detail.user === JSON.parse(localStorage.getItem('userInfo'))._id,
                )
              ) {
                SetError(true);
                const interval = setTimeout(() => {
                  SetError(false);
                }, 1000);
                //  clearTimeout(interval);
              } else {
                dispatch(openModal({ modalType: 'ReviewsModal', modalProps: match.params.id }));
              }
            }}
          >
            Add a review
          </Button>
          {error && (
            <p style={{ color: 'red' }}>You already commented on this restaurant, sorry.</p>
          )}
          <Grid style={{ overflow: 'auto', maxHeight: 500, marginTop: '1rem' }}>
            <Segment style={{ margin: 0, width: '100%', borderBottom: '2px solid black' }}>
              {detailsData.customerReviews.length === 0
                ? 'No Reviews yet :('
                : `${detailsData.customerReviews.length} total reviews`}
            </Segment>
            {detailsData.customerReviews.map((detail, ind) => (
              <ReviewComponent data={detail} key={ind} />
            ))}
          </Grid>
        </Grid.Column>
      </Grid>
      <h1>Products</h1>
      {detailsData.productsdoc.length > 0 &&
        detailsData.productsdoc.map((detail, ind) => (
          <ProductItem data={detail} restaurantID={match.params.id} />
        ))}
      {detailsData.productsdoc.length < 1 && (
        <p>Restaurant owner has not yet uploaded any products. Try again in a while</p>
      )}
    </Container>
  );
};

export default DetailsPage;
