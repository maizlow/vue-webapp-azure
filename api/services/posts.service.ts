import { Context } from "@azure/functions";
import mongodb = require("mongodb");
require("dotenv").config();


// Get posts
async function getPosts({ req, res }: Context) {
  try {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
  } catch (error) {
    res.status(500).send(error);
  }
}

//Insert post
async function insertPost({ req, res }: Context) {
  try {
    const posts = await loadPostsCollection();
    console.log(req.body.text);
    await posts.insertOne({
      text: req.body.text,
      createdAt: new Date(),
    });
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
}

//Delete post
async function deletePost({ req, res }: Context) {
  try {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params._id) });
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
}

async function loadPostsCollection() {
  try {
    const client = await mongodb.MongoClient.connect(
      process.env.DATABASE_CONNECTION_STRING,
      {
        useNewUrlParser: true,
      }
    );
    return client.db("first-web-app").collection("posts");
  } catch (error) {
    console.log("MongoDB connection failed or something...");
  }
}

export default { getPosts, deletePost, insertPost };
