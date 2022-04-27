import { Icon } from 'semantic-ui-react';

const Rating = ({ rating, onClick, style, setRating, setRatingError }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          onClick={() => {
            setRating(i + 1);
            setRatingError(false);
          }}
          style={{ color: 'yellow' }}
        >
          {rating > i ? (
            <Icon name="star" color="yellow" />
          ) : (
            <Icon fontSize="15px" name="star outline" />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;
