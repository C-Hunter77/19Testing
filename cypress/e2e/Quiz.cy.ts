/// <reference types="cypress" />

describe('Tech Quiz App — Full E2E', () => {
  beforeEach(() => {
    // Stub the exact endpoint your app hits:
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json',
    }).as('getQs');

    // Visit your running front‑end (make sure `npm run client:dev` is up)
    cy.visit('/');
  });

  it('clicks through each question, asserts score, then restarts', () => {
    // 1) Kick off the quiz
    cy.contains('button', 'Start Quiz').click();

    // 2) Wait for our questions fixture to load
    cy.wait('@getQs');

    // 3) Ensure the quiz card is visible
    cy.get('.card').should('be.visible');

    // 4) Loop through each question in the fixture
    cy.fixture('questions.json').then((questions) => {
      questions.forEach(({ question, answers }) => {
        // a) Wait for the question text
        cy.contains('h2', question).should('be.visible');

        // b) Click the first answer in that row
        cy.contains(answers[0].text)
          .parent()           // row wrapper
          .find('button')     // the numbered button
          .click();
      });

      // 5) After the last question, verify completion screen
      cy.contains('h2', 'Quiz Completed').should('be.visible');

      // 6) Verify the score
      const correctCount = questions.filter(q => q.answers[0].isCorrect).length;
      cy.contains(`Your score: ${correctCount}/${questions.length}`)
        .should('be.visible');

      // 7) Restart the quiz — now we should see the *first* question again
      cy.contains('button', 'Take New Quiz').click();
      cy.contains('h2', questions[0].question)
        .should('be.visible');
    });
  });
});
