import classes from './Card.module.css';

const Card = (props) => (
	<section className={`${classes.card} ${props.className}`}>{props.children}</section>
);

export default Card;
