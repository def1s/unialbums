import { classNames } from 'shared/lib/classNames/classNames';

describe('classNames', () => {
	test('only base class', () => {
		expect(classNames('base')).toBe('base');
	});

	test('additional classes', () => {
		expect(classNames('base', {}, ['additional'])).toBe('base additional');
	});

	test('ignore falsy additional classes', () => {
		expect(classNames('base', {}, ['additional', ''])).toBe('base additional');
	});

	test('include modifiers with truthy values', () => {
		expect(classNames('base', { 'modifier': true })).toBe('base modifier');
	});

	test('ignore modifiers with falsy values', () => {
		expect(classNames('base', { 'modifier': false })).toBe('base');
	});

	test('handle a mix of additional classes and modifiers', () => {
		expect(
			classNames('base', { 'modifier': true }, ['additional'])
		).toBe('base additional modifier');
	});

	test('handle a mix of additional classes and modifiers with some falsy values', () => {
		expect(
			classNames('base', { 'modifier': false }, ['additional', ''])
		).toBe('base additional');
	});
});
