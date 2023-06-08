# React-MachineLearning-Project

-In this project i have created 2 Machine Learning models ,one to predict the success of a movie(Hit,Flop,Average,BlockBuster,All Time Blockbuster) and the other to predict the recommended movies names for a particular movie-title input.


-Then with the help of FastApi(web framework for building APIs with Python) , both models were made available to the Frontend.


-The UI for my application was beautifully done using React.

## Functionalities
-A navbar at top with routing made to 'home' and 'predict'.
 
-home page is loaded as the default page, A search bar and certain movie items are present in the home page.


-we'll get the poster,cast,crew details of movie from an external movie api


-we'll get the recommendation list also from FastApi.


-user can either click on any specific movie from movie lists loaded in the home page or search for a specific movie in search bar.


-it will lead you to a new page which contains the details of the clicked movie and a recommendation section below it , which contains 8 recommended movies.


-Dynamic routing for each movie,i.e., the above proccess is repeated for each clicked movie on the recommendations list.


-inside the predict page , user can submit a form which contains names of director, writer,editor,main-lleads etc.. based on that,the model will predict box office success of a movie

### Future Plan:
-implementing a popupcard which describes details of each cast-members when clicked.


-Implementing Add to Favourite and Like functionalities.


-page pagination for recommended movies
