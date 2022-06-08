# Example Geocoder Test

## Instructions

You are the new developer on a program that reads in a list of addresses and geocodes each one with a mock geocoder. It seemed like it was working fine, but we ran into a few issues when we tried to use it on real data. We need to you handle the tasks below; it shouldn't take more than two hours.

- Fork this CodeSandbox (or create a sandbox from this template)
- Carefully read the requirements for each step of the test
- Correct or enhance the `src/processAddressList.js` file (do not modify any other files)
- Open a new terminal by clicking the "+" in the Terminal window (or use the Server Control Panel all the way to the left)
- Use `npm run start:sample` to run the script on the sample data set
- Use `npm run start:full` to run the script on the full data set
- Both the full and sample data sets can be found in the `data` directory

## Step 1 - Fix the Bug

When we run the geocoder script on the sample data everything seemed fine, but we get an error when running it on the full data set. Please fix it so that the script runs to completion without error on any valid record.

## Step 2 - Improve the Performance

It wasn't obvious running on the sample data set, but now that it is working, the script is far too slow on the full data set. Get the script to run on the full data set in under 15 seconds.

## Step 3 - Add a Feature

These addresses are all in Dayton, OH, but we want to add a flag if the address is within half a mile of the city center (39.7589 N, 84.1916 W). You can add files or dependencies, but be prepared to explain why they are needed.
