## v1.1.0

- Adds api for `createBlockDecorator`

## v1.2.0

- Adds api for `composer.toString`
- Fixes exception when props are passed to a composer with functional modifiers.

## v1.3.0

- Now behaves correctly when passing 0 and empty strings as modifiers.

## v1.3.1

- Fixes an issue with decorator and defaultProps


## v1.5.0

- Add getWrappedInstance method

## v1.6.0

- Fix: Dont use string refs to preserve React owner
- Feature: Allow opt-out of ref by passing `withRef: false` to decorators.

## v1.6.1

- Fix: fix typo on ref