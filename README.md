# Cypress Command Branch Demo

Small Demo for branching cypress commands in a way that doesn't clutter the workspace.

## Getting Started - The Usual
Clone down the repo <br>
Run <code>npm i</code> <br>
Then <code>npm start</code> <br>
And Finally<code>npm run cypress</code> <br>

## Using the branch commands
Navigate to the cypress folder and into the test spec files.<br>
Inside there is a few examples showing how to use the command.<br>
<br>
<code>cy.nav()</code> should reveal a more limited selection of intellisence.<br>
<code>cy.nav().home()</code> takes you to the home page.<br>
<code>cy.nav().home().menu(button)</code> takes you to the menu.<br>
<br>
The Commands can be chained like any other cypress command.<br>
The <code>cy.nav())</code> branch yields the previous elements so:
 <code>cy.get('[data-cy=your-element]').nav().home().menu(button).back()</code><br>
 Would still have <code>your-element<code> at the end of the chain.
<br>
