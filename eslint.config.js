import antfu from '@antfu/eslint-config';

export default antfu({
	stylistic: {
		indent: 'tab',
		quotes: 'single',
		semi: true
	},
	formatters: true,
	astro: true
}, {
	rules: {
		'style/comma-dangle': ['error', 'never'],
		'style/no-mixed-spaces-and-tabs': ['off']
	}
});
