import { login, logout, resetAppState } from './auth.command.js';

// Auth commands
Cypress.Commands.add('login', login);
Cypress.Commands.add('logout', logout);
Cypress.Commands.add('resetAppState', resetAppState);