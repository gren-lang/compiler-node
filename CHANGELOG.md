# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **CLI Enhancements**:
  - Added `packageNameParser` and `semanticVersionParser` to `Cli.Parser`
  - Support for `--flag value` argument format in addition to `--flag=value`
  - Improved error handling and help text generation

- **Compiler.Outline improvements**:
  - Added `readFromPath` function with proper error handling for reading `gren.json` files
  - Enhanced `findSourceFiles` with validation for module names and file contents
  - Added comprehensive error types: `ReadFromPathError` and `FindSourceFilesError`

- **New Modules**:
  - `Compiler.Package` for reading packages from file system and `Stream`s

### Changed

  - Moved from `CLI` to `Cli` module naming convention
  - Replaced `Task.sequence` with `Task.concurrent` for better parallelism in file operations
  - Optimized source file scanning and validation

- **Documentation**:
  - Reformatted CHANGELOG to use Keep a Changelog format
  - Updated README to clarify package purpose and functionality
  - Several modules have been moved to the `gren-lang/compiler-common` package

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
