// const user = require.resolve("../../app.js").user;

// // retrieve the thread content from textarea element
const tweetArray = [];
// //parse content

// console.log(user);

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

const words =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti, tempore rem nemo obcaecati qui perferendis iure earum deserunt fugiat. Perferendis repudiandae quisquam, aperiam adipisci architecto doloribus possimus dignissimos quae tempora, temporibus, laudantium dolores odio. Possimus nostrum repellendus impedit aliquam ipsam iure fuga, minima doloremque ut sint illum! Tenetur rem excepturi perferendis cumque. Laborum, aspernatur labore explicabo placeat natus veniam perferendis eius ab sunt similique possimus odit ex? Aperiam quae molestiae labore illo repellat placeat, omnis perspiciatis explicabo nulla odio reiciendis ipsa consequatur consectetur praesentium optio cumque saepe harum. Expedita alias culpa, provident enim ipsam hic! Fugit nobis vero facere debitis quam quaerat, excepturi eius fugiat deserunt quibusdam culpa amet adipisci ab minus eligendi cumque aperiam illum. Veniam quam perspiciatis saepe totam asperiores qui possimus provident! Pariatur perspiciatis quasi incidunt tempore nam cumque recusandae obcaecati eveniet sit minima veritatis quisquam ut similique commodi esse, mollitia doloribus maxime voluptatum in quam nobis blanditiis repellendus reiciendis! Natus quaerat exercitationem quae ea officiis eius porro placeat consequatur? Fugiat, dignissimos consectetur, minima ad quis et, at similique beatae dolor explicabo ullam. Qui ducimus eos labore fugiat perferendis eaque expedita, sequi, aut provident eius consequuntur. Harum velit cum, unde ad fuga perferendis culpa consequuntur necessitatibus voluptates fugit adipisci quae! Maxime dolores similique cupiditate voluptatum quas consequatur, natus voluptate nesciunt impedit, labore distinctio dolorem facere! Praesentium delectus amet adipisci ipsam veritatis, velit rem ad deleniti commodi placeat voluptatum nihil nemo. Vitae voluptas ab earum corrupti fuga explicabo nesciunt quam suscipit ullam hic, voluptatibus eius sequi, modi beatae, tenetur autem minima esse? Modi optio provident autem odio, officiis rerum repellendus voluptate minus reiciendis reprehenderit. Quibusdam id debitis mollitia quia magni doloremque facilis quod reprehenderit repellat, consequuntur illum voluptatem, deserunt, delectus esse! Quaerat explicabo quidem deleniti mollitia ut, dolor et, eius consectetur assumenda soluta ducimus aperiam cumque facilis fuga culpa rem, expedita quibusdam ipsa beatae fugit dolores iusto doloribus? Maiores quas ut fugit soluta quam voluptate qui nulla hic dolores, tempora, ea pariatur ullam reiciendis temporibus quibusdam aperiam eos! Cumque ratione eaque sint eveniet ut. Optio sed deserunt illum amet, voluptatibus repellat minima dolorum voluptas natus distinctio nisi ea ducimus, harum unde voluptates ex animi. Consectetur, quod? Illo in deleniti sapiente perspiciatis a veritatis nam illum neque. Consectetur quis expedita quaerat numquam iusto autem? Quo alias, reprehenderit molestias hic incidunt totam iure recusandae dolore laudantium sequi voluptatum obcaecati illum accusantium consequatur porro veritatis, ea fuga tempora repellat. Numquam voluptatibus sit nesciunt nemo sint, impedit quo laboriosam dicta harum obcaecati veritatis blanditiis, magni deleniti mollitia necessitatibus odit maiores ex? Delectus, laborum quaerat eligendi, voluptatibus suscipit eum omnis reiciendis, hic quisquam repellat voluptatem mollitia voluptates voluptas tenetur. Perspiciatis doloribus unde quos modi, reiciendis impedit quod hic ducimus dolorem laudantium, libero aspernatur deleniti aut ratione nisi dolores quas consectetur, voluptate tempora quo! Minus exercitationem ipsa, tempore necessitatibus quam, earum a cumque soluta corporis nesciunt deleniti, at quibusdam odio quas eaque sapiente tenetur! Natus necessitatibus corrupti sint aut nulla ipsum neque nesciunt atque blanditiis. Quos architecto fuga modi excepturi consequatur eum voluptatibus sit.";

const getWords = num => {
  let arrayOfWords = words.split(" ");
  let selectedWords = "";
  let i = 0;
  while (i < num) {
    const index = Math.floor(Math.random() * arrayOfWords.length);
    selectedWords += `${arrayOfWords[index]} `;
    i++;
  }
  return selectedWords;
};

const getContentAndConstructThread = () => {
  // const content = document.querySelector("textarea").value;
  const content =
    "State affects behavior, behavior affects state. We know that objects have state and behavior, represented by instance variables and methods. But until now, we haven’t looked at how state and behavior are related. We already know that each instance of a clasess (each object of a particular type) can have its own unique values for its instance variables. Dog A can have a name Fido and a weight of 70 pounds. Dog B is Killer and weighs 9 pounds. And if the Dog class has a method makeNoise(), well, don’t you think a 70-pound dog barks a bit deeper than the little 9-pounder? (Assuming that annoying yippy sound can be considered a bark.) Fortunately, that’s the whole point of an object—it has behavior that acts on its state. In other words, methods use instance variable values. Like, if dog is less than 14 pounds, make yippy sound, else... or increase weight by 5. Let’s go change some state. Conversely, Flux suggests using a nidirectional data flow, as shown in figure 14.5. In this case, you have actions from views going through a dispatcher, which in turn calls the data store. (Flux is a replacement for MVC. This isn’t just new terminology.) The store is responsible for the data and the representation in the views. Views don’t modify the data but have actions that go through the dispatcher again.";

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
};

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
