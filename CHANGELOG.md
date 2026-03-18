# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.7] - 2025-09-08

### Changed

- Bump backend version to 0.6.3

## [3.0.6] - 2025-08-04

### Changed

- Bump backend version to 0.6.2

## [3.0.5] - 2025-07-31

### Changed

- Bump backend version to 0.6.1

## [3.0.4] - 2025-07-31

### Changed

- CLI.Parser.oneOfArgs now returns first error that is not an arity error, if possible, to increase the likelihood of returning an interesting error message.

## [3.0.3] - 2025-07-27

### Changed

- More precise scan for source files to avoid arbitrary JS ending up in package bundles, causing compile errors.

## [3.0.2] - 2025-07-27

### Fixed

- Fix encoding of `PackageValidate` backend command
- Make sure to remove potential stale lock prior to running tests

## [3.0.1] - 2025-07-17

### Fixed

- Use correct backend version

## [3.0.0] - 2025-07-16

### Added

- Started changelog
