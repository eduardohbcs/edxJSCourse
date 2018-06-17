document.getElementById("analyzeButton").addEventListener("click", fetchAndAnalyze);
function fetchAndAnalyze() {
    var imageUrl = document.getElementById("imageUrl").value;
    var myHeader =  new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key':'b48b09941b19423d941084baacd814d4'
    });

    var reqBody = {
        "url": imageUrl
    };

    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }

    var request = new Request('https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender', initObject);
    fetch(request).then(function(response){
        if(response.ok){
            return response.json();
        }
        else{
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function(response){
        var elem = document.getElementById("img");
        if (elem == null) {
          elem = document.createElement("img");
          elem.id = "img";
          document.getElementById("imageDiv").appendChild(elem);
        }
        elem.setAttribute("src", imageUrl);
        if (response[0] == null) {
            document.getElementById("output").innerHTML = 'No Faces Detected';
        } else {
            document.getElementById("output").innerHTML = 'Age: '+ response[0].faceAttributes.age + '<br>'+ 'Gender: '+response[0].faceAttributes.gender;
        }
       
    }).catch(function(err){ 
        var elem = document.getElementById("img");
        if (elem != null) {
            elem.setAttribute("src", "");
        }
        document.getElementById("output").innerHTML = err;
    });
}

