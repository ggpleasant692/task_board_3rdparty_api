# Task Board Third Party API Project Summary

## What I Learned:

- **HTML/CSS Basics**
  - How to structure a web page with HTML.
  - How to use Bootstrap for responsive design and styling.
  - Creating and customizing modals using Bootstrap.

- **JavaScript and jQuery**
  - How to interact with the DOM using jQuery.
  - Handling user events such as clicks and form submissions.
  - Making elements draggable and droppable using jQuery UI.
  - Working with localStorage to persist data across page reloads.
  - Dynamically generating and modifying HTML elements.

- **Date Handling**
  - Using dayjs to format and manipulate dates.
  - Comparing deadlines to the current date to apply conditional styling.

## Challenges and Solutions

- **Challenge**: The task cards were not displaying in the correct colors.
  - **Solution**: Added logic to createTaskCard() to apply background colors based on the task's deadline using dayjs. Ensured the correct CSS classes (bg-danger for overdue, bg-warning for nearing deadline) were applied.

- **Challenge**: Modal not appearing or behaving correctly.
  - **Solution**: Corrected the HTML structure of the modal and ensured Bootstrap's JavaScript was properly included and initialized. Verified modal IDs and classes.

- **Challenge**: Tasks not maintaining their progress state after refreshing the page.
  - **Solution**: Updated the renderTaskList() function to read from localStorage and display tasks in the correct columns.

- **Challenge**: Incorrect date format causing issues.
  - **Solution**: Ensured date formats were consistent between input, storage, and display. Used jQuery UI’s date picker with the correct date format and formatted dates with dayjs for display.
- **Challenge**: Getting the card to change to green when it is in the completed state.
   - **Solution**: Wasn't found.