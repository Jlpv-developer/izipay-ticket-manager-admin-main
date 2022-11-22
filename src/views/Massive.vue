<template>
	<div>
		<section class="section is-main-section">
			<title-bar :title-stack="titleStack" />
			<massive-table/>
		</section>
	</div>
</template>

<script>
import MassiveTable from "@/components/MassiveTable";
import TitleBar from "@/components/TitleBar";
export default {
	name: "Massive",
	data() {
		return {
			
		};
	},
	components: {
		TitleBar,
		MassiveTable,
	},
	computed: {
		titleStack() {
			return ["Masivo"];
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