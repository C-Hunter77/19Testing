/// <reference types="cypress" />
// import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    // 1) Stub the exact same endpoint your Quiz component calls:
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json',
    }).as('getQs');
  });

  it('renders the Start Quiz button by default', () => {
    mount(<Quiz />);
    cy.contains('button', 'Start Quiz')
      .should('be.visible')
      .and('not.be.disabled');
  });

  it('shows first question after clicking Start', () => {
    // 2) Mount the component
    mount(<Quiz />);

    // 3) Kick off the quiz
    cy.contains('button', 'Start Quiz').click();

    // 4) Wait for our stubbed questions to arrive
    cy.wait('@getQs');

    // 5) Grab the first question from the fixture and assert its <h2> appears
    cy.fixture('questions.json').then((questions) => {
      const q0 = questions[0].question;
      cy.contains('h2', q0).should('be.visible');
    });
  });
});
