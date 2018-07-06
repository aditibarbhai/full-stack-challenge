# Loop App
This app demos a user experience for a performance review app. 
Users are able to see which co-workers they have been assigned to review and submit feedback for them.

## Demo
To run this app:
- Open a terminal window and type: `npm run start:server`
- In a separate terminal window, type: `npm run start:client`
- Open your browser and navigate to http://localhost:3000
- Play around with the demo! The app is responsive so try in both desktop and mobile mode!
    - **Note:** Since this is a POC demo, the changes made during a session are not persisted if the server is stopped and restarted. 

## Tech Stack
- Front end: React, create-react-app
    - future: planning to add in Redux for state management across components
- Back end: json-server, Faker.js, Node JS
    - Faker.js was used to generate the fake data but for the purposes of the demo, `server/db.json` will be used.

## User Story
- User is greeted with a home page dashboard where (s)he can see a list of co-workers that require feedback.
    - In this list, user will see a checkmark beside the names of co-workers they have already submitted feedback for.
- User is able click on the name of a co-worker and go to a "Review" page
- In the Review page, user is able to write feedback and save it as they go along.
- Once finished, they are able to submit the feedback and are redirected back to Home page.
- The co-worker for whom they just submitted a review should now have a check mark beside their name. 

## Future Functionality
- Add a "Drafts" section where users can store/see their saved (but not sent) reviews
- Add an Admin view for managers, etc. (admin employees) to be able to:
    - see reviews submitted for their direct reports
    - assign review requests to other employees
    - add/delete/update employee information 
    - add/delete/update reviews