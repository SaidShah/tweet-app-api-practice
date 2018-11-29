
  function fetchAll() {
    return fetch(URL)
    .then(response=>response.json())
  }

  function fetchCreate(givenData){
    fetch(URL, {method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(givenData)
    })
    //fetchAll().then(displayTweets)
  }

  function fetchDelete(givenId) {
    fetch(URL+`/${givenId}`,{method: "DELETE"})
  }

  function fetchUpdate(givenData, givenId) {
    fetch(URL+`/${givenId}`,{method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(givenData)
    })
  }
