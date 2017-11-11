# Queen City Hackathon

## Crime Neural Network and Predicting Crime Encounters, team: gg_rip_sad

### History

We started looking at the data last night, thinking of some way to implement a neural network that would actually have an impact on Charlotte's safety or the socioeconomic mobility. 

America has been waking up to allegations of sexual assault, trafficking, domestic abuse, and other horrendous crimes far too often. What if we could create a neural network that would decrease the probability of these crimes by letting officers know when they're entering a probable crime, keeping them on alert of potential crime and weapons, and by simply patrolling the area, could potentially decrease the probability of these heinous crimes. 

### Solution

Unfortunately we didn't have crime data, so we had to use arrest data. With the arrest data, we created a machine learning model using synaptic.js to take 7 inputs (latitude, longitude, month, day, hour, minute, weapon) and output a prediction on whether there's a crime or not, and whether a weapon would be present. 

We could have simply done a historical data analysis of arrest data, but that wouldn't be predictive. That would be great to present some correlations or some hypothesis, but it wouldn't actually be able to learn and predict whether a crime would happen. 

The machine learning algorithm has a series of 8 hidden inputs which have various weights, and over time the model is trained to increase the accuracy of those weights. This means that next time a latitude and longitude get inputted along with a date and time, we can predict with increasing accuracy whether a crime will be committed and whether a weapon will be present.  

This would be used to increase awareness of officers patrolling the area, but would NOT be used to influence patrolling locations and frequency, reference the 'We are aware of the implications' section. 

We imagine a future that uses our model to have a HUD display in a patrol vehicle with the level of alertness necessary. Obviously officers should always be alert, but if they had a little dot with a color on it, on a HUD display in their vehicle representing the likelihood of a crime and the likelihood of a weapon, we could potentially decrease crime (by increasing officer awareness to surroundings) as well as increase officer safety. 

### We are aware of the implications

We are completely aware of the implications of our prediction model. It's VERY easy to slip into a model that self perpetuates itself by increasing patrol vehicles in high crime areas, thus reporting high crime and more arrests, and thus training our model further to send police into the area. This is why we DON'T want this to affect patrol routes. We want this to not affect patrol routes and frequency at all, we want our app to simply make officers safer.

### Stack
* Vue for front end
* Vuetify for styling
* express for backend and routing
* synaptic.js for machine learning
* now (zeit.co) for deployments and hosting
* charlotte crime for initial data
* google maps api for lat and long data
* google maps api for heat map