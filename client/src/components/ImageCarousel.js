import { CarouselProvider, Image, Slide, Slider } from 'pure-react-carousel';
import React from 'react';
import { Divider } from 'semantic-ui-react';

import CustomDotGroup from '../components/CustomDotGroup';

const ImageCarousel = () => (
  <CarouselProvider naturalSlideWidth={1} naturalSlideHeight={1} totalSlides={3}>
    <Slider>
      <Slide tag="a" index={0} style={{ display: 'flex' }}>
        <Image src="https://lorempixel.com/800/800/cats/0" />
      </Slide>
      <Slide tag="a" index={1} style={{ display: 'flex' }}>
        <Image src="http://res.cloudinary.com/dlkdaara8/image/upload/v1650818529/xdvu9dbk8ikmmwekhhht.png" />
      </Slide>
      <Slide tag="a" index={2} style={{ display: 'flex' }}>
        <Image src="http://res.cloudinary.com/dlkdaara8/image/upload/v1650818529/xdvu9dbk8ikmmwekhhht.png" />
      </Slide>
    </Slider>

    <Divider />
    <CustomDotGroup slides={3} />
  </CarouselProvider>
);

export default ImageCarousel;
