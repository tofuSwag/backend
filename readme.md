# Startup kinda pitch of app

## TL;DR

> The links to our deliverables (app's .apk, video) are linked in the organisation's description. Most people read news about bad stuff happening in the world (caused by humans), and then go to Youtube, Spotify, Netlify.We also provide solutions for you to make changes in the same platform.

## Problem

> People read about all the bad stuff humands have caused, but don't do anything about after reading.

## Solution

We indicate the problem to them while also giving them viable solutions

## "How did you go about solving it?"

First, we asked the question what can any person do about the stuff humands have done/are doing wrong.
Quick Googling and some intutive answers results in the following

What can we do:

- Take measures on a personal level => daily habits
- Donate to organisation
- Approach governement organisations: start petitions => Change.org

Next we prioritised out of these 3 and decided that `organisations` should be the way to go for our MVP.

## Wait, what did you do again?

- We made a cross platform application (iOS may have _some_ glitches).
- It has 3 tabs: Repercussions, Ammends, You
- Repercussions: lists all the problems across 7 spheres (listed below). Each problem links to a options to solve the problem, namely by either donating or volunteering at an organisation for the respective problem:
  - Pollution
  - Deforestation
  - Food Waste
  - Climate change
  - Global Warming
  - Biodiversity Loss
  - Water Scarcity
- Ammends: A standalone tab for only ways to improve the world.
- You: How you can help **Wake Up**. This is where we went a bit different. We've opensourced the entire app, hence also the Ammends API. We intend to do the hardwork of combing through the internet, verifying validity and letting everybody reap the benefits. In addition to getting a list of all the ways (organisations) to Ammend, a user can send a POST request to `/ammends/makeAmmend` to send us suggestions for which organisations to add to this list. This will be verified by us on an onging basis. More on this in a bit.

# The tech part of the solution

- App: Flutter,
- Backend:
  - Express.js
  - Mongoose
  - NewsAPI (development addition)
  - node-cron - backups to the database every 3 hrs to decrease calls to NewsAPI _drastically_.
  - ngeohash - for finding Ammend organisations nearby the user.

# Future plans of the application

## Content related

- Scrape Change.org to introduce a new method called `campaign` in the Ammends tab.
- Writeups on `Habits` one can change to improve the situation. This too will be added to Ammends tab.
- Introduce Videos/other media instead of just News.

## Formalise review process for each user-suggested organistion

Presence to check up OR Criteria to look at

- News
- Ratings on other sites
- Recommenders
- dns/whois lookup of site to check how recent it is. (In case somebody faked an organisation)

## Volunteer Program

We're already talked about crowd sourcing a list of organisations. We've also described directly above a filteration "process". What we propose now is making it autonmous so that when we're busy with Boards, or pass out of school the app doesn't stop. This can be done through **volunteers** which will be incentivized using **certificates**. (We can make a certificate generator for the same). They will be responsible for

- Reviewing the suggestions
- Researching and writing for the `Habits` on the Ammends tab.

They will be incentivised through these certificates which can be a form of **Community Service/Unpaid Internship for them**

- Will make an "Overview" dashboard to handle these volunteers and all the "company-like" parts of the application.

- (Just an idea) _Backend_ & Privacy focussed Analytics middleware: To figure out how well the application is doing. We though we could hash the IP address of the user and count unique users in the same way.

# FAQs

> They're not really frequent, we just made 'em :P

## How is this different from giveindia.org?

Honestly, we were initially thinking of scraping GiveIndia.org for some places to donate, but then we made a firm decision. To quote one of our docs:

```text
NOT doing giveindia.org for a focus on directly noticeable problems i.e. a person in Noida wouldn't know problems of rural Rajasthan, but he/she would know problems caused by plastic, pollution and notices/faces them in daily life i.e. has a personal connect.
```

Also we:

- Indicate the problem to the user and THEN offer solutions.
- Give not only donation as a way of contributing but also **volunteering**. So it's not all about the money.
- Don't want to be invovled in any sort of payment to the user.
- Have more methods of contributing planned
