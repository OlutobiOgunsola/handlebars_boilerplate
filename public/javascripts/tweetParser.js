// // retrieve the thread content from textarea element
const tweetArray = [];
// //parse content

// open a connection to the twit module
const twit = require("twit");

class Tweet {
  constructor(string) {
    this.string = string;
    this.tweetString = "";
  }
  addTweet(string) {
    this.tweetString += string + " ";
    return this.tweetString;
  }
  freezeTweet(tweetString) {
    tweetArray.push(this.tweetString);
    this.tweetString = "";
  }
  checkTweet() {
    console.log(this.tweetString);
  }
}

const getContentAndConstructThread = () => {
  // const content = document.querySelector("textarea").value;
  const content =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quaerat alias ipsam corrupti vero obcaecati atque, asperiores numquam magnam molestiae omnis minus incidunt sunt libero sequi blanditiis inventore, deserunt eaque cumque quod doloremque nemo unde necessitatibus odio. Exercitationem illum rem aliquam qui amet ducimus maxime blanditiis vero numquam neque! Voluptas, aliquid atque! Magni cum, quia impedit architecto nemo repellendus hic doloremque fuga similique incidunt nisi, voluptas, fugiat dolore cumque consequuntur. Odit tenetur totam tempora perferendis quidem. Ipsam recusandae iste dolore provident vero maxime odit debitis omnis enim modi.";

  //break content into words.

  const contentArray = content.split(" ");

  //add words into tweet in iterations
  const constructThread = () => {
    const characterLimit = 280;
    let characterCount = 0;
    const iterationEndpoint = contentArray.length - 1;
    const newTweet = new Tweet();
    // console.log(contentArray);
    for (let i = 0; i < contentArray.length; i++) {
      // console.log(i, iterationEndpoint);
      const wordlength = contentArray[i].length;
      const currentCharCount = characterCount + wordlength;
      if (currentCharCount <= characterLimit) {
        newTweet.addTweet(contentArray[i]);
        if (i === iterationEndpoint) {
          newTweet.freezeTweet();
        }
        // console.log(contentArray[i], currentCharCount);
      } else {
        newTweet.freezeTweet();
        newTweet.addTweet(contentArray[i]);
        characterCount = contentArray[i].length;
      }
      // add 1 to wordlength to account for space after the word
      characterCount += wordlength + 1;
    }
  };
  // remove trailing spaces from each tweet
  const removeTrailingSpaces = () => {
    for (let i = 0; i < tweetArray.length; i++) {
      tweetArray[i] = tweetArray[i].slice(0, tweetArray[i].length - 1);
    }
    // console.log(tweetArray);
  };
  constructThread();
  removeTrailingSpaces();
  console.log(tweetArray);
};

const T = new twit({
  consumer_key: "s",
  consumer_secret: "a",
  access_token: "s",
  access_token_secret: ""
});

async function sendTweets() {
  let root_id = "";
  let i = 0;
  const postTweet = tweet => {
    //root_id variable to store the _id of the first post. Other posts will be posted as replies to the first post.
    T.post(
      "statuses/update",
      {
        status: tweet
      },
      function(err, data, response) {
        let { id_str } = data;
        root_id += id_str;
      }
    );
  };
  const postReply = tweet => {
    // console.log(root_id);
    //root_id variable to store the _id of the first post. Other posts will be posted as replies to the first post.
    T.post(
      "statuses/update",
      { status: tweet, in_reply_to_status_id: root_id },
      function(err, data, response) {
        // if (err) {
        //   console.err(err);
        // }
      }
    );
  };
  while (i < tweetArray.length) {
    if (i === 0) {
      const post = await postTweet(tweetArray[i]);
    } else {
      const post = await postReply(tweetArray[i]);
    }
    i++;
  }
}

// const threadify = () => {
getContentAndConstructThread();
//   tweetArray.forEach(tweet => {
//     // console.log(tweet.length);
//   });
sendTweets();
// };
// document.querySelector("#threadify").addEventListener("click", threadify);
