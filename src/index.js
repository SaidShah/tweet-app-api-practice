const URL = "http://localhost:3000/tweets"
document.addEventListener("DOMContentLoaded",(event)=>{

  fetchAll().then(displayTweets)
  document.getElementById('create-update').addEventListener("submit", submitClicked)
  document.getElementById("show-tweets").addEventListener("click", buttonClicked)
  document.getElementById("filter-input").addEventListener("keyup",filterTweets)
})

 function displayTweets(givenArray){
    const tweets = document.getElementById("show-tweets")
    tweets.innerHTML = ""
    for(tweet of givenArray){
      const newTweet = `
                    <div class="each-tweet">
                     <h4>${tweet.name}</h4>
                     <h4>${tweet.email}</h4>
                     <h4>${tweet.tweet}</h4>
                     <button data-id="${tweet.id}" class="like">Total Likes: ${tweet.likes}</button>
                     <button data-id="${tweet.id}" class="delete">Delete Tweet</button>
                     <button data-id="${tweet.id}" class="edit">Edit Tweet</button><hr></div>`
      tweets.innerHTML+=newTweet
    }
  }

  function submitClicked(givenEvent) {
    const name = givenEvent.target.name.value
    const email = givenEvent.target.email.value
    const tweet = givenEvent.target.tweet.value
    const form = document.getElementById("create-update")
    let data;
    if (givenEvent.target.lastElementChild.id === ""){
      // const name = givenEvent.target.name.value
      // const email = givenEvent.target.email.value
      // const tweet = givenEvent.target.tweet.value
      data = {name: name, email: email, tweet: tweet, likes: 0}
      fetchCreate(data)
    }else{
      data = {name: name, email: email, tweet: tweet}
      fetchUpdate(data, givenEvent.target.lastElementChild.id)
    }
  }

function buttonClicked(givenEvent) {
  if(givenEvent.target.className ===  "like"){
    increaseLike(givenEvent)
  }else if(givenEvent.target.className ===  "delete"){
    deleteTweet(givenEvent)
  }else if(givenEvent.target.className ===  "edit"){
    editTweet(givenEvent)
  }
}


function increaseLike(givenEvent) {
  let likes = givenEvent.target.innerText.split("")
  let numLikes = parseInt(likes[likes.length-1])
  givenEvent.target.innerText = `Total Likes: ${++numLikes}`
  const data = {likes:numLikes}
  fetchUpdate(data, givenEvent.target.dataset.id)
}

function deleteTweet(givenEvent) {
  givenEvent.target.parentElement.innerHTML=""
  fetchDelete(givenEvent.target.dataset.id)
}

function editTweet(givenEvent) {
  const form = document.getElementById("create-update")
  const name = givenEvent.target.parentElement.children[0].innerText
  const email = givenEvent.target.parentElement.children[1].innerText
  const tweet = givenEvent.target.parentElement.children[2].innerText
  form[0].value = name
  form[1].value = email
  form[2].value = tweet
  form[3].id = givenEvent.target.dataset.id
}

function filterTweets(givenEvent) {
  fetchAll().then(tweets =>{
    let filteredTweets =tweets.filter((eachTweet)=>{
      return eachTweet.tweet.includes(givenEvent.target.value)
    })
    document.getElementById("filter-by").innerText = givenEvent.target.value
    displayTweets(filteredTweets)
  })
}
