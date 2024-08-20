# The Actual Olympic Medals Ranking
Sanjay Amirthraj created a website to ranked all of the countries not by the total number of medals, but by the total value of the medals. You can check out his website [here](https://olympics-better-rankings.vercel.app/). Then Hank green [retweeted](https://x.com/hankgreen/status/1824509431352266788) his website. In the comments of Hank's post, several people suggested ranking the countries by total medals earned including athletes on teams, so a relay team of 4 would be counted as 4 medals instead of 1. After spending the weekend finding a dataset that was more than just the total medal counts and building a database, I have created the ACTUAL olympic rankings.

You can view the Actual Olympic rankings [here](https://ryanmontville.com/actual-olympic-medals-ranking/).

I found a [dataset on Kaggle](https://www.kaggle.com/datasets/piterfm/paris-2024-olympic-summer-games) by Petro and created a PostgreSQL database from the dataset. I then used some python to calculate the Actual rankings and then build an Angular app to display the rankings.
