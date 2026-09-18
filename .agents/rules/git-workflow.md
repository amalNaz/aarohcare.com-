# Git Workflow & Commit Guidelines

## Push Strategy: Major Changes Only
- **Push Criteria**: Only push to the remote repository for **major changes**, such as:
  - Completed features and substantive component additions.
  - Significant architectural updates or refactoring.
  - Major bug fixes or core integration milestones.
- **Do Not Push Trivial Tweaks**: Avoid separate commits/pushes for minor changes like small color tweaks, text size changes, minor spacing/padding adjustments, or micro-edits. Group them into meaningful milestone commits when appropriate.

## Professional Commit Standards
- **Conventional Commits**: Use structured and professional commit messages:
  - `feat: <description>` for new features
  - `fix: <description>` for bug fixes
  - `refactor: <description>` for code improvements without feature changes
  - `perf: <description>` for performance optimizations
  - `docs: <description>` for documentation updates
- **Quality**:
  - Keep commit titles clear, concise, and written in the imperative mood (e.g., `feat: implement user authentication flow`).
  - Add descriptive body text when necessary to explain context or architectural rationale.
