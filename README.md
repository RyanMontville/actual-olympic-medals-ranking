# The Actual Olympic Medals Ranking
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![HTML](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

Sanjay Amirthraj created a website to ranked all of the countries not by the total number of medals, but by the total value of the medals. You can check out his website [here](https://olympics-better-rankings.vercel.app/). Then Hank green [retweeted](https://x.com/hankgreen/status/1824509431352266788) his website. In the comments of Hank's post, several people suggested ranking the countries by total medals earned including athletes on teams, so a relay team of 4 would be counted as 4 medals instead of 1. After spending the weekend finding a dataset that was more than just the total medal counts and building a database, I have created the ACTUAL olympic rankings.

You can view the Actual Olympic rankings [here](https://ryanmontville.com/actual-olympic-medals-ranking/).

I found a [dataset on Kaggle](https://www.kaggle.com/datasets/piterfm/paris-2024-olympic-summer-games) by Petro and created a PostgreSQL database from the dataset. I then used some python to calculate the Actual rankings and then build an Angular app to display the rankings.

The flags are from [flagapi.com](https://flagsapi.com/).

View the [data](https://github.com/RyanMontville/actual-olympic-medals-ranking/tree/main/data) directory for the csv files and database export file.
