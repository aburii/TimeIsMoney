<template>
	<div :class="`rounded-md bg-gradient-to-b ${color} p-1 min-w-[385px]`">
		<div class="flex flex-col w-450 h-180 flex-col justify-center items-center gap-2 bg-[#1D232A] p-4 text-justify">
			<slot />
		</div>
	</div>
</template>

<script setup>
defineProps(['color']);
</script>