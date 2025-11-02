import antfu from '@antfu/eslint-config';

export default antfu({
    stylistic: {
        indent: 'tab',
        quotes: 'single',
        semi: true
    },
    formatters: false,
    astro: true
}, {
    rules: {
        'style/comma-dangle': ['error', 'never'],
        'style/no-mixed-spaces-and-tabs': ['off'],
        'style/max-len': ['error', { code: 180 }],
        'style/brace-style': ['error', '1tbs'],
        'style/operator-linebreak': ['error', 'none']
    }
});
