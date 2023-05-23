# svg-data-visualizer

This is an experiment to look at creating a data visualizer for a dataset from County Health Rankings https://www.countyhealthrankings.org/explore-health-rankings/rankings-data-documentation

Objectives:
1. Create a clickable USA map that includes states and counties
   a. Allow user to drill down to County level and back up
2. Add a color scale for represented data's range
3. Allow the user to view different data rankings as needed
4. Allow the user to view a relationship between two factors
5. Allow the user to select and compare States or Counties. This view will also show county(s), state, national specs.

Challenges:
1. Lots of data. The data set, even when trimmed down to only critical parts, is 125 columns by 3195 rows for 399,375 individual cells. This needs to be divided in different ways:
   a. Vertically for a comparison of 1 factor across counties/states
   b. Horizontally for a view of 1 county/state across different for comparison against each other counties/states
2. SVG manipulation. I can't buffer a complete USA map and 50 state's County maps — that's 3193 different SVG paths that need to be stored.
