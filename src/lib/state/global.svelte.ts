function createGlobalState() {
	let global = $state({
		modal: {
			open: false
		}
	});

	return {
		get global() {
			return global;
		},
		set global(v) {
			global = v;
		}
	};
}

export const globalState = createGlobalState();
