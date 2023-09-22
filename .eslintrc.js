module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: 'standard',
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                '.eslintrc.{js,cjs}'
            ],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        'no-unused-vars': ['error'],
        'no-multi-spaces': 'error', // disallow multiple spaces
        camelcase: 'error', // enforce camelcase naming convention
        'no-empty': 'error', // disallow empty block statements,
        eqeqeq: ['error', 'always'] // enforce the use of === and !==
    }
};
