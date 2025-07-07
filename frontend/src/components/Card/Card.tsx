interface Props {
    title?: string;
    description?: string;
    footer?: string;
}
const Card = (props: Props) => {
    return (
    <div className="flex-card">
      <div className="flex-card-content">
        {props.title && <h2 className="flex-card-heading">{props.title}</h2>}
        {props.description && <p>{props.description}</p>}
        {props.footer && <h3 className="flex-card-heading">{props.footer}</h3>}
      </div>
    </div>
  );
}

export default Card;
