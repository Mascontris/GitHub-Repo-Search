
function repoNamesUrls(responseJson){
    $("#results-list").empty();
     for (let i = 0 ; i < responseJson.length; i++){
        console.log(responseJson[i].name);
        console.log(responseJson[i].html_url);
        $("#results-list").append(`<li>${responseJson[i].name}</li><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].html_url}</a><br><br>`)
     }
}

function errorFunc(error){
    $("#results-list").empty();
    $("#js-error-message").html(`<p>Something went wrong user ${error}</p>`)
}

function getRepos(userName){
    fetch(`https://api.github.com/users/${userName}/repos`)
  .then(function(response){
    if (response.ok){
      return response.json();
    }else
    {
      return response.json().then(errorJson => Promise.reject(errorJson.message));
    }
  })
  .then(function(responseJson){
    repoNamesUrls(responseJson);
  })
  .catch(error => {
    console.dir(error);
    errorFunc(error);
  })
  }

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const userName = $('#js-user-name').val();
      getRepos(userName);
    });
  }
  
  $(watchForm);