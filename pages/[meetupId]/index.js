import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta
          name="description"
          content={props.description}
        />
      </Head>
      <MeetupDetail
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://jawed355:yk0JvvMcbv5CTcit@cluster0.vrxxc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: (await meetups).map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://jawed355:yk0JvvMcbv5CTcit@cluster0.vrxxc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const selectMeetup = await meetupCollections.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();
  return {
    props: {
      id: selectMeetup._id.toString(),
      title: selectMeetup.title,
      image: selectMeetup.image,
      address: selectMeetup.address,
      description: selectMeetup.description,
    },
  };
}
export default MeetupDetails;
