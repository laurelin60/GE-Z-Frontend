// @ts-check

/**
 * @type{import('prettier').Config}
 */
 const config = {
    tabWidth: 4,
    printWidth: 80,
    proseWrap: "always",
    trailingComma: "es5",
    bracketSpacing: true,
    arrowParens: "always",
    singleAttributePerLine: true,
    endOfLine: "lf",
    singleQuote: false,
    semi: true,
    useTabs: false,
    plugins: [
        "@ianvs/prettier-plugin-sort-imports",
        "prettier-plugin-tailwindcss",
    ],
    tailwindFunctions: ["cva", "cn", "clsx"], // https://github.com/tailwindlabs/tailwindcss/discussions/7558#discussioncomment-9217030
    importOrder: [
        "^(react/(.*)$)|^(react$)",
        "^(next/(.*)$)|^(next$)",
        "<THIRD_PARTY_MODULES>",
        "",
        "^types$",
        "^~/types/(.*)$",
        "^~/config/(.*)$",
        "^~/lib/(.*)$",
        "^~/hooks/(.*)$",
        "^~/components/ui/(.*)$",
        "^~/components/(.*)$",
        "^~/styles/(.*)$",
        "^~/app/(.*)$",
        "",
        "^[./]",
    ],
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};

module.exports = config;