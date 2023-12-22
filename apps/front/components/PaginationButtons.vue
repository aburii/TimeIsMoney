<template>
  <div class="flex justify-center mt-4">
    <div class="join">
      <button
        v-for="page in paginationArray"
        :key="page"
        :class="[
          'join-item btn-xs sm:btn btn h-12 sm:h-auto',
          currentPage === page ? 'btn-active sm:btn-active' : '',
        ]"
        @click="emitChangePage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number
});

const emit = defineEmits(['changePage']);

const paginationArray = computed(() => {
  const pages = [];
  if (props.totalPages <= 5) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    let start = Math.max(2, props.currentPage - 1);
    let end = Math.min(props.totalPages - 1, props.currentPage + 1);

    if (props.currentPage === 1) {
      end = 4;
    }
    if (props.currentPage === props.totalPages) {
      start = props.totalPages - 3;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    pages.push(props.totalPages);
  }
  return pages;
});

const emitChangePage = (page) => {
  emit('changePage', page);
};
</script>
