# Piccollage Project

## Objective
Yelp-like website, let users query the opening restaurants according to the time they plan to go.

## Server
## Initialize Database
After filling in `config.json`, in order to structure your database and feed it with sample data, you'll need to run the following command:
```
node server/database/initialize.js
```

By default, the tool will feed database using `server/database/sample.txt`. **If you plan to use another file, you need to provide the `--samplePath` option when executing the command**:
```
node server/database/initialize.js --samplePath=<pathToSample>
```  
_Be careful, the sample file needs only one Restaurant object on each line. Please refer to `sample.txt` for further details._
