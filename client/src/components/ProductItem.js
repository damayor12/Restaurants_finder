import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Icon, Image, Select } from 'semantic-ui-react';
import { addToCart } from '../redux/actions/cartActions';

const ProductItem = ({ data }) => {
  const dispatch = useDispatch();
  const selectArr = Array(data.countInStock)
    .fill(null)
    .map((_, ind) => ind);
 

  const [selected, setSelected] = useState(1);
  const [added, setAdded] = useState(false);

  const handleClick = () => {

    const payload = {
      quantity: selected,
      name: data.name,
      image: data.image,
      price: data.price,
      productID: data._id
    };

    dispatch(addToCart(payload));
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 3000);
    
  };
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <Grid>
            <Grid.Row
              className="product"
              style={{
                borderBottom: '1px solid gainsboro',
                width: '10rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Grid.Column width={5}>
                <Image src={data.image} />
              </Grid.Column>

              <Grid.Column width={3}>{data.name}</Grid.Column>

              <Grid.Column width={3}>${data.price}</Grid.Column>

              <Grid.Column width={3}>
                <select
                  style={{ width: '100%', cursor: 'pointer' }}
                  defaultValue={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  {selectArr.map((item) => (
                    <option key={item + 1} value={item + 1}>
                      {item + 1}
                    </option>
                  ))}
                </select>
              </Grid.Column>

              <Grid.Column width={2} style={{ display: 'flex' }}>
                {data.countInStock === 0 ? (
                  <div>Out of stock</div>
                ) : (
                  <Icon name="cart" style={{ cursor: 'pointer' }} onClick={handleClick} />
                )}
                {added && (
                  <p style={{color: 'green'}}>
                    Added! <Icon name="paper plane" />
                  </p>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ProductItem;
