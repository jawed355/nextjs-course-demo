import classes from "./MeetupDetail.module.css";

function MeetupDetail(props) {
  return (
    <section className={classes.detail+' pt-5'}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <img width="100%" src={props.image} alt={props.title} />
          <h1>{props.title}</h1>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
      </div>
    </section>
  );
}
export default MeetupDetail;
