let API_KEY = `AIzaSyDWyHjpGqqk3xfl2RvRkP_8KhC8Sr7mxGE`;

let getData = async (query) => {
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&maxResults=50`;
    let res = await fetch(url);
    let data = await res.json();
    if (data.items && data.items.length > 0) {
        return data.items;
    } else return null;
};

let getVideos = async () => {
    let searchBox = document.getElementById('searchBox');
    let query = searchBox.value;
    console.log('query:', query);
    let videos = await getData(query);
    if (!videos) {
        displayNoVideos();
    } else {
        displayVideos(videos);
    }
};

let displayNoVideos = () => {
    let videoDiv = document.getElementById('allVideos');
    videoDiv.innerHTML = `<div id="noResult">
	<img src="./no-result.svg" alt="no video found" class="noVideoImage" />
	<h2 class="noResultHeading">No results found</h2>
	<h4 class="noResultDesc">Try different keywords or remove search filters</h4>
  </div>
</div>`;
};

let createVideoCard = (id, channelTitle, title, description, url) => {
    console.log('url:', url);
    let videoCard = document.createElement('div');
    videoCard.classList.add('videoCard');
    videoCard.id = id;
    videoCard.onclick = () => playVideo(id);

    videoCard.innerHTML = `<img
	src=${url}
	alt=""
	class="videoCardImage"
  />
  <div class="videoContent">
	<h2 class="videoTitle">${title}</h2>
	<h4 class="videoChannel">
	  ${channelTitle} <i class="fas fa-check-circle"></i>
	</h4>
	<p class="videoDesc">
	  ${description}
	</p>
  </div>`;

    return videoCard;
};

let displayVideos = (videos) => {
    console.log('videos:', videos);
    let videoDiv = document.getElementById('allVideos');
    videoDiv.innerHTML = null;
    videos.forEach(
        ({
            id: { videoId },
            snippet: {
                channelTitle,
                title,
                description,
                thumbnails: {
                    high: { url },
                },
            },
        }) => {
            if (videoId != undefined) {
                let newVideo = createVideoCard(
                    videoId,
                    channelTitle,
                    title,
                    description,
                    url
                );
                videoDiv.append(newVideo);
            }
        }
    );
};

let playVideo = (id) => {
    let videoDiv = document.getElementById('allVideos');
    videoDiv.innerHTML = null;

    videoDiv.innerHTML = `<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/${id}"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>`;
};

let createPopularCard = (id, channelTitle, title, url) => {
    let popularCard = document.createElement('div');
    popularCard.classList.add('popularCard');
    popularCard.id = id;
    popularCard.onclick = () => playVideo(id);

    popularCard.innerHTML = `<img src=${url} alt="${title}">
  <div class="popularCardContent">
    <h3 class="popularCardTitle">${title}</h3>
    <p class="popularChannelName">${channelTitle}</p>
  </div>`;

    return popularCard;
};

let displayMostPopular = (videos) => {
    let videoDiv = document.getElementById('allVideos');
    videoDiv.innerHTML = null;

    // Creating most popular div
    let mostPopular = document.createElement('mostPopular');
    mostPopular.id = 'mostPopular';

    videos.forEach(
        ({
            id: { videoId },
            snippet: {
                channelTitle,
                title,
                thumbnails: {
                    high: { url },
                },
            },
        }) => {
            let popularVideo = createPopularCard(videoId, channelTitle, title, url);
            mostPopular.append(popularVideo);
        }
    );

    videoDiv.append(mostPopular);
};

let loadVideoByCountry = async () => {
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&location=20.5937%2C78.9629&locationRadius=10mi&type=video&key=${API_KEY}&maxResults=50`;

    let data = await fetch(url);
    let videoData = await data.json();
    console.log('videoData:', videoData);
    if (videoData) {
        displayMostPopular(videoData.items);
    } else {
        displayNoVideos();
    }
};

const openMenu = document.querySelector('#show-menu')
const hideMenuIcon = document.querySelector('#hide-menu')
const sideMenu = document.getElementById('nav-menu')

openMenu.addEventListener('click', function () {
    sideMenu.style.left = '-3%'
})

hideMenuIcon.addEventListener('click', function () {
    sideMenu.style.left = '-80%'
    sideMenu.style.transition = '850ms'
})