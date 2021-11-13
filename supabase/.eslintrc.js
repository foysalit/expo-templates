module.exports = {
    extends: [
        "airbnb",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
    ],
    plugins: ["@typescript-eslint", "react", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2019,
        sourceType: "module",
        project: "./tsconfig.json",
    },
    rules: {
        "import/no-unresolved": 0,
        "react/require-default-props": 0,
        "react/jsx-props-no-spreading": 0,
        "import/prefer-default-export": 0,
        "react/jsx-filename-extension": [
            1,
            {
                extensions: [".ts", ".tsx", ".json"],
            },
        ],
        "prettier/prettier": [
            "error",
            {
                trailingComma: "all",
                arrowParens: "avoid",
                endOfLine: "auto",
                printWidth: 100,
            },
        ],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "import/extensions": [
            "error",
            "never",
            {
                json: "always",
                component: "always",
                screen: "always",
                hook: "always",
                navigator: "always",
                context: "always",
                machine: "always",
            },
        ],
        "react/prop-types": 0,
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "max-len": ["error", { code: 100 }],
        "no-nested-ternary": 0,
        camelcase: 0,
    },
};
