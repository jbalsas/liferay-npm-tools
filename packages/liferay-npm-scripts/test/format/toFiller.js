/**
 * © 2019 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

const toFiller = require('../../src/format/toFiller');

describe('toFiller()', () => {
	it('replaces a simple string with same-shaped filler', () => {
		const original = 'foo bar';
		const expected = '╳╳╳╳╳╳╳';

		expect(toFiller(original)).toBe(expected);
	});

	it('replaces a multiline string with same-shaped filler', () => {
		const original = '  foo\n\t\tbar baz\n';
		const expected = '╳╳╳╳╳\n\t\t╳╳╳╳╳╳╳\n';

		expect(toFiller(original)).toBe(expected);
	});

	it('leaves Windows-style CRLF as-is', () => {
		const original = 'one\r\ntwo';
		const expected = '╳╳╳\r\n╳╳╳';

		expect(toFiller(original)).toBe(expected);
	});

	it('accepts a custom filler chararcter', () => {
		const original = 'abc\nefg';
		const expected = '___\n___';

		expect(toFiller(original, '_')).toBe(expected);
	});

	describe('toFiller.FILLER', () => {
		it('can be used to match comments made with toFiller()', () => {
			expect(toFiller.FILLER.test('/*╳╳╳*/')).toBe(true);
		});

		it('does not match ordinary comments', () => {
			// Empty comment.
			expect(toFiller.FILLER.test('/**/')).toBe(false);

			// Whitespace-only comment.
			expect(toFiller.FILLER.test('/* */')).toBe(false);

			// Comment with text.
			expect(toFiller.FILLER.test('/* foo */')).toBe(false);
		});
	});
});
