export default {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+\\.ts?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
	},
};
