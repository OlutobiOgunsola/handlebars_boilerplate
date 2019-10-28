// open a connection to the twit module
const twit = require("twit");

const T = new twit({
  consumer_key: "pVza6cJZ9OS9FU2wwdSH97rBQ",
  consumer_secret: "Bthr51zHCNpg38BxD68VhwcIR24EkMYG8c3OBllTv0eVmEck5U",
  access_token: "1148159631916773376-uL3PTXfLTpUGWuCfe4nMqHJHdOi12Z",
  access_token_secret: "TmLtq44mbOKougjb9reY3SPXdUkInxEeD3dj9RuoQIPmb"
});

function sendTweets() {
  console.log(tweetArray);
  let i = 0;
  function postTweets(tweetArray) {
    console.log("Posting tweets");
    //root_id variable to store the _id of the first post. Other posts will be posted as replies to the first post.
    let i = 0;
    const length = tweetArray.length;
    const post = (tweetArray, data_id) => {
      T.post(
        "statuses/update",
        {
          status: tweetArray.shift(),
          in_reply_to_status_id: data_id
        },
        function(err, data, response) {
          console.log("Posted tweet " + i);
          const data_id = data.id_str;
          i++;
          if (i < length) {
            post(tweetArray, data_id);
          }
        }
      );
    };
    post(tweetArray, null);
  }

  postTweets(tweetArray);
  // function postReply(tweet) {
  //   //root_id variable to store the _id of the first post. Other posts will be posted as replies to the first post.
  //   T.post(
  //     "statuses/update",
  //     { status: tweet, in_reply_to_status_id_str: root_id },
  //     function(err, data, response) {}
  //   );
  // }
  // for (let i = 0; i < tweetArray.length; i++) {
  //   if (i == 0) {
  //     postTweet(tweetArray[i]);
  //   } else {
  //     postReply(tweetArray[i]);
  //   }
  // }
}

// const threadify = () => {
getContentAndConstructThread();
//   tweetArray.forEach(tweet => {
//     // console.log(tweet.length);
//   });
sendTweets();
// };
// document.querySelector("#threadify").addEventListener("click", threadify);
