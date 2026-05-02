# Changelog

All notable changes to this project are documented in this file.

The format is based on Keep a Changelog and this project follows Semantic Versioning.

## Release Entry Template

Copy this section for the next release and fill in only relevant items.

```md
## [x.y.z] - YYYY-MM-DD

### Breaking
- 

### Added
- 

### Changed
- 

### Fixed
- 

### Security
- 
```

## [2.0.0] - Unreleased

### Breaking
- Minimum supported Node.js version is now 22.
- CI test matrix now targets Node.js 22 and 24.

### Added
- Repository now tracks package-lock.json for reproducible installs and CI consistency.
- Added security policy at SECURITY.md.
- Added code ownership rules at .github/CODEOWNERS.
- Added CI workflow for pull requests and pushes.
- Added CodeQL workflow for static analysis and scheduled scans.
- Added dependency review workflow for pull requests.
- Added weekly fresh-dependencies compatibility workflow.
- Added npm audit workflow for push, pull request, and scheduled checks.
- Added dependency maintenance workflow to open automated upkeep pull requests.

### Changed
- Dependabot configuration now updates npm dependencies and GitHub Actions weekly with labels and grouping.
- Package metadata now limits published files to src and adds scripts for CI and audit tasks.
- Test framework migrated from Mocha/Should to Node's built-in node:test runner with node:assert/strict.

### Security
- npm audit currently reports zero vulnerabilities at moderate threshold.

## [1.0.1] - 2024-08-31

### Added
- Initial published release.
