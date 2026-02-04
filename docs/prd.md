# Product Requirement Document (PRD) - Team Introduction Website

## Project Overview
A web-based platform to introduce the team members, their roles, and the overall mission of the team. The site should feel modern, responsive, and easy to navigate.

## Main Features
1. **Home (Greeting)**: A landing page with a warm welcome message and a high-level summary of the team.
2. **Team Member List**: A grid-based list of cards representing each team member.
    - Each card should show: Name, Role, Image (placeholder/generated), and a brief bio.
3. **About Page**: A page describing the team's mission, history, and goals.
4. **Navigation**: A consistent header allowing quick switching between Home, Team, and About.

## User Stories
- As a visitor, I want to see a professional greeting so I understand what the team does.
- As a visitor, I want to see a list of team members so I know who is involved in the project.
- As a visitor, I want the site to work on my mobile phone.

## Technical Requirements
- **Framework**: React + Vite + TypeScript.
- **Styling**: Tailwind CSS v4.
- **Routing**: Nested Routing using `react-router-dom` with `Layout` and `Outlet`.
- **Infrastructure**: Components organized into `src/components`, `src/pages`, and `src/hooks`.
