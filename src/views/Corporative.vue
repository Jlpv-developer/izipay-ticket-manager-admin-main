<template>
	<div>
		<section class="section is-main-section">
			<title-bar :title-stack="titleStack" />
			<GGEE-table-sample />
		</section>
	</div>
</template>

<script>
import GGEETableSample from "@/components/GGEETableSample";
import TitleBar from "@/components/TitleBar";
export default {
	name: "Corporative",
	data() {
		return {
		};
	},
	components: {
		TitleBar,
		GGEETableSample,
	},
	computed: {
		titleStack() {
			return ["Corporativo"];
		},
	},
	methods: {

	},
	created() {

	},
	watch: {

	},
};
</script>

