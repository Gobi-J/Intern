function searchItem() {
    const st = document.getElementById("searchInput").value;
    let lt = document.getElementById("limitIn").value;
    if (lt < 1) lt = 5;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "Searching...";
    if (st == null || st == "" || st == " ") {
      resultsDiv.innerHTML = "Enter a keyword to search...";
    } else {
      let data = JSON.stringify({
        keyword: st,
        limit: lt,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.gyanibooks.com/search_publication/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data)); // For testing
          resultsDiv.innerHTML = "";
          if (response.data.data.length > 0) {
            let count = 1;
            response.data.data.forEach((item) => {
              const resultDiv = document.createElement("div");
              if (item.abstract !== null) {
                resultDiv.innerHTML = `<a href="${
                  item.url
                }" target="_blank"><h2>${count++} - ${item.title}</h2></a><p>${
                  item.abstract
                }</p><div><i class="fa-regular fa-bookmark"></i><i class="fa-solid fa-share-nodes"></i><a href="${
                  item.url
                }" target="_blank">Read More --></a></div>`;
              } else
                resultDiv.innerHTML = `<h2>${count++} - ${item.title}</h2><p>${
                  item.title
                }</p><div><i class="fa-regular fa-bookmark"></i><i class="fa-solid fa-share-nodes"></i><a href="${
                  item.url
                }" target="_blank">Read More --></a></div>`;
              resultsDiv.appendChild(resultDiv);
            });
          } else {
            resultsDiv.innerHTML = "<h2>No Item found</h2>";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  