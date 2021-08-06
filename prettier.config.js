/**
 * Link to Prettier Documentation: https://prettier.io/docs/en/options.html
 */
 module.exports = {
	/**
	 * Changed Options
	 */
	printWidth: 100, // Changed 80->100.  Specifies the line length that the printer will wrap on.  This was decided on by our team as a good happy-medium.
	useTabs: true, // Changed false->true.  Indent lines with tabs instead of spaces.  Tabs will be used for indentation but Prettier uses spaces to align things, such as in ternaries.
	arrowParens: "avoid", // Changed "always"->"avoid".  Omit parens when possible. Example: x => x
	semi: false, // Add a semicolon at the end of every statement.
	/**
	 * Default Options
	 */
	tabWidth: 2, // Changed 2->4.  Specifies the number of spaces per indentation-level.  How tabs are displayed can be configured in your editor, but this will affect the "printWidth" calculation and how code appears outside of your editor (like in BitBucket)
	singleQuote: false, // We use double quotes for everything.
	quoteProps: "as-needed", // Only add quotes around object properties where required.
	jsxSingleQuote: false, // We use double quotes in JSX.
	trailingComma: "es5", // Trailing commas where valid in ES5 (objects, arrays, etc.)
	bracketSpacing: true, // This puts spaces between brackets.  Like {foo: bar} vs { foo: bar }.
	jsxBracketSameLine: false, // We put the > of a multi-line JSX element alone on the next line (does not apply to self closing elements).
	requirePragma: false, // We're prettifying everything at once so no need for this.
	insertPragma: false, // We're prettifying everything at once so no need for this.
	proseWrap: "preserve", // This respects line-breaks in the input when deciding where to wrap markdown text - we need this because some services (like BitBucket) use a linebreak-sensitive renderer.
	htmlWhitespaceSensitivity: "css", // Specify the global whitespace sensitivity for HTML files.  "CSS" respects the default value of CSS display property.
	endOfLine: "lf", // We use LF line endings, and not CRLF.
}