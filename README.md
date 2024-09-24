67-272: GCPD Project

We will continue our project to develop a foundation for the GCPD Crime Tracking system in this phase. We will focus our efforts on building out the controllers and views to make for an effective front end for our new system, including some dynamic pages using React. This is a lot a test-driven development in this phase -- we give you all the controller tests and some view tests and your job is to pass these tests. In this process, you will see how our testing suite can serve as documentation and help us define system requirements.

**Grading**

This phase will constitute 17 percent of your final course grade and is broken down into the following four components:

1. **Creation of Controllers**: We have given you all the controller tests that your controllers must pass. (_Note that in this section, when we talk of controllers, we are excluding all API controllers._) Of course, these controllers must also be able to generate the code needed to pass the Cucumber tests, so reading the two sets of tests together is advisable. All tests must pass and the coverage is to be at 100 percent; if you add additional methods that we do not test, expect a substantial penalty. The project must be **using Rails 7.0.4 and Ruby 3.1.4 and the gems specified in the Gemfile.**. In total, the creation of controllers and passing those tests compromise 30 points.

2. **Creation of Views**: We are going to have you complete key elements of the system front end by building views for units, officers, and the like. (_Note that in the interest of time, we are not requiring views for every single model and controller._) We have given you a series of 10 Cucumber tests that test the full stack (model-view-controller) for key views; these will help you learn a bit about this form of testing. In building these views, keep in mind design principles that were discussed in class. In total, passing the Cucumber tests counts for 30 points of the phase grade.

3. **Dynamic UI with React**: The investigations#show page has a lot of potential to be more interactive with the use of React. In a separate file in the docs/ directory, we have more information about what we are requiring for this page and how we expect React to be utilized. In total, creating the dynamic investigations#show page will be worth 30 points.

4. **Visual Design & Design Principles**: To prevent attempts to hack the test suites, we will be manually checking each application to make sure that the key elements are not hard-coded into the response. While doing that, we will also assess the quality of your visual design. In addition to an assessment of your visual design, we may deduct points in this section for not adhering to design principles discussed in class. In total, this section is worth 10 points.
