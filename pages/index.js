import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetup List</title>
        <meta
          name="description"
          content="Brows a huge list of active React Meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getSeverSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   //fetch data from API
//    return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     }
//   };
// }

export async function getStaticProps() {
  //fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://jawed355:yk0JvvMcbv5CTcit@cluster0.vrxxc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const meetups = meetupCollections.find().toArray();

  return {
    props: {
      meetups: (await meetups).map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
