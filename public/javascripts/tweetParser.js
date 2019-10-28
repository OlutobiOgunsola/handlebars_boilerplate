const axios = require("axios");
// retrieve the thread content from textarea element
const tweetArray = [];

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
}

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
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti, tempore rem nemo obcaecati qui perferendis iure earum deserunt fugiat. Perferendis repudiandae quisquam, aperiam adipisci architecto doloribus possimus dignissimos quae tempora, temporibus, laudantium dolores odio. Possimus nostrum repellendus impedit aliquam ipsam iure fuga, minima doloremque ut sint illum! Tenetur rem excepturi perferendis cumque. Laborum, aspernatur labore explicabo placeat natus veniam perferendis eius ab sunt similique possimus odit ex? Aperiam quae molestiae labore illo repellat placeat, omnis perspiciatis explicabo nulla odio reiciendis ipsa consequatur consectetur praesentium optio cumque saepe harum. Expedita alias culpa, provident enim ipsam hic! Fugit nobis vero facere debitis quam quaerat, excepturi eius fugiat deserunt quibusdam culpa amet adipisci ab minus eligendi cumque aperiam illum.";
  //break content into words.

  const contentArray = content.split(" ");

  //add words into tweet in iterations
  const constructThread = () => {
    const characterLimit = 280;
    let characterCount = 0;
    const iterationEndpoint = contentArray.length - 1;
    const newTweet = new Tweet();
    for (let i = 0; i < contentArray.length; i++) {
      const wordlength = contentArray[i].length;
      const currentCharCount = characterCount + wordlength;
      if (currentCharCount <= characterLimit) {
        newTweet.addTweet(contentArray[i]);
        if (i === iterationEndpoint) {
          newTweet.freezeTweet();
        }
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
  };
  constructThread();
  removeTrailingSpaces();
};

getContentAndConstructThread();

const tweetObject = {
  tweetArray
};

//make a request to the adjust page with the threader array data

axios
  .post("http://localhost:4000/collect", {
    headers: {
      "Content-Type": "Application/JSON"
    },
    params: {
      tweetObject: JSON.stringify(tweetObject)
    }
  })
  .then(response => {
    return console.log(response.data);
  })
  .catch(err => {
    console.err(err);
    return;
  });
