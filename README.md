# EMT-bus
<a href="https://snyk.io/test/github/lorengamboa/emt-bus">
<img  src="https://snyk.io/test/github/lorengamboa/emt-bus/badge.svg"></a>

<a href="https://travis-ci.org/Lorengamboa/EMT-bus">
<img  src="https://travis-ci.org/Lorengamboa/EMT-bus.svg?branch=master"></a>

+ Requirements
+ How to install
+ How to use
    - Authentication
    - Select a category
    - Make a request
+ Category methods
    - Bus
    - Geo

## Requirements

## How to install
> npm install emt-bus --save

## How to use

**Import and authenticate against the API.**
>var EMT = require('emt-bus').(<'idClient>', <'passKey>');

**Select a an API category**
>var bus = EMT('bus);

**Finally, make the request by selecting a method that corresponds to its category**
>bus.getListLines({ Lines: '', SelectDate: '09/09/1993' }).then ..

**Response**
<code></code>

### Bus Methods 🚌

|   Methods|Description |
| ---------|-------------|
| getCalendar|Get EMT Calendar for all days and line schedules for a range of dates   
| getGroups|Returns every line type and their details |
| getListLines|Returns lines with description and groups     |
| getNodesLines|Returns all stop identifiers and his coordinate, name, lines and directions|
| getRouteLines| Returns a line/s route with the vertex info to build the route and coordinates for stops and axes |
| getTimeTableLines|Provices information about the requested line at travel time|
| getTimesLines|Returns current schedules for the requested lines|

### Geo Methods 🌍

|   Methods|Description |
| ---------|-------------|
| getArriveStop|Gets bus arrive info to a target stop |
| getGroups|Return a list of groups |
| getInfoLine|Returns line info in a target date|
| getInfoLineExtend|Returns line info in a target date|
| getPointsOfInterest|Returns a list of Points of Interest from a coordinate center with a target radius|
| getPointsOfInterestTypes|Returns a list of Point of interest types|
| getStopsFromStop|Returns a list of stops from a target stop with a target radius and the lines arriving to those stops.|
| getStopsFromXY|Returns a list of stops from a coordinate with a radius and the lines arriving to those stops.|
| getStopsLine|Provices information about the requested line at travel time.|
| getStreet|Returns a list of EMT nodes related to a location. All EMT locations are a group of stops  within a target radius and the lines related to each stop in the list.|
| getStreetFromXY|Returns a list of stops from a target coordinate.|