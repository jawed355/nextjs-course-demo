import { MongoClient } from "mongodb";

// url-> /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://jawed355:yk0JvvMcbv5CTcit@cluster0.vrxxc.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollections = db.collection("meetups");
    const result = await meetupCollections.insertOne(data);

    console.log(result);
    client.close();
    res.status(201).json({message : 'Meetup Inserted!'})
  }
}
export default handler;
