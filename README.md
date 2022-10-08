<a href="https://www.producthunt.com/posts/gif-it?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-gif&#0045;it" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=334087&theme=light" alt="Gif&#0045;It - Make&#0032;Gifs&#0032;from&#0032;portion&#0032;of&#0032;any&#0042;&#0032;Youtube&#0032;Video | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

## What am I looking at?
**Gif-It** - An online tool to Make Gifs from portion of any* Youtube Video

*any\*: Video Playback should be enabled for other sites.*

## How it works?
Currently FFMPEG is being used as a binary(same as on LINUX) and executing the commands on the Shell with the help of the node-server. Part of the process was to get the source url of the Youtube Video which is done using youtube-dl-exec library. So, As a result
Process of converting and fetching the gif from the server is slower, sometimes Request may Time Out as Heroku has limit of 30 seconds of until Timed Out Responses.

**NOTE**: Future prospects are to make this completely Client Side. See [Live Demo](https://gif-it-now.herokuapp.com) for basic functionality.


## How to run it locally?
1. > ***Clone this repo to your local machine and cd into the Gif-It directory.***
2.     npm i
   > This will download all the required dependencies for the application to run on your local machine.
3. > ***Create the .env file at root of the Project and add all the environment Variables with appropriate values to it as illustrated in .env.sample***
4. > As you might notice from .env.sample file you need an API KEY for using Youtube-Data-Api. [Here](https://www.youtube.com/watch?v=N18czV5tj5o) is quick guide for generating one. Add this key to .env file.
5.     npm start
   > This will start react development serve at port 3000(by default)
6.     npm run serve
   > This will start node-server at port 5000(by default)
   
## How to use it?
Step-1:
> Search with keywords about the video just like youtube.com
> 
Step-2:
> Click on *'Use Video for making Gif'*

Step-3:
> Set the *'Starting Time'* of the Video in seconds

Step-4:
> Set the *'Duration'* for the Gif in seconds

Step-5:
> Click on *'Gif-It Now!'* and wait till you get the Gif File downloaded from the Server.


## What should I have under my belt before start contributing?
1. **HTML/CSS/JS**
2. **React.js** 
3. **Node.js**

## Author
* [Ankit Sangwan](https://github.com/ankitsangwan1999)

Special Mention: [Aman Tibrewal](https://github.com/amantibrewal310) for suggesting youtube-dl.
